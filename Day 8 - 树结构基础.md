# 🎯 Day 8：树结构基础 - 层次化的世界

> **今天进入非线性数据结构！**  
> **理解树的概念和基本操作！**  
> **预计时间：2-2.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 树到底是什么？（用家谱和公司架构比喻）
□ 树的重要术语（根、叶、父、子）
□ 二叉树的特点
□ 树的遍历方式（前序、中序、后序）
□ 实战：文件系统目录管理
```

### 🎯 今天的任务清单

```
□ 理解树的概念（25 分钟）
□ 学习树的术语（20 分钟）
□ 掌握二叉树（25 分钟）
□ 学习遍历方法（40 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🌳 第 2 步：树是什么？（25 分钟）

### 故事时间：大家族的族谱

#### 场景：小明的家族

```
        爷爷（第一代）
           │
      ┌────┴────┐
      │         │
    爸爸      叔叔（第二代）
      │         │
   ┌──┴──┐   ┌─┴─┐
   │     │   │   │
 小明  小红 小刚 小丽（第三代）

这就是树结构！

特点：
✓ 从上到下的层次关系
✓ 每个人只有一个父亲（除了爷爷）
✓ 可以有多个孩子
✓ 最上面的是"根"
✓ 最下面的是"叶子"
```

---

### 💡 树的定义

**官方说法：**
> 树是一种非线性的层次数据结构，由 n(n≥0) 个有限节点组成

**人话版：**
> **树 = 像族谱一样的层次结构，有上下级关系**

```javascript
// 树的结构示例

const familyTree = {
    value: '爷爷',
    children: [
        {
            value: '爸爸',
            children: [
                { value: '小明', children: [] },
                { value: '小红', children: [] }
            ]
        },
        {
            value: '叔叔',
            children: [
                { value: '小刚', children: [] },
                { value: '小丽', children: [] }
            ]
        }
    ]
};

console.log(familyTree);
/*
输出：
{
  value: '爷爷',
  children: [
    { value: '爸爸', children: [Array] },
    { value: '叔叔', children: [Array] }
  ]
}
*/
```

---

### 🎯 树的形象比喻

#### 比喻 1：公司组织架构图

```
        CEO（根节点）
         │
    ┌────┼────┐
    │    │    │
  CTO  CFO  COO（内部节点）
    │    │    │
 ┌──┴┐  ┌┴┐  ┌┴┐
 │   │  ││  │ ││
开发测试财务人事市场运营（叶子节点）

每个框框都是一个"节点"
连线表示"汇报关系"
```

---

#### 比喻 2：电脑的文件系统

```
C 盘（根目录）
 │
 ├─ Windows（文件夹）
 ├─ Users（文件夹）
 │    ├─ 小明（文件夹）
 │    │    ├─ 桌面
 │    │    ├─ 文档
 │    │    └─ 下载
 │    └─ Admin（文件夹）
 └─ Programs（文件夹）
      ├─ Chrome
      └─ VS Code

这也是树结构！
文件夹可以包含文件和子文件夹
```

---

#### 比喻 3：生物分类学

```
生物界
 │
 ├─ 动物界
 │    ├─ 脊索动物门
 │    │    ├─ 哺乳纲
 │    │    │    ├─ 灵长目 → 人类
 │    │    │    └─ 食肉目 → 猫、狗
 │    │    └─ 鸟纲 → 各种鸟
 │    └─ 节肢动物门 → 昆虫
 └─ 植物界
      └─ ...

层层分类，也是树结构！
```

---

## 📚 第 3 步：树的重要术语（20 分钟）

### 必须掌握的术语

#### 1️⃣ 节点（Node）

```javascript
/**
 * 节点 = 树中的每个元素
 */

// 就像链表中的节点
class TreeNode {
    constructor(value) {
        this.value = value;    // 数据
        this.children = [];    // 子节点数组
    }
}

// 每个节点包含：
// - 自己的值（value）
// - 所有孩子的引用（children）
```

---

#### 2️⃣ 根节点（Root）

