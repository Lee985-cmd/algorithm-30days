/**
 * B+树 - 数据库索引的核心数据结构
 * 
 * 核心思想：
 * - 多路平衡搜索树（一个节点可以有多个子节点）
 * - 所有数据都在叶子节点
 * - 叶子节点通过链表连接，支持范围查询
 * - 高度极低（通常3-4层），非常适合磁盘I/O优化
 * 
 * 为什么数据库用B+树不用红黑树？
 * 1. 磁盘I/O次数少：B+树高度通常3-4层，红黑树需要10+层
 * 2. 范围查询高效：叶子节点链表可以直接遍历
 * 3. 磁盘预读友好：节点大小匹配磁盘页大小
 * 4. 稳定性好：所有查询路径长度相同
 * 
 * B+树 vs B树：
 * - B树：数据存储在内部节点和叶子节点
 * - B+树：数据只存储在叶子节点，内部节点只存储索引
 * - B+树更适合数据库（范围查询更高效）
 * 
 * 时间复杂度：
 * - 插入：O(log n)
 * - 删除：O(log n)
 * - 查询：O(log n)
 * - 范围查询：O(log n + k)，k是结果数量
 */

class BPlusTreeNode {
    constructor(isLeaf = false) {
        this.isLeaf = isLeaf;
        this.keys = [];          // 存储键值
        this.children = [];      // 子节点指针（仅内部节点）
        this.next = null;        // 下一个叶子节点（仅叶子节点）
        this.values = [];        // 存储的值（仅叶子节点）
    }
}

class BPlusTree {
    /**
     * @param {number} order - 阶数，决定每个节点最多有多少个子节点
     *                         通常设置为100-1000（匹配磁盘页大小）
     */
    constructor(order = 4) {
        this.order = order;
        this.maxKeys = order - 1;      // 最大键数
        this.minKeys = Math.ceil(order / 2) - 1; // 最小键数
        this.root = new BPlusTreeNode(true);
    }

    /**
     * 搜索操作
     * 
     * @param {number} key - 要搜索的键
     * @returns {Array|null} 找到的值数组或null
     */
    search(key) {
        return this._search(this.root, key);
    }

    _search(node, key) {
        // 叶子节点：直接查找
        if (node.isLeaf) {
            const index = node.keys.indexOf(key);
            if (index !== -1) {
                return node.values[index];
            }
            return null;
        }

        // 内部节点：找到对应的子节点
        let i = 0;
        while (i < node.keys.length && key >= node.keys[i]) {
            i++;
        }
        
        return this._search(node.children[i], key);
    }

    /**
     * 范围查询
     * 
     * @param {number} startKey - 起始键
     * @param {number} endKey - 结束键
     * @returns {Array} 范围内的所有键值对
     */
    rangeQuery(startKey, endKey) {
        const result = [];
        
        // 找到起始键所在的叶子节点
        let leaf = this._findLeaf(this.root, startKey);
        
        // 从起始叶子节点开始，沿着链表遍历
        while (leaf) {
            for (let i = 0; i < leaf.keys.length; i++) {
                if (leaf.keys[i] >= startKey && leaf.keys[i] <= endKey) {
                    result.push({ key: leaf.keys[i], value: leaf.values[i] });
                } else if (leaf.keys[i] > endKey) {
                    return result;
                }
            }
            leaf = leaf.next;
        }
        
        return result;
    }

    /**
     * 找到包含指定键的叶子节点
     */
    _findLeaf(node, key) {
        if (node.isLeaf) {
            return node;
        }

        let i = 0;
        while (i < node.keys.length && key >= node.keys[i]) {
            i++;
        }

        return this._findLeaf(node.children[i], key);
    }

    /**
     * 插入操作
     * 
     * 算法流程：
     * 1. 找到合适的叶子节点
     * 2. 插入键值对
     * 3. 如果节点溢出，分裂节点
     * 4. 向上传播索引键
     */
    insert(key, value) {
        // 如果根节点满了，创建新的根
        if (this.root.keys.length === this.maxKeys) {
            const newRoot = new BPlusTreeNode(false);
            newRoot.children.push(this.root);
            this._splitChild(newRoot, 0);
            this.root = newRoot;
        }

        this._insertNonFull(this.root, key, value);
    }

    _insertNonFull(node, key, value) {
        // 叶子节点：直接插入
        if (node.isLeaf) {
            const index = this._findInsertIndex(node.keys, key);
            node.keys.splice(index, 0, key);
            node.values.splice(index, 0, value);
            return;
        }

        // 内部节点：找到对应的子节点
        let i = 0;
        while (i < node.keys.length && key >= node.keys[i]) {
            i++;
        }

        // 如果子节点满了，先分裂
        if (node.children[i].keys.length === this.maxKeys) {
            this._splitChild(node, i);
            
            // 分裂后，决定插入到哪个子节点
            if (key >= node.keys[i]) {
                i++;
            }
        }

        this._insertNonFull(node.children[i], key, value);
    }

