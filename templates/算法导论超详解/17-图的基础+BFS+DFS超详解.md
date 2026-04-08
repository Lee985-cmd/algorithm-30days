# 📚 算法导论 Part VI - 图的基础 +BFS/DFS超详解

## 第 20 章：万物皆可图 - 图算法基础

### 20.1 什么是图？为什么这么重要？

#### 生活中的图

**场景 1：社交网络**

```
微信好友关系：

你 → 张三（好友）
你 → 李四（好友）
张三 → 王五（好友）
李四 → 赵六（好友）

这就是一个图！

每个人是一个点（顶点）
好友关系是一条线（边）
```

**场景 2：地图导航**

```
北京 → 上海（有高速公路）
北京 → 广州（有高铁）
上海 → 广州（有航班）

城市是点
交通线路是边
距离或时间是边的权重

这也是一个图！
```

**场景 3：网页链接**

```
网页 A → 网页 B（有超链接）
网页 B → 网页 C（有超链接）

网页是点
链接是边

这还是图！
```

**说人话定义：**

```
图 = 点 + 边

顶点（Vertex）：表示对象
边（Edge）：表示对象之间的关系

图能表示任何"关系"！
→ 社交关系
→ 交通网络
→ 依赖关系
→ 流程控制
→ ...

所以叫"万物皆可图"！
```

---

### 20.2 图的术语和分类

#### 基本概念

```
图 G = (V, E)
V: 顶点集合（Vertices）
E: 边集合（Edges）

例如：
V = {A, B, C, D}
E = {(A,B), (B,C), (C,D)}

A -- B
     |
     |
     C -- D

这就是一个图！
```

#### 图的分类

```
1. 有向图 vs 无向图

无向图：边没有方向
A -- B  （A 到 B，B 到 A 都可以）

有向图：边有方向
A → B   （只能从 A 到 B）

2. 加权图 vs 无权图

无权图：所有边都一样
A -- B  （距离相同）

加权图：边有权重（距离、时间、费用等）
A --5-- B  （A 到 B 距离 5）
     \3
      C    （B 到 C 距离 3）

3. 连通图 vs 非连通图

连通图：任意两点都能到达
非连通图：有些点到不了
```

---

### 20.3 图的表示方法

#### 方法 1：邻接矩阵

```javascript
/**
 * 邻接矩阵表示图
 * 
 * 图：
 * 0 -- 1
 * |    |
 * |    |
 * 3 -- 2
 */

const n = 4;  // 4 个顶点
const adjMatrix = [
    [0, 1, 0, 1],  // 顶点 0 连接 1 和 3
    [1, 0, 1, 0],  // 顶点 1 连接 0 和 2
    [0, 1, 0, 1],  // 顶点 2 连接 1 和 3
    [1, 0, 1, 0]   // 顶点 3 连接 0 和 2
];

// 检查是否有边
console.log(adjMatrix[0][1]);  // 1（有边）
console.log(adjMatrix[0][2]);  // 0（无边）

// 优点：
// ✓ 判断两点之间是否有边：O(1)
// ✓ 实现简单

// 缺点：
// ✗ 占用空间大：O(n²)
// ✗ 稀疏图浪费空间
```

#### 方法 2：邻接表（推荐⭐）

```javascript
/**
 * 邻接表表示图
 * 
 * 图：
 * 0 -- 1
 * |    |
 * |    |
 * 3 -- 2
 */

const adjList = [
    [1, 3],      // 顶点 0 的邻居
    [0, 2],      // 顶点 1 的邻居
    [1, 3],      // 顶点 2 的邻居
    [0, 2]       // 顶点 3 的邻居
];

// 遍历顶点 0 的所有邻居
for (let neighbor of adjList[0]) {
    console.log(neighbor);  // 输出：1, 3
}

// 优点：
// ✓ 节省空间：O(V+E)
// ✓ 遍历邻居方便

// 缺点：
// ✗ 判断两点是否有边：O(degree)
```

#### 完整的图类

