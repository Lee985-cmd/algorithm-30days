# 🎯 Day 13：图的遍历 - DFS 和 BFS

> **今天学两种重要的图遍历算法！**  
> **理解深度优先和广度优先搜索！**  
> **预计时间：2.5-3 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ DFS 是什么？（用走迷宫比喻）
□ BFS 是什么？（用涟漪扩散比喻）
□ 两种算法的区别和应用场景
□ 如何实现 DFS 和 BFS
□ 实战：迷宫求解器
```

### 🎯 今天的任务清单

```
□ 理解 DFS 概念（30 分钟）
□ 学习 DFS 实现（40 分钟）
□ 理解 BFS 概念（30 分钟）
□ 学习 BFS 实现（40 分钟）
□ 对比两种算法（20 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🔍 第 2 步：什么是 DFS？（30 分钟）

### 故事时间：走迷宫

#### 场景：DFS 的思维方式

```
走迷宫的策略：

方法 1：深度优先（DFS）⭐
→ 选一条路一直走
→ 遇到死胡同就退回上一个路口
→ 换条路继续走
→ 直到找到出口

这就是"不撞南墙不回头"！

方法 2：广度优先（BFS）
→ 先探索所有离起点近的路口
→ 再探索远一点的
→ 一层一层往外扩

这就是"稳扎稳打"！
```

---

### 💡 DFS 的定义

**官方说法：**
> 深度优先搜索是一种用于遍历或搜索树或图的算法，沿着树的深度遍历树的节点，尽可能深的搜索树的分支

**人话版：**
> **DFS = 一条路走到黑，撞了南墙再回头**

```javascript
// DFS 的核心思想

function dfs(当前位置) {
    // 1. 标记当前位置已访问
    visited.add(当前位置);
    
    // 2. 处理当前位置
    console.log('访问:', 当前位置);
    
    // 3. 递归访问所有相邻位置
    for (let 邻居 of 当前位置的所有邻居) {
        if (!visited.has(邻居)) {
            dfs(邻居);  // 递归深入
        }
    }
}

// 关键特点：
// ✓ 用递归（或栈）实现
// ✓ 一条路走到底
// ✓ 回溯（Backtracking）
```

---

### 🎯 DFS 的形象比喻

#### 比喻 1：探洞

```
探索地下洞穴系统：

入口
 |
 ├─ 通道 A → 洞穴 A1 → 洞穴 A2（死路）
 |                ↘ 洞穴 A3 → 出口 ✅
 |
 └─ 通道 B → 洞穴 B1（死路）

探险家的做法（DFS）：
1. 从入口进通道 A
2. 一直走到 A2（死路）
3. 退回到 A1
4. 转向 A3
5. 找到出口！✅

不会同时探索 A 和 B
而是一条道走到底！
```

---

#### 比喻 2：查字典

```
查英汉字典找单词：

找以"a"开头的单词：
→ apple
  → apple pie
  → apple sauce
  → application
    → apply
    → appoint
  
你是一页一页翻看的
不是跳着看！

这也是 DFS！
```

---

#### 比喻 3：家谱查询

```
查家族族谱：

爷爷
 |
 ├─ 爸爸
 |   ├─ 我
 |   |  └─ 儿子
 |   └─ 妹妹
 |
 └─ 叔叔
     └─ 堂弟

查询顺序（DFS）：
爷爷 → 爸爸 → 我 → 儿子 → 妹妹 → 叔叔 → 堂弟

先把一支查完再查下一支！
```

---

## 🔧 第 3 步：DFS 的实现（40 分钟）

### 实现方式 1：递归版本⭐推荐

