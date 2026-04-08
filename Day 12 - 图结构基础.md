# 🎯 Day 12：图结构基础 - 复杂的关系网

> **今天学最通用的数据结构！**  
> **理解图的表示和基本概念！**  
> **预计时间：2-2.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 图是什么？（用地图和社交网络比喻）
□ 图的重要术语（顶点、边、权重）
□ 有向图 vs 无向图
□ 邻接矩阵和邻接表
□ 实战：朋友圈共同好友查询
```

### 🎯 今天的任务清单

```
□ 理解图的概念（25 分钟）
□ 学习图的术语（20 分钟）
□ 掌握图的存储方法（40 分钟）
□ 了解图的分类（20 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🗺️ 第 2 步：什么是图？（25 分钟）

### 故事时间：生活中的关系网

#### 场景 1：中国地图

```
城市之间的公路连接：

北京 ---- 天津
 |        |
石家庄 --- 济南
 |        |
郑州 ---- 南京
          |
         上海

每个城市是一个点
每条公路是一条线
这就是图！
```

---

#### 场景 2：微信朋友圈

```
你和朋友的关系：

你 ---- 小明
|      /  \
小红 --    小刚
|    \    /
小丽 -- 小美

每个人是一个点
朋友关系是一条线
这也是图！
```

---

#### 场景 3：地铁线路图

```
地铁线路：

1 号线：东单 ---- 王府井 ---- 西单
              |           |
2 号线：建国门 ---- 复兴门

换乘站是交叉点
线路是连线
这还是图！
```

---

### 💡 图的定义

**官方说法：**
> 图是由顶点的有穷非空集合和顶点之间边的集合组成，通常表示为：G = (V, E)

**人话版：**
> **图 = 一堆点 + 点与点之间的连线**

```javascript
// 图的例子

const graph = {
    // 顶点（Vertices）
    vertices: ['北京', '上海', '广州', '深圳'],
    
    // 边（Edges）
    edges: [
        ['北京', '上海'],
        ['上海', '广州'],
        ['广州', '深圳'],
        ['深圳', '北京']
    ]
};

console.log(graph);
/*
输出：
{
  vertices: ['北京', '上海', '广州', '深圳'],
  edges: [
    ['北京', '上海'],
    ['上海', '广州'],
    ['广州', '深圳'],
    ['深圳', '北京']
  ]
}

可视化：
北京 ---- 上海
 |        |
深圳 ---- 广州
*/
```

---

### 🎯 图的形象比喻

#### 比喻 1：人际关系网

```
公司里的人际关系：

CEO
 |
CTO ---- CFO
 |        |
员工 A -- 员工 B

上下级关系 = 边
职位 = 顶点

通过这个图可以看出：
✓ 谁管谁
✓ 谁和谁是同事
✓ 信息传递路径
```

---

#### 比喻 2：快递配送路线

```
快递站点配送路线：

中转中心
   / | \
A 站 B 站 C 站
 |   |   |
D 站 E 站 F 站

包裹从中转中心出发
沿着路线送到各个站点

优化路线 = 找最短路径
```

---

#### 比喻 3：网页链接

```
互联网网页链接：

首页 → 关于我们
 |      |
产品    新闻
 |      |
详情    详情

每个网页是顶点
超链接是边

整个互联网就是一个巨大的图！
```

---

## 📚 第 3 步：图的重要术语（20 分钟）

### 基本术语

#### 1️⃣ 顶点（Vertex/Node）

```javascript
/**
 * 顶点 = 图中的每个元素
 * 
 * 也叫节点
 */

// 例子
const cities = ['北京', '上海', '广州', '深圳'];
// 每个城市都是一个顶点
```

---

#### 2️⃣ 边（Edge）

```javascript
/**
 * 边 = 顶点之间的连接
 */

// 例子
const roads = [
    ['北京', '上海'],  // 北京到上海的边
    ['上海', '广州'],  // 上海到广州的边
];
```

---

#### 3️⃣ 权重（Weight）

```javascript
/**
 * 权重 = 边的"代价"或"距离"
 */

// 带权重的图
const weightedGraph = {
    vertices: ['A', 'B', 'C'],
    edges: [
        ['A', 'B', 5],   // A 到 B，距离 5
        ['B', 'C', 3],   // B 到 C，距离 3
        ['A', 'C', 10]   // A 到 C，距离 10
    ]
};

/*
可视化：
    5       3
A ------ B ------ C
 \               /
  \             /
   \___________/
       10
*/
```

---

### 图的分类

#### 类型 1：无向图 vs 有向图