```javascript
/**
 * 图类 - 邻接表实现
 */
class Graph {
    constructor(vertices) {
        this.vertices = vertices;  // 顶点数
        this.adjList = new Array(vertices).fill(null).map(() => []);
    }
    
    // 添加边（无向图）
    addEdge(v1, v2) {
        this.adjList[v1].push(v2);
        this.adjList[v2].push(v1);  // 无向图要加两次
    }
    
    // 添加边（有向图）
    addDirectedEdge(from, to) {
        this.adjList[from].push(to);
    }
    
    // 获取邻居
    getNeighbors(vertex) {
        return this.adjList[vertex];
    }
    
    // 打印图
    print() {
        for (let i = 0; i < this.vertices; i++) {
            console.log(`${i}: ${this.adjList[i].join(' -> ')}`);
        }
    }
}

// 测试
const g = new Graph(4);
g.addEdge(0, 1);
g.addEdge(0, 3);
g.addEdge(1, 2);
g.addEdge(2, 3);

g.print();
// 输出：
// 0: 1 -> 3
// 1: 0 -> 2
// 2: 1 -> 3
// 3: 0 -> 2
```

---

### 20.4 BFS - 广度优先搜索

#### 核心思想

```
生活比喻：地毯式搜索

想象你在一个迷宫里
要找出口

BFS 的做法：
1. 站在起点，看周围一圈
2. 如果没找到，再往外扩一圈
3. 继续扩大...直到找到

就像水波纹一样扩散！
```

#### 代码实现

```javascript
/**
 * BFS - 广度优先搜索
 * @param {Graph} graph - 图
 * @param {number} start - 起点
 * @returns {number[]} - BFS 遍历顺序
 */
function bfs(graph, start) {
    const visited = new Set();  // 记录访问过的顶点
    const queue = [];           // 队列
    const result = [];          // 遍历结果
    
    // 从起点开始
    visited.add(start);
    queue.push(start);
    
    while (queue.length > 0) {
        // 取出队首
        const vertex = queue.shift();
        result.push(vertex);
        
        // 访问所有邻居
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}

// 测试
const g = new Graph(6);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 3);
g.addEdge(3, 4);
g.addEdge(4, 5);

console.log(bfs(g, 0));
// 输出：[0, 1, 2, 3, 4, 5]（可能因邻居顺序略有不同）
```

#### 详细执行过程（动画版）

```
图结构：
     0
    / \
   1   2
   |   |
   3───┘
   |
   4
   |
   5

从 0 开始 BFS：

═══════════════════════════════════
初始状态
═══════════════════════════════════
visited = {}
queue = []
result = []

═══════════════════════════════════
第 1 步：访问 0
═══════════════════════════════════
visited = {0}
queue = [0]

═══════════════════════════════════
第 2 步：处理 0
═══════════════════════════════════
出队：0
result = [0]

0 的邻居：1, 2
都没访问过

入队 1, 2
visited = {0, 1, 2}
queue = [1, 2]

═══════════════════════════════════
第 3 步：处理 1
═══════════════════════════════════
出队：1
result = [0, 1]

1 的邻居：0, 3
0 已访问，跳过
3 未访问

入队 3
visited = {0, 1, 2, 3}
queue = [2, 3]

═══════════════════════════════════
第 4 步：处理 2
═══════════════════════════════════
出队：2
result = [0, 1, 2]

2 的邻居：0, 3
都已访问，跳过

queue = [3]

═══════════════════════════════════
第 5 步：处理 3
═══════════════════════════════════
出队：3
result = [0, 1, 2, 3]

3 的邻居：1, 2, 4
1,2 已访问，跳过
4 未访问

入队 4
visited = {0, 1, 2, 3, 4}
queue = [4]

═══════════════════════════════════
第 6 步：处理 4
═══════════════════════════════════
出队：4
result = [0, 1, 2, 3, 4]

4 的邻居：3, 5
3 已访问，跳过
5 未访问

入队 5
visited = {0, 1, 2, 3, 4, 5}
queue = [5]

═══════════════════════════════════
第 7 步：处理 5
═══════════════════════════════════
出队：5
result = [0, 1, 2, 3, 4, 5]

5 的邻居：4（已访问）

queue = []

═══════════════════════════════════
结束
═══════════════════════════════════
队列为空，结束！

最终结果：[0, 1, 2, 3, 4, 5] ✓

访问顺序像水波纹一样扩散：
第 1 圈：0
第 2 圈：1, 2
第 3 圈：3
第 4 圈：4
第 5 圈：5
```

#### BFS 的应用

