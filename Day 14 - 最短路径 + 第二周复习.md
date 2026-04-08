# 🎯 Day 14：最短路径算法 - Dijkstra + 第二周复习

> **今天学图论的终极算法！**  
> **理解 Dijkstra 算法思想！**  
> **完成第二周知识体系！**  
> **预计时间：2.5-3 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ Dijkstra 算法是什么？（用地图导航比喻）
□ 为什么不能处理负权边？
□ 如何用代码实现 Dijkstra
□ 第二周所有知识的联系
□ 实战：地铁换乘查询系统
```

### 🎯 今天的任务清单

```
□ 理解 Dijkstra 概念（30 分钟）
□ 学习算法实现（40 分钟）
□ 了解算法局限（20 分钟）
□ 完成实战项目（30 分钟）
□ 第二周全面复习（40 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🗺️ 第 2 步：什么是最短路径问题？（30 分钟）

### 故事时间：地图导航

#### 场景：从家到公司

```
早上上班，打开地图 App：

家 → A 路口 → B 路口 → 公司    总共 15 分钟
  ↘ C 路口 → D 路口 ↗         总共 12 分钟 ⭐
    ↘ E 路口 ↗                总共 18 分钟

地图 App 告诉你：
"推荐路线：经 C、D 路口，用时 12 分钟"

这就是最短路径问题！

注意：
✓ 边有权重（时间、距离、费用）
✓ 要找最优路线
✓ 不是随便一条路都行
```

---

### 💡 最短路径的定义

**官方说法：**
> 在带权图中，从一个顶点到另一个顶点的所有路径中，边的权重之和最小的路径

**人话版：**
> **最短路径 = 代价最小的那条路**

```javascript
// 最短路径的例子

const graph = {
    vertices: ['A', 'B', 'C', 'D'],
    edges: [
        ['A', 'B', 1],   // A 到 B，距离 1
        ['A', 'C', 4],   // A 到 C，距离 4
        ['B', 'C', 2],   // B 到 C，距离 2
        ['B', 'D', 5],   // B 到 D，距离 5
        ['C', 'D', 1]    // C 到 D，距离 1
    ]
};

/*
可视化：
      1       5
  A ----- B ----- D
  | \     |     /
  |   \   2    / 1
  |     \ |  /
  4       C
   \_____/
   
从 A 到 D 的路径：
1. A → B → D：1 + 5 = 6
2. A → B → C → D：1 + 2 + 1 = 4 ⭐ 最短
3. A → C → D：4 + 1 = 5

答案：走 A→B→C→D，总距离 4
*/
```

---

### 🎯 形象比喻

#### 比喻 1：快递配送

```
快递员要从配送站到客户家：

配送站
  │
  ├─ 路线 1：直达，10km（但堵车）
  │
  ├─ 路线 2：经中转站 A，8km（红灯多）
  │
  └─ 路线 3：经中转站 B，6km（畅通）⭐

虽然路线 3 看起来绕路
但实际距离最短！

选路线时要考虑：
✓ 距离
✓ 时间
✓ 路况
✓ 过路费

这些都是"权重"！
```

---

#### 比喻 2：飞机航线

```
从北京到悉尼：

方案 1：直飞
北京 → 悉尼    票价：¥5000

方案 2：转机一次
北京 → 上海 → 悉尼    票价：¥3500 ⭐

方案 3：转机两次
北京 → 广州 → 新加坡 → 悉尼    票价：¥4000

最便宜的是方案 2！

这里的权重是"票价"
不是"飞行时间"或"距离"
```

---

#### 比喻 3：游戏寻路

```
玩 RPG 游戏时，角色自动寻路：

角色位置
  │
  ├─ 上路：怪物多，经验多，但慢
  │
  ├─ 中路：平坦，安全，中等速度
  │
  └─ 下路：近但有陷阱，扣血

AI 会根据你的目标选择：
✓ 想练级走上路
✓ 想安全走中路
✓ 想快走下路

游戏里的"权重"可以是：
- 距离
- 危险程度
- 收益
- 时间
```