```javascript
/**
 * 无向图：边没有方向
 * 有向图：边有方向
 */

// 无向图（双向的）
// A — B 表示 A 和 B 互相可达
const undirected = {
    vertices: ['A', 'B', 'C'],
    edges: [
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'A']
    ]
};

/*
    A
   / \
  B — C
三角形，随便走
*/

// 有向图（单向的）
// A → B 表示只能从 A 到 B
const directed = {
    vertices: ['A', 'B', 'C'],
    edges: [
        ['A', 'B'],  // A → B
        ['B', 'C'],  // B → C
        // 注意：不能从 B 到 A，也不能从 C 到 B
    ]
};

/*
A → B → C
只能顺着箭头走
*/
```

**生活例子：**

```
无向图：
✓ 微信好友（你是他好友，他也是你好友）
✓ 公路（可以来回开）
✓ 夫妻关系

有向图：
✓ 微博关注（你关注他，他不一定要关注你）
✓ 单行道（只能一个方向开）
✓ 父子关系
```

---

#### 类型 2：无权图 vs 有权图

```javascript
/**
 * 无权图：边没有权重
 * 有权图：边有权重（距离、时间、费用等）
 */

// 无权图（只关心是否相连）
const unweighted = {
    vertices: ['家', '公司', '超市'],
    edges: [
        ['家', '公司'],
        ['公司', '超市']
    ]
};

// 有权图（关心距离/时间）
const weighted = {
    vertices: ['家', '公司', '超市'],
    edges: [
        ['家', '公司', 30],    // 30 分钟
        ['公司', '超市', 10],  // 10 分钟
        ['家', '超市', 20]     // 20 分钟
    ]
};

/*
问题：从家到超市怎么走最快？

直接去：20 分钟
经过公司：30 + 10 = 40 分钟

答案：直接去！✅
*/
```

---

#### 类型 3：连通图

```javascript
/**
 * 连通图：任意两个顶点都可达
 * 非连通图：有些顶点不可达
 */

// 连通图
const connected = {
    vertices: ['A', 'B', 'C', 'D'],
    edges: [
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'D'],
        ['D', 'A']
    ]
};
// 从任何点都能到其他点 ✅

// 非连通图
const disconnected = {
    vertices: ['A', 'B', 'C', 'D'],
    edges: [
        ['A', 'B'],
        ['C', 'D']
        // AB 和 CD 两组不相连
    ]
};
// A 到不了 C ❌
```

---

## 💾 第 4 步：图的存储方式（40 分钟）

### 方法 1：邻接矩阵（Adjacency Matrix）⭐

```javascript
/**
 * 邻接矩阵 = 二维数组
 * 
 * matrix[i][j] = 1 表示 i 和 j 相连
 * matrix[i][j] = 0 表示不相连
 */

class GraphMatrix {
    constructor(vertices) {
        this.vertices = vertices;
        this.size = vertices.length;
        // 创建 size×size 的矩阵，初始化为 0
        this.matrix = Array(this.size).fill(0)
            .map(() => Array(this.size).fill(0));
    }
    
    // 添加边（无向图）
    addEdge(v1, v2) {
        const i = this.vertices.indexOf(v1);
        const j = this.vertices.indexOf(v2);
        
        if (i === -1 || j === -1) {
            console.log('❌ 顶点不存在');
            return;
        }
        
        // 无向图：双向连接
        this.matrix[i][j] = 1;
        this.matrix[j][i] = 1;
        
        console.log(`✅ 添加边：${v1} — ${v2}`);
    }
    
    // 添加边（有向图）
    addDirectedEdge(v1, v2) {
        const i = this.vertices.indexOf(v1);
        const j = this.vertices.indexOf(v2);
        
        if (i === -1 || j === -1) {
            console.log('❌ 顶点不存在');
            return;
        }
        
        // 有向图：单向连接
        this.matrix[i][j] = 1;
        
        console.log(`✅ 添加边：${v1} → ${v2}`);
    }
    
    // 检查是否相连
    hasEdge(v1, v2) {
        const i = this.vertices.indexOf(v1);
        const j = this.vertices.indexOf(v2);
        
        return this.matrix[i][j] === 1;
    }
    
    // 获取邻居
    getNeighbors(vertex) {
        const index = this.vertices.indexOf(vertex);
        const neighbors = [];
        
        for (let i = 0; i < this.size; i++) {
            if (this.matrix[index][i] === 1) {
                neighbors.push(this.vertices[i]);
            }
        }
        
        return neighbors;
    }
    
    // 打印矩阵
    print() {
        console.log('\n=== 邻接矩阵 ===');
        
        // 打印表头
        const header = '    ' + this.vertices.map(v => v.padEnd(4)).join(' ');
        console.log(header);
        
        // 打印每一行
        for (let i = 0; i < this.size; i++) {
            const row = this.vertices[i].padEnd(4) + 
                this.matrix[i].map(cell => cell.toString().padEnd(4)).join(' ');
            console.log(row);
        }
        
        console.log('===============\n');
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   邻接矩阵表示图                     ║');
console.log('╚═══════════════════════════════════════╝\n');

const cities = ['北京', '上海', '广州', '深圳'];
const graph = new GraphMatrix(cities);

// 添加边
graph.addEdge('北京', '上海');
graph.addEdge('北京', '深圳');
graph.addEdge('上海', '广州');
graph.addEdge('广州', '深圳');

// 打印矩阵
graph.print();

/*
输出：

=== 邻接矩阵 ===
    北京  上海  广州  深圳
北京  0    1    0    1   
上海  1    0    1    0   
广州  0    1    0    1   
深圳  1    0    1    0   
===============

解释：
- 北京行上海列 = 1 → 北京和上海相连
- 北京行广州列 = 0 → 北京和广州不相连
*/

// 查询
console.log('北京和上海相连吗？', graph.hasEdge('北京', '上海'));  // true
console.log('北京和广州相连吗？', graph.hasEdge('北京', '广州'));  // false

console.log('北京的邻居：', graph.getNeighbors('北京'));  // ['上海', '深圳']
console.log('上海的邻居：', graph.getNeighbors('上海'));  // ['北京', '广州']
```