```javascript
/**
 * 根节点 = 树的最顶端，没有父节点的节点
 * 
 * 一棵树只有一个根节点
 */

const tree = {
    root: {          // ← 这就是根节点
        value: '爷爷',
        children: [...]
    }
};

// 从根节点可以到达树中任何其他节点
```

**生活比喻：**
```
家族族谱 → 最老的祖先
公司架构 → CEO
文件系統 → C 盘根目录
```

---

#### 3️⃣ 父节点和子节点

```javascript
/**
 * 父节点 → 上面的节点
 * 子节点 → 下面的节点
 */

const node = {
    value: '爸爸',
    children: [
        { value: '小明' },  // 爸爸的子节点
        { value: '小红' }   // 爸爸的子节点
    ]
};

// "爸爸"是"小明"的父节点
// "小明"是"爸爸"的子节点
```

**重要概念：**
```
✓ 除了根节点，每个节点都有且只有一个父节点
✗ 根节点没有父节点
✓ 一个节点可以有 0 个或多个子节点
```

---

#### 4️⃣ 叶子节点（Leaf）

```javascript
/**
 * 叶子节点 = 没有子节点的节点
 * 
 * 也叫终端节点
 */

const leafNode = {
    value: '小明',
    children: []  // 空数组，说明没有孩子
};

// 判断是否是叶子节点
function isLeaf(node) {
    return node.children.length === 0;
}

console.log(isLeaf(leafNode));  // true
```

**生活比喻：**
```
家族族谱 → 最小的一代
公司架构 → 普通员工（不带团队）
文件系统 → 文件（不是文件夹）
```

---

#### 5️⃣ 深度和高度

```javascript
/**
 * 深度（Depth）→ 从根到该节点的距离
 * 高度（Height）→ 从该节点到最远叶子的距离
 * 树的高度 = 根节点的高度
 */

        A (深度 0, 高度 3)
       / \
      B   C (深度 1, 高度 2)
     / \   \
    D   E   F (深度 2, 高度 1)
         \
          G (深度 3, 高度 0)

深度：从上往下数（根是 0）
高度：从下往上数（叶子是 0）
```

---

#### 6️⃣ 度（Degree）

```javascript
/**
 * 度 = 节点拥有的子节点数量
 * 
 * 树的度 = 所有节点中最大的度数
 */

const node = {
    value: 'A',
    children: [B, C, D]  // 3 个孩子
};

// 这个节点的度是 3

// 二叉树的要求：度 ≤ 2
```

---

### 术语总结表

| 术语 | 含义 | 例子 |
|-----|------|------|
| **节点** | 树的基本元素 | 公司的每个职位 |
| **根节点** | 最顶端的节点 | CEO、祖先 |
| **父节点** | 上面的直接节点 | 直属上级 |
| **子节点** | 下面的直接节点 | 直属下级 |
| **叶子节点** | 没有孩子的节点 | 普通员工、文件 |
| **深度** | 从根到节点的距离 | 第几代 |
| **高度** | 从节点到叶子的距离 | 往下几层 |
| **度** | 孩子的数量 | 管几个人 |

---

## 🌲 第 4 步：二叉树详解（25 分钟）

### 什么是二叉树？

```javascript
/**
 * 二叉树 = 每个节点最多有两个孩子的树
 * 
 * 特点：
 * ✓ 结构简单
 * ✓ 操作方便
 * ✓ 应用广泛
 */

class BinaryTreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;   // 左孩子
        this.right = null;  // 右孩子
    }
}
```

---

### 二叉树的样子

```
        A（根）
       / \
      B   C
     / \   \
    D   E   F

特点：
✓ 每个节点最多 2 个孩子
✓ 分左孩子和右孩子
✓ 可以为空（没有孩子）
```

---

### 特殊的二叉树

#### 1️⃣ 满二叉树

```
        A
       / \
      B   C
     / \ / \
    D  E F  G

特点：
✓ 所有层的节点都是满的
✓ 叶子都在最底层
✓ 度为 2 的节点最多
```

---

#### 2️⃣ 完全二叉树

```
        A
       / \
      B   C
     / \  /
    D  E F

特点：
✓ 除了最后一层，其他都是满的
✓ 最后一层从左到右连续
✓ 可以用数组存储
```

---