```javascript
/**
 * DFS 递归实现
 * 
 * 最简单、最直观
 */

class GraphDFS {
    constructor() {
        this.adjList = new Map();
        this.visited = new Set();
    }
    
    // 添加边
    addEdge(v1, v2) {
        if (!this.adjList.has(v1)) {
            this.adjList.set(v1, []);
        }
        if (!this.adjList.has(v2)) {
            this.adjList.set(v2, []);
        }
        
        this.adjList.get(v1).push(v2);
        this.adjList.get(v2).push(v1);
    }
    
    // DFS 遍历（从某个顶点开始）
    dfs(startVertex) {
        this.visited.clear();
        console.log(`\n🔍 从 ${startVertex} 开始 DFS 遍历：`);
        this._dfsRecursive(startVertex);
        console.log('遍历完成\n');
    }
    
    _dfsRecursive(vertex) {
        // 1. 标记为已访问
        this.visited.add(vertex);
        console.log(`   访问：${vertex}`);
        
        // 2. 获取所有邻居
        const neighbors = this.adjList.get(vertex) || [];
        
        // 3. 递归访问未访问的邻居
        for (let neighbor of neighbors) {
            if (!this.visited.has(neighbor)) {
                this._dfsRecursive(neighbor);
            }
        }
    }
    
    // 打印图
    print() {
        console.log('\n=== 邻接表 ===');
        for (let [vertex, neighbors] of this.adjList) {
            console.log(`${vertex}: ${neighbors.join(', ')}`);
        }
        console.log('===============\n');
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   DFS 递归实现                       ║');
console.log('╚═══════════════════════════════════════╝\n');

const graph = new GraphDFS();

// 创建图
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('E', 'F');

/*
图结构：
    A
   / \
  B — C
 / \   \
D   E — F
*/

graph.print();

// DFS 遍历
graph.dfs('A');

/*
可能的输出：

🔍 从 A 开始 DFS 遍历：
   访问：A
   访问：B
   访问：D
   访问：E
   访问：F
   访问：C
遍历完成

解释：
1. 从 A 开始
2. 访问 B（A 的邻居）
3. 访问 D（B 的邻居）
4. D 没邻居了，回溯到 B
5. 访问 E（B 的另一个邻居）
6. 访问 F（E 的邻居）
7. F 的邻居 C 未访问，访问 C
8. C 的所有邻居都访问过了，结束
*/
```

---

### 实现方式 2：栈版本（非递归）

```javascript
/**
 * DFS 栈实现
 * 
 * 避免递归栈溢出
 */

class GraphDFSStack {
    constructor() {
        this.adjList = new Map();
    }
    
    addEdge(v1, v2) {
        if (!this.adjList.has(v1)) {
            this.adjList.set(v1, []);
        }
        if (!this.adjList.has(v2)) {
            this.adjList.set(v2, []);
        }
        
        this.adjList.get(v1).push(v2);
        this.adjList.get(v2).push(v1);
    }
    
    // DFS 栈实现
    dfsStack(startVertex) {
        const visited = new Set();
        const stack = [startVertex];
        
        console.log(`\n🔍 从 ${startVertex} 开始 DFS（栈实现）：`);
        
        while (stack.length > 0) {
            // 弹出栈顶
            const vertex = stack.pop();
            
            if (!visited.has(vertex)) {
                // 访问当前节点
                console.log(`   访问：${vertex}`);
                visited.add(vertex);
                
                // 将未访问的邻居压入栈
                const neighbors = this.adjList.get(vertex) || [];
                // 逆序压栈，保证正序访问
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    if (!visited.has(neighbors[i])) {
                        stack.push(neighbors[i]);
                    }
                }
            }
        }
        
        console.log('遍历完成\n');
    }
}

// 测试
const graph2 = new GraphDFSStack();
graph2.addEdge('A', 'B');
graph2.addEdge('A', 'C');
graph2.addEdge('B', 'D');
graph2.addEdge('B', 'E');
graph2.addEdge('C', 'F');
graph2.addEdge('E', 'F');

graph2.dfsStack('A');
```

---

### DFS 的应用：路径查找