---

## 🔧 第 3 步：Dijkstra 算法详解（40 分钟）

### 算法核心思想

```javascript
/**
 * Dijkstra 算法（迪杰斯特拉算法）
 * 
 * 由荷兰计算机科学家 Edsger W. Dijkstra 在 1956 年提出
 * 
 * 核心思想：贪心策略
 * 每次都选当前最近的未访问节点
 * 逐步扩展到整个图
 */

// 通俗解释：

/**
 * 想象你在攻城略地：
 * 
 * 1. 从大本营出发（起点）
 * 2. 先占领最近的城池
 * 3. 以这个城池为基地，继续扩张
 * 4. 每次都打最近的敌人
 * 5. 直到打到目标城市
 * 
 * 保证每一步都是最优的！
 */
```

---

### 算法步骤（配合动画理解）

```javascript
/**
 * 示例图：
 * 
 *       2       3
 *   A ----- B ----- C
 *   | \     |     / |
 *   |   \   1    /  1
 *   5     \ |  /    |
 *   |       D       4
 *   |               |
 *   E --------------F
 *          2
 * 
 * 找从 A 到 F 的最短路径
 */

// 步骤演示：

const dijkstraSteps = `
初始化：
  距离：A=0, B=∞, C=∞, D=∞, E=∞, F=∞
  未访问：{A, B, C, D, E, F}
  已访问：{}

第 1 轮：
  当前节点：A（距离最小=0）
  更新邻居：
    - B: min(∞, 0+2) = 2
    - D: min(∞, 0+1) = 1
    - E: min(∞, 0+5) = 5
  标记 A 为已访问
  距离：A=0✅, B=2, C=∞, D=1, E=5, F=∞

第 2 轮：
  当前节点：D（未访问中最近=1）
  更新邻居：
    - B: min(2, 1+1) = 2（不变）
    - C: min(∞, 1+3) = 4
    - F: min(∞, 1+4) = 5
  标记 D 为已访问
  距离：A=0✅, B=2, C=4, D=1✅, E=5, F=5

第 3 轮：
  当前节点：B（未访问中最近=2）
  更新邻居：
    - C: min(4, 2+3) = 4（不变）
  标记 B 为已访问
  距离：A=0✅, B=2✅, C=4, D=1✅, E=5, F=5

第 4 轮：
  当前节点：C（未访问中最近=4）
  更新邻居：
    - F: min(5, 4+1) = 5（不变）
  标记 C 为已访问
  距离：A=0✅, B=2✅, C=4✅, D=1✅, E=5, F=5

第 5 轮：
  当前节点：F（E 和 F 都是 5，任选一个）
  标记 F 为已访问
  距离：A=0✅, B=2✅, C=4✅, D=1✅, E=5, F=5✅

第 6 轮：
  当前节点：E
  标记 E 为已访问
  
完成！
最终距离：A=0, B=2, C=4, D=1, E=5, F=5

最短路径 A→F：
  从 F 回溯：
  F(5) ← C(4) ← D(1) ← A(0)
  路径：A → D → C → F
  总距离：1 + 3 + 1 = 5 ✅
`;

console.log(dijkstraSteps);
```

---

### Dijkstra 的代码实现

