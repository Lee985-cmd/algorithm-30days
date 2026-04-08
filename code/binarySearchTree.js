/**
 * 二叉搜索树 - Binary Search Tree (BST)
 * 
 * 什么是二叉搜索树？
 * BST是一种特殊的二叉树，满足以下性质：
 * 1. 左子树所有节点的值 < 根节点的值
 * 2. 右子树所有节点的值 > 根节点的值
 * 3. 左右子树也都是二叉搜索树
 * 
 * 形象比喻：
 * 就像查字典，比当前页小的往前翻，大的往后翻
 * 
 * 时间复杂度（平均情况）：
 * - 搜索：O(log n)
 * - 插入：O(log n)
 * - 删除：O(log n)
 * 
 * 时间复杂度（最坏情况 - 退化成链表）：
 * - 搜索：O(n)
 * - 插入：O(n)
 * - 删除：O(n)
 * 
 * 空间复杂度：O(n)
 * 
 * 优点：
 * - 支持动态插入删除
 * - 可以高效地查找、求最大/最小值
 * - 支持范围查询
 * 
 * 缺点：
 * - 不平衡时会退化
 * - 需要额外空间存储指针
 * 
 * 适用场景：
 * - 需要频繁插入、删除、查找
 * - 数据库索引
 * - 实现集合（Set）和映射（Map）
 */

/**
 * 树节点类
 */
class TreeNode {
    /**
     * 构造函数
     * @param {*} value - 节点的值
     */
    constructor(value) {
        this.value = value;
        this.left = null;  // 左子节点
        this.right = null; // 右子节点
    }
}

/**
 * 二叉搜索树类
 */
class BinarySearchTree {
    constructor() {
        this.root = null; // 根节点
        this.size = 0;    // 节点数量
    }
    
    /**
     * 插入节点
     * 时间复杂度：O(log n) 平均，O(n) 最坏
     * @param {*} value - 要插入的值
     * @returns {BinarySearchTree} - 返回树本身，支持链式调用
     */
    insert(value) {
        const newNode = new TreeNode(value);
        
        if (!this.root) {
            // 如果树为空，新节点成为根
            this.root = newNode;
        } else {
            // 否则，找到合适的位置插入
            this._insertNode(this.root, newNode);
        }
        
        this.size++;
        return this;
    }
    