```javascript
/**
 * 用 DFS 找两个顶点之间的路径
 */

class GraphPathFinder {
    constructor() {
        this.adjList = new Map();
    }
    
    addEdge(v1, v2) {
        if (!this.adjList.has(v1)) {
            this.adjList.set(v1, []);
        }
        if (!this.adjList.has(v2)) {
            this.adjList.set(v2, []);
        }
        
        this.adjList.get(v1).push(v2);
        this.adjList.get(v2).push(v1);
    }
    
    // 查找从 start 到 end 的路径
    findPath(start, end) {
        const visited = new Set();
        const path = [];
        
        console.log(`\n🔍 查找从 ${start} 到 ${end} 的路径：`);
        
        if (this._dfsFindPath(start, end, visited, path)) {
            console.log(`✅ 找到路径：${path.join(' → ')}`);
            return path;
        } else {
            console.log(`❌ 未找到路径`);
            return null;
        }
    }
    
    _dfsFindPath(current, target, visited, path) {
        // 标记为已访问
        visited.add(current);
        path.push(current);
        
        console.log(`   访问：${current}，当前路径：${path.join(' → ')}`);
        
        // 找到目标
        if (current === target) {
            return true;
        }
        
        // 继续搜索邻居
        const neighbors = this.adjList.get(current) || [];
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                if (this._dfsFindPath(neighbor, target, visited, path)) {
                    return true;
                }
            }
        }
        
        // 回溯（此路不通）
        console.log(`   回溯：从 ${current} 退回`);
        path.pop();
        return false;
    }
}

// ==================== 测试 ====================

const finder = new GraphPathFinder();

finder.addEdge('北京', '石家庄');
finder.addEdge('北京', '济南');
finder.addEdge('石家庄', '郑州');
finder.addEdge('济南', '南京');
finder.addEdge('郑州', '武汉');
finder.addEdge('南京', '上海');
finder.addEdge('武汉', '上海');

/*
地图：
北京 — 石家庄 — 郑州 — 武汉 —┐
 |                    ↑      |
济南 — 南京 — 上海 ←——┘
*/

// 查找路径
finder.findPath('北京', '上海');

/*
可能的输出：

🔍 查找从 北京 到 上海 的路径：
   访问：北京，当前路径：北京
   访问：石家庄，当前路径：北京 → 石家庄
   访问：郑州，当前路径：北京 → 石家庄 → 郑州
   访问：武汉，当前路径：北京 → 石家庄 → 郑州 → 武汉
   访问：上海，当前路径：北京 → 石家庄 → 郑州 → 武汉 → 上海
✅ 找到路径：北京 → 石家庄 → 郑州 → 武汉 → 上海
*/
```

---

## 🌊 第 4 步：什么是 BFS？（30 分钟）

### 故事时间：BFS 的思维方式

#### 场景：水波扩散

```
往湖里扔石头：

       石子落水点
          ●
         /|\
        / | \
       /  |  \
      第一圈波纹
     /   |   \
    /    |    \
   /     |     \
  第二圈波纹...
  
一圈一圈往外扩散
这就是 BFS！
```

---

### 💡 BFS 的定义

**官方说法：**
> 广度优先搜索是一种用于遍历或搜索树或图的算法，从根节点开始，逐层向下，先访问同一层的所有节点，然后再访问下一层的节点

**人话版：**
> **BFS = 先访问近的，再访问远的，一层一层往外扩**

```javascript
// BFS 的核心思想

function bfs(startVertex) {
    const queue = [startVertex];  // 队列
    const visited = new Set([startVertex]);
    
    while (queue.length > 0) {
        // 取出队首（最近的）
        const current = queue.shift();
        
        // 访问当前节点
        console.log('访问:', current);
        
        // 将所有未访问的邻居加入队尾
        for (let neighbor of current.neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}

// 关键特点：
// ✓ 用队列实现（FIFO）
// ✓ 层层推进
// ✓ 能找到最短路径（无权图）
```

---

### 🎯 BFS 的形象比喻

#### 比喻 1：病毒传播

```
传染病扩散模式：

第 0 天：A 感染
第 1 天：A 传染给 B、C、D
第 2 天：B、C、D 各自传染给其他人
第 3 天：继续扩散...

A（第 0 代）
│
├─ B、C、D（第 1 代）
│
└─ E、F、G、H...（第 2 代）

一代一代传染
这就是 BFS！
```

---

#### 比喻 2：公司通知

```
老板要通知全公司：

老板
 │
 ├─ 通知 3 个副总裁（第一轮）
 │
 └─ 每个副总裁通知 3 个总监（第二轮）
    │
    └─ 每个总监通知 5 个员工（第三轮）

一层一层往下传
不是只盯着一个部门！
```

---

#### 比喻 3：朋友圈点赞

```
微信朋友圈点赞传播：

你发了朋友圈
 ↓
你的好友点赞（一度人脉）
 ↓
好友的好友看到也点赞（二度人脉）
 ↓
继续扩散...

一波一波传开
也是 BFS！
```

---

## 🔧 第 5 步：BFS 的实现（40 分钟）