#### 3️⃣ 二叉搜索树（BST）⭐重要

```
        8
       / \
      3   10
     / \    \
    1   6    14

特点：
✓ 左子树 < 根节点
✓ 右子树 > 根节点
✓ 左右子树也是 BST

用途：
✓ 快速查找 O(log n)
✓ 快速插入删除
✓ 实现字典、集合
```

**为什么快？**

```javascript
/**
 * 查找 6 的过程：
 * 
 * 1. 从根 8 开始
 * 2. 6 < 8 → 去左边
 * 3. 6 > 3 → 去右边
 * 4. 找到 6！
 * 
 * 只走了 3 步！
 * 如果是链表要走 5 步！
 */
```

---

## 🔄 第 5 步：树的遍历（40 分钟）

### 为什么要遍历？

```javascript
/**
 * 遍历 = 访问树中的每个节点
 * 
 * 就像数组的 forEach
 * 要把树的所有节点都处理一遍
 */

// 问题：树不是一条线，怎么遍历？
// 答案：递归！
```

---

### 三种主要遍历方式

#### 1️⃣ 前序遍历（Pre-order）⭐

```javascript
/**
 * 顺序：根 → 左 → 右
 * 
 * 记忆口诀：先访问自己，再访问孩子
 */

function preOrder(node) {
    if (!node) return;
    
    // 1. 访问根节点
    console.log(node.value);
    
    // 2. 递归遍历左子树
    preOrder(node.left);
    
    // 3. 递归遍历右子树
    preOrder(node.right);
}

// 示例：
//       A
//      / \
//     B   C
//    / \
//   D   E

preOrder(A);
// 输出：A → B → D → E → C

// 执行过程：
// 1. 访问 A
// 2. 访问 B 的子树
//    - 访问 B
//    - 访问 D
//    - 访问 E
// 3. 访问 C
```

**应用场景：**
```
✓ 复制树（先复制根，再复制子树）
✓ 打印目录结构
✓ 序列化树
```

---

#### 2️⃣ 中序遍历（In-order）⭐⭐⭐

```javascript
/**
 * 顺序：左 → 根 → 右
 * 
 * 记忆口诀：先访问左孩子，再访问自己，最后访问右孩子
 */

function inOrder(node) {
    if (!node) return;
    
    // 1. 递归遍历左子树
    inOrder(node.left);
    
    // 2. 访问根节点
    console.log(node.value);
    
    // 3. 递归遍历右子树
    inOrder(node.right);
}

// 示例：二叉搜索树
//       8
//      / \
//     3   10
//    / \    \
//   1   6    14

inOrder(8);
// 输出：1 → 3 → 6 → 8 → 10 → 14

// 神奇之处：
// 二叉搜索树的中序遍历 = 有序序列！
```

**重要应用：**
```
✓ 二叉搜索树排序
✓ 获取有序序列
✓ 验证 BST
```

---

#### 3️⃣ 后序遍历（Post-order）⭐

```javascript
/**
 * 顺序：左 → 右 → 根
 * 
 * 记忆口诀：先访问孩子，最后访问自己
 */

function postOrder(node) {
    if (!node) return;
    
    // 1. 递归遍历左子树
    postOrder(node.left);
    
    // 2. 递归遍历右子树
    postOrder(node.right);
    
    // 3. 访问根节点
    console.log(node.value);
}

// 示例：
//       A
//      / \
//     B   C
//    / \
//   D   E

postOrder(A);
// 输出：D → E → B → C → A

// 执行过程：
// 1. 访问 D
// 2. 访问 E
// 3. 访问 B（D 和 E 的父节点）
// 4. 访问 C
// 5. 访问 A（根节点）
```

**应用场景：**
```
✓ 删除树（先删子树，最后删根）
✓ 计算树的高度
✓ 表达式求值
```

---

### 三种遍历对比表

| 遍历方式 | 顺序 | 特点 | 应用 |
|---------|------|------|------|
| **前序** | 根左右 | 第一个访问根 | 复制树、打印目录 |
| **中序** | 左根右 | BST 输出有序 | 排序、验证 BST |
| **后序** | 左右根 | 最后一个访问根 | 删除树、计算高度 |