---

### 方法 2：邻接表（Adjacency List）⭐推荐

```javascript
/**
 * 邻接表 = 对象/Map + 数组
 * 
 * 每个顶点对应一个数组，存储它的所有邻居
 */

class GraphList {
    constructor() {
        this.adjList = new Map();
    }
    
    // 添加顶点
    addVertex(vertex) {
        if (!this.adjList.has(vertex)) {
            this.adjList.set(vertex, []);
            console.log(`✅ 添加顶点：${vertex}`);
        }
    }
    
    // 添加边（无向图）
    addEdge(v1, v2) {
        this.addVertex(v1);
        this.addVertex(v2);
        
        this.adjList.get(v1).push(v2);
        this.adjList.get(v2).push(v1);
        
        console.log(`✅ 添加边：${v1} — ${v2}`);
    }
    
    // 添加边（有向图）
    addDirectedEdge(v1, v2) {
        this.addVertex(v1);
        this.addVertex(v2);
        
        this.adjList.get(v1).push(v2);
        // 注意：反向不加
        
        console.log(`✅ 添加边：${v1} → ${v2}`);
    }
    
    // 获取邻居
    getNeighbors(vertex) {
        return this.adjList.get(vertex) || [];
    }
    
    // 打印邻接表
    print() {
        console.log('\n=== 邻接表 ===');
        
        for (let [vertex, neighbors] of this.adjList) {
            console.log(`${vertex}: ${neighbors.join(' → ')}`);
        }
        
        console.log('===============\n');
    }
    
    // 获取所有顶点
    getVertices() {
        return Array.from(this.adjList.keys());
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   邻接表表示图                       ║');
console.log('╚═══════════════════════════════════════╝\n');

const graph2 = new GraphList();

// 添加边（会自动添加顶点）
graph2.addEdge('北京', '上海');
graph2.addEdge('北京', '深圳');
graph2.addEdge('上海', '广州');
graph2.addEdge('广州', '深圳');
graph2.addEdge('成都', '重庆');  // 另一组

// 打印邻接表
graph2.print();

/*
输出：

=== 邻接表 ===
北京：上海 → 深圳
上海：北京 → 广州
广州：上海 → 深圳
深圳：北京 → 广州
成都：重庆
重庆：成都
===============
*/

// 查询
console.log('北京的邻居：', graph2.getNeighbors('北京'));  // ['上海', '深圳']
console.log('成都的邻居：', graph2.getNeighbors('成都'));  // ['重庆']
```

---

### 两种方法对比

| 特性 | 邻接矩阵 | 邻接表 |
|-----|---------|--------|
| **空间复杂度** | O(V²) | O(V+E) |
| **检查是否相连** | O(1) ✅ | O(degree) |
| **获取邻居** | O(V) | O(1) ✅ |
| **添加边** | O(1) ✅ | O(1) ✅ |
| **适合稀疏图** | ❌ 浪费空间 | ✅ 节省空间 |
| **适合稠密图** | ✅ 可以 | 也可以 |