### BFS 标准实现

```javascript
/**
 * BFS 队列实现
 */

class GraphBFS {
    constructor() {
        this.adjList = new Map();
    }
    
    addEdge(v1, v2) {
        if (!this.adjList.has(v1)) {
            this.adjList.set(v1, []);
        }
        if (!this.adjList.has(v2)) {
            this.adjList.set(v2, []);
        }
        
        this.adjList.get(v1).push(v2);
        this.adjList.get(v2).push(v1);
    }
    
    // BFS 遍历
    bfs(startVertex) {
        const visited = new Set();
        const queue = [startVertex];
        visited.add(startVertex);
        
        console.log(`\n🔍 从 ${startVertex} 开始 BFS 遍历：`);
        
        while (queue.length > 0) {
            // 取出队首
            const vertex = queue.shift();
            console.log(`   访问：${vertex}`);
            
            // 将所有未访问的邻居加入队尾
            const neighbors = this.adjList.get(vertex) || [];
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        
        console.log('遍历完成\n');
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   BFS 队列实现                       ║');
console.log('╚═══════════════════════════════════════╝\n');

const graph = new GraphBFS();

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('E', 'F');

/*
图结构：
    A
   / \
  B — C
 / \   \
D   E — F
*/

graph.bfs('A');

/*
输出：

🔍 从 A 开始 BFS 遍历：
   访问：A           （第 0 层）
   访问：B           （第 1 层）
   访问：C           （第 1 层）
   访问：D           （第 2 层）
   访问：E           （第 2 层）
   访问：F           （第 2 层）
遍历完成

解释：
1. 访问 A（起点）
2. 访问 A 的所有邻居：B、C
3. 访问 B 的所有邻居：D、E
4. 访问 C 的所有邻居：F（E 已访问）
一层一层推进！
*/
```

---

### BFS 的应用：最短路径

```javascript
/**
 * BFS 最重要的应用：找最短路径
 * 
 * 为什么 BFS 能找到最短路径？
 * 因为它是一层一层搜的
 * 第一次到达终点的路径一定是最短的！
 */

class GraphShortestPath {
    constructor() {
        this.adjList = new Map();
    }
    
    addEdge(v1, v2) {
        if (!this.adjList.has(v1)) {
            this.adjList.set(v1, []);
        }
        if (!this.adjList.has(v2)) {
            this.adjList.set(v2, []);
        }
        
        this.adjList.get(v1).push(v2);
        this.adjList.get(v2).push(v1);
    }
    
    // BFS 找最短路径
    findShortestPath(start, end) {
        if (start === end) {
            return [start];
        }
        
        const visited = new Set();
        const queue = [[start]];  // 队列里存的是路径
        
        console.log(`\n🔍 查找从 ${start} 到 ${end} 的最短路径：`);
        
        while (queue.length > 0) {
            const path = queue.shift();
            const vertex = path[path.length - 1];
            
            if (!visited.has(vertex)) {
                visited.add(vertex);
                
                const neighbors = this.adjList.get(vertex) || [];
                for (let neighbor of neighbors) {
                    // 复制当前路径并添加新节点
                    const newPath = [...path, neighbor];
                    
                    if (neighbor === end) {
                        console.log(`✅ 找到最短路径：${newPath.join(' → ')}`);
                        console.log(`   路径长度：${newPath.length - 1}步`);
                        return newPath;
                    }
                    
                    queue.push(newPath);
                }
            }
        }
        
        console.log(`❌ 未找到路径`);
        return null;
    }
    
    // BFS 计算距离
    calculateDistance(start, end) {
        if (start === end) {
            return 0;
        }
        
        const visited = new Set();
        const queue = [{ vertex: start, distance: 0 }];
        visited.add(start);
        
        while (queue.length > 0) {
            const { vertex, distance } = queue.shift();
            
            const neighbors = this.adjList.get(vertex) || [];
            for (let neighbor of neighbors) {
                if (neighbor === end) {
                    return distance + 1;
                }
                
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push({ vertex: neighbor, distance: distance + 1 });
                }
            }
        }
        
        return -1;  // 不可达
    }
}

// ==================== 测试 ====================

const spGraph = new GraphShortestPath();

spGraph.addEdge('A', 'B');
spGraph.addEdge('A', 'C');
spGraph.addEdge('B', 'D');
spGraph.addEdge('C', 'D');
spGraph.addEdge('D', 'E');

/*
图结构：
A — B
|   |
C — D — E

从 A 到 E 有两条路：
1. A → B → D → E（3 步）
2. A → C → D → E（3 步）
*/

spGraph.findShortestPath('A', 'E');
console.log('距离：', spGraph.calculateDistance('A', 'E'));

/*
输出：

🔍 查找从 A 到 E 的最短路径：
✅ 找到最短路径：A → B → D → E
   路径长度：3 步
距离：3
*/
```

