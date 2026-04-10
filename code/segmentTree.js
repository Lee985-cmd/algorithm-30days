/**
 * 线段树（Segment Tree）- 高效区间查询数据结构
 * 
 * 核心思想：
 * - 将数组分段存储在二叉树中
 * - 每个节点存储一个区间的聚合信息（和、最小值、最大值等）
 * - 支持高效的区间查询和单点/区间更新
 * 
 * 应用场景：
 * - 区间求和/最值查询
 * - 动态统计（频繁更新的场景）
 * - 范围查询优化
 * 
 * 为什么不用普通数组？
 * - 数组区间查询：O(n)
 * - 线段树区间查询：O(log n)
 * - 对于大量查询，性能提升巨大
 * 
 * 时间复杂度：
 * - 构建：O(n)
 * - 查询：O(log n)
 * - 更新：O(log n)
 */

class SegmentTree {
    /**
     * 初始化线段树
     * 
     * @param {Array} data - 原始数组
     * @param {Function} merge - 合并函数（默认求和）
     */
    constructor(data, merge = (a, b) => a + b) {
        this.data = [...data];
        this.merge = merge;
        this.n = data.length;
        
        // 线段树数组大小通常为4n（保证足够）
        this.tree = new Array(4 * this.n).fill(0);
        
        if (this.n > 0) {
            this._build(1, 0, this.n - 1);
        }
    }

    /**
     * 构建线段树（递归）
     * 
     * 算法流程：
     * 1. 如果是叶子节点，直接存储数据
     * 2. 否则，递归构建左右子树
     * 3. 当前节点的值 = 合并左右子树的值
     * 
     * @param {number} node - 当前节点索引（从1开始）
     * @param {number} start - 区间起始位置
     * @param {number} end - 区间结束位置
     */
    _build(node, start, end) {
        // 叶子节点
        if (start === end) {
            this.tree[node] = this.data[start];
            return;
        }

        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node;
        const rightChild = 2 * node + 1;

        // 递归构建左右子树
        this._build(leftChild, start, mid);
        this._build(rightChild, mid + 1, end);

        // 合并左右子树的值
        this.tree[node] = this.merge(this.tree[leftChild], this.tree[rightChild]);
    }

    /**
     * 区间查询
     * 
     * @param {number} left - 查询区间左边界
     * @param {number} right - 查询区间右边界
     * @returns {any} 区间的聚合值
     */
    query(left, right) {
        if (left < 0 || right >= this.n || left > right) {
            throw new Error('查询区间无效');
        }
        return this._query(1, 0, this.n - 1, left, right);
    }

    /**
     * 内部方法：递归查询
     * 
     * @param {number} node - 当前节点索引
     * @param {number} start - 当前节点区间起始
     * @param {number} end - 当前节点区间结束
     * @param {number} left - 查询区间左边界
     * @param {number} right - 查询区间右边界
     * @returns {any} 聚合值
     */
    _query(node, start, end, left, right) {
        // 完全包含：当前区间完全在查询区间内
        if (left <= start && end <= right) {
            return this.tree[node];
        }

        // 完全不重叠
        if (right < start || end < left) {
            // 返回单位元（对于加法是0，对于min是Infinity，对于max是-Infinity）
            return this._getIdentity();
        }

        // 部分重叠：递归查询左右子树
        const mid = Math.floor((start + end) / 2);
        const leftResult = this._query(2 * node, start, mid, left, right);
        const rightResult = this._query(2 * node + 1, mid + 1, end, left, right);

        return this.merge(leftResult, rightResult);
    }

    /**
     * 单点更新
     * 
     * @param {number} index - 要更新的索引
     * @param {any} value - 新值
     */
    update(index, value) {
        if (index < 0 || index >= this.n) {
            throw new Error('索引越界');
        }
        
        this.data[index] = value;
        this._update(1, 0, this.n - 1, index, value);
    }

    /**
     * 内部方法：递归更新
     * 
     * @param {number} node - 当前节点索引
     * @param {number} start - 当前节点区间起始
     * @param {number} end - 当前节点区间结束
     * @param {number} index - 要更新的索引
     * @param {any} value - 新值
     */
    _update(node, start, end, index, value) {
        // 叶子节点
        if (start === end) {
            this.tree[node] = value;
            return;
        }

        const mid = Math.floor((start + end) / 2);

        // 根据索引决定更新左子树还是右子树
        if (index <= mid) {
            this._update(2 * node, start, mid, index, value);
        } else {
            this._update(2 * node + 1, mid + 1, end, index, value);
        }

        // 更新当前节点的值
        this.tree[node] = this.merge(
            this.tree[2 * node],
            this.tree[2 * node + 1]
        );
    }

    /**
     * 获取单位元（用于不重叠区间的合并）
     * 
     * @returns {any} 单位元
     */
    _getIdentity() {
        // 对于不同的合并操作，单位元不同
        if (this.merge === ((a, b) => a + b)) {
            return 0; // 加法的单位元
        } else if (this.merge === Math.min) {
            return Infinity; // min的单位元
        } else if (this.merge === Math.max) {
            return -Infinity; // max的单位元
        }
        return null;
    }

    /**
     * 打印线段树（调试用）
     */
    print() {
        console.log('原始数组:', this.data);
        console.log('线段树数组:', this.tree.slice(1)); // 去掉索引0
    }
}

// ==================== 测试示例 ====================

console.log('===== 线段树测试 =====\n');