---

### 遍历代码模板

```javascript
/**
 * 万能遍历模板
 * 记住这个，三种都会写！
 */

function traverse(node) {
    if (!node) return;
    
    // 【位置 1】这里是前序遍历
    
    traverse(node.left);
    
    // 【位置 2】这里是中序遍历
    
    traverse(node.right);
    
    // 【位置 3】这里是后序遍历
}

// 想用哪种遍历，就把代码放在对应位置！
```

---

## 💻 第 6 步：实战项目（30 分钟）

### 项目：文件系统目录管理

```javascript
/**
 * 模拟电脑的文件系统
 * 
 * 功能：
 * 1. 创建文件夹
 * 2. 创建文件
 * 3. 列出目录结构
 * 4. 查找文件/文件夹
 * 5. 统计文件大小
 */

// 定义节点类（可以是文件或文件夹）
class FileNode {
    constructor(name, type, size = 0) {
        this.name = name;        // 文件名
        this.type = type;        // 'file' 或 'folder'
        this.size = size;        // 文件大小（字节）
        this.children = [];      // 子节点（只有文件夹有）
    }
    
    // 判断是否是文件夹
    isFolder() {
        return this.type === 'folder';
    }
    
    // 判断是否是文件
    isFile() {
        return this.type === 'file';
    }
}

// 定义文件系统类
class FileSystem {
    constructor() {
        // 创建根目录
        this.root = new FileNode('C:', 'folder');
    }
    
    // 1. 在指定路径创建文件夹
    createFolder(parentPath, folderName) {
        const parent = this.findNode(parentPath);
        
        if (!parent) {
            console.log(`❌ 找不到路径：${parentPath}`);
            return null;
        }
        
        if (!parent.isFolder()) {
            console.log(`❌ ${parentPath} 不是文件夹`);
            return null;
        }
        
        const newFolder = new FileNode(folderName, 'folder');
        parent.children.push(newFolder);
        console.log(`✅ 创建文件夹：${parentPath}/${folderName}`);
        return newFolder;
    }
    
    // 2. 在指定路径创建文件
    createFile(parentPath, fileName, size) {
        const parent = this.findNode(parentPath);
        
        if (!parent) {
            console.log(`❌ 找不到路径：${parentPath}`);
            return null;
        }
        
        if (!parent.isFolder()) {
            console.log(`❌ ${parentPath} 不是文件夹`);
            return null;
        }
        
        const newFile = new FileNode(fileName, 'file', size);
        parent.children.push(newFile);
        console.log(`✅ 创建文件：${parentPath}/${fileName} (${size} bytes)`);
        return newFile;
    }
    
    // 3. 查找节点
    findNode(path) {
        if (path === 'C:' || path === '/') {
            return this.root;
        }
        
        // 解析路径
        const parts = path.split('/').filter(p => p && p !== 'C:');
        return this._findRecursive(this.root, parts, 0);
    }
    
    _findRecursive(node, parts, index) {
        if (!node || index >= parts.length) {
            return node;
        }
        
        const currentName = parts[index];
        
        for (let child of node.children) {
            if (child.name === currentName) {
                if (index === parts.length - 1) {
                    return child;
                }
                return this._findRecursive(child, parts, index + 1);
            }
        }
        
        return null;
    }
    
    // 4. 列出目录结构（树形显示）
    listStructure(startPath = 'C:') {
        const node = this.findNode(startPath);
        
        if (!node) {
            console.log(`❌ 找不到路径：${startPath}`);
            return;
        }
        
        console.log(`\n=== ${startPath} 目录结构 ===\n`);
        this._printTree(node, '');
    }
    
    _printTree(node, prefix) {
        if (!node) return;
        
        // 打印当前节点
        const icon = node.isFolder() ? '📁' : '📄';
        const sizeInfo = node.isFile() ? ` (${node.size} bytes)` : '';
        console.log(`${prefix}${icon} ${node.name}${sizeInfo}`);
        
        // 递归打印子节点
        if (node.isFolder()) {
            node.children.forEach((child, index) => {
                const isLast = index === node.children.length - 1;
                const newPrefix = prefix + (isLast ? '    ' : '│   ');
                this._printTree(child, newPrefix + '├── ');
            });
        }
    }
    
    // 5. 查找文件或文件夹
    search(name) {
        console.log(`\n🔍 搜索：${name}`);
        const results = [];
        this._searchRecursive(this.root, name, results);
        
        if (results.length === 0) {
            console.log('未找到匹配的结果\n');
        } else {
            console.log(`找到 ${results.length} 个结果：`);
            results.forEach(path => console.log(`  - ${path}`));
            console.log();
        }
        
        return results;
    }
    
    _searchRecursive(node, targetName, results, currentPath = '') {
        if (!node) return;
        
        const path = currentPath ? `${currentPath}/${node.name}` : node.name;
        
        if (node.name === targetName) {
            results.push(path);
        }
        
        if (node.isFolder()) {
            node.children.forEach(child => {
                this._searchRecursive(child, targetName, results, path);
            });
        }
    }
    
    // 6. 统计文件夹总大小
    getFolderSize(folderPath) {
        const node = this.findNode(folderPath);
        
        if (!node) {
            console.log(`❌ 找不到路径：${folderPath}`);
            return 0;
        }
        
        if (!node.isFolder()) {
            console.log(`❌ ${folderPath} 不是文件夹`);
            return node.size;
        }
        
        const totalSize = this._calculateSize(node);
        console.log(`📊 ${folderPath} 总大小：${this._formatSize(totalSize)}`);
        return totalSize;
    }
    
    _calculateSize(node) {
        if (!node) return 0;
        
        if (node.isFile()) {
            return node.size;
        }
        
        let total = 0;
        node.children.forEach(child => {
            total += this._calculateSize(child);
        });
        
        return total;
    }
    
    _formatSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
        return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   文件系统目录管理器 - 演示           ║');
console.log('╚═══════════════════════════════════════╝\n');

const fs = new FileSystem();

// 创建文件夹结构
fs.createFolder('C:', 'Users');
fs.createFolder('C:', 'Programs');
fs.createFolder('C:', 'Documents');

fs.createFolder('C:/Users', '小明');
fs.createFolder('C:/Users', 'Admin');

fs.createFolder('C:/Users/小明', 'Desktop');
fs.createFolder('C:/Users/小明', 'Documents');
fs.createFolder('C:/Users/小明', 'Downloads');

fs.createFolder('C:/Programs', 'VSCode');
fs.createFolder('C:/Programs', 'Chrome');

// 创建一些文件
fs.createFile('C:/Users/小明/Desktop', '作业.docx', 1024);
fs.createFile('C:/Users/小明/Desktop', '笔记.txt', 512);
fs.createFile('C:/Users/小明/Documents', '报告.pdf', 2048);
fs.createFile('C:/Users/小明/Downloads', '安装包.exe', 10240);

fs.createFile('C:/Programs/VSCode', 'code.exe', 51200);
fs.createFile('C:/Programs/Chrome', 'chrome.exe', 102400);

// 显示目录结构
fs.listStructure('C:/Users/小明');

// 搜索文件
fs.search('作业');
fs.search('exe');

// 统计大小
fs.getFolderSize('C:/Users/小明');
fs.getFolderSize('C:/Programs');

// 显示完整结构
console.log('\n=== 完整目录结构 ===');
fs.listStructure('C:');

/*
输出示例（部分）：

╔═══════════════════════════════════════╗
║   文件系统目录管理器 - 演示           ║
╚═══════════════════════════════════════╝

✅ 创建文件夹：C:/Users
✅ 创建文件夹：C:/Programs
✅ 创建文件夹：C:/Documents
✅ 创建文件夹：C:/Users/小明
✅ 创建文件夹：C:/Users/Admin

=== C:/Users/小明 目录结构 ===

├── 📁 Desktop
│   ├── 📄 作业.docx (1024 bytes)
│   └── 📄 笔记.txt (512 bytes)
├── 📁 Documents
│   └── 📄 报告.pdf (2048 bytes)
└── 📁 Downloads
    └── 📄 安装包.exe (10240 bytes)

🔍 搜索：作业
找到 1 个结果：
  - C:/Users/小明/Desktop/作业.docx

📊 C:/Users/小明 总大小：13.82 KB
*/
```

