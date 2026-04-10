/**
 * 并查集（Union-Find）- 高效处理不相交集合的合并与查询
 * 
 * 核心思想：
 * - 用树形结构表示集合
 * - 每个集合有一个代表元素（根节点）
 * - 支持两种操作：
 *   1. Find: 查找元素所属集合的代表
 *   2. Union: 合并两个集合
 * 
 * 优化技巧：
 * - 路径压缩：查找时让节点直接指向根
 * - 按秩合并：小树合并到大树下，保持平衡
 * 
 * 应用场景：
 * - 连通分量检测（社交网络、电路连接）
 * - Kruskal最小生成树算法
 * - 动态连通性问题
 * - 图像分割
 * 
 * 时间复杂度：
 * - 接近 O(1)（阿克曼函数的反函数， practically constant）
 */

class UnionFind {
    /**
     * 初始化并查集
     * 
     * @param {number} size - 元素数量
     */
    constructor(size) {
        // parent[i] 表示元素i的父节点
        this.parent = Array.from({ length: size }, (_, i) => i);
        // rank[i] 表示以i为根的树的高度（秩）
        this.rank = new Array(size).fill(0);
        // 集合数量
        this.count = size;
    }

    /**
     * 查找元素的根节点（带路径压缩）
     * 
     * 算法流程：
     * 1. 如果元素是根节点，返回自己
     * 2. 否则，递归查找父节点的根
     * 3. 路径压缩：让当前节点直接指向根
     * 
     * @param {number} x - 要查找的元素
     * @returns {number} 根节点
     */
    find(x) {
        if (this.parent[x] !== x) {
            // 路径压缩：让x直接指向根节点
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    /**
     * 合并两个元素所在的集合（按秩合并）
     * 
     * 算法流程：
     * 1. 找到两个元素的根节点
     * 2. 如果已经在同一集合，无需合并
     * 3. 否则，将矮树合并到高树下
     * 4. 如果高度相同，任选一个作为根，高度+1
     * 
     * @param {number} x - 元素x
     * @param {number} y - 元素y
     * @returns {boolean} 是否成功合并
     */
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        // 已经在同一集合
        if (rootX === rootY) {
            return false;
        }

        // 按秩合并：矮树合并到高树下
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            // 高度相同，任选一个作为根
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }

        this.count--;
        return true;
    }

    /**
     * 判断两个元素是否在同一集合
     * 
     * @param {number} x - 元素x
     * @param {number} y - 元素y
     * @returns {boolean} 是否连通
     */
    connected(x, y) {
        return this.find(x) === this.find(y);
    }

    /**
     * 获取集合数量
     * 
     * @returns {number} 集合数量
     */
    getCount() {
        return this.count;
    }

    /**
     * 获取某个集合的大小
     * 
     * @param {number} x - 集合中的任意元素
     * @returns {number} 集合大小
     */
    getSize(x) {
        const root = this.find(x);
        let size = 0;
        for (let i = 0; i < this.parent.length; i++) {
            if (this.find(i) === root) {
                size++;
            }
        }
        return size;
    }
}

// ==================== 测试示例 ====================

console.log('===== 并查集测试 =====\n');

// 测试1：基本操作
console.log('测试1：基本合并和查询');
const uf1 = new UnionFind(10);

console.log('初始状态：10个独立元素');
console.log('集合数量:', uf1.getCount());

uf1.union(0, 1);
uf1.union(2, 3);
uf1.union(0, 2);

console.log('\n合并 (0,1), (2,3), (0,2) 后:');
console.log('集合数量:', uf1.getCount());
console.log('0和1是否连通:', uf1.connected(0, 1));  // true
console.log('0和3是否连通:', uf1.connected(0, 3));  // true
console.log('0和5是否连通:', uf1.connected(0, 5));  // false
console.log();

// 测试2：社交网络好友关系
console.log('测试2：社交网络好友关系');
const socialUF = new UnionFind(8);

// 模拟好友关系
socialUF.union(0, 1);  // Alice和Bob是好友
socialUF.union(1, 2);  // Bob和Charlie是好友
socialUF.union(3, 4);  // David和Eve是好友
socialUF.union(5, 6);  // Frank和Grace是好友
socialUF.union(6, 7);  // Grace和Henry是好友

console.log('用户: Alice(0), Bob(1), Charlie(2), David(3), Eve(4), Frank(5), Grace(6), Henry(7)');
console.log('好友关系建立完成\n');

console.log('Alice和Charlie是否间接认识:', socialUF.connected(0, 2));  // true
console.log('Alice和David是否认识:', socialUF.connected(0, 3));       // false
console.log('Frank和Henry是否间接认识:', socialUF.connected(5, 7));   // true

console.log('\n社交圈数量:', socialUF.getCount());
console.log('Alice的社交圈大小:', socialUF.getSize(0));  // 3人
console.log('Frank的社交圈大小:', socialUF.getSize(5));  // 3人
console.log();

