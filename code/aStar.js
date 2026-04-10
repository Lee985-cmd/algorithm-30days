/**
 * A*搜索算法 - 启发式寻路算法
 * 
 * 核心思想：
 * - 结合Dijkstra（保证最短）和贪心（快速接近目标）
 * - 使用估价函数 f(n) = g(n) + h(n)
 *   - g(n): 从起点到当前节点的实际代价
 *   - h(n): 从当前节点到终点的估计代价（启发函数）
 * 
 * 应用场景：
 * - 游戏AI寻路（最经典应用）
 * - 地图导航
 * - 机器人路径规划
 * 
 * 为什么比Dijkstra快？
 * - Dijkstra盲目扩展所有方向
 * - A*有"方向感"，优先朝目标探索
 * 
 * 时间复杂度：O(E log V)，但实际远优于Dijkstra
 */

class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    push(item, priority) {
        this.heap.push({ item, priority });
        this._bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._sinkDown(0);
        return min;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    _bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].priority <= this.heap[index].priority) break;
            
            [this.heap[parentIndex], this.heap[index]] = 
                [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    _sinkDown(index) {
        const length = this.heap.length;
        
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
                smallest = left;
            }
            if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[smallest], this.heap[index]] = 
                [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    }
}

class AStar {
    /**
     * 初始化A*算法
     * @param {number[][]} grid - 二维网格，0表示可通行，1表示障碍物
     */
    constructor(grid) {
        this.grid = grid;
        this.rows = grid.length;
        this.cols = grid[0].length;
    }

    /**
     * 计算曼哈顿距离（启发函数）
     * 适用于只能上下左右移动的网格
     * 
     * @param {Object} a - 点a {x, y}
     * @param {Object} b - 点b {x, y}
     * @returns {number} 曼哈顿距离
     */
    manhattanDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    /**
     * 计算欧几里得距离（启发函数）
     * 适用于可以斜向移动的场景
     * 
     * @param {Object} a - 点a {x, y}
     * @param {Object} b - 点b {x, y}
     * @returns {number} 欧几里得距离
     */
    euclideanDistance(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    /**
     * 获取邻居节点
     * 支持4方向移动（上、下、左、右）
     * 
     * @param {Object} node - 当前节点 {x, y}
     * @returns {Array} 邻居节点数组
     */
    getNeighbors(node) {
        const directions = [
            { x: 0, y: -1 },  // 上
            { x: 0, y: 1 },   // 下
            { x: -1, y: 0 },  // 左
            { x: 1, y: 0 }    // 右
        ];

        const neighbors = [];
        for (let dir of directions) {
            const newX = node.x + dir.x;
            const newY = node.y + dir.y;

            // 检查边界和障碍物
            if (newX >= 0 && newX < this.cols && 
                newY >= 0 && newY < this.rows && 
                this.grid[newY][newX] === 0) {
                neighbors.push({ x: newX, y: newY });
            }
        }

        return neighbors;
    }

    /**
     * A*搜索算法主函数
     * 
     * 算法流程：
     * 1. 初始化开放列表（待探索）和关闭列表（已探索）
     * 2. 将起点加入开放列表
     * 3. 循环：
     *    a. 从开放列表取出f值最小的节点
     *    b. 如果是终点，重建路径并返回
     *    c. 否则，探索其邻居
     *    d. 对每个邻居：
     *       - 计算g、h、f值
     *       - 如果更优，更新并加入开放列表
     * 4. 如果开放列表为空，说明无路径
     * 
     * @param {Object} start - 起点 {x, y}
     * @param {Object} end - 终点 {x, y}
     * @param {Function} heuristic - 启发函数（默认曼哈顿距离）
     * @returns {Object} { path: 路径数组, cost: 总代价, explored: 探索节点数 }
     */
    search(start, end, heuristic = this.manhattanDistance.bind(this)) {
        // 开放列表：待探索的节点
        const openSet = new PriorityQueue();
        // 关闭列表：已探索的节点（用字符串做key）
        const closedSet = new Set();
        
        // 记录每个节点的g值（从起点到该节点的实际代价）
        const gScore = {};
        // 记录每个节点的父节点（用于重建路径）
        const cameFrom = {};

        // 初始化起点
        const startKey = `${start.x},${start.y}`;
        gScore[startKey] = 0;
        
        // f = g + h
        const h = heuristic(start, end);
        openSet.push(start, h);

        let exploredCount = 0;

        while (!openSet.isEmpty()) {
            // 取出f值最小的节点
            const current = openSet.pop().item;
            const currentKey = `${current.x},${current.y}`;

            // 到达终点
            if (current.x === end.x && current.y === end.y) {
                return {
                    path: this.reconstructPath(cameFrom, current),
                    cost: gScore[currentKey],
                    explored: exploredCount
                };
            }

            // 标记为已探索
            closedSet.add(currentKey);
            exploredCount++;

            // 探索邻居
            const neighbors = this.getNeighbors(current);
            for (let neighbor of neighbors) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;

                // 跳过已探索的节点
                if (closedSet.has(neighborKey)) continue;

                // 计算 tentative g值（经过当前节点到邻居的代价）
                const tentativeG = gScore[currentKey] + 1; // 假设每步代价为1

                // 如果这个路径更好，或者邻居还没被访问过
                if (tentativeG < (gScore[neighborKey] || Infinity)) {
                    // 更新最优路径
                    cameFrom[neighborKey] = current;
                    gScore[neighborKey] = tentativeG;
                    
                    // 计算f值
                    const h = heuristic(neighbor, end);
                    const f = tentativeG + h;
                    
                    // 加入开放列表
                    openSet.push(neighbor, f);
                }
            }
        }

        // 无法到达终点
        return {
            path: null,
            cost: Infinity,
            explored: exploredCount
        };
    }