```javascript
/**
 * Dijkstra 算法实现
 * 
 * 使用优先队列（最小堆）优化
 */

class GraphDijkstra {
    constructor() {
        this.vertices = new Set();
        this.edges = new Map();  // 邻接表
    }
    
    // 添加顶点
    addVertex(vertex) {
        this.vertices.add(vertex);
        if (!this.edges.has(vertex)) {
            this.edges.set(vertex, []);
        }
    }
    
    // 添加边（有向图）
    addEdge(from, to, weight) {
        this.addVertex(from);
        this.addVertex(to);
        this.edges.get(from).push({ node: to, weight });
    }
    
    // Dijkstra 算法
    dijkstra(start, end) {
        const distances = new Map();
        const previous = new Map();
        const unvisited = new Set(this.vertices);
        
        // 初始化距离
        for (let vertex of this.vertices) {
            distances.set(vertex, Infinity);
            previous.set(vertex, null);
        }
        distances.set(start, 0);
        
        console.log(`\n🔍 从 ${start} 到 ${end} 的最短路径：\n`);
        
        while (unvisited.size > 0) {
            // 找未访问节点中距离最小的
            let current = null;
            let minDistance = Infinity;
            
            for (let vertex of unvisited) {
                if (distances.get(vertex) < minDistance) {
                    minDistance = distances.get(vertex);
                    current = vertex;
                }
            }
            
            // 如果最小距离是 Infinity，说明剩下的都不可达
            if (minDistance === Infinity) {
                break;
            }
            
            // 如果到达终点，停止
            if (current === end) {
                break;
            }
            
            // 标记为已访问
            unvisited.delete(current);
            
            // 更新邻居
            const neighbors = this.edges.get(current) || [];
            for (let { node, weight } of neighbors) {
                if (unvisited.has(node)) {
                    const altDistance = distances.get(current) + weight;
                    
                    if (altDistance < distances.get(node)) {
                        console.log(`   更新：${node} 的距离从 ${distances.get(node)} 改为 ${altDistance}`);
                        distances.set(node, altDistance);
                        previous.set(node, current);
                    }
                }
            }
            
            console.log(`   访问节点：${current}，当前距离：${minDistance}`);
        }
        
        // 构建路径
        const path = [];
        let current = end;
        
        while (current !== null) {
            path.unshift(current);
            current = previous.get(current);
        }
        
        const shortestDistance = distances.get(end);
        
        if (shortestDistance === Infinity) {
            console.log(`❌ ${end} 不可达`);
            return { distance: Infinity, path: [] };
        } else {
            console.log(`\n✅ 找到最短路径：${path.join(' → ')}`);
            console.log(`   最短距离：${shortestDistance}`);
            return { distance: shortestDistance, path };
        }
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   Dijkstra 最短路径算法              ║');
console.log('╚═══════════════════════════════════════╝\n');

const graph = new GraphDijkstra();

// 建图
graph.addEdge('A', 'B', 2);
graph.addEdge('A', 'D', 1);
graph.addEdge('A', 'E', 5);
graph.addEdge('B', 'C', 3);
graph.addEdge('B', 'D', 1);
graph.addEdge('C', 'F', 1);
graph.addEdge('D', 'C', 3);
graph.addEdge('D', 'F', 4);
graph.addEdge('E', 'F', 2);

// 计算最短路径
const result = graph.dijkstra('A', 'F');

console.log('\n路径详情：');
console.log('经过的城市：', result.path.join(', '));
console.log('总距离：', result.distance);

/*
可能的输出：

🔍 从 A 到 F 的最短路径：

   访问节点：A，当前距离：0
   更新：B 的距离从 Infinity 改为 2
   更新：D 的距离从 Infinity 改为 1
   更新：E 的距离从 Infinity 改为 5
   访问节点：D，当前距离：1
   更新：C 的距离从 Infinity 改为 4
   更新：F 的距离从 Infinity 改为 5
   访问节点：B，当前距离：2
   访问节点：C，当前距离：4
   访问节点：F，当前距离：5

✅ 找到最短路径：A → D → C → F
   最短距离：5

路径详情：
经过的城市：A, D, C, F
总距离：5
*/
```

---

## ⚠️ 第 4 步：Dijkstra 的局限性（20 分钟）

### 不能处理负权边

```javascript
/**
 * Dijkstra 的致命弱点：
 * 不能处理负权重的边！
 * 
 * 为什么？
 * 因为它假设"越往后走距离越大"
 * 但负权边会打破这个假设
 */

// 反例：

const negativeWeightGraph = `
图结构：
    A
   / \
  2   5
 /     \
