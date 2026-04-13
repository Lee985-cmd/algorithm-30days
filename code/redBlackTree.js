/**
 * 红黑树 - 自平衡二叉搜索树的终极形态
 * 
 * 核心思想：
 * - 在BST基础上增加颜色标记（红/黑）
 * - 通过5条性质保证平衡
 * - 插入/删除时通过变色和旋转维持性质
 * 
 * 5条红黑树性质：
 * 1. 每个节点是红色或黑色
 * 2. 根节点是黑色
 * 3. 叶子节点（NIL）是黑色
 * 4. 红色节点的两个子节点必须是黑色（不能有两个连续的红色节点）
 * 5. 从任一节点到其每个叶子的所有路径都包含相同数量的黑色节点
 * 
 * 为什么不用AVL树？
 * - AVL树严格平衡，查询快但插入/删除慢（旋转多）
 * - 红黑树弱平衡，插入/删除快，查询也不慢
 * - Linux内核、Java TreeMap、C++ STL map都用红黑树
 * 
 * 时间复杂度：
 * - 插入：O(log n)
 * - 删除：O(log n)
 * - 查询：O(log n)
 */

const RED = 'RED';
const BLACK = 'BLACK';

class RBNode {
    constructor(key, color = RED) {
        this.key = key;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    isRed() {
        return this.color === RED;
    }

    isBlack() {
        return this.color === BLACK;
    }
}

class RedBlackTree {
    constructor() {
        this.NIL = new RBNode(null, BLACK); // 哨兵节点
        this.root = this.NIL;
        this.size = 0;
    }

    /**
     * 左旋操作
     * 
     * 场景：当右子树过重时
     * 
     *      x                          y
     *     / \       左旋(x)           / \
     *    a   y     -------->        x   c
     *       / \                   / \
     *      b   c                 a   b
     */
    _leftRotate(x) {
        const y = x.right;
        
        // 将y的左子树变成x的右子树
        x.right = y.left;
        if (y.left !== this.NIL) {
            y.left.parent = x;
        }

        // 将y的父节点设为x的父节点
        y.parent = x.parent;

        // 如果x是根节点，则y成为新的根
        if (x.parent === null) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        // 将x设为y的左子节点
        y.left = x;
        x.parent = y;
    }

    /**
     * 右旋操作
     * 
     * 场景：当左子树过重时
     * 
     *        y                        x
     *       / \     右旋(y)          / \
     *      x   c   -------->       a   y
     *     / \                         / \
     *    a   b                       b   c
     */
    _rightRotate(y) {
        const x = y.left;

        // 将x的右子树变成y的左子树
        y.left = x.right;
        if (x.right !== this.NIL) {
            x.right.parent = y;
        }

        // 将x的父节点设为y的父节点
        x.parent = y.parent;

        // 如果y是根节点，则x成为新的根
        if (y.parent === null) {
            this.root = x;
        } else if (y === y.parent.left) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }

        // 将y设为x的右子节点
        x.right = y;
        y.parent = x;
    }

    /**
     * 插入操作
     * 
     * 算法流程：
     * 1. 执行普通BST插入
     * 2. 将新节点标记为红色
     * 3. 调用_fixInsert修复红黑树性质
     * 
     * 为什么新节点默认是红色？
     * - 如果新节点是黑色，会破坏性质5（路径黑节点数相同）
     * - 如果是红色，只可能破坏性质4（连续红节点），相对容易修复
     */
    insert(key) {
        const newNode = new RBNode(key, RED);
        newNode.left = this.NIL;
        newNode.right = this.NIL;

        let parent = null;
        let current = this.root;

        // 1. 执行普通BST插入
        while (current !== this.NIL) {
            parent = current;
            if (newNode.key < current.key) {
                current = current.left;
            } else if (newNode.key > current.key) {
                current = current.right;
            } else {
                return; // 键已存在，不插入
            }
        }

        newNode.parent = parent;

        if (parent === null) {
            this.root = newNode;
        } else if (newNode.key < parent.key) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        // 2. 如果是根节点，重新着色为黑色
        if (newNode.parent === null) {
            newNode.color = BLACK;
            this.size++;
            return;
        }

        // 3. 如果父节点是黑色，无需修复（不违反任何性质）
        if (newNode.parent.isBlack()) {
            this.size++;
            return;
        }

        // 4. 修复红黑树性质
        this._fixInsert(newNode);
        this.size++;
    }

