# 🎯 Day 28：LeetCode 刷题实战 - 链表与树

> **今天攻克链表和树的经典题目！**  
> **应用学过的数据结构知识！**  
> **掌握面试必考题型！**  
> **预计时间：3-3.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 链表题的核心技巧
□ 树遍历的实际应用
□ 递归在树问题中的威力
□ 如何拆解复杂问题
□ 实战：5 道经典题目详解
```

### 🎯 今天的任务清单

```
□ 链表专题训练（50 分钟）
□ 二叉树专题（45 分钟）
□ 递归思维训练（30 分钟）
□ 综合应用（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🔗 第 2 步：链表专题（50 分钟）

### 题目 1：反转链表（Easy）⭐⭐⭐

```javascript
/**
 * LeetCode 206. 反转链表
 * https://leetcode.cn/problems/reverse-linked-list/
 * 
 * 难度：Easy
 * 标签：链表、递归
 * 出现频率：极高
 * 
 * 题目：
 * 给你单链表的头节点 head，反转链表并返回新头节点
 * 
 * 输入：1→2→3→4→5→null
 * 输出：5→4→3→2→1→null
 */

// 链表节点定义
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * 方法 1：迭代法（推荐）⭐
 */
function reverseListIterative(head) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   反转链表 - 迭代法                  ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    let prev = null;
    let current = head;
    
    console.log('初始状态：');
    console.log('prev: null');
    console.log('current: head\n');
    
    while (current !== null) {
        const nextTemp = current.next;  // 先保存下一个节点
        
        console.log(`当前处理：${current.val}`);
        console.log(`  保存 next: ${nextTemp ? nextTemp.val : 'null'}`);
        
        current.next = prev;  // 反转指针
        
        console.log(`  反转指针：${current.val} → ${prev ? prev.val : 'null'}`);
        
        prev = current;  // prev 前进一步
        current = nextTemp;  // current 前进一步
        
        console.log(`  更新后：prev=${prev.val}, current=${current ? current.val : 'null'}\n`);
    }
    
    console.log('最终 prev 就是新的头节点:', prev.val);
    console.log();
    
    return prev;
}

/**
 * 方法 2：递归法（理解思想）
 */
function reverseListRecursive(head) {
    // 基础情况：空链表或只有一个节点
    if (head === null || head.next === null) {
        return head;
    }
    
    // 递归反转后面的链表
    const newHead = reverseListRecursive(head.next);
    
    // 把当前节点接到后面
    head.next.next = head;
    head.next = null;
    
    return newHead;
}

// 辅助函数：创建链表
function createLinkedList(arr) {
    let dummy = new ListNode(0);
    let current = dummy;
    
    for (let val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    
    return dummy.next;
}

// 辅助函数：打印链表
function printLinkedList(head) {
    const result = [];
    let current = head;
    
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    
    console.log(result.join('→') + '→null');
}

// 测试
const list = createLinkedList([1, 2, 3, 4, 5]);
console.log('原始链表:');
printLinkedList(list);
console.log();

const reversed = reverseListIterative(list);
console.log('\n反转后的链表:');
printLinkedList(reversed);

/*
输出示例：

原始链表:
1→2→3→4→5→null

╔═══════════════════════════════════════╗
║   反转链表 - 迭代法                  ║
╚═══════════════════════════════════════╝

初始状态：
prev: null
current: head

当前处理：1
  保存 next: 2
  反转指针：1 → null
  更新后：prev=1, current=2

当前处理：2
  保存 next: 3
  反转指针：2 → 1
  更新后：prev=2, current=3

...

最终 prev 就是新的头节点：5

反转后的链表:
5→4→3→2→1→null
*/
```

---

### 题目 2：合并两个有序链表（Easy）⭐⭐