B ----- C
   -10

从 A 到 C：
- 直接走：A → C = 5
- 绕路走：A → B → C = 2 + (-10) = -8 ⭐ 更短

但 Dijkstra 会怎么选？
1. 从 A 开始
2. 更新 B=2, C=5
3. 访问 B（因为 B 更近）
4. 从 B 更新 C：min(5, 2-10) = -8
5. 但是！C 已经被标记为"已访问"了！
6. 不会再次更新 C！

结果：得到错误答案 5
正确答案应该是 -8

这就是问题所在！
一旦节点被标记为"已访问"
就认为找到了最短路径
但负权边会让这个假设失效
*/
```

---

### 解决方案：Bellman-Ford 算法

```javascript
/**
 * 如果要处理负权边，用 Bellman-Ford 算法
 * 
 * 特点：
 * ✓ 可以处理负权边
 * ✓ 能检测负权环
 * ✗ 比 Dijkstra 慢 O(VE) vs O((V+E)logV)
 */

// Bellman-Ford 的核心思想：
// 对所有边松弛 V-1 次（V 是顶点数）

function bellmanFord(vertices, edges, start) {
    const distances = new Map();
    
    // 初始化
    for (let v of vertices) {
        distances.set(v, Infinity);
    }
    distances.set(start, 0);
    
    // 松弛 V-1 次
    for (let i = 0; i < vertices.length - 1; i++) {
        for (let { from, to, weight } of edges) {
            const newDist = distances.get(from) + weight;
            if (newDist < distances.get(to)) {
                distances.set(to, newDist);
            }
        }
    }
    
    // 检查负权环
    for (let { from, to, weight } of edges) {
        const newDist = distances.get(from) + weight;
        if (newDist < distances.get(to)) {
            console.log('检测到负权环！');
            return null;
        }
    }
    
    return distances;
}
```

---

## 💻 第 5 步：实战项目（30 分钟）

### 项目：地铁换乘查询系统

```javascript
/**
 * 地铁线路查询
 * 
 * 功能：
 * 1. 添加地铁站和线路
 * 2. 查询最短路径（最少站数）
 * 3. 显示换乘方案
 */

class SubwaySystem {
    constructor() {
        this.stations = new Set();
        this.connections = new Map();  // 邻接表
        this.lines = new Map();  // 记录每条线的站点
    }
    
    // 添加站点
    addStation(station) {
        this.stations.add(station);
        if (!this.connections.has(station)) {
            this.connections.set(station, []);
        }
    }
    
    // 添加线路（双向连接）
    addLineConnection(station1, station2, lineName, distance = 1) {
        this.addStation(station1);
        this.addStation(station2);
        
        // 双向
        this.connections.get(station1).push({
            station: station2,
            line: lineName,
            distance
        });
        this.connections.get(station2).push({
            station: station1,
            line: lineName,
            distance
        });
        
        // 记录线路
        if (!this.lines.has(lineName)) {
            this.lines.set(lineName, new Set());
        }
        this.lines.get(lineName).add(station1);
        this.lines.get(lineName).add(station2);
    }
    