```
1. 最短路径（无权图）
   → 找两个节点之间的最少步数

2. 连通性判断
   → 判断图是否连通

3. 层次遍历
   → 树的层序遍历就是 BFS

4. 爬虫
   → 从种子页面开始，一层层爬取
```

---

### 20.5 DFS - 深度优先搜索

#### 核心思想

```
生活比喻：一条路走到黑

想象你在迷宫里

DFS 的做法：
1. 选一条路一直走
2. 走不通了，退回来
3. 换一条路继续走
4. 重复...直到找到

就像走迷宫不撞南墙不回头！
```

#### 代码实现（递归版本）

```javascript
/**
 * DFS - 深度优先搜索（递归版本）
 * @param {Graph} graph - 图
 * @param {number} start - 起点
 * @returns {number[]} - DFS 遍历顺序
 */
function dfsRecursive(graph, start) {
    const visited = new Set();
    const result = [];
    
    function dfs(vertex) {
        // 访问当前节点
        visited.add(vertex);
        result.push(vertex);
        
        // 递归访问所有邻居
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }
    
    dfs(start);
    return result;
}

// 测试
const g = new Graph(6);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 3);
g.addEdge(3, 4);
g.addEdge(4, 5);

console.log(dfsRecursive(g, 0));
// 输出：[0, 1, 3, 2, 4, 5]（取决于邻居顺序）
```

#### 代码实现（迭代版本）

```javascript
/**
 * DFS - 深度优先搜索（迭代版本）
 */
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [];  // 用栈代替递归
    const result = [];
    
    stack.push(start);
    
    while (stack.length > 0) {
        const vertex = stack.pop();
        
        if (!visited.has(vertex)) {
            visited.add(vertex);
            result.push(vertex);
            
            // 邻居逆序入栈（保证正序访问）
            const neighbors = graph.getNeighbors(vertex);
            for (let i = neighbors.length - 1; i >= 0; i--) {
                if (!visited.has(neighbors[i])) {
                    stack.push(neighbors[i]);
                }
            }
        }
    }
    
    return result;
}
```

#### 详细执行过程

```
同样的图：
     0
    / \
   1   2
   |   |
   3───┘
   |
   4
   |
   5

从 0 开始 DFS：

═══════════════════════════════════
递归版本执行过程
═══════════════════════════════════

调用 dfs(0):
访问 0
result = [0]
邻居：1, 2

先访问 1:
  访问 1
  result = [0, 1]
  邻居：0, 3
  0 已访问，跳过
  
  访问 3:
    访问 3
    result = [0, 1, 3]
    邻居：1, 2, 4
    1 已访问，跳过
    
    访问 2:
      访问 2
      result = [0, 1, 3, 2]
      邻居：0, 3
      都已访问，返回！
    
    访问 4:
      访问 4
      result = [0, 1, 3, 2, 4]
      邻居：3, 5
      3 已访问，跳过
      
      访问 5:
        访问 5
        result = [0, 1, 3, 2, 4, 5]
        邻居：4（已访问）
        返回！
      
      返回！
    
    返回！
  
  返回！

返回！

最终结果：[0, 1, 3, 2, 4, 5] ✓

可以看到是一条路走到黑：
0 → 1 → 3 → 然后回溯 → 2 → 4 → 5
```

---

### 20.6 BFS vs DFS 对比

| 特性 | BFS | DFS |
|------|-----|-----|
| 数据结构 | 队列 | 栈（或递归） |
| 搜索方式 | 层层推进 | 一条路走到黑 |
| 空间复杂度 | O(宽度) | O(深度) |
| 最短路径 | ✓ 能找到（无权图） | ✗ 不一定 |
| 内存消耗 | 较大 | 较小 |
| 适用场景 | 找最短路径 | 遍历、拓扑排序 |

#### 形象对比

```
树结构：
        0
      / | \
     1  2  3
    / \    / \
   4   5  6   7

BFS 顺序：
第 1 层：0
第 2 层：1, 2, 3
第 3 层：4, 5, 6, 7
结果：[0, 1, 2, 3, 4, 5, 6, 7]

DFS 顺序：
0 → 1 → 4 → 回溯 → 5 → 回溯 → 2 → 3 → 6 → 回溯 → 7
结果：[0, 1, 4, 5, 2, 3, 6, 7]
```