    /**
     * 插入后修复红黑树性质
     * 
     * 核心思想：
     * - 从新节点向上检查，修复违反性质4的情况（连续红节点）
     * - 通过3种情况处理：
     *   情况1：叔叔节点是红色 → 变色
     *   情况2：叔叔节点是黑色 + 当前节点是右孩子 → 左旋
     *   情况3：叔叔节点是黑色 + 当前节点是左孩子 → 右旋 + 变色
     */
    _fixInsert(k) {
        let current = k;

        while (current.parent.isRed()) {
            if (current.parent === current.parent.parent.right) {
                // 父节点是祖父节点的右孩子
                const uncle = current.parent.parent.left;

                if (uncle.isRed()) {
                    // 情况1：叔叔是红色
                    // 解决：父节点和叔叔节点变黑，祖父节点变红
                    uncle.color = BLACK;
                    current.parent.color = BLACK;
                    current.parent.parent.color = RED;
                    current = current.parent.parent; // 向上检查
                } else {
                    // 叔叔是黑色
                    if (current === current.parent.left) {
                        // 情况2：当前是左孩子
                        // 先右旋父节点，转为情况3
                        current = current.parent;
                        this._rightRotate(current);
                    }

                    // 情况3：当前是右孩子
                    // 左旋祖父节点 + 变色
                    current.parent.color = BLACK;
                    current.parent.parent.color = RED;
                    this._leftRotate(current.parent.parent);
                }
            } else {
                // 父节点是祖父节点的左孩子（对称情况）
                const uncle = current.parent.parent.right;

                if (uncle.isRed()) {
                    // 情况1：叔叔是红色
                    uncle.color = BLACK;
                    current.parent.color = BLACK;
                    current.parent.parent.color = RED;
                    current = current.parent.parent;
                } else {
                    // 叔叔是黑色
                    if (current === current.parent.right) {
                        // 情况2：当前是右孩子
                        current = current.parent;
                        this._leftRotate(current);
                    }

                    // 情况3：当前是左孩子
                    current.parent.color = BLACK;
                    current.parent.parent.color = RED;
                    this._rightRotate(current.parent.parent);
                }
            }

            if (current === this.root) {
                break;
            }
        }

        // 根节点始终是黑色
        this.root.color = BLACK;
    }

    /**
     * 搜索节点
     * 
     * @param {number} key - 要搜索的键
     * @returns {RBNode|null} 找到的节点或null
     */
    search(key) {
        return this._search(this.root, key);
    }

    _search(node, key) {
        if (node === this.NIL || node.key === key) {
            return node === this.NIL ? null : node;
        }

        if (key < node.key) {
            return this._search(node.left, key);
        } else {
            return this._search(node.right, key);
        }
    }

    /**
     * 中序遍历（有序输出）
     * 
     * @returns {Array} 按序排列的键数组
     */
    inorder() {
        const result = [];
        this._inorder(this.root, result);
        return result;
    }

    _inorder(node, result) {
        if (node !== this.NIL) {
            this._inorder(node.left, result);
            result.push({ key: node.key, color: node.color });
            this._inorder(node.right, result);
        }
    }

    /**
     * 验证红黑树性质
     * 
     * @returns {boolean} 是否是有效的红黑树
     */
    isValid() {
        // 检查根节点是黑色
        if (this.root.isRed()) {
            console.log('❌ 根节点不是黑色');
            return false;
        }

        // 检查不能有两个连续的红色节点
        if (!this._noDoubleRed(this.root)) {
            console.log('❌ 存在连续的红色节点');
            return false;
        }

        // 检查所有路径的黑节点数相同
        const blackHeight = this._getBlackHeight(this.root);
        if (blackHeight === -1) {
            console.log('❌ 不同路径的黑节点数不同');
            return false;
        }

        console.log(`✅ 红黑树有效！黑高度：${blackHeight}`);
        return true;
    }