---

## 🎯 费曼输出 #8：解释树结构（20 分钟）

### 任务 1：向小学生解释树

**要求：**
- 不用"节点"、"遍历"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"树就像______一样。

比如______，
最上面的是______，
中间的是______，
最下面的是______。

它们之间的关系是______。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释三种遍历方式

**场景：**
```
小朋友问："什么叫前序、中序、后序？"
```

**你要解释：**
1. 前序遍历怎么做？（用拜访亲戚比喻）
2. 中序遍历怎么做？（用上楼梯比喻）
3. 后序遍历怎么做？（用收拾房间比喻）

**要求：**
- 至少创造 3 个不同的比喻
- 用学校、家庭、游戏等生活场景
- 让小朋友能听懂

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚树和链表的区别
□ 我不知道如何解释遍历的顺序
□ 我只能背诵定义，不能用自己的话
□ 我解释不清二叉搜索树为什么快
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 7 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释什么是树（100 字以内）

**提示：** 不要用"非线性数据结构"这种术语！

---

#### 2. 列举 3 个生活中类似树的例子

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

#### 3. 画出以下二叉搜索树

```
依次插入这些数字：5, 3, 7, 2, 4, 6, 8

请画出最终的树结构：

```

---

### 进阶题（选做）⭐⭐

#### 4. 实现二叉搜索树