    /**
     * 分裂子节点
     * 
     * @param {BPlusTreeNode} parent - 父节点
     * @param {number} index - 要分裂的子节点索引
     */
    _splitChild(parent, index) {
        const fullChild = parent.children[index];
        const newChild = new BPlusTreeNode(fullChild.isLeaf);

        const mid = Math.floor(this.maxKeys / 2);

        // 将后半部分键转移到新节点
        if (fullChild.isLeaf) {
            newChild.keys = fullChild.keys.splice(mid);
            newChild.values = fullChild.values.splice(mid);
            // 维护叶子节点链表
            newChild.next = fullChild.next;
            fullChild.next = newChild;
        } else {
            newChild.keys = fullChild.keys.splice(mid + 1);
            newChild.children = fullChild.children.splice(mid + 1);
        }

        // 将中间键提升到父节点
        const medianKey = fullChild.keys.pop();
        if (!fullChild.isLeaf) {
            fullChild.keys.push(medianKey);
        }

        // 在父节点中插入新键和新子节点
        const insertIndex = parent.keys.findIndex(k => k > medianKey);
        if (insertIndex === -1) {
            parent.keys.push(medianKey);
            parent.children.push(newChild);
        } else {
            parent.keys.splice(insertIndex, 0, medianKey);
            parent.children.splice(insertIndex + 1, 0, newChild);
        }
    }

    _findInsertIndex(keys, key) {
        let left = 0;
        let right = keys.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (keys[mid] < key) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }

    /**
     * 删除操作
     * 
     * 算法流程：
     * 1. 找到包含键的叶子节点
     * 2. 删除键值对
     * 3. 如果节点下溢，向兄弟节点借键或合并节点
     * 4. 向上传播修改
     */
    remove(key) {
        this._remove(this.root, key);

        // 如果根节点变成空节点（只有一个子节点且无键）
        if (this.root.keys.length === 0 && !this.root.isLeaf) {
            this.root = this.root.children[0];
        }
    }

    _remove(node, key) {
        // 叶子节点：直接删除
        if (node.isLeaf) {
            const index = node.keys.indexOf(key);
            if (index === -1) return false;
            
            node.keys.splice(index, 1);
            node.values.splice(index, 1);
            return true;
        }

        // 内部节点：找到对应的子节点
        let i = 0;
        while (i < node.keys.length && key >= node.keys[i]) {
            i++;
        }

        const removed = this._remove(node.children[i], key);

        // 如果子节点下溢，需要修复
        if (removed && node.children[i].keys.length < this.minKeys) {
            this._fixUnderflow(node, i);
        }

        return removed;
    }

    _fixUnderflow(parent, index) {
        const node = parent.children[index];

        // 尝试从左兄弟借键
        if (index > 0 && parent.children[index - 1].keys.length > this.minKeys) {
            this._borrowFromLeft(parent, index);
        }
        // 尝试从右兄弟借键
        else if (index < parent.children.length - 1 && 
                 parent.children[index + 1].keys.length > this.minKeys) {
            this._borrowFromRight(parent, index);
        }
        // 与兄弟节点合并
        else {
            if (index > 0) {
                this._mergeWithLeft(parent, index);
            } else {
                this._mergeWithRight(parent, index);
            }
        }
    }

    _borrowFromLeft(parent, index) {
        const node = parent.children[index];
        const leftSibling = parent.children[index - 1];

        if (node.isLeaf) {
            const lastKey = leftSibling.keys.pop();
            const lastValue = leftSibling.values.pop();
            node.keys.unshift(lastKey);
            node.values.unshift(lastValue);
            parent.keys[index - 1] = lastKey;
        } else {
            const lastKey = leftSibling.keys.pop();
            const lastChild = leftSibling.children.pop();
            
            node.keys.unshift(parent.keys[index - 1]);
            node.children.unshift(lastChild);
            parent.keys[index - 1] = lastKey;
        }
    }

    _borrowFromRight(parent, index) {
        const node = parent.children[index];
        const rightSibling = parent.children[index + 1];

        if (node.isLeaf) {
            const firstKey = rightSibling.keys.shift();
            const firstValue = rightSibling.values.shift();
            node.keys.push(firstKey);
            node.values.push(firstValue);
            parent.keys[index] = rightSibling.keys[0] || parent.keys[index];
        } else {
            const firstKey = rightSibling.keys.shift();
            const firstChild = rightSibling.children.shift();
            
            node.keys.push(parent.keys[index]);
            node.children.push(firstChild);
            parent.keys[index] = firstKey;
        }
    }