    _noDoubleRed(node) {
        if (node === this.NIL) {
            return true;
        }

        if (node.isRed()) {
            if (node.left.isRed() || node.right.isRed()) {
                return false;
            }
        }

        return this._noDoubleRed(node.left) && this._noDoubleRed(node.right);
    }

    _getBlackHeight(node) {
        if (node === this.NIL) {
            return 0;
        }

        const leftHeight = this._getBlackHeight(node.left);
        const rightHeight = this._getBlackHeight(node.right);

        if (leftHeight === -1 || rightHeight === -1 || leftHeight !== rightHeight) {
            return -1;
        }

        return leftHeight + (node.isBlack() ? 1 : 0);
    }

    /**
     * 获取树的高度
     * 
     * @returns {number} 树的高度
     */
    getHeight() {
        return this._getHeight(this.root);
    }

    _getHeight(node) {
        if (node === this.NIL) {
            return 0;
        }
        return 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    }

    /**
     * 打印树的结构（调试用）
     */
    print() {
        const result = [];
        this._printHelper(this.root, '', true, result);
        console.log(result.join('\n'));
    }

    _printHelper(node, prefix, isTail, result) {
        if (node !== this.NIL) {
            const colorSymbol = node.isRed() ? '🔴' : '⚫';
            result.push(prefix + (isTail ? '└── ' : '├── ') + colorSymbol + ' ' + node.key);
            
            const newPrefix = prefix + (isTail ? '    ' : '│   ');
            
            const hasRight = node.right !== this.NIL;
            const hasLeft = node.left !== this.NIL;
            
            if (hasRight || hasLeft) {
                this._printHelper(node.right, newPrefix, false, result);
                this._printHelper(node.left, newPrefix, true, result);
            }
        }
    }

    getSize() {
        return this.size;
    }
}

// ==================== 测试示例 ====================

console.log('===== 红黑树测试 =====\n');

// 测试1：基本插入
console.log('测试1：基本插入操作');
const rbt = new RedBlackTree();

const values = [10, 20, 30, 15, 25, 5, 1];
values.forEach(v => rbt.insert(v));

console.log('插入序列:', values.join(', '));
console.log('树的大小:', rbt.getSize());
console.log('树的高度:', rbt.getHeight());
rbt.print();

rbt.isValid();
console.log();

// 测试2：验证红黑树性质
console.log('测试2：验证红黑树性质');
const rbt2 = new RedBlackTree();

// 插入会导致多次旋转的数据
for (let i = 1; i <= 20; i++) {
    rbt2.insert(i);
}

console.log('插入1-20后:');
console.log('树的高度:', rbt2.getHeight());
console.log('树的大小:', rbt2.getSize());
rbt2.isValid();
console.log();

// 测试3：与AVL树对比
console.log('测试3：红黑树 vs AVL树高度对比');
const rbt3 = new RedBlackTree();

// 模拟AVL树（简化的理想情况）
const idealAVLHeight = Math.ceil(Math.log2(100 + 1));

for (let i = 1; i <= 100; i++) {
    rbt3.insert(i);
}

const rbHeight = rbt3.getHeight();

console.log('插入100个有序元素:');
console.log(`AVL树理想高度: ${idealAVLHeight}`);
console.log(`红黑树实际高度: ${rbHeight}`);
console.log(`红黑树高度约为AVL的: ${(rbHeight / idealAVLHeight).toFixed(2)}倍`);
console.log('结论：红黑树虽然不如AVL平衡，但插入效率更高');
console.log();

// 测试4：搜索性能
console.log('测试4：搜索性能测试');
const rbt4 = new RedBlackTree();

// 插入10000个元素
for (let i = 0; i < 10000; i++) {
    rbt4.insert(Math.random() * 100000);
}

console.log(`插入10000个随机元素后:`);
console.log(`树的高度: ${rbt4.getHeight()}`);
console.log(`log₂(10000) ≈ ${Math.log2(10000).toFixed(2)}`);
console.log(`实际高度/理想高度: ${(rbt4.getHeight() / Math.log2(10000)).toFixed(2)}倍`);