// 测试1：区间求和
console.log('测试1：区间求和');
const arr1 = [1, 3, 5, 7, 9, 11];
const sumTree = new SegmentTree(arr1, (a, b) => a + b);

console.log('数组:', arr1);
sumTree.print();
console.log();

console.log('查询 [0, 2] 的和:', sumTree.query(0, 2));  // 1+3+5=9
console.log('查询 [1, 4] 的和:', sumTree.query(1, 4));  // 3+5+7+9=24
console.log('查询 [0, 5] 的和:', sumTree.query(0, 5));  // 全部元素之和=36
console.log();

// 更新后查询
console.log('更新索引2的值为10');
sumTree.update(2, 10);
console.log('数组变为:', sumTree.data);
console.log('查询 [0, 2] 的和:', sumTree.query(0, 2));  // 1+3+10=14
console.log();

// 测试2：区间最小值
console.log('测试2：区间最小值');
const arr2 = [5, 2, 8, 1, 9, 3, 7];
const minTree = new SegmentTree(arr2, Math.min);

console.log('数组:', arr2);
console.log('查询 [0, 6] 的最小值:', minTree.query(0, 6));  // 1
console.log('查询 [2, 5] 的最小值:', minTree.query(2, 5));   // 1
console.log('查询 [0, 1] 的最小值:', minTree.query(0, 1));   // 2
console.log();

console.log('更新索引3的值为0');
minTree.update(3, 0);
console.log('数组变为:', minTree.data);
console.log('查询 [0, 6] 的最小值:', minTree.query(0, 6));  // 0
console.log();

// 测试3：区间最大值
console.log('测试3：区间最大值');
const arr3 = [5, 2, 8, 1, 9, 3, 7];
const maxTree = new SegmentTree(arr3, Math.max);

console.log('数组:', arr3);
console.log('查询 [0, 6] 的最大值:', maxTree.query(0, 6));  // 9
console.log('查询 [0, 2] 的最大值:', maxTree.query(0, 2));   // 8
console.log('查询 [3, 6] 的最大值:', maxTree.query(3, 6));   // 9
console.log();

// 测试4：实际应用 - 动态统计学生成绩
console.log('测试4：学生成绩管理系统');
const scores = [85, 92, 78, 95, 88, 76, 90, 82];
const scoreTree = new SegmentTree(scores, (a, b) => a + b);

console.log('初始成绩:', scores);
console.log('第1-4名学生的总分:', scoreTree.query(0, 3));  // 85+92+78+95=350
console.log('全班平均分:', (scoreTree.query(0, 7) / scores.length).toFixed(2));
console.log();

// 模拟成绩更新
console.log('第3名学生补考，成绩改为88');
scoreTree.update(2, 88);
console.log('更新后成绩:', scoreTree.data);
console.log('新的全班平均分:', (scoreTree.query(0, 7) / scores.length).toFixed(2));
console.log();

// 测试5：性能对比
console.log('测试5：性能对比（线段树 vs 普通数组）');
const largeArr = Array.from({ length: 10000 }, (_, i) => i + 1);
const segTree = new SegmentTree(largeArr, (a, b) => a + b);

// 线段树查询
const startTime1 = Date.now();
for (let i = 0; i < 10000; i++) {
    segTree.query(0, 9999);
}
const endTime1 = Date.now();

// 普通数组查询
const startTime2 = Date.now();
for (let i = 0; i < 10000; i++) {
    largeArr.reduce((sum, val) => sum + val, 0);
}
const endTime2 = Date.now();

console.log(`线段树10000次查询耗时: ${endTime1 - startTime1}ms`);
console.log(`普通数组10000次查询耗时: ${endTime2 - startTime2}ms`);
console.log(`线段树快约: ${((endTime2 - startTime2) / (endTime1 - startTime1)).toFixed(2)}倍`);
console.log();

// 测试6：复杂场景 - 股票价格区间分析
console.log('测试6：股票价格区间分析');
const stockPrices = [100, 105, 98, 110, 102, 108, 95, 112];
const priceTree = new SegmentTree(stockPrices, Math.max);

console.log('一周股票价格:', stockPrices);
console.log('第1-3天最高价:', priceTree.query(0, 2));   // 105
console.log('第4-7天最高价:', priceTree.query(3, 6));   // 110
console.log('整周最高价:', priceTree.query(0, 7));      // 112
console.log();

console.log('第5天价格上涨到115');
priceTree.update(4, 115);
console.log('更新后价格:', priceTree.data);
console.log('新的整周最高价:', priceTree.query(0, 7));  // 115
console.log();

// 测试7：边界情况
console.log('测试7：边界情况');
const singleTree = new SegmentTree([42]);
console.log('单元素数组:', singleTree.data);
console.log('查询 [0, 0]:', singleTree.query(0, 0));  // 42

singleTree.update(0, 100);
console.log('更新后:', singleTree.data);
console.log('查询 [0, 0]:', singleTree.query(0, 0));  // 100
console.log();

console.log('===== 线段树特点总结 =====');
console.log('✅ 区间查询效率高 O(log n)');
console.log('✅ 支持动态更新（单点/区间）');
console.log('✅ 灵活的合并操作（求和、最值等）');
console.log('⚠️  空间消耗较大 O(4n)');
console.log('⚠️  实现较复杂（递归逻辑）');
console.log('\n实际应用：');
console.log('- 实时数据统计（股票、气温等）');
console.log('- 游戏地图碰撞检测');
console.log('- 数据库范围查询优化');
console.log('- 图像处理中的区域统计');
console.log('- 竞赛编程中的区间问题');