    _mergeWithLeft(parent, index) {
        const node = parent.children[index];
        const leftSibling = parent.children[index - 1];

        if (node.isLeaf) {
            leftSibling.keys = leftSibling.keys.concat(node.keys);
            leftSibling.values = leftSibling.values.concat(node.values);
            leftSibling.next = node.next;
        } else {
            leftSibling.keys.push(parent.keys[index - 1]);
            leftSibling.keys = leftSibling.keys.concat(node.keys);
            leftSibling.children = leftSibling.children.concat(node.children);
        }

        parent.keys.splice(index - 1, 1);
        parent.children.splice(index, 1);
    }

    _mergeWithRight(parent, index) {
        const node = parent.children[index];
        const rightSibling = parent.children[index + 1];

        if (node.isLeaf) {
            node.keys = node.keys.concat(rightSibling.keys);
            node.values = node.values.concat(rightSibling.values);
            node.next = rightSibling.next;
        } else {
            node.keys.push(parent.keys[index]);
            node.keys = node.keys.concat(rightSibling.keys);
            node.children = node.children.concat(rightSibling.children);
        }

        parent.keys.splice(index, 1);
        parent.children.splice(index + 1, 1);
    }

    /**
     * 中序遍历（获取所有键值对）
     */
    inorder() {
        const result = [];
        this._inorder(this.root, result);
        return result;
    }

    _inorder(node, result) {
        if (node.isLeaf) {
            for (let i = 0; i < node.keys.length; i++) {
                result.push({ key: node.keys[i], value: node.values[i] });
            }
        } else {
            for (let i = 0; i < node.keys.length; i++) {
                this._inorder(node.children[i], result);
                result.push({ key: node.keys[i], value: 'INTERNAL' });
            }
            this._inorder(node.children[node.keys.length], result);
        }
    }

    /**
     * 获取树的高度
     */
    getHeight() {
        let height = 0;
        let node = this.root;
        while (!node.isLeaf) {
            height++;
            node = node.children[0];
        }
        return height;
    }

    /**
     * 获取叶子节点数量
     */
    getLeafCount() {
        let count = 0;
        this._countLeaves(this.root, () => count++);
        return count;
    }

    _countLeaves(node, callback) {
        if (node.isLeaf) {
            callback();
        } else {
            for (let child of node.children) {
                this._countLeaves(child, callback);
            }
        }
    }

    /**
     * 打印树的结构（调试用）
     */
    print() {
        console.log('===== B+树结构 =====');
        console.log('阶数:', this.order);
        console.log('高度:', this.getHeight());
        console.log('叶子节点数:', this.getLeafCount());
        
        const allData = this.inorder();
        console.log('总键数:', allData.filter(d => d.value !== 'INTERNAL').length);
        
        this._printNode(this.root, 0);
        console.log('===================\n');
    }

    _printNode(node, level) {
        const indent = '  '.repeat(level);
        const type = node.isLeaf ? '[叶子]' : '[内部]';
        
        console.log(`${indent}${type} Keys: [${node.keys.join(', ')}]`);
        
        if (!node.isLeaf) {
            for (let child of node.children) {
                this._printNode(child, level + 1);
            }
        }
    }
}

// ==================== 测试示例 ====================

console.log('===== B+树测试 =====\n');

// 测试1：基本插入
console.log('测试1：基本插入操作');
const bpt = new BPlusTree(4); // 4阶B+树

const testData = [
    [10, 'User1'],
    [20, 'User2'],
    [30, 'User3'],
    [40, 'User4'],
    [50, 'User5'],
    [60, 'User6'],
    [70, 'User7'],
    [80, 'User8']
];

testData.forEach(([key, value]) => bpt.insert(key, value));
bpt.print();

// 测试2：搜索
console.log('测试2：搜索操作');
console.log('搜索键30:', bpt.search(30));  // User3
console.log('搜索键99:', bpt.search(99));  // null
console.log();

// 测试3：范围查询（B+树的核心优势）
console.log('测试3：范围查询（20到60）');
const rangeResult = bpt.rangeQuery(20, 60);
console.log('范围查询结果:');
rangeResult.forEach(item => {
    console.log(`  键: ${item.key}, 值: ${item.value}`);
});
console.log();

// 测试4：大量数据插入
console.log('测试4：大量数据插入（1000条）');
const bpt2 = new BPlusTree(100); // 使用更大的阶数（接近真实数据库）

for (let i = 0; i < 1000; i++) {
    bpt2.insert(i, `Value${i}`);
}

console.log('树的高度:', bpt2.getHeight());  // 应该很低（2-3层）
console.log('叶子节点数:', bpt2.getLeafCount());