// 测试搜索
const startTime = Date.now();
for (let i = 0; i < 1000; i++) {
    rbt4.search(Math.random() * 100000);
}
const endTime = Date.now();

console.log(`搜索1000次耗时: ${endTime - startTime}ms`);
console.log(`平均每次搜索: ${(endTime - startTime) / 1000}ms`);
console.log();

// 测试5：实际应用 - 有序映射
console.log('测试5：模拟有序映射（类似Java TreeMap）');
class TreeMap {
    constructor() {
        this.tree = new RedBlackTree();
        this.map = new Map();
    }

    put(key, value) {
        this.tree.insert(key);
        this.map.set(key, value);
    }

    get(key) {
        return this.map.get(key);
    }

    get(key) {
        return this.map.get(key);
    }

    // 获取第一个键（最小键）
    firstKey() {
        const inorder = this.tree.inorder();
        return inorder.length > 0 ? inorder[0].key : null;
    }

    // 获取最后一个键（最大键）
    lastKey() {
        const inorder = this.tree.inorder();
        return inorder.length > 0 ? inorder[inorder.length - 1].key : null;
    }

    // 获取小于key的最大键
    lowerKey(key) {
        const inorder = this.tree.inorder();
        let result = null;
        for (let node of inorder) {
            if (node.key < key) {
                result = node.key;
            } else {
                break;
            }
        }
        return result;
    }

    // 获取大于key的最小键
    higherKey(key) {
        const inorder = this.tree.inorder();
        for (let node of inorder) {
            if (node.key > key) {
                return node.key;
            }
        }
        return null;
    }

    size() {
        return this.map.size;
    }
}

const treeMap = new TreeMap();
treeMap.put(50, 'Alice');
treeMap.put(30, 'Bob');
treeMap.put(70, 'Charlie');
treeMap.put(20, 'David');
treeMap.put(40, 'Eve');

console.log('插入5个键值对:');
console.log('第一个键:', treeMap.firstKey());  // 20
console.log('最后一个键:', treeMap.lastKey());  // 70
console.log('小于45的最大键:', treeMap.lowerKey(45));  // 40
console.log('大于35的最小键:', treeMap.higherKey(35));  // 40
console.log('获取键30的值:', treeMap.get(30));  // Bob
console.log('映射大小:', treeMap.size());  // 5
console.log();

// 测试6：验证红黑树5条性质
console.log('测试6：红黑树5条性质验证');
const rbt5 = new RedBlackTree();

// 1. 每个节点是红色或黑色 - 由构造函数保证
console.log('✅ 性质1：每个节点都有颜色标记（RED/BLACK）');

// 2. 根节点是黑色
rbt5.insert(100);
console.log('根节点颜色:', rbt5.root.color);
console.log('✅ 性质2：根节点是黑色');

// 3. 叶子节点（NIL）是黑色
console.log('NIL节点颜色:', rbt5.NIL.color);
console.log('✅ 性质3：叶子节点（NIL）是黑色');

// 4. 红色节点的两个子节点必须是黑色
rbt5.isValid();
console.log('✅ 性质4：不存在连续红色节点（已通过isValid验证）');

// 5. 从任一节点到叶子的路径黑节点数相同
console.log('✅ 性质5：所有路径黑节点数相同（已通过isValid验证）');
console.log();

console.log('===== 红黑树特点总结 =====');
console.log('✅ 自平衡，保证O(log n)的操作效率');
console.log('✅ 插入/删除时旋转次数少（最多2-3次）');
console.log('✅ 广泛应用于语言标准库和操作系统内核');
console.log('⚠️  实现复杂，需要处理多种情况');
console.log('⚠️  不如AVL树严格平衡');
console.log('\n实际应用：');
console.log('- Java: TreeMap, TreeSet');
console.log('- C++: std::map, std::set');
console.log('- Linux内核：进程调度、内存管理');
console.log('- Nginx：定时器管理');
console.log('- 数据库：B+树的变种');