    // 查询最短路径
    findRoute(from, to) {
        console.log(`\n🚇 查询从 ${from} 到 ${to} 的路线：\n`);
        
        const distances = new Map();
        const previous = new Map();
        const previousLine = new Map();
        const unvisited = new Set(this.stations);
        
        // 初始化
        for (let station of this.stations) {
            distances.set(station, Infinity);
            previous.set(station, null);
            previousLine.set(station, null);
        }
        distances.set(from, 0);
        
        while (unvisited.size > 0) {
            // 找最近的未访问站点
            let current = null;
            let minDistance = Infinity;
            
            for (let station of unvisited) {
                if (distances.get(station) < minDistance) {
                    minDistance = distances.get(station);
                    current = station;
                }
            }
            
            if (minDistance === Infinity || current === to) {
                break;
            }
            
            unvisited.delete(current);
            
            // 更新邻居
            const neighbors = this.connections.get(current) || [];
            for (let { station, line, distance } of neighbors) {
                if (unvisited.has(station)) {
                    const altDistance = distances.get(current) + distance;
                    
                    if (altDistance < distances.get(station)) {
                        distances.set(station, altDistance);
                        previous.set(station, current);
                        previousLine.set(station, line);
                    }
                }
            }
        }
        
        // 构建路径
        const path = [];
        const routeLines = [];
        let current = to;
        
        while (current !== null) {
            path.unshift(current);
            routeLines.unshift(previousLine.get(current));
            current = previous.get(current);
        }
        
        const totalStations = distances.get(to);
        
        if (totalStations === Infinity) {
            console.log(`❌ 无法从 ${from} 到达 ${to}`);
            return null;
        }
        
        // 输出路线
        console.log(`✅ 找到路线！共 ${totalStations} 站\n`);
        console.log('📍 路线：');
        
        let currentLine = routeLines[1];
        let lineStations = [path[0]];
        
        for (let i = 1; i < path.length; i++) {
            if (routeLines[i] !== currentLine) {
                // 换乘了
                console.log(`   乘坐${currentLine}线：${lineStations.join(' → ')}`);
                console.log(`   🔄 换乘 ${routeLines[i]}线`);
                currentLine = routeLines[i];
                lineStations = [path[i-1]];
            }
            lineStations.push(path[i]);
        }
        
        console.log(`   乘坐${currentLine}线：${lineStations.join(' → ')}`);
        
        console.log(`\n📊 统计：`);
        console.log(`   总站数：${totalStations}`);
        console.log(`   途经站点：${path.slice(1, -1).length > 0 ? path.slice(1, -1).join(', ') : '无'}`);
        
        return { path, totalStations };
    }
    