```javascript
/**
 * LeetCode 21. 合并两个有序链表
 * https://leetcode.cn/problems/merge-two-sorted-lists/
 * 
 * 难度：Easy
 * 标签：链表、归并
 * 
 * 题目：
 * 将两个升序链表合并为一个新的升序链表
 * 
 * 输入：1→2→4, 1→3→4
 * 输出：1→1→2→3→4→4
 */

function mergeTwoLists(l1, l2) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   合并两个有序链表                   ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log('链表 1:');
    printLinkedList(l1);
    console.log('链表 2:');
    printLinkedList(l2);
    console.log();
    
    // 创建虚拟头节点
    const dummy = new ListNode(0);
    let current = dummy;
    
    console.log('开始合并:\n');
    
    // 比较两个链表的节点
    while (l1 !== null && l2 !== null) {
        console.log(`比较 l1=${l1.val} 和 l2=${l2.val}`);
        
        if (l1.val <= l2.val) {
            console.log(`  ${l1.val} 更小（或相等），选择 l1`);
            current.next = l1;
            l1 = l1.next;
        } else {
            console.log(`  ${l2.val} 更小，选择 l2`);
            current.next = l2;
            l2 = l2.next;
        }
        
        current = current.next;
        console.log(`  当前结果：`, endWithNull(dummy.next));
        console.log();
    }
    
    // 连接剩余部分
    if (l1 !== null) {
        console.log('l1 还有剩余，全部接上');
        current.next = l1;
    } else {
        console.log('l2 还有剩余，全部接上');
        current.next = l2;
    }
    
    console.log('\n最终结果:');
    printLinkedList(dummy.next);
    console.log();
    
    return dummy.next;
}

// 辅助函数：打印链表（带 null）
function endWithNull(head) {
    const result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    return result.join('→') + '→null';
}

// 测试
const list1 = createLinkedList([1, 2, 4]);
const list2 = createLinkedList([1, 3, 4]);
mergeTwoLists(list1, list2);
```

---

### 题目 3：环形链表（Easy）⭐⭐

```javascript
/**
 * LeetCode 141. 环形链表
 * https://leetcode.cn/problems/linked-list-cycle/
 * 
 * 难度：Easy
 * 标签：链表、双指针
 * 技巧：快慢指针（Floyd 判圈算法）
 * 
 * 题目：
 * 给定一个链表，判断链表中是否有环
 * 
 * 如果有环，返回 true；否则返回 false
 */

function hasCycle(head) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   环形链表 - 快慢指针                ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    if (head === null || head.next === null) {
        console.log('空链表或只有一个节点，无环\n');
        return false;
    }
    
    // 快指针每次走两步
    // 慢指针每次走一步
    let slow = head;
    let fast = head.next;
    
    console.log('初始位置：');
    console.log(`slow: ${slow.val}`);
    console.log(`fast: ${fast.val}\n`);
    
    let step = 1;
    
    while (fast !== null && fast.next !== null) {
        console.log(`第${step}步:`);
        console.log(`  slow 在 ${slow.val}`);
        console.log(`  fast 在 ${fast.val}`);
        
        if (slow === fast) {
            console.log(`\n✅ 快慢指针相遇！说明有环！\n`);
            return true;
        }
        
        // 慢指针走一步
        slow = slow.next;
        // 快指针走两步
        fast = fast.next.next;
        
        step++;
        console.log();
    }
    
    console.log('快指针到达终点，无环\n');
    return false;
}

// 测试：创建带环的链表
function createCycleList() {
    const node1 = new ListNode(3);
    const node2 = new ListNode(2);
    const node3 = new ListNode(0);
    const node4 = new ListNode(-4);
    
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node2;  // 形成环
    
    return node1;
}

const cycleList = createCycleList();
hasCycle(cycleList);

// 测试：普通链表
const normalList = createLinkedList([1, 2, 3, 4, 5]);
hasCycle(normalList);
```

---

## 🌳 第 3 步：二叉树专题（45 分钟）

### 题目 4：二叉树的最大深度（Easy）⭐⭐