---

## ⚖️ 第 6 步：DFS vs BFS 对比（20 分钟）

### 详细对比表

| 特性 | DFS | BFS |
|-----|-----|-----|
| **数据结构** | 栈（递归） | 队列 |
| **访问顺序** | 深度优先 | 广度优先 |
| **空间复杂度** | O(h) | O(w) |
| **能找到最短路径吗？** | ❌ 不能 | ✅ 能（无权图） |
| **内存使用** | 较少 | 较多 |
| **适用场景** |  maze solving<br>拓扑排序<br>连通性检测 | 最短路径<br>层级遍历<br>社交网络分析 |

---

### 场景选择指南

```javascript
/**
 * 什么时候用 DFS？
 */

// ✅ 适合用 DFS 的场景：

// 1. 迷宫求解（只需要找到一条路）
function solveMaze(maze) {
    // DFS 可以快速深入探索
}

// 2. 检测环路
function hasCycle(graph) {
    // DFS 可以追踪当前路径
}

// 3. 拓扑排序
function topologicalSort(dag) {
    // DFS 后序遍历的逆序
}

// 4. 解决数独、N 皇后等谜题
function solveSudoku(board) {
    // DFS + 回溯
}


/**
 * 什么时候用 BFS？
 */

// ✅ 适合用 BFS 的场景：

// 1. 找最短路径（无权图）
function shortestPath(graph, start, end) {
    // BFS 保证第一次到达就是最短
}

// 2. 层级遍历
function levelOrder(tree) {
    // BFS 天然按层访问
}

// 3. 社交网络分析（六度分隔）
function degreesOfSeparation(network, person1, person2) {
    // BFS 可以找到最少中间人
}

// 4. 爬虫抓取网页
function crawlWeb(url) {
    // BFS 可以控制抓取深度
}
```

---

### 形象记忆法

```
DFS 的记忆口诀：
"不撞南墙不回头"
"一条道走到黑"
"先走深再走宽"

BFS 的记忆口诀：
"稳扎稳打步步营"
"先近后远层层推"
" breadth before depth"
```

---

## 💻 第 7 步：实战项目（30 分钟）

### 项目：迷宫求解器