**建议：**
```
大多数情况用邻接表 ✅
只在需要频繁检查边时用矩阵
```

---

## 💻 第 5 步：实战项目（30 分钟）

### 项目：朋友圈共同好友查询

```javascript
/**
 * 社交网络分析
 * 
 * 功能：
 * 1. 添加用户
 * 2. 建立好友关系
 * 3. 查找共同好友
 * 4. 查找二度人脉
 * 5. 分析社交圈
 */

class SocialNetwork {
    constructor() {
        this.friends = new Map();  // 邻接表存储
    }
    
    // 1. 添加用户
    addUser(name) {
        if (!this.friends.has(name)) {
            this.friends.set(name, new Set());
            console.log(`✅ 添加用户：${name}`);
        }
    }
    
    // 2. 建立好友关系（无向图）
    addFriendship(person1, person2) {
        this.addUser(person1);
        this.addUser(person2);
        
        this.friends.get(person1).add(person2);
        this.friends.get(person2).add(person1);
        
        console.log(`🤝 ${person1} 和 ${person2} 成为好友`);
    }
    
    // 3. 查找共同好友
    findMutualFriends(person1, person2) {
        const friends1 = this.friends.get(person1) || new Set();
        const friends2 = this.friends.get(person2) || new Set();
        
        // 求交集
        const mutual = [...friends1].filter(f => friends2.has(f));
        
        console.log(`\n${person1} 和 ${person2} 的共同好友：`);
        
        if (mutual.length === 0) {
            console.log('  无共同好友');
        } else {
            mutual.forEach(f => console.log(`  - ${f}`));
        }
        
        return mutual;
    }
    
    // 4. 查找二度人脉（朋友的朋友）
    findSecondDegreeConnections(person) {
        const directFriends = this.friends.get(person) || new Set();
        const secondDegree = new Set();
        
        // 遍历每个直接好友
        for (let friend of directFriends) {
            const friendOfFriend = this.friends.get(friend) || new Set();
            
            // 添加到二度人脉（排除自己和直接好友）
            for (let fof of friendOfFriend) {
                if (fof !== person && !directFriends.has(fof)) {
                    secondDegree.add(fof);
                }
            }
        }
        
        console.log(`\n${person} 的二度人脉：`);
        
        if (secondDegree.size === 0) {
            console.log('  无二度人脉');
        } else {
            [...secondDegree].forEach(f => console.log(`  - ${f}`));
        }
        
        return secondDegree;
    }
    
    // 5. 分析某个人的社交圈
    analyzeSocialCircle(person) {
        const directFriends = this.friends.get(person) || new Set();
        
        console.log(`\n=== ${person} 的社交圈分析 ===`);
        console.log(`直接好友数：${directFriends.size}`);
        
        if (directFriends.size > 0) {
            console.log('好友列表：', [...directFriends].join(', '));
        }
        
        // 二度人脉数量
        const secondDegree = this.findSecondDegreeConnections(person);
        console.log(`二度人脉数：${secondDegree.size}`);
        
        // 可能认识的人（二度人脉推荐）
        console.log('\n可能认识的人：');
        if (secondDegree.size === 0) {
            console.log('  暂无推荐');
        } else {
            [...secondDegree].slice(0, 5).forEach(f => {
                console.log(`  - ${f}（可能有共同好友）`);
            });
        }
        
        console.log('=========================\n');
    }
    
    // 6. 显示所有人的好友列表
    showAllUsers() {
        console.log('\n=== 所有用户及好友 ===');
        
        for (let [user, friends] of this.friends) {
            const friendList = [...friends].join(', ') || '无好友';
            console.log(`${user}: ${friendList}`);
        }
        
        console.log(`总用户数：${this.friends.size}\n`);
    }
    
    // 7. 检查两个人是否认识（直接或间接）
    areConnected(person1, person2) {
        // 用 BFS 判断是否连通
        const visited = new Set();
        const queue = [person1];
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (current === person2) {
                return true;
            }
            
            if (!visited.has(current)) {
                visited.add(current);
                const friends = this.friends.get(current) || [];
                queue.push(...friends);
            }
        }
        
        return false;
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   朋友圈社交网络分析                 ║');
console.log('╚═══════════════════════════════════════╝\n');

const network = new SocialNetwork();

// 建立好友关系
network.addFriendship('小明', '小红');
network.addFriendship('小明', '小刚');
network.addFriendship('小红', '小丽');
network.addFriendship('小刚', '小丽');
network.addFriendship('小刚', '小强');
network.addFriendship('小丽', '小美');
network.addFriendship('小强', '小芳');

// 显示所有人
network.showAllUsers();

// 查找共同好友
network.findMutualFriends('小明', '小丽');
network.findMutualFriends('小明', '小强');

// 查找二度人脉
network.findSecondDegreeConnections('小明');

// 分析社交圈
network.analyzeSocialCircle('小明');
network.analyzeSocialCircle('小红');

// 检查是否认识
console.log('小明和小美认识吗？', network.areConnected('小明', '小美'));
console.log('小明和小芳认识吗？', network.areConnected('小明', '小芳'));

/*
输出示例（部分）：

╔═══════════════════════════════════════╗
║   朋友圈社交网络分析                 ║
╚═══════════════════════════════════════╝

✅ 添加用户：小明
✅ 添加用户：小红
🤝 小明 和 小红 成为好友
✅ 添加用户：小刚
🤝 小明 和 小刚 成为好友

=== 所有用户及好友 ===
小明：小红，小刚
小红：小明，小丽
小刚：小明，小丽，小强
小丽：小红，小刚，小美
小强：小刚，小芳
小美：小丽
小芳：小强
总用户数：7

小明 和 小丽 的共同好友：
  - 小红
  - 小刚

小明的二度人脉：
  - 小丽
  - 小强
  - 小美

=== 小明的社交圈分析 ===
直接好友数：2
好友列表：小红，小刚
二度人脉数：3

可能认识的人：
  - 小丽（可能有共同好友）
  - 小强（可能有共同好友）
  - 小美（可能有共同好友）
=========================
*/
```