```javascript
/**
 * LeetCode 104. 二叉树的最大深度
 * https://leetcode.cn/problems/maximum-depth-of-binary-tree/
 * 
 * 难度：Easy
 * 标签：树、DFS、递归
 * 
 * 题目：
 * 给定一个二叉树，找出其最大深度
 * 深度 = 从根节点到最远叶子节点的路径上的节点数
 */

// 树节点定义
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * 方法 1：递归法（推荐）⭐
 */
function maxDepth(root) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   二叉树的最大深度 - 递归法          ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    function dfs(node, depth) {
        if (node === null) {
            console.log(`${'  '.repeat(depth)}遇到空节点，返回深度${depth}`);
            return depth;
        }
        
        console.log(`${'  '.repeat(depth)}访问节点${node.val}，当前深度${depth}`);
        
        const leftDepth = dfs(node.left, depth + 1);
        const rightDepth = dfs(node.right, depth + 1);
        
        const maxD = Math.max(leftDepth, rightDepth);
        
        console.log(`${'  '.repeat(depth)}节点${node.val}: 左=${leftDepth}, 右=${rightDepth}, 最大=${maxD}`);
        
        return maxD;
    }
    
    const result = dfs(root, 0);
    console.log(`\n最大深度：${result}\n`);
    return result;
}

/**
 * 方法 2：BFS 层序遍历
 */
function maxDepthBFS(root) {
    if (root === null) return 0;
    
    const queue = [root];
    let depth = 0;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        depth++;
    }
    
    return depth;
}

// 辅助函数：创建二叉树
function createTree(arr) {
    if (arr.length === 0) return null;
    
    const nodes = arr.map(val => val === null ? null : new TreeNode(val));
    
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === null) continue;
        
        const leftIndex = 2 * i + 1;
        const rightIndex = 2 * i + 2;
        
        if (leftIndex < nodes.length) {
            nodes[i].left = nodes[leftIndex];
        }
        if (rightIndex < nodes.length) {
            nodes[i].right = nodes[rightIndex];
        }
    }
    
    return nodes[0];
}

// 测试
const tree = createTree([3, 9, 20, null, null, 15, 7]);
console.log('创建的二叉树:');
console.log('    3');
console.log('   / \\');
console.log('  9  20');
console.log('     / \\');
console.log('    15  7\n');

maxDepth(tree);

/*
输出示例：

╔═══════════════════════════════════════╗
║   二叉树的最大深度 - 递归法          ║
╚═══════════════════════════════════════╝

访问节点 3，当前深度 0
  访问节点 9，当前深度 1
  遇到空节点，返回深度 2
  遇到空节点，返回深度 2
  节点 9: 左=2, 右=2, 最大=2
  访问节点 20，当前深度 1
    访问节点 15，当前深度 2
    遇到空节点，返回深度 3
    遇到空节点，返回深度 3
    节点 15: 左=3, 右=3, 最大=3
    访问节点 7，当前深度 2
    遇到空节点，返回深度 3
    遇到空节点，返回深度 3
    节点 7: 左=3, 右=3, 最大=3
  节点 20: 左=3, 右=3, 最大=3
节点 3: 左=2, 右=3, 最大=3

最大深度：3
*/
```

---

### 题目 5：验证二叉搜索树（Medium）⭐⭐⭐

```javascript
/**
 * LeetCode 98. 验证二叉搜索树
 * https://leetcode.cn/problems/validate-binary-search-tree/
 * 
 * 难度：Medium
 * 标签：树、DFS、BST
 * 出现频率：高
 * 
 * 题目：
 * 判断一个二叉树是否是有效的二叉搜索树
 * 
 * BST 的定义：
 * 1. 左子树所有节点 < 根节点
 * 2. 右子树所有节点 > 根节点
 * 3. 左右子树也必须是 BST
 */

function isValidBST(root) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   验证二叉搜索树                     ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    function validate(node, min, max) {
        if (node === null) {
            console.log('空节点，返回 true');
            return true;
        }
        
        console.log(`\n验证节点${node.val}，范围 (${min}, ${max})`);
        
        // 检查当前节点是否在范围内
        if ((min !== null && node.val <= min) || 
            (max !== null && node.val >= max)) {
            console.log(`❌ ${node.val} 不在范围 (${min}, ${max}) 内`);
            return false;
        }
        
        console.log(`✓ ${node.val} 在范围内`);
        
        // 递归验证左右子树
        console.log(`验证左子树...`);
        const leftValid = validate(node.left, min, node.val);
        
        console.log(`验证右子树...`);
        const rightValid = validate(node.right, node.val, max);
        
        const result = leftValid && rightValid;
        console.log(`节点${node.val}: 左=${leftValid}, 右=${rightValid}, 结果=${result}`);
        
        return result;
    }
    
    const result = validate(root, null, null);
    console.log(`\n最终结果：${result ? '是 BST ✅' : '不是 BST ❌'}\n`);
    return result;
}

// 测试 1：有效的 BST
const bst = createTree([2, 1, 3]);
console.log('测试 1：有效的 BST');
console.log('  2');
console.log(' / \\');
console.log('1   3\n');
isValidBST(bst);

// 测试 2：无效的 BST
const notBst = createTree([5, 1, 4, null, null, 3, 6]);
console.log('\n测试 2：无效的 BST');
console.log('    5');
console.log('   / \\');
console.log('  1   4');
console.log('     / \\');
console.log('    3   6');
console.log('(4 的左子节点 3 < 5，违反 BST 性质)\n');
isValidBST(notBst);
```

---

## 💻 第 4 步：综合技巧总结（30 分钟）

### 链表题通用模板

```javascript
/**
 * 1. 虚拟头节点技巧
 * 
 * 适用场景：
 * ✓ 可能修改头节点
 * ✓ 需要在前端插入节点
 */

function solveLinkedList(head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    
    // 操作...
    
    return dummy.next;
}


/**
 * 2. 快慢指针
 * 
 * 适用场景：
 * ✓ 找中点
 * ✓ 判断环
 * ✓ 删除倒数第 N 个节点
 */

function findMiddle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;  // 慢指针指向中点
}


/**
 * 3. 反转链表
 */

function reverse(head) {
    let prev = null;
    let curr = head;
    
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    return prev;
}
```