```javascript
/**
 * 用 DFS 和 BFS 解迷宫
 * 
 * 功能：
 * 1. 生成随机迷宫
 * 2. DFS 求解
 * 3. BFS 求解
 * 4. 对比结果
 */

class MazeSolver {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.maze = [];
        this.start = { row: 0, col: 0 };
        this.end = { row: rows - 1, col: cols - 1 };
    }
    
    // 生成简单迷宫（0=通路，1=墙）
    generateSimpleMaze() {
        // 创建全 0 的迷宫
        this.maze = Array(this.rows).fill(0)
            .map(() => Array(this.cols).fill(0));
        
        // 随机添加一些墙
        const wallCount = Math.floor(this.rows * this.cols * 0.2);
        
        for (let i = 0; i < wallCount; i++) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            
            // 不在起点和终点放墙
            if ((row === 0 && col === 0) || 
                (row === this.rows - 1 && col === this.cols - 1)) {
                continue;
            }
            
            this.maze[row][col] = 1;
        }
        
        console.log('=== 生成的迷宫 ===');
        this.printMaze();
    }
    
    // 打印迷宫
    printMaze(path = null) {
        for (let r = 0; r < this.rows; r++) {
            let line = '';
            for (let c = 0; c < this.cols; c++) {
                if (r === this.start.row && c === this.start.col) {
                    line += 'S ';  // 起点
                } else if (r === this.end.row && c === this.end.col) {
                    line += 'E ';  // 终点
                } else if (path && path.some(p => p.row === r && p.col === c)) {
                    line += '* ';  // 路径
                } else if (this.maze[r][c] === 1) {
                    line += '█ ';  // 墙
                } else {
                    line += '· ';  // 路
                }
            }
            console.log(line);
        }
        console.log();
    }
    
    // DFS 求解
    solveDFS() {
        console.log('🔍 DFS 求解中...\n');
        
        const visited = Array(this.rows).fill(0)
            .map(() => Array(this.cols).fill(false));
        const path = [];
        
        const startTime = Date.now();
        
        if (this._dfs(this.start.row, this.start.col, visited, path)) {
            const endTime = Date.now();
            console.log(`✅ DFS 找到路径！用时：${endTime - startTime}ms`);
            console.log(`   路径长度：${path.length}步`);
            console.log('   路径：');
            this.printMaze(path);
            return path;
        } else {
            console.log('❌ DFS 无解\n');
            return null;
        }
    }
    
    _dfs(row, col, visited, path) {
        // 边界检查
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            return false;
        }
        
        // 检查是否是墙或已访问
        if (this.maze[row][col] === 1 || visited[row][col]) {
            return false;
        }
        
        // 标记为已访问
        visited[row][col] = true;
        path.push({ row, col });
        
        // 到达终点
        if (row === this.end.row && col === this.end.col) {
            return true;
        }
        
        // 尝试四个方向：下、右、上、左
        const directions = [
            { dr: 1, dc: 0 },  // 下
            { dr: 0, dc: 1 },  // 右
            { dr: -1, dc: 0 }, // 上
            { dr: 0, dc: -1 }  // 左
        ];
        
        for (let { dr, dc } of directions) {
            if (this._dfs(row + dr, col + dc, visited, path)) {
                return true;
            }
        }
        
        // 回溯
        path.pop();
        return false;
    }
    
    // BFS 求解
    solveBFS() {
        console.log('\n🔍 BFS 求解中...\n');
        
        const visited = Array(this.rows).fill(0)
            .map(() => Array(this.cols).fill(false));
        const queue = [{ 
            row: this.start.row, 
            col: this.start.col, 
            path: [{ row: this.start.row, col: this.start.col }] 
        }];
        
        visited[this.start.row][this.start.col] = true;
        
        const startTime = Date.now();
        
        while (queue.length > 0) {
            const { row, col, path } = queue.shift();
            
            // 到达终点
            if (row === this.end.row && col === this.end.col) {
                const endTime = Date.now();
                console.log(`✅ BFS 找到路径！用时：${endTime - startTime}ms`);
                console.log(`   路径长度：${path.length}步`);
                console.log('   路径：');
                this.printMaze(path);
                return path;
            }
            
            // 尝试四个方向
            const directions = [
                { dr: 1, dc: 0 },
                { dr: 0, dc: 1 },
                { dr: -1, dc: 0 },
                { dr: 0, dc: -1 }
            ];
            
            for (let { dr, dc } of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (newRow >= 0 && newRow < this.rows &&
                    newCol >= 0 && newCol < this.cols &&
                    !visited[newRow][newCol] &&
                    this.maze[newRow][newCol] === 0) {
                    
                    visited[newRow][newCol] = true;
                    queue.push({
                        row: newRow,
                        col: newCol,
                        path: [...path, { row: newRow, col: newCol }]
                    });
                }
            }
        }
        
        console.log('❌ BFS 无解\n');
        return null;
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   迷宫求解器 - DFS vs BFS            ║');
console.log('╚═══════════════════════════════════════╝\n');

const maze = new MazeSolver(5, 5);
maze.generateSimpleMaze();

// DFS 求解
const dfsPath = maze.solveDFS();

// BFS 求解
const bfsPath = maze.solveBFS();

// 对比
if (dfsPath && bfsPath) {
    console.log('\n📊 对比结果：');
    console.log(`DFS 路径长度：${dfsPath.length}步`);
    console.log(`BFS 路径长度：${bfsPath.length}步`);
    
    if (bfsPath.length <= dfsPath.length) {
        console.log('✅ BFS 找到了更短的路径！');
    } else {
        console.log('⚠️  DFS 碰巧找到了更短的路径');
    }
}

/*
输出示例：

=== 生成的迷宫 ===
S · █ · ·
· · · █ ·
█ · · · █
· █ · · ·
· · · · E

🔍 DFS 求解中...

✅ DFS 找到路径！用时：2ms
   路径长度：9 步
   路径：
S * █ · ·
· * * █ ·
█ · · * █
· █ · * ·
· · · * E

🔍 BFS 求解中...

✅ BFS 找到路径！用时：1ms
   路径长度：9 步
   路径：
S * █ · ·
· * * █ ·
█ · · * █
· █ · * ·
· · · * E

📊 对比结果：
DFS 路径长度：9 步
BFS 路径长度：9 步
✅ BFS 找到了更短的路径！
*/
```

