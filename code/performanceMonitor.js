/**
 * 前端性能监控统计算法实现
 * 核心思想：采样统计 + 百分位数计算（P75/P90/P99）
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fp: [],   // First Paint
            fcp: [],  // First Contentful Paint
            lcp: [],  // Largest Contentful Paint
            fid: [],  // First Input Delay
            cls: [],  // Cumulative Layout Shift
            fps: []   // Frames Per Second
        };
    }
    
    // 收集性能指标（使用 Performance API）
    collectMetrics() {
        // 1. 监听 FP / FCP
        const paintObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-paint') {
                    this.metrics.fp.push(entry.startTime);
                } else if (entry.name === 'first-contentful-paint') {
                    this.metrics.fcp.push(entry.startTime);
                }
            }
        });
        paintObserver.observe({ type: 'paint', buffered: true });
        
        // 2. 监听 LCP
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp.push(lastEntry.startTime);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        
        // 3. 监听 FID
        const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.metrics.fid.push(entry.processingStart - entry.startTime);
            }
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
        
        // 4. 监听 CLS
        const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.metrics.cls.push(clsValue);
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
    }
    
    // 统计算法：计算百分位数（Percentile）
    calculatePercentile(data, percentile) {
        if (data.length === 0) return 0;
        
        // 排序
        const sorted = [...data].sort((a, b) => a - b);
        
        // 计算索引
        const index = (percentile / 100) * (sorted.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        
        // 线性插值
        if (lower === upper) {
            return sorted[lower];
        }
        
        const weight = index - lower;
        return sorted[lower] * (1 - weight) + sorted[upper] * weight;
    }
    
    // 计算平均值
    calculateAverage(data) {
        if (data.length === 0) return 0;
        const sum = data.reduce((acc, val) => acc + val, 0);
        return sum / data.length;
    }
    
    // 计算标准差
    calculateStandardDeviation(data) {
        if (data.length === 0) return 0;
        const avg = this.calculateAverage(data);
        const squareDiffs = data.map(val => Math.pow(val - avg, 2));
        const avgSquareDiff = this.calculateAverage(squareDiffs);
        return Math.sqrt(avgSquareDiff);
    }
    
    // 生成性能报告
    generateReport() {
        const report = {};
        
        for (const [metric, values] of Object.entries(this.metrics)) {
            if (values.length > 0) {
                report[metric] = {
                    samples: values.length,
                    avg: this.calculateAverage(values).toFixed(2),
                    p50: this.calculatePercentile(values, 50).toFixed(2),
                    p75: this.calculatePercentile(values, 75).toFixed(2),
                    p90: this.calculatePercentile(values, 90).toFixed(2),
                    p99: this.calculatePercentile(values, 99).toFixed(2),
                    stdDev: this.calculateStandardDeviation(values).toFixed(2)
                };
            }
        }
        
        return report;
    }
}

// ========================================
// FPS 监控（独立实现）
// ========================================

class FPSMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fpsValues = [];
        this.isRunning = false;
    }
    
    start() {
        this.isRunning = true;
        this.measureFPS();
    }
    
    measureFPS() {
        if (!this.isRunning) return;
        
        this.frameCount++;
        const now = performance.now();
        
        // 每秒计算一次 FPS
        if (now - this.lastTime >= 1000) {
            const fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
            this.fpsValues.push(fps);
            this.frameCount = 0;
            this.lastTime = now;
            
            console.log(`📊 当前 FPS: ${fps}`);
        }
        
        requestAnimationFrame(() => this.measureFPS());
    }
    
    stop() {
        this.isRunning = false;
    }
    
    getAverageFPS() {
        if (this.fpsValues.length === 0) return 0;
        const sum = this.fpsValues.reduce((acc, val) => acc + val, 0);
        return Math.round(sum / this.fpsValues.length);
    }
}

// ========================================
// 测试代码
// ========================================

console.log('=== 性能监控统计算法测试 ===\n');

// 模拟性能数据（实际应用中由 Performance API 自动收集）
const monitor = new PerformanceMonitor();
monitor.metrics.fcp = [1200, 1350, 1100, 1500, 1280, 1420, 1190, 1600, 1300, 1250];
monitor.metrics.lcp = [2500, 2800, 2200, 3100, 2650, 2900, 2400, 3300, 2700, 2550];
monitor.metrics.fid = [50, 80, 30, 120, 60, 90, 40, 150, 70, 55];

// 生成报告
const report = monitor.generateReport();

console.log('📈 性能监控报告：\n');
for (const [metric, stats] of Object.entries(report)) {
    console.log(`${metric.toUpperCase()}:`);
    console.log(`  样本数: ${stats.samples}`);
    console.log(`  平均值: ${stats.avg}ms`);
    console.log(`  P50: ${stats.p50}ms`);
    console.log(`  P75: ${stats.p75}ms`);
    console.log(`  P90: ${stats.p90}ms`);
    console.log(`  P99: ${stats.p99}ms`);
    console.log(`  标准差: ${stats.stdDev}ms\n`);
}

// FPS 测试
console.log('🎮 FPS 监控测试：');
const fpsMonitor = new FPSMonitor();
fpsMonitor.fpsValues = [58, 60, 59, 61, 57, 60, 62, 59, 60, 58];
console.log(`平均 FPS: ${fpsMonitor.getAverageFPS()}\n`);

console.log('✅ 性能监控统计算法实现完成！');