---

### 20.7 拓扑排序 - DFS 的应用

#### 问题描述

```
你要完成一些任务，任务之间有依赖关系：

任务 0 → 任务 1（做任务 1 前要先做任务 0）
任务 0 → 任务 2
任务 1 → 任务 3
任务 2 → 任务 3

问：应该按什么顺序完成任务？

答案：拓扑排序！
```

#### 代码实现

```javascript
/**
 * 拓扑排序 - DFS 实现
 * @param {number} n - 任务数
 * @param {number[][]} prerequisites - 依赖关系
 * @returns {number[]} - 完成任务的顺序
 */
function topologicalSort(n, prerequisites) {
    // 建图
    const graph = new Array(n).fill(null).map(() => []);
    for (let [from, to] of prerequisites) {
        graph[from].push(to);
    }
    
    const visited = new Set();
    const path = new Set();  // 当前路径
    const result = [];
    let hasCycle = false;
    
    function dfs(node) {
        if (path.has(node)) {
            hasCycle = true;  // 发现环
            return;
        }
        
        if (visited.has(node)) return;
        
        visited.add(node);
        path.add(node);
        
        for (let neighbor of graph[node]) {
            dfs(neighbor);
        }
        
        path.delete(node);
        result.unshift(node);  // 后序遍历，加到前面
    }
    
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(i);
        }
    }
    
    return hasCycle ? [] : result;
}

// 测试
const n = 4;
const prerequisites = [
    [0, 1],  // 0 → 1
    [0, 2],  // 0 → 2
    [1, 3],  // 1 → 3
    [2, 3]   // 2 → 3
];

console.log(topologicalSort(n, prerequisites));
// 输出：[0, 1, 2, 3] 或 [0, 2, 1, 3]
// 都是合法的拓扑排序
```

---

### 20.8 完整代码（背诵版）

```javascript
/**
 * 图类
 */
class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjList = new Array(vertices).fill(null).map(() => []);
    }
    
    addEdge(v1, v2) {
        this.adjList[v1].push(v2);
        this.adjList[v2].push(v1);
    }
    
    addDirectedEdge(from, to) {
        this.adjList[from].push(to);
    }
    
    getNeighbors(vertex) {
        return this.adjList[vertex];
    }
}

/**
 * BFS - 广度优先搜索
 */
function bfs(graph, start) {
    const visited = new Set();
    const queue = [];
    const result = [];
    
    visited.add(start);
    queue.push(start);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}

/**
 * DFS - 深度优先搜索（递归）
 */
function dfsRecursive(graph, start) {
    const visited = new Set();
    const result = [];
    
    function dfs(vertex) {
        visited.add(vertex);
        result.push(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }
    
    dfs(start);
    return result;
}

/**
 * 拓扑排序
 */
function topologicalSort(n, prerequisites) {
    const graph = new Array(n).fill(null).map(() => []);
    for (let [from, to] of prerequisites) {
        graph[from].push(to);
    }
    
    const visited = new Set();
    const result = [];
    
    function dfs(node) {
        if (visited.has(node)) return;
        visited.add(node);
        
        for (let neighbor of graph[node]) {
            dfs(neighbor);
        }
        
        result.unshift(node);
    }
    
    for (let i = 0; i < n; i++) {
        dfs(i);
    }
    
    return result;
}
```

---

## 总结：图算法核心要点

### 必须掌握的

```
✓ 图的基本概念（顶点、边）
✓ 图的表示（邻接表、邻接矩阵）
✓ BFS 的实现和应用
✓ DFS 的实现和应用
✓ 拓扑排序
```

### 理解的

```
✓ BFS 和 DFS 的区别
✓ 各自的适用场景
✓ 时间复杂度分析
```

### 应用的

```
✓ 社交网络分析
✓ 地图导航
✓ 任务调度
✓ 网络爬虫
✓ 依赖关系管理
```

---

**现在理解图算法了吗？** 🎉

记住这些比喻：
- **图** = 万物皆可表示的关系网
- **BFS** = 地毯式搜索（水波纹扩散）
- **DFS** = 一条路走到黑（不撞南墙不回头）
- **拓扑排序** = 任务安排的先后顺序

**图算法是面试必考！**
**一定要掌握！** 💪🌟