    /**
     * 重建路径
     * 从终点回溯到起点
     * 
     * @param {Object} cameFrom - 父节点映射
     * @param {Object} current - 当前节点（终点）
     * @returns {Array} 路径数组（从起点到终点）
     */
    reconstructPath(cameFrom, current) {
        const path = [current];
        let currentKey = `${current.x},${current.y}`;

        while (cameFrom[currentKey]) {
            current = cameFrom[currentKey];
            currentKey = `${current.x},${current.y}`;
            path.unshift(current);
        }

        return path;
    }

    /**
     * 可视化网格（调试用）
     * 
     * @param {Array} path - 路径数组
     * @returns {string} 可视化的网格字符串
     */
    visualize(path = null) {
        const display = this.grid.map(row => [...row]);

        if (path) {
            for (let node of path) {
                display[node.y][node.x] = '*'; // 路径用*标记
            }
            // 起点和终点特殊标记
            display[path[0].y][path[0].x] = 'S';
            display[path[path.length - 1].y][path[path.length - 1].x] = 'E';
        }

        return display.map(row => 
            row.map(cell => cell === 0 ? '.' : cell === 1 ? '#' : cell).join(' ')
        ).join('\n');
    }
}

// ==================== 测试示例 ====================

console.log('===== A*搜索算法测试 =====\n');

// 测试1：简单迷宫
console.log('测试1：简单迷宫寻路');
const grid1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
];

const astar1 = new AStar(grid1);
const result1 = astar1.search(
    { x: 0, y: 0 },  // 起点
    { x: 4, y: 4 }   // 终点
);

console.log('路径:', result1.path ? result1.path.map(p => `(${p.x},${p.y})`).join(' -> ') : '无路径');
console.log('代价:', result1.cost);
console.log('探索节点数:', result1.explored);
console.log('网格可视化:');
console.log(astar1.visualize(result1.path));
console.log();

// 测试2：复杂迷宫
console.log('测试2：复杂迷宫');
const grid2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const astar2 = new AStar(grid2);
const result2 = astar2.search(
    { x: 0, y: 0 },
    { x: 9, y: 8 }
);

console.log('路径:', result2.path ? result2.path.map(p => `(${p.x},${p.y})`).join(' -> ') : '无路径');
console.log('代价:', result2.cost);
console.log('探索节点数:', result2.explored);
console.log('网格可视化:');
console.log(astar2.visualize(result2.path));
console.log();

// 测试3：无解情况
console.log('测试3：无解情况（被障碍物包围）');
const grid3 = [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const astar3 = new AStar(grid3);
const result3 = astar3.search(
    { x: 0, y: 0 },
    { x: 4, y: 4 }
);

console.log('路径:', result3.path ? result3.path.map(p => `(${p.x},${p.y})`).join(' -> ') : '无路径');
console.log('代价:', result3.cost);
console.log('探索节点数:', result3.explored);
console.log();

// 测试4：性能对比（A* vs 广度优先搜索）
console.log('测试4：A*的效率优势');
const largeGrid = Array(50).fill(null).map(() => Array(50).fill(0));
// 添加一些随机障碍物
for (let i = 0; i < 100; i++) {
    const x = Math.floor(Math.random() * 50);
    const y = Math.floor(Math.random() * 50);
    largeGrid[y][x] = 1;
}

const astar4 = new AStar(largeGrid);
const result4 = astar4.search(
    { x: 0, y: 0 },
    { x: 49, y: 49 }
);

console.log(`在50x50网格中:`);
console.log(`- 探索节点数: ${result4.explored} / 2500`);
console.log(`- 探索比例: ${(result4.explored / 2500 * 100).toFixed(2)}%`);
console.log(`- 路径长度: ${result4.path ? result4.path.length : '无路径'}`);
console.log(`- A*只探索了必要区域，远少于BFS的全图搜索`);
console.log();

// 测试5：不同启发函数的影响
console.log('测试5：启发函数对比');
const grid5 = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
];

const astar5 = new AStar(grid5);

// 曼哈顿距离
const resultManhattan = astar5.search(
    { x: 0, y: 0 },
    { x: 4, y: 4 },
    astar5.manhattanDistance
);

// 欧几里得距离
const resultEuclidean = astar5.search(
    { x: 0, y: 0 },
    { x: 4, y: 4 },
    astar5.euclideanDistance
);

console.log('曼哈顿距离:');
console.log('- 探索节点数:', resultManhattan.explored);
console.log('- 路径长度:', resultManhattan.path.length);

console.log('\n欧几里得距离:');
console.log('- 探索节点数:', resultEuclidean.explored);
console.log('- 路径长度:', resultEuclidean.path.length);

console.log('\n结论：两种启发函数都能找到最优路径，但探索效率略有差异');
console.log('- 曼哈顿距离：适合4方向移动');
console.log('- 欧几里得距离：适合8方向移动');

console.log('\n===== A*算法特点总结 =====');
console.log('✅ 保证找到最短路径（如果存在）');
console.log('✅ 比Dijkstra快很多（有方向感）');
console.log('✅ 启发函数越准确，搜索越快');
console.log('⚠️  需要设计合适的启发函数');
console.log('⚠️  内存消耗较大（需要存储开放/关闭列表）');
console.log('\n实际应用：');
console.log('- 游戏AI寻路（魔兽、星际等RTS游戏）');
console.log('- GPS导航系统');
console.log('- 机器人路径规划');
console.log('- 网络路由优化');