---

## 🎯 费曼输出 #12：解释图结构（20 分钟）

### 任务 1：向小学生解释图

**要求：**
- 不用"顶点"、"边"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"这种结构就像______一样。

比如______，
每个______是一个点，
______之间用线连起来，
就能看出关系了。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释邻接矩阵和邻接表

**场景：**
```
小朋友问："怎么在电脑里存这个图？"
```

**你要解释：**
1. 邻接矩阵是怎么存的？（用表格比喻）
2. 邻接表是怎么存的？（用名单比喻）
3. 各有什么优缺点？

**要求：**
- 用班级同学关系比喻
- 让小朋友能听懂
- 说明白各自适用场景

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚有向图和无向图的区别
□ 我不知道如何解释邻接表
□ 我只能背诵定义，不能用自己的话
□ 我解释不清图的实际应用
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 6 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释图（100 字以内）

**提示：** 不要用"顶点"、"边"这种术语！

---

#### 2. 列举 3 个生活中类似图的例子

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

#### 3. 画出邻接矩阵

```
给定以下图：
A — B
|   |
C — D

请画出邻接矩阵：
```

---

### 进阶题（选做）⭐⭐

#### 4. 实现有向图

```javascript
class DirectedGraph {
    constructor() {
        this.adjList = new Map();
    }
    
    addEdge(from, to) {
        // 你的代码（只加单向）
    }
    
    hasPath(from, to) {
        // 判断从 from 能否到达 to
    }
}
```

---

### 挑战题（加分）⭐⭐⭐

#### 5. 实现六度分隔理论验证

```javascript
/**
 * 验证"你和任何人之间最多隔 6 个人"
 * 
 * 用 BFS 计算两个人之间的距离
 */

function degreesOfSeparation(network, person1, person2) {
    // 你的代码
    // 返回两个人之间隔了几个人
}
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 图的概念**
```
✓ 顶点 + 边
✓ 通用数据结构
✓ 表示各种关系
```

**2. 图的术语**
```
✓ 有向图 vs 无向图
✓ 有权图 vs 无权图
✓ 连通图
```

**3. 图的存储**
```
✓ 邻接矩阵（二维数组）
✓ 邻接表（Map+ 数组）
✓ 各自的优缺点
```

**4. 实际应用**
```
✓ 社交网络
✓ 地图导航
✓ 网页链接
✓ 推荐系统
```

---

### 📊 知识框架图

```
图（Graph）
├── 基本概念
│   ├── 顶点
│   ├── 边
│   └── 权重
├── 分类
│   ├── 有向/无向
│   ├── 有权/无权
│   └── 连通/非连通
├── 存储方式
│   ├── 邻接矩阵
│   └── 邻接表⭐
└── 应用
    ├── 社交网络
    ├── 地图导航
    └── 推荐系统
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第十二天完成了！你真棒！🎉         ║
║                                       ║
║   第二周即将结束！                   ║
║   你已经掌握了树、堆、哈希表、图！   ║
║                                       ║
║   明天学习图的遍历算法！             ║
║   DFS 和 BFS！                        ║
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
- ⏰ 总计：约 2.5 小时 ✅