// 验证范围查询效率
const startTime = Date.now();
const largeRange = bpt2.rangeQuery(100, 200);
const endTime = Date.now();

console.log(`范围查询100-200（101条记录）:`);
console.log(`耗时: ${endTime - startTime}ms`);
console.log(`返回记录数: ${largeRange.length}`);
console.log();

// 测试5：删除操作
console.log('测试5：删除操作');
const bpt3 = new BPlusTree(4);

for (let i = 1; i <= 10; i++) {
    bpt3.insert(i * 10, `Data${i}`);
}

console.log('删除前:');
bpt3.print();

bpt3.remove(30);
bpt3.remove(70);

console.log('删除键30和70后:');
bpt3.print();

// 验证删除
console.log('搜索键30:', bpt3.search(30));  // null
console.log('搜索键40:', bpt3.search(40));  // Data4
console.log();

// 测试6：与红黑树对比
console.log('测试6：B+树 vs 红黑树');
const bpt4 = new BPlusTree(100);

// 插入10000条数据
for (let i = 0; i < 10000; i++) {
    bpt4.insert(i, `Data${i}`);
}

console.log('B+树（10000条数据）:');
console.log('  树的高度:', bpt4.getHeight());  // 通常2-3层
console.log('  叶子节点数:', bpt4.getLeafCount());
console.log('  每个节点平均键数:', (10000 / bpt4.getLeafCount()).toFixed(2));
console.log();
console.log('如果是红黑树（10000条数据）:');
console.log('  树的高度: ~14层（log₂10000）');
console.log('  磁盘I/O次数: ~14次');
console.log();
console.log('如果是B+树（10000条数据）:');
console.log('  树的高度:', bpt4.getHeight(), '层');
console.log('  磁盘I/O次数:', bpt4.getHeight(), '次');
console.log('  I/O次数减少:', ((14 - bpt4.getHeight()) / 14 * 100).toFixed(0), '%');
console.log();

// 测试7：实际应用 - 数据库索引模拟
console.log('测试7：模拟数据库索引');

class DatabaseIndex {
    constructor() {
        this.primaryIndex = new BPlusTree(100); // 主键索引
        this.table = new Map(); // 实际数据存储
    }

    insertRecord(id, record) {
        this.primaryIndex.insert(id, id); // 索引只存储ID
        this.table.set(id, record); // 数据存储在表里
    }

    queryById(id) {
        const indexResult = this.primaryIndex.search(id);
        if (indexResult !== null) {
            return this.table.get(id);
        }
        return null;
    }

    queryByRange(startId, endId) {
        const indexResults = this.primaryIndex.rangeQuery(startId, endId);
        return indexResults.map(item => this.table.get(item.key));
    }

    deleteRecord(id) {
        this.primaryIndex.remove(id);
        this.table.delete(id);
    }

    getRecordCount() {
        return this.table.size;
    }
}

// 模拟数据库操作
const db = new DatabaseIndex();

// 插入用户记录
const users = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 5, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 10, name: 'Charlie', age: 35, email: 'charlie@example.com' },
    { id: 15, name: 'David', age: 28, email: 'david@example.com' },
    { id: 20, name: 'Eve', age: 32, email: 'eve@example.com' },
    { id: 25, name: 'Frank', age: 40, email: 'frank@example.com' }
];

users.forEach(user => db.insertRecord(user.id, user));

console.log('插入6条用户记录');
console.log('记录总数:', db.getRecordCount());
console.log();

// 主键查询（O(log n)）
console.log('查询ID=10的用户:');
console.log(db.queryById(10));
console.log();

// 范围查询（B+树的核心优势）
console.log('查询ID在5到20之间的用户:');
const rangeUsers = db.queryByRange(5, 20);
rangeUsers.forEach(user => {
    console.log(`  ${user.name}, ${user.age}岁, ${user.email}`);
});
console.log();

// 删除记录
console.log('删除ID=15的用户');
db.deleteRecord(15);
console.log('删除后查询ID=15:', db.queryById(15));  // null
console.log('剩余记录数:', db.getRecordCount());
console.log();

console.log('===== B+树特点总结 =====');
console.log('✅ 高度低（通常3-4层），磁盘I/O次数少');
console.log('✅ 范围查询高效（叶子节点链表）');
console.log('✅ 数据集中在叶子节点，缓存友好');
console.log('✅ 所有查询路径长度相同，性能稳定');
console.log('⚠️  实现复杂');
console.log('⚠️  需要处理分裂、合并、借键等操作');
console.log('\n实际应用：');
console.log('- MySQL InnoDB：聚簇索引');
console.log('- PostgreSQL：B-tree索引');
console.log('- Oracle：B*树索引');
console.log('- MongoDB：B-tree索引');
console.log('- 文件系统：目录索引');