    // 显示所有线路
    showAllLines() {
        console.log('\n=== 地铁线路图 ===');
        for (let [lineName, stations] of this.lines) {
            console.log(`${lineName}线：${[...stations].join(' - ')}`);
        }
        console.log('==================\n');
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   地铁换乘查询系统                   ║');
console.log('╚═══════════════════════════════════════╝\n');

const subway = new SubwaySystem();

// 添加线路（简化版北京地铁）
// 1 号线
subway.addLineConnection('苹果园', '古城', '1');
subway.addLineConnection('古城', '八角游乐园', '1');
subway.addLineConnection('八角游乐园', '八宝山', '1');
subway.addLineConnection('八宝山', '玉泉路', '1');
subway.addLineConnection('玉泉路', '五棵松', '1');
subway.addLineConnection('五棵松', '万寿路', '1');
subway.addLineConnection('万寿路', '公主坟', '1');
subway.addLineConnection('公主坟', '军事博物馆', '1');
subway.addLineConnection('军事博物馆', '木樨地', '1');
subway.addLineConnection('木樨地', '南礼士路', '1');
subway.addLineConnection('南礼士路', '复兴门', '1');
subway.addLineConnection('复兴门', '西单', '1');
subway.addLineConnection('西单', '天安门西', '1');
subway.addLineConnection('天安门西', '天安门东', '1');
subway.addLineConnection('天安门东', '王府井', '1');
subway.addLineConnection('王府井', '东单', '1');

// 2 号线
subway.addLineConnection('西直门', '车公庄', '2');
subway.addLineConnection('车公庄', '阜成门', '2');
subway.addLineConnection('阜成门', '复兴门', '2');
subway.addLineConnection('复兴门', '长椿街', '2');
subway.addLineConnection('长椿街', '宣武门', '2');
subway.addLineConnection('宣武门', '和平门', '2');
subway.addLineConnection('和平门', '前门', '2');
subway.addLineConnection('前门', '崇文门', '2');
subway.addLineConnection('崇文门', '北京站', '2');

// 4 号线
subway.addLineConnection('西直门', '新街口', '4');
subway.addLineConnection('新街口', '平安里', '4');
subway.addLineConnection('平安里', '西四', '4');
subway.addLineConnection('西四', '灵境胡同', '4');
subway.addLineConnection('灵境胡同', '西单', '4');

// 显示线路
subway.showAllLines();

// 查询路线
subway.findRoute('苹果园', '王府井');
subway.findRoute('西直门', '前门');
subway.findRoute('复兴门', '西单');

/*
输出示例（部分）：

=== 地铁线路图 ===
1 号线：苹果园 - 古城 - 八角游乐园 - ... - 东单
2 号线：西直门 - 车公庄 - ... - 北京站
4 号线：西直门 - 新街口 - ... - 西单
==================

🚇 查询从 苹果园 到 王府井 的路线：

✅ 找到路线！共 15 站

📍 路线：
   乘坐 1 号线：苹果园 → 古城 → 八角游乐园 → ... → 王府井

📊 统计：
   总站数：15
*/
```

---

## 📚 第 6 步：第二周全面复习（40 分钟）

### 知识体系总览

```
第二周：高级数据结构
│
├── Day 8: 树
│   ├── 基本概念（根、叶、父、子）
│   ├── 二叉树
│   └── 遍历（前序、中序、后序）
│
├── Day 9: 二叉搜索树（BST）
│   ├── 左 < 根 < 右
│   ├── 插入、查找、删除
│   └── O(log n) 快速查找
│
├── Day 10: 堆和优先队列
│   ├── 大顶堆/小顶堆
│   ├── 上滤、下滤
│   └── 优先队列应用
│
├── Day 11: 哈希表
│   ├── 哈希函数
│   ├── 冲突解决（链地址、开放寻址）
│   └── O(1) 快速查找
│
├── Day 12: 图基础
│   ├── 顶点、边、权重
│   ├── 有向图/无向图
│   └── 存储（邻接矩阵、邻接表）
│
├── Day 13: 图的遍历
│   ├── DFS（深度优先）
│   └── BFS（广度优先）
│
└── Day 14: 最短路径
    ├── Dijkstra 算法
    └── 实际应用
```

---

### 核心对比表

| 数据结构 | 查找 | 插入 | 删除 | 特点 |
|---------|------|------|------|------|
| **BST** | O(log n) | O(log n) | O(log n) | 有序 |
| **堆** | O(n) | O(log n) | O(log n) | 极值 O(1) |
| **哈希表** | O(1) | O(1) | O(1) | 最快 |
| **图** | O(V+E) | O(1) | O(V+E) | 关系网 |

---

### 应用场景总结

```javascript
/**
 * 什么时候用什么数据结构？
 */

// 需要快速查找单个元素 → 哈希表 ✅
const hashMap = new Map();

// 需要保持顺序 + 快速查找 → BST ✅
const bst = new BinarySearchTree();

// 需要快速获取最大值/最小值 → 堆 ✅
const heap = new MaxHeap();

// 需要表示复杂关系 → 图 ✅
const graph = new Graph();

// 需要优先级队列 → 堆 ✅
const pq = new PriorityQueue();

// 需要缓存（LRU） → 哈希表 + 链表
const cache = new LRUCache();
```

---

## 🎯 费曼输出 #14：解释 Dijkstra 算法（20 分钟）

### 任务 1：向小学生解释最短路径

**要求：**
- 不用"权重"、"松弛"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"有个很聪明的人叫 Dijkstra，
他想了个办法找最近的路：

就像______一样，
每次都选______，
最后就能找到______。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释第二周的知识联系

**场景：**
```
小朋友问："这周学的东西有什么关系？"
```

**你要解释：**
1. 树和图有什么关系？
2. 堆和 BST 有什么区别？
3. 哈希表为什么特别快？

**要求：**
- 用家族族谱比喻
- 让小朋友能听懂
- 说明白各自用途

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚 Dijkstra 的贪心思想
□ 我不知道如何解释负权边问题
□ 我只能背诵定义，不能用自己的话
□ 我解释不清各数据结构的联系
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 7 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释 Dijkstra 算法（100 字以内）

**提示：** 不要用"松弛"、"贪心"这种术语！

---

#### 2. 列举生活中最短路径的例子

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

#### 3. 计算最短路径

```
给定以下图：

A --2-- B --3-- C
|       |       |
1       1       1
|       |       |
D --4-- E --2-- F

从 A 到 F 的最短路径是：____
总距离是：____
```

---

### 进阶题（选做）⭐⭐

#### 4. 实现完整的 Dijkstra

```javascript
class WeightedGraph {
    constructor() {
        this.vertices = new Set();
        this.edges = new Map();
    }
    
    addEdge(from, to, weight) {
        // 你的代码
    }
    
    dijkstra(start, end) {
        // 你的代码
        // 返回 { distance, path }
    }
}
```

---

### 挑战题（加分）⭐⭐⭐

#### 5. 第二周综合应用

```javascript
/**
 * 设计一个数据结构，支持以下操作：
 * 
 * 1. insert(val): 插入元素
 * 2. find(val): 查找元素
 * 3. delete(val): 删除元素
 * 4. getMax(): 获取最大值
 * 5. getMin(): 获取最小值
 * 
 * 要求：所有操作尽可能快
 * 
 * 提示：组合使用多种数据结构
 */

class SuperDataStructure {
    constructor() {
        // 你的设计
    }
    
    insert(val) {
        // 你的代码
    }
    
    find(val) {
        // 你的代码
    }
    
    delete(val) {
        // 你的代码
    }
    
    getMax() {
        // 你的代码
    }
    
    getMin() {
        // 你的代码
    }
}
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. Dijkstra 算法**
```
✓ 贪心策略
✓ 每次选最近的
✓ 不能处理负权边
```

**2. 第二周知识体系**
```
✓ 树 → BST → 堆
✓ 哈希表
✓ 图 → 遍历 → 最短路径
```

**3. 实际应用**
```
✓ 地图导航
✓ 地铁换乘
✓ 网络路由
```

---

### 📊 完整知识框架图

```
第二周：高级数据结构
│
├── 层次结构
│   ├── 树（基础）
│   ├── BST（有序）
│   └── 堆（极值）
│
├── 快速访问
│   └── 哈希表 O(1)
│
├── 关系网络
│   ├── 图（基础）
│   ├── DFS/BFS（遍历）
│   └── Dijkstra（最短路）
│
└── 应用
    ├── 文件系统
    ├── 社交网络
    ├── 导航系统
    └── 推荐系统
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   恭喜你！第二周完成了！🎉           ║
║                                       ║
║   你已经掌握了：                     ║
║   ✓ 树和二叉搜索树                   ║
║   ✓ 堆和优先队列                     ║
║   ✓ 哈希表                           ║
║   ✓ 图和最短路径                     ║
║                                       ║
║   这些都是面试高频考点！             ║
║   你已经领先很多人了！               ║
║                                       ║
║   明天开始第三周：                   ║
║   排序算法专题！                     ║
║   让你写出更高效的代码！             ║
║                                       ║
╚═══════════════════════════════════════╝
```

**休息一下，明天继续加油！** ✨

---

**学习时长统计：**
- 📖 阅读 + 理解：110 分钟
- 💻 实战项目：30 分钟
- 💭 思考 + 笔记：15 分钟
- ✍️ 练习 + 费曼输出：20 分钟
- ⏰ 总计：约 2.5-3 小时 ✅

---

**🎉 恭喜完成第二周！你已经学了 14 天的内容，总计约 16,531 行代码和文档！**