---

## 🎯 费曼输出 #13：解释 DFS 和 BFS（20 分钟）

### 任务 1：向小学生解释两种搜索

**要求：**
- 不用"深度"、"广度"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"有两种找人方法：

第一种就像______，
______。

第二种就像______，
______。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释各自的优缺点

**场景：**
```
小朋友问："哪种方法更好？"
```

**你要解释：**
1. DFS 什么时候好用？
2. BFS 什么时候好用？
3. 为什么 BFS 能找到最短路径？

**要求：**
- 用具体例子说明
- 让小朋友能听懂
- 说明白选择依据

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚 DFS 和 BFS 的区别
□ 我不知道如何解释 BFS 的最短路径
□ 我只能背诵定义，不能用自己的话
□ 我解释不清各自的适用场景
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 8 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释 DFS 和 BFS（各 100 字以内）

**提示：** 不要用专业术语！

---

#### 2. 列举 DFS 和 BFS 的生活例子

**你的答案：**
```
DFS 例子：
1. _________________________________
2. _________________________________

BFS 例子：
1. _________________________________
2. _________________________________
```

---

#### 3. 画出遍历顺序

```
给定以下图：
    A
   / \
  B   C
 / \   \
D   E   F

请画出：
DFS 从 A 开始的访问顺序：____
BFS 从 A 开始的访问顺序：____
```

---

### 进阶题（选做）⭐⭐

#### 4. 实现 DFS 和 BFS

```javascript
class Graph {
    constructor() {
        this.adjList = new Map();
    }
    
    addEdge(v1, v2) {
        // 你的代码
    }
    
    dfs(start) {
        // 递归实现
    }
    
    bfs(start) {
        // 队列实现
    }
}
```

---

### 挑战题（加分）⭐⭐⭐

#### 5. 用 BFS 解决 LeetCode 题目

```javascript
/**
 * LeetCode 111. 二叉树的最小深度
 * 
 * 给定一个二叉树，找出其最小深度。
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * 
 * 提示：用 BFS 一层一层找
 */

function minDepth(root) {
    // 你的代码
}
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. DFS 深度优先搜索**
```
✓ 一条路走到黑
✓ 用栈/递归实现
✓ 适合迷宫求解、拓扑排序
```

**2. BFS 广度优先搜索**
```
✓ 层层推进
✓ 用队列实现
✓ 能找到最短路径
```

**3. 两者对比**
```
✓ 数据结构不同
✓ 访问顺序不同
✓ 应用场景不同
```

**4. 实际应用**
```
✓ 迷宫求解
✓ 路径规划
✓ 社交网络分析
```

---

### 📊 知识框架图

```
图的遍历
├── DFS（深度优先）
│   ├── 栈/递归实现
│   ├── 不回溯不罢休
│   └── 应用：迷宫、拓扑
├── BFS（广度优先）
│   ├── 队列实现
│   ├── 层层推进
│   └── 应用：最短路径
└── 对比
    ├── 数据结构
    ├── 空间复杂度
    └── 适用场景
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第十三天完成了！你真棒！🎉         ║
║                                       ║
║   第二周最后一天了！                 ║
║   明天学习最短路径算法！             ║
║                                       ║
║   坚持就是胜利！                     ║
║   加油！                             ║
║                                       ║
╚═══════════════════════════════════════╝
```

**明天见！继续加油！** ✨

---

**学习时长统计：**
- 📖 阅读 + 理解：110 分钟
- 💻 实战项目：30 分钟
- 💭 思考 + 笔记：15 分钟
- ✍️ 练习 + 费曼输出：20 分钟
- ⏰ 总计：约 2.5-3 小时 ✅