    /**
     * 递归插入节点
     * @private
     * @param {TreeNode} node - 当前节点
     * @param {TreeNode} newNode - 新节点
     */
    _insertNode(node, newNode) {
        if (newNode.value < node.value) {
            // 新值小于当前节点，往左走
            if (!node.left) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else if (newNode.value > node.value) {
            // 新值大于当前节点，往右走
            if (!node.right) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
        // 如果相等，不插入（BST不允许重复值）
    }
    
    /**
     * 搜索节点
     * 时间复杂度：O(log n) 平均，O(n) 最坏
     * @param {*} value - 要搜索的值
     * @returns {boolean} - 是否存在
     */
    search(value) {
        return this._searchNode(this.root, value);
    }
    
    /**
     * 递归搜索节点
     * @private
     * @param {TreeNode} node - 当前节点
     * @param {*} value - 要搜索的值
     * @returns {boolean}
     */
    _searchNode(node, value) {
        // 基本情况：节点为空，说明没找到
        if (!node) {
            return false;
        }
        
        if (value === node.value) {
            // 找到了
            return true;
        } else if (value < node.value) {
            // 目标值小，往左找
            return this._searchNode(node.left, value);
        } else {
            // 目标值大，往右找
            return this._searchNode(node.right, value);
        }
    }
    
    /**
     * 查找最小值
     * 思路：一直往左走，最左边的就是最小值
     * 时间复杂度：O(log n) 平均
     * @returns {*} - 最小值
     */
    findMin() {
        if (!this.root) {
            return undefined;
        }
        
        let current = this.root;
        while (current.left) {
            current = current.left;
        }
        
        return current.value;
    }
    
    /**
     * 查找最大值
     * 思路：一直往右走，最右边的就是最大值
     * 时间复杂度：O(log n) 平均
     * @returns {*} - 最大值
     */
    findMax() {
        if (!this.root) {
            return undefined;
        }
        
        let current = this.root;
        while (current.right) {
            current = current.right;
        }
        
        return current.value;
    }
    
    /**
     * 删除节点
     * 时间复杂度：O(log n) 平均，O(n) 最坏
     * 
     * 删除有三种情况：
     * 1. 叶子节点：直接删除
     * 2. 只有一个子节点：用子节点替代
     * 3. 有两个子节点：用右子树的最小值（或左子树的最大值）替代
     * 
     * @param {*} value - 要删除的值
     * @returns {boolean} - 是否删除成功
     */
    remove(value) {
        this.root = this._removeNode(this.root, value);
        if (this.root !== null) {
            this.size--;
            return true;
        }
        return false;
    }
    
    /**
     * 递归删除节点
     * @private
     * @param {TreeNode} node - 当前节点
     * @param {*} value - 要删除的值
     * @returns {TreeNode|null} - 删除后的子树根节点
     */
    _removeNode(node, value) {
        // 基本情况：节点为空
        if (!node) {
            return null;
        }
        
        if (value < node.value) {
            // 目标值小，往左找
            node.left = this._removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            // 目标值大，往右找
            node.right = this._removeNode(node.right, value);
            return node;
        } else {
            // 找到了要删除的节点
            
            // 情况1：叶子节点（没有子节点）
            if (!node.left && !node.right) {
                return null;
            }
            
            // 情况2：只有一个子节点
            if (!node.left) {
                return node.right; // 用右子节点替代
            }
            if (!node.right) {
                return node.left; // 用左子节点替代
            }
            
            // 情况3：有两个子节点
            // 找到右子树的最小值（中序后继）
            let minNode = node.right;
            while (minNode.left) {
                minNode = minNode.left;
            }
            
            // 用最小值替换当前节点的值
            node.value = minNode.value;
            
            // 删除右子树中的最小值节点
            node.right = this._removeNode(node.right, minNode.value);
            
            return node;
        }
    }
    
    /**
     * 中序遍历（左-根-右）
     * 特点：结果是有序的（升序）
     * 时间复杂度：O(n)
     * @param {Function} callback - 回调函数，处理每个节点
     */
    inOrderTraversal(callback) {
        this._inOrder(this.root, callback);
    }
    
    /**
     * 递归中序遍历
     * @private
     * @param {TreeNode} node - 当前节点
     * @param {Function} callback - 回调函数
     */
    _inOrder(node, callback) {
        if (node) {
            this._inOrder(node.left, callback);   // 先遍历左子树
            callback(node.value);                  // 访问当前节点
            this._inOrder(node.right, callback);  // 再遍历右子树
        }
    }
    
    /**
     * 前序遍历（根-左-右）
     * 应用：复制树、序列化
     * @param {Function} callback - 回调函数
     */
    preOrderTraversal(callback) {
        this._preOrder(this.root, callback);
    }
    
    /**
     * 递归前序遍历
     * @private
     */
    _preOrder(node, callback) {
        if (node) {
            callback(node.value);                 // 先访问当前节点
            this._preOrder(node.left, callback);  // 再遍历左子树
            this._preOrder(node.right, callback); // 最后遍历右子树
        }
    }
    
    /**
     * 后序遍历（左-右-根）
     * 应用：删除树、计算目录大小
     * @param {Function} callback - 回调函数
     */
    postOrderTraversal(callback) {
        this._postOrder(this.root, callback);
    }
    
    /**
     * 递归后序遍历
     * @private
     */
    _postOrder(node, callback) {
        if (node) {
            this._postOrder(node.left, callback);  // 先遍历左子树
            this._postOrder(node.right, callback); // 再遍历右子树
            callback(node.value);                  // 最后访问当前节点
        }
    }
    
    /**
     * 层序遍历（BFS）
     * 应用：求树的高度、按层打印
     * 时间复杂度：O(n)
     * @param {Function} callback - 回调函数
     */
    levelOrderTraversal(callback) {
        if (!this.root) {
            return;
        }
        
        const queue = [this.root];
        
        while (queue.length > 0) {
            const node = queue.shift();
            callback(node.value);
            
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }
    
    /**
     * 获取树的高度
     * 时间复杂度：O(n)
     * @returns {number} - 树的高度
     */
    getHeight() {
        return this._getHeight(this.root);
    }
    
    /**
     * 递归计算高度
     * @private
     * @param {TreeNode} node - 当前节点
     * @returns {number}
     */
    _getHeight(node) {
        if (!node) {
            return 0;
        }
        
        const leftHeight = this._getHeight(node.left);
        const rightHeight = this._getHeight(node.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    /**
     * 判断是否是有效的BST
     * 时间复杂度：O(n)
     * @returns {boolean}
     */
    isValidBST() {
        return this._isValidBST(this.root, -Infinity, Infinity);
    }
    
    /**
     * 递归验证BST
     * @private
     * @param {TreeNode} node - 当前节点
     * @param {number} min - 最小值边界
     * @param {number} max - 最大值边界
     * @returns {boolean}
     */
    _isValidBST(node, min, max) {
        if (!node) {
            return true;
        }
        
        // 当前节点的值必须在 (min, max) 范围内
        if (node.value <= min || node.value >= max) {
            return false;
        }
        
        // 左子树的所有值必须 < 当前节点
        // 右子树的所有值必须 > 当前节点
        return this._isValidBST(node.left, min, node.value) &&
               this._isValidBST(node.right, node.value, max);
    }
    
    /**
     * 获取节点数量
     * @returns {number}
     */
    getSize() {
        return this.size;
    }
    
    /**
     * 判断是否为空
     * @returns {boolean}
     */
    isEmpty() {
        return this.size === 0;
    }
    
    /**
     * 清空树
     */
    clear() {
        this.root = null;
        this.size = 0;
    }
    
    /**
     * 将树转换为有序数组
     * @returns {Array}
     */
    toArray() {
        const result = [];
        this.inOrderTraversal(value => result.push(value));
        return result;
    }
}

// ==================== 测试代码 ====================

console.log('===== BST 基本操作测试 =====\n');

const bst = new BinarySearchTree();

// 插入节点
console.log('插入: 8, 3, 10, 1, 6, 14, 4, 7, 13');
bst.insert(8).insert(3).insert(10).insert(1)
   .insert(6).insert(14).insert(4).insert(7).insert(13);

console.log('树的大小:', bst.getSize());
console.log('最小值:', bst.findMin());
console.log('最大值:', bst.findMax());
console.log('树的高度:', bst.getHeight());
console.log();

// 搜索
console.log('搜索 6:', bst.search(6));  // true
console.log('搜索 5:', bst.search(5));  // false
console.log();

// 遍历
console.log('中序遍历（应该是有序的）:');
const inOrder = [];
bst.inOrderTraversal(value => inOrder.push(value));
console.log(inOrder.join(', '));
console.log();

console.log('前序遍历:');
const preOrder = [];
bst.preOrderTraversal(value => preOrder.push(value));
console.log(preOrder.join(', '));
console.log();

console.log('后序遍历:');
const postOrder = [];
bst.postOrderTraversal(value => postOrder.push(value));
console.log(postOrder.join(', '));
console.log();

console.log('层序遍历:');
const levelOrder = [];
bst.levelOrderTraversal(value => levelOrder.push(value));
console.log(levelOrder.join(', '));
console.log();

// 删除节点
console.log('===== 删除节点测试 =====\n');

console.log('删除叶子节点 13');
bst.remove(13);
console.log('中序遍历:', bst.toArray().join(', '));
console.log();

console.log('删除只有一个子节点的节点 14');
bst.remove(14);
console.log('中序遍历:', bst.toArray().join(', '));
console.log();

console.log('删除有两个子节点的节点 3');
bst.remove(3);
console.log('中序遍历:', bst.toArray().join(', '));
console.log();

// 验证BST
console.log('===== BST 验证测试 =====\n');

const validBST = new BinarySearchTree();
validBST.insert(5).insert(3).insert(7).insert(2).insert(4);
console.log('有效BST验证:', validBST.isValidBST()); // true

// 手动构造一个无效的BST
const invalidNode1 = new TreeNode(5);
const invalidNode2 = new TreeNode(3);
const invalidNode3 = new TreeNode(7);
const invalidNode4 = new TreeNode(6); // 错误：6应该在7的左边，但值是6<7
invalidNode1.left = invalidNode2;
invalidNode1.right = invalidNode3;
invalidNode3.left = invalidNode4;

const invalidBST = new BinarySearchTree();
invalidBST.root = invalidNode1;
invalidBST.size = 4;
console.log('无效BST验证:', invalidBST.isValidBST()); // false
console.log();

// 性能测试
console.log('===== 性能测试 =====\n');

function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100000));
}

function measureTime(buildFunc, arr, name) {
    const start = Date.now();
    buildFunc(arr);
    const end = Date.now();
    console.log(`${name}: ${end - start}ms`);
}

// 构建不同大小的BST
const sizes = [1000, 10000, 100000];

sizes.forEach(size => {
    const randomArr = generateRandomArray(size);
    console.log(`\n节点数: ${size.toLocaleString()}`);
    
    measureTime((arr) => {
        const tree = new BinarySearchTree();
        arr.forEach(val => tree.insert(val));
    }, randomArr, '构建BST');
});

// 导出类和节点（如果在Node.js环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TreeNode,
        BinarySearchTree
    };
}