---

### 树题通用模板

```javascript
/**
 * 1. 递归遍历
 */

function traverse(root) {
    if (root === null) return;
    
    // 前序遍历（根左右）
    console.log(root.val);
    
    traverse(root.left);
    
    // 中序遍历（左根右）
    // console.log(root.val);
    
    traverse(root.right);
    
    // 后序遍历（左右根）
    // console.log(root.val);
}


/**
 * 2. BFS 层序遍历
 */

function levelOrder(root) {
    if (root === null) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const level = [];
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}


/**
 * 3. DFS 深度优先
 */

function dfs(root) {
    if (root === null) return;
    
    // 处理逻辑
    // ...
    
    dfs(root.left);
    dfs(root.right);
}
```

---

## 🎯 费曼输出 #28：解释链表和树的解题思路（20 分钟）

### 任务 1：向小学生解释快慢指针

**要求：**
- 不用"指针"、"节点"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"有个叫快慢指针的方法，
就像______和______在______。

快的______，
慢的______，
最后就能______。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释为什么递归适合树的问题

**场景：**
```
小朋友问："为什么树的题目都用递归？"
```

**你要解释：**
1. 树的结构有什么特点？
2. 递归怎么利用这个特点？
3. 为什么不用递归会很麻烦？

**要求：**
- 用具体例子说明
- 让小朋友能听懂
- 说明白"分而治之"的思想

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚快慢指针的相遇原理
□ 我不知道如何解释 BST 的性质
□ 我只能背诵代码，不能用自己的话
□ 我解释不清递归的终止条件
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 5 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 删除链表倒数第 N 个节点

```javascript
/**
 * LeetCode 19. 删除链表的倒数第 N 个节点
 * 
 * 给你一个链表，删除链表的倒数第 n 个结点
 * 并且返回链表的头结点
 * 
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 * 
 * 提示：用快慢指针
 */

function removeNthFromEnd(head, n) {
    // 你的代码
}
```

---

#### 2. 对称二叉树

```javascript
/**
 * LeetCode 101. 对称二叉树
 * 
 * 给你一个二叉树的根节点 root
 * 检查它是否轴对称
 * 
 * 输入：root = [1,2,2,3,4,4,3]
 * 输出：true
 * 
 * 提示：递归比较左右子树
 */

function isSymmetric(root) {
    // 你的代码
}
```

---

### 进阶题（选做）⭐⭐

#### 3. K 个一组翻转链表

```javascript
/**
 * LeetCode 25. K 个一组翻转链表
 * 
 * 给你链表的头节点 head，每 k 个节点一组进行翻转
 * 返回修改后的链表
 * 
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[2,1,4,3,5]
 * 
 * 难度：Hard
 * 提示：分组反转，注意连接
 */

function reverseKGroup(head, k) {
    // 你的代码
}
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 链表技巧**
```
✓ 反转链表（迭代/递归）
✓ 合并有序链表
✓ 快慢指针判环
✓ 虚拟头节点
```

**2. 树的处理**
```
✓ 最大深度（DFS/BFS）
✓ 验证 BST
✓ 递归遍历
✓ 中序遍历性质
```

**3. 解题套路**
```
✓ 双指针法
✓ 递归分解
✓ 边界处理
✓ 画图辅助
```

**4. 面试准备**
```
✓ 高频题型
✓ 多种解法
✓ 复杂度分析
```

---

### 📊 知识框架图

```
LeetCode 实战 - 链表&树
├── 链表
│   ├── 反转（迭代/递归）
│   ├── 合并（归并思想）
│   └── 环检测（快慢指针）
├── 树
│   ├── 深度（DFS/BFS）
│   ├── 验证 BST
│   └── 对称性
└── 通用技巧
    ├── 虚拟节点
    ├── 双指针
    └── 递归模板
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第二十八天完成了！你真棒！🎉       ║
║                                       ║
║   掌握了链表和树的经典题型！         ║
║   离 30 天挑战又近了一步！           ║
║                                       ║
║   明天继续刷题！                     ║
║   最后一天的实战训练！               ║
║                                       ║
║   坚持就是胜利！                     ║
║   加油！                             ║
║                                       ║
╚═══════════════════════════════════════╝
```

**明天见！继续加油！** ✨

---

**学习时长统计：**
- 📖 阅读 + 理解：95 分钟
- 💻 实战项目：30 分钟
- 💭 思考 + 笔记：15 分钟
- ✍️ 练习 + 费曼输出：20 分钟
- ⏰ 总计：约 3-3.5 小时 ✅