```javascript
class BSTNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    
    // 插入节点
    insert(value) {
        // 你的代码
    }
    
    // 查找节点
    search(value) {
        // 你的代码
    }
    
    // 中序遍历（返回有序数组）
    inOrder() {
        // 你的代码
    }
}

// 测试
const bst = new BinarySearchTree();
bst.insert(8);
bst.insert(3);
bst.insert(10);
bst.insert(1);
bst.insert(6);

console.log(bst.search(6));   // true
console.log(bst.search(5));   // false
console.log(bst.inOrder());   // [1, 3, 6, 8, 10]
```

---

### 挑战题（加分）⭐⭐⭐

#### 5. 计算树的高度

```javascript
/**
 * 计算二叉树的高度
 * 
 * 提示：递归
 * height = max(leftHeight, rightHeight) + 1
 */

function getHeight(node) {
    // 你的代码
}

// 测试
//       A
//      / \
//     B   C
//    / \
//   D   E

console.log(getHeight(A));  // 3
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 树的概念**
```
✓ 层次结构的数据
✓ 像族谱、公司架构
✓ 根节点、父子关系
```

**2. 树的术语**
```
✓ 节点、根、叶子
✓ 父节点、子节点
✓ 深度、高度、度
```

**3. 二叉树**
```
✓ 每个节点最多两个孩子
✓ 分左右孩子
✓ 二叉搜索树：左 < 根 < 右
```

**4. 遍历方式**
```
✓ 前序：根左右
✓ 中序：左根右（BST 输出有序）
✓ 后序：左右根
```

---

### 📊 知识框架图

```
树
├── 基本概念
│   ├── 层次结构
│   └── 非线性
├── 重要术语
│   ├── 根、叶、父、子
│   ├── 深度、高度
│   └── 度
├── 二叉树
│   ├── 满二叉树
│   ├── 完全二叉树
│   └── 二叉搜索树⭐
└── 遍历
    ├── 前序（根左右）
    ├── 中序（左根右）
    └── 后序（左右根）
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第八天完成了！你真棒！🎉           ║
║                                       ║
║   树是很重要的数据结构！             ║
║   后面学堆、哈希表都会用到！         ║
║                                       ║
║   特别是二叉搜索树！                 ║
║   明天继续深入学习！                 ║
║                                       ║
╚═══════════════════════════════════════╝
```

**明天见！继续加油！** ✨

---

**学习时长统计：**
- 📖 阅读 + 理解：90 分钟
- 💻 实战项目：30 分钟
- 💭 思考 + 笔记：15 分钟
- ✍️ 练习 + 费曼输出：20 分钟
- ⏰ 总计：约 2.5 小时 ✅