// 测试3：岛屿数量问题（LeetCode 200）
console.log('测试3：岛屿数量问题');
function countIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    const uf = new UnionFind(rows * cols);
    let waterCount = 0;

    // 方向数组：上下左右
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '0') {
                waterCount++;
                continue;
            }

            // 检查四个方向
            for (let [dx, dy] of directions) {
                const ni = i + dx;
                const nj = j + dy;

                if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj] === '1') {
                    uf.union(i * cols + j, ni * cols + nj);
                }
            }
        }
    }

    return uf.getCount() - waterCount;
}

const grid1 = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
];

console.log('网格:');
grid1.forEach(row => console.log(row.join(' ')));
console.log('岛屿数量:', countIslands(grid1));  // 3
console.log();

// 测试4：Kruskal最小生成树中的应用
console.log('测试4：Kruskal算法中的并查集应用');
function kruskalMST(edges, numVertices) {
    // 按权重排序
    edges.sort((a, b) => a.weight - b.weight);

    const uf = new UnionFind(numVertices);
    const mstEdges = [];
    let totalWeight = 0;

    for (let edge of edges) {
        // 如果两个顶点不在同一集合，加入MST
        if (uf.union(edge.from, edge.to)) {
            mstEdges.push(edge);
            totalWeight += edge.weight;

            // MST有n-1条边时停止
            if (mstEdges.length === numVertices - 1) break;
        }
    }

    return { mstEdges, totalWeight };
}

const edges = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 3 },
    { from: 1, to: 2, weight: 1 },
    { from: 1, to: 3, weight: 2 },
    { from: 2, to: 3, weight: 4 },
    { from: 3, to: 4, weight: 2 }
];

const result = kruskalMST(edges, 5);
console.log('图的边:', edges.map(e => `(${e.from}-${e.to}, w=${e.weight})`).join(', '));
console.log('最小生成树的边:', result.mstEdges.map(e => `(${e.from}-${e.to}, w=${e.weight})`).join(', '));
console.log('总权重:', result.totalWeight);
console.log();

// 测试5：动态连通性
console.log('测试5：动态连通性问题');
const dynamicUF = new UnionFind(6);

console.log('初始状态:');
for (let i = 0; i < 6; i++) {
    console.log(`  元素${i}的根: ${dynamicUF.find(i)}`);
}

console.log('\n逐步合并:');
const operations = [[0, 1], [2, 3], [4, 5], [1, 3]];
operations.forEach(([x, y]) => {
    dynamicUF.union(x, y);
    console.log(`合并(${x}, ${y})后，集合数量: ${dynamicUF.getCount()}`);
});

console.log('\n最终状态:');
for (let i = 0; i < 6; i++) {
    console.log(`  元素${i}的根: ${dynamicUF.find(i)}`);
}
console.log();

// 测试6：性能测试
console.log('测试6：性能测试（路径压缩效果）');
const perfUF = new UnionFind(10000);

// 构建一条链
for (let i = 0; i < 9999; i++) {
    perfUF.union(i, i + 1);
}

console.log('构建了10000个元素的链式结构');

// 第一次查找（会触发路径压缩）
const startTime1 = Date.now();
for (let i = 0; i < 10000; i++) {
    perfUF.find(i);
}
const endTime1 = Date.now();

console.log(`第一次查找10000次耗时: ${endTime1 - startTime1}ms`);

// 第二次查找（路径已压缩，更快）
const startTime2 = Date.now();
for (let i = 0; i < 10000; i++) {
    perfUF.find(i);
}
const endTime2 = Date.now();

console.log(`第二次查找10000次耗时: ${endTime2 - startTime2}ms`);
console.log(`路径压缩后速度提升: ${((endTime1 - startTime1) / (endTime2 - startTime2)).toFixed(2)}倍`);
console.log();

// 测试7：实际应用 - 电路板连通性检测
console.log('测试7：电路板连通性检测');
const circuitUF = new UnionFind(12);

// 模拟电路板上的连接
const connections = [
    [0, 1], [1, 2], [2, 3],  // 第一条线路
    [4, 5], [5, 6],          // 第二条线路
    [7, 8], [8, 9], [9, 10], [10, 11]  // 第三条线路
];

connections.forEach(([a, b]) => circuitUF.union(a, b));

console.log('电路板连接完成');
console.log('独立线路数量:', circuitUF.getCount());
console.log('节点0和节点3是否连通:', circuitUF.connected(0, 3));  // true
console.log('节点0和节点4是否连通:', circuitUF.connected(0, 4));  // false
console.log('节点7和节点11是否连通:', circuitUF.connected(7, 11)); // true
console.log();

console.log('===== 并查集特点总结 =====');
console.log('✅ 合并和查询效率极高（接近O(1)）');
console.log('✅ 实现简洁，代码量少');
console.log('✅ 适合动态连通性问题');
console.log('⚠️  只能处理不相交集合');
console.log('⚠️  不支持删除操作');
console.log('\n实际应用：');
console.log('- 社交网络好友关系分析');
console.log('- 图像处理中的连通区域标记');
console.log('- Kruskal最小生成树算法');
console.log('- 电路板连通性检测');
console.log('- 游戏中的阵营系统');
console.log('- 编译器中的等价类分析');
