/**
 * 防抖（Debounce）和节流（Throttle）算法实现
 * 核心思想：时间窗口控制 + 闭包状态管理
 */

// ========================================
// 1. 防抖（Debounce）
// 场景：搜索框输入、窗口 resize
// 特点：在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
// ========================================

function debounce(func, wait, immediate = false) {
    let timeout = null;
    
    return function(...args) {
        const context = this;
        
        // 如果已经有定时器，清除它（重新开始计时）
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        
        // 立即执行模式（第一次触发就执行）
        if (immediate && !timeout) {
            func.apply(context, args);
        }
        
        // 设置新的定时器
        timeout = setTimeout(() => {
            timeout = null; // 重置定时器引用
            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);
    };
}

// ========================================
// 2. 节流（Throttle）
// 场景：滚动事件、鼠标移动、按钮点击
// 特点：在 n 秒内多次触发，只执行一次
// ========================================

// 2.1 时间戳版本（第一次立即执行）
function throttleTimestamp(func, wait) {
    let previous = 0;
    
    return function(...args) {
        const context = this;
        const now = Date.now();
        
        // 如果距离上次执行超过了 wait 时间，就执行
        if (now - previous > wait) {
            previous = now;
            func.apply(context, args);
        }
    };
}

// 2.2 定时器版本（最后一次执行）
function throttleTimer(func, wait) {
    let timeout = null;
    
    return function(...args) {
        const context = this;
        
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null; // 执行完毕后重置
                func.apply(context, args);
            }, wait);
        }
    };
}

// 2.3 综合版本（时间戳 + 定时器，首次和末尾都执行）
function throttle(func, wait, options = {}) {
    let previous = 0;
    let timeout = null;
    const { leading = true, trailing = true } = options;
    
    return function(...args) {
        const context = this;
        const now = Date.now();
        
        // 处理首次执行
        if (!previous && !leading) {
            previous = now;
        }
        
        const remaining = wait - (now - previous);
        
        // 如果超过了 wait 时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } 
        // 如果还没到执行时间，设置定时器（处理最后一次）
        else if (!timeout && trailing) {
            timeout = setTimeout(() => {
                previous = leading ? Date.now() : 0;
                timeout = null;
                func.apply(context, args);
            }, remaining);
        }
    };
}

// ========================================
// 测试代码
// ========================================

// 测试防抖
console.log('=== 防抖测试 ===');
const debouncedSearch = debounce((query) => {
    console.log(`🔍 搜索: ${query}`);
}, 500);

// 模拟用户快速输入
console.log('输入 "a"');
debouncedSearch('a');
console.log('输入 "ab"（100ms 后）');
setTimeout(() => debouncedSearch('ab'), 100);
console.log('输入 "abc"（200ms 后）');
setTimeout(() => debouncedSearch('abc'), 200);
console.log('（500ms 后只会执行最后一次）\n');

// 测试节流
console.log('=== 节流测试 ===');
const throttledScroll = throttleTimestamp(() => {
    console.log(`📜 滚动事件触发: ${new Date().toLocaleTimeString()}`);
}, 1000);

// 模拟快速滚动
for (let i = 0; i < 10; i++) {
    setTimeout(() => throttledScroll(), i * 100);
}
console.log('（1 秒内只会执行 1 次）\n');

console.log('✅ 防抖和节流算法实现完成！');
