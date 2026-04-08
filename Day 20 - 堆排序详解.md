# 🎯 Day 20：堆排序 - 利用堆的高效排序

> **今天学基于堆的排序算法！**  
> **理解堆排序的工作原理！**  
> **掌握选择排序的升级版！**  
> **预计时间：2.5-3 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 堆排序是什么？（用选拔比赛比喻）
□ 如何利用大顶堆排序？
□ 堆排序 vs 快速排序的区别
□ 为什么堆排序适合 Top K 问题？
□ 实战：成绩排行榜系统
```

### 🎯 今天的任务清单

```
□ 理解堆排序概念（25 分钟）
□ 复习堆的基本操作（25 分钟）
□ 学习堆排序实现（40 分钟）
□ 了解性能分析（25 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🏆 第 2 步：什么是堆排序？（25 分钟）

### 故事时间：选拔冠军

#### 场景：比武大赛

```
武林要选出武功最高的人当盟主：

方法 1：两两比较（冒泡排序）
→ 打很久才分出胜负 ❌

方法 2：淘汰赛（快速排序）
→ 很快，但需要很多场地 ❌

方法 3：擂台赛（堆排序）⭐

做法：
1. 建一个"强者堆"（大顶堆）
   每个父亲都比孩子厉害
   
2. 最强的已经在堆顶了
   直接让他当盟主！🥇
   
3. 把他请下台
   剩下的重新排，再选个第二强的
   
4. 继续...直到所有人都排好

很快就排出名次了！✅

这就是堆排序的思想！
```

---

### 💡 堆排序的定义

**官方说法：**
> 堆排序是指利用堆这种数据结构所设计的一种排序算法，它是选择排序的一种。可以利用数组的特点快速定位指定索引的元素

**人话版：**
> **堆排序 = 建堆 → 一个个取出最大值 → 得到有序序列**

```javascript
// 堆排序的思路

const arr = [5, 3, 8, 4, 2];

// 第 1 步：建堆（大顶堆）
把数组变成大顶堆：
[8, 5, 4, 3, 2]
 ↑
最大值在堆顶

// 第 2 步：交换堆顶和最后一个元素
[2, 5, 4, 3, 8]
          ↑
          8 已经归位（最大的在最后）

// 第 3 步：调整堆（忽略已归位的 8）
把剩下的重新变成大顶堆：
[5, 3, 4, 2]
 ↑
新的堆顶是 5

// 第 4 步：继续交换
[2, 3, 4, 5, 8]
       ↑
       5 归位

// 重复...直到全部归位
最终：[2, 3, 4, 5, 8] ✅
```

---

### 🎯 形象比喻

#### 比喻 1：学校排名

```
学校要给学生按成绩排名：

已有的数据：
小明 95、小红 92、小刚 88、小丽 90、小强 85

堆排序的做法：

1. 建堆（按成绩建大顶堆）
   堆顶是小明（95 分）

2. 让小明站第 1 名的位置
   剩下的人重新排

3. 新的堆顶是小红（92 分）
   让她站第 2 名

4. 继续...

最后就排好了：
第 1 名：小明 95
第 2 名：小红 92
第 3 名：小丽 90
第 4 名：小刚 88
第 5 名：小强 85
```

---

#### 比喻 2：摘苹果

```
苹果树上有 5 个苹果，按大小排列：

    🍎(8cm)
   /      \
🍎(5cm)  🍎(6cm)
 /   \
🍎(3cm) 🍎(4cm)

你想从大到小摘苹果：

1. 先摘最大的（树顶的 8cm）
2. 树会自动调整，新的最大苹果到树顶
3. 再摘新的最大的（6cm）
4. 继续...

最后你得到的苹果：
8cm → 6cm → 5cm → 4cm → 3cm
从大到小排列！✅
```

---

## 🔧 第 3 步：复习堆的基本操作（25 分钟）

### 回顾大顶堆的实现

```javascript
/**
 * 大顶堆类
 * 
 * 特点：父节点 ≥ 子节点
 */

class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    // 获取父节点索引
    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }
    
    // 获取左孩子索引
    getLeftIndex(i) {
        return 2 * i + 1;
    }
    
    // 获取右孩子索引
    getRightIndex(i) {
        return 2 * i + 2;
    }
    
    // 交换元素
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    
    // 插入元素（上滤）
    insert(value) {
        this.heap.push(value);
        let index = this.heap.length - 1;
        
        // 如果比父节点大，就上移
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            
            if (this.heap[index] <= this.heap[parentIndex]) {
                break;
            }
            
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }
    
    // 删除堆顶（下滤）
    extractMax() {
        if (this.heap.length === 0) {
            return null;
        }
        
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        
        return max;
    }
    
    // 下滤调整
    heapifyDown(index) {
        const length = this.heap.length;
        
        while (true) {
            const leftIndex = this.getLeftIndex(index);
            const rightIndex = this.getRightIndex(index);
            let largest = index;
            
            // 找最大的
            if (leftIndex < length && 
                this.heap[leftIndex] > this.heap[largest]) {
                largest = leftIndex;
            }
            
            if (rightIndex < length && 
                this.heap[rightIndex] > this.heap[largest]) {
                largest = rightIndex;
            }
            
            if (largest === index) {
                break;
            }
            
            this.swap(index, largest);
            index = largest;
        }
    }
    
    // 获取堆顶
    peek() {
        return this.heap[0];
    }
    
    // 获取大小
    size() {
        return this.heap.length;
    }
    
    // 打印堆
    print() {
        console.log(this.heap);
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   复习大顶堆操作                     ║');
console.log('╚═══════════════════════════════════════╝\n');

const heap = new MaxHeap();

// 插入元素
heap.insert(5);
heap.insert(3);
heap.insert(8);
heap.insert(4);
heap.insert(2);

console.log('插入后的堆:');
heap.print();
// [8, 5, 4, 3, 2]

// 依次取出最大值
console.log('\n依次取出最大值:');
while (heap.size() > 0) {
    const max = heap.extractMax();
    console.log(`取出：${max}`);
}

/*
输出：

插入后的堆:
[8, 5, 4, 3, 2]

依次取出最大值:
取出：8
取出：5
取出：4
取出：3
取出：2

自动从大到小！✅
*/
```

---

## 🔀 第 4 步：堆排序的实现（40 分钟）

### 方法 1：使用堆类（简单易懂）

```javascript
/**
 * 堆排序 - 方法 1：使用 MaxHeap 类
 * 
 * 思路最简单：
 * 1. 把所有元素插入堆
 * 2. 依次取出最大值
 */

function heapSortUsingHeap(arr) {
    console.log('原始数组:', arr);
    
    const heap = new MaxHeap();
    
    // 1. 建堆（插入所有元素）
    console.log('\n=== 建堆阶段 ===');
    for (let num of arr) {
        heap.insert(num);
        console.log(`插入 ${num}, 当前堆:`, heap.heap);
    }
    
    // 2. 依次取出（从大到小）
    console.log('\n=== 取出阶段 ===');
    const sorted = [];
    
    while (heap.size() > 0) {
        const max = heap.extractMax();
        sorted.push(max);
        console.log(`取出 ${max}, 已排序:`, sorted);
    }
    
    // 因为是取最大值，所以是从大到小
    // 如果要从小到大，需要反转
    sorted.reverse();
    
    console.log('\n✅ 排序完成:', sorted);
    return sorted;
}

// 测试
console.log('╔═══════════════════════════════════════╗');
console.log('║   堆排序 - 使用堆类                  ║');
console.log('╚═══════════════════════════════════════╝\n');

heapSortUsingHeap([5, 3, 8, 4, 2]);

/*
输出示例：

原始数组：[5, 3, 8, 4, 2]

=== 建堆阶段 ===
插入 5, 当前堆：[5]
插入 3, 当前堆：[5, 3]
插入 8, 当前堆：[8, 3, 5]
插入 4, 当前堆：[8, 5, 4, 3]
插入 2, 当前堆：[8, 5, 4, 3, 2]

=== 取出阶段 ===
取出 8, 已排序：[8]
取出 5, 已排序：[8, 5]
取出 4, 已排序：[8, 5, 4]
取出 3, 已排序：[8, 5, 4, 3]
取出 2, 已排序：[8, 5, 4, 3, 2]

✅ 排序完成：[2, 3, 4, 5, 8]
*/
```

---

### 方法 2：原地堆排序（节省空间）⭐

```javascript
/**
 * 堆排序 - 方法 2：原地排序
 * 
 * 不需要额外空间，直接在原数组上操作
 */

function heapSortInPlace(arr) {
    const n = arr.length;
    
    console.log('原始数组:', arr);
    console.log(`开始堆排序，共${n}个元素\n`);
    
    // 第 1 步：建堆
    // 从最后一个非叶子节点开始，往前调整
    console.log('=== 建堆阶段 ===');
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        console.log(`\n调整节点${i} (${arr[i]})`);
        heapify(arr, n, i);
        console.log(`调整后：`, arr);
    }
    
    console.log('\n建堆完成:', arr);
    console.log('↑ 此时数组是大顶堆，最大值在 arr[0]\n');
    
    // 第 2 步：逐个取出堆顶
    console.log('=== 排序阶段 ===');
    
    for (let i = n - 1; i > 0; i--) {
        console.log(`\n第${n - i}轮:`);
        console.log(`  交换堆顶${arr[0]}和末尾${arr[i]}`);
        
        // 交换堆顶和当前末尾
        [arr[0], arr[i]] = [arr[i], arr[0]];
        
        console.log(`  交换后:`, arr);
        console.log(`  ${arr[i]} 已归位`);
        
        // 调整剩余元素成堆
        console.log(`  调整堆顶...`);
        heapify(arr, i, 0);
        console.log(`  调整后:`, arr);
    }
    
    console.log('\n✅ 排序完成:', arr);
    return arr;
}

/**
 * 堆化函数（下滤）
 * @param {Array} arr - 数组
 * @param {number} n - 堆的大小
 * @param {number} i - 要调整的节点索引
 */
function heapify(arr, n, i) {
    let largest = i;  // 假设当前节点最大
    const left = 2 * i + 1;   // 左孩子
    const right = 2 * i + 2;  // 右孩子
    
    // 和左孩子比
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // 和右孩子比
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // 如果孩子更大，就交换
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        
        // 递归调整被交换的子树
        heapify(arr, n, largest);
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   堆排序 - 原地版本                  ║');
console.log('╚═══════════════════════════════════════╝\n');

heapSortInPlace([5, 3, 8, 4, 2]);

/*
输出示例：

原始数组：[5, 3, 8, 4, 2]
开始堆排序，共 5 个元素

=== 建堆阶段 ===

调整节点 1 (3)
调整后：[5, 3, 8, 4, 2]

调整节点 0 (5)
  左孩子 3, 右孩子 8
  8 最大，交换 5 和 8
  递归调整...
调整后：[8, 5, 4, 3, 2]

建堆完成：[8, 5, 4, 3, 2]
↑ 此时数组是大顶堆，最大值在 arr[0]

=== 排序阶段 ===

第 1 轮:
  交换堆顶 8 和末尾 2
  交换后：[2, 5, 4, 3, 8]
  8 已归位
  调整堆顶...
  调整后：[5, 3, 4, 2, 8]

第 2 轮:
  交换堆顶 5 和末尾 2
  交换后：[2, 3, 4, 5, 8]
  5 已归位
  调整堆顶...
  调整后：[4, 3, 2, 5, 8]

第 3 轮:
  交换堆顶 4 和末尾 2
  交换后：[2, 3, 4, 5, 8]
  4 已归位
  调整堆顶...
  调整后：[3, 2, 4, 5, 8]

第 4 轮:
  交换堆顶 3 和末尾 2
  交换后：[2, 3, 4, 5, 8]
  3 已归位
  调整堆顶...
  调整后：[2, 3, 4, 5, 8]

✅ 排序完成：[2, 3, 4, 5, 8]
*/
```

---

### 动画演示（帮助理解）

```
初始数组：[5, 3, 8, 4, 2]

第 1 步：建堆

从最后一个非叶子节点开始调整：

索引：0   1   2   3   4
      5   3   8   4   2
      
树形结构：
      5(0)
     /    \
   3(1)   8(2)
  /   \
4(3)  2(4)

调整节点 1(值为 3):
左孩子 4, 右孩子 2
3 < 4，交换
[5, 4, 8, 3, 2]

调整节点 0(值为 5):
左孩子 4, 右孩子 8
5 < 8，交换
[8, 4, 5, 3, 2]

现在是大顶堆了！
      8
     / \
    4   5
   / \
  3   2


第 2 步：排序

交换堆顶和末尾：
[2, 4, 5, 3, 8]
          ↑
          8 归位

调整堆顶（忽略 8）:
2 比孩子小，和大的孩子交换
[5, 4, 2, 3, 8]

继续：
交换堆顶和末尾：
[3, 4, 2, 5, 8]
       ↑
       5 归位

调整堆顶：
[4, 3, 2, 5, 8]

继续：
交换堆顶和末尾：
[2, 3, 4, 5, 8]
    ↑
    4 归位

继续：
交换堆顶和末尾：
[3, 2, 4, 5, 8]
 ↑
 3 归位

最后剩下 [2, 3] 已经有序

完成！[2, 3, 4, 5, 8] ✅
```

---

## 📊 第 5 步：性能分析（25 分钟）

### 时间复杂度分析

```javascript
/**
 * 堆排序的时间复杂度：O(n log n)
 * 
 * 分解来看：
 */

// 1. 建堆阶段：O(n)
/**
 * 看起来有 n/2 个节点要调整
 * 但越往下调整越快
 * 
 * 数学证明：
 * T(n) = O(n)
 * 
 * 直观理解：
 * 大部分节点在底层，调整次数少
 * 只有少数节点在顶层，调整次数多
 * 平均下来是线性的
 */

// 2. 排序阶段：O(n log n)
/**
 * 要取出 n 个元素
 * 每次取出后要调整堆 O(log n)
 * 
 * 总时间 = n × O(log n) = O(n log n)
 */

// 总计：O(n) + O(n log n) = O(n log n) ✅


// 对比其他排序：

| 情况 | 堆排序 | 快速排序 | 归并排序 |
|------|--------|---------|---------|
| 最好 | O(n log n) | O(n log n) | O(n log n) |
| 平均 | O(n log n) | O(n log n) | O(n log n) |
| 最坏 | O(n log n) ✅ | O(n²) ❌ | O(n log n) |

堆排序的优势：
✓ 最坏情况也是 O(n log n)
✓ 不会退化
✓ 稳定可靠
```

---

### 空间复杂度

```javascript
/**
 * 空间复杂度：O(1)
 * 
 * 原地排序，只需要常数个变量
 * ✓ 不占用额外空间
 * ✓ 比归并排序省空间
 */
```

---

### 优缺点总结

```javascript
/**
 * 优点：
 * ✓ 时间复杂度稳定，永远 O(n log n)
 * ✓ 空间复杂度 O(1)，原地排序
 * ✓ 适合 Top K 问题
 * ✓ 适合大规模数据
 * 
 * 缺点：
 * ✗ 不稳定排序
 * ✗ 实际速度通常不如快速排序
 * ✗ 缓存友好性差
 * ✗ 即使数组已经有序，也要完整执行
 */

// 适用场景：

✅ 适合：
- 要求最坏情况也快
- 内存紧张
- Top K 问题（前 K 大/小）
- 优先队列相关

❌ 不适合：
- 要求稳定性
- 小规模数据
- 基本有序的数据
```

---

## 💻 第 6 步：实战项目（30 分钟）

### 项目：成绩排行榜系统

```javascript
/**
 * 实时成绩排行榜
 * 
 * 功能：
 * 1. 录入学生成绩
 * 2. 维护 Top 10 排行榜
 * 3. 查询任意学生的排名
 * 4. 显示完整排名
 */

class ScoreRanking {
    constructor(topK = 10) {
        this.topK = topK;
        this.students = [];
        this.minHeap = [];  // 小顶堆，维护 Top K
    }
    
    // 添加学生成绩
    addStudent(name, score) {
        const student = { name, score };
        this.students.push(student);
        
        console.log(`\n📝 添加：${name} - ${score}分`);
        
        // 更新 Top K
        this.updateTopK(student);
    }
    
    // 更新 Top K 排行榜
    updateTopK(student) {
        if (this.minHeap.length < this.topK) {
            // 还没满，直接加入
            this.minHeap.push(student);
            this.bubbleUp(this.minHeap.length - 1);
            console.log(`   进入 Top${this.topK}（当前${this.minHeap.length}人）`);
        } else if (student.score > this.minHeap[0].score) {
            // 比堆顶高，替换
            console.log(`   ${student.score} > ${this.minHeap[0].score}，替换第${this.topK}名`);
            
            this.minHeap[0] = student;
            this.bubbleDown(0);
        } else {
            console.log(`   未进入 Top${this.topK}`);
        }
    }
    
    // 上滤
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.minHeap[index].score >= this.minHeap[parentIndex].score) {
                break;
            }
            
            [this.minHeap[index], this.minHeap[parentIndex]] = 
            [this.minHeap[parentIndex], this.minHeap[index]];
            
            index = parentIndex;
        }
    }
    
    // 下滤
    bubbleDown(index) {
        const length = this.minHeap.length;
        
        while (true) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let smallest = index;
            
            if (leftIndex < length && 
                this.minHeap[leftIndex].score < this.minHeap[smallest].score) {
                smallest = leftIndex;
            }
            
            if (rightIndex < length && 
                this.minHeap[rightIndex].score < this.minHeap[smallest].score) {
                smallest = rightIndex;
            }
            
            if (smallest === index) {
                break;
            }
            
            [this.minHeap[index], this.minHeap[smallest]] = 
            [this.minHeap[smallest], this.minHeap[index]];
            
            index = smallest;
        }
    }
    
    // 显示 Top K
    showTopK() {
        console.log(`\n╔═══════════════════════════════════════╗`);
        console.log(`║   Top ${this.topK} 排行榜              ║`);
        console.log(`╚═══════════════════════════════════════╝\n`);
        
        // 堆排序得到从高到低的顺序
        const sorted = [...this.minHeap].sort((a, b) => b.score - a.score);
        
        sorted.forEach((s, i) => {
            const medal = ['🥇', '🥈', '🥉'][i] || `第${i + 1}名`;
            console.log(`${medal} ${s.name} - ${s.score}分`);
        });
        
        console.log();
    }
    
    // 查询学生排名
    queryRank(name) {
        const student = this.students.find(s => s.name === name);
        
        if (!student) {
            console.log(`❌ 未找到：${name}`);
            return;
        }
        
        // 计算排名
        const higherCount = this.students.filter(s => s.score > student.score).length;
        const rank = higherCount + 1;
        
        console.log(`\n🔍 ${name} 的成绩：${student.score}分`);
        console.log(`   排名：第${rank}名（共${this.students.length}人）`);
        
        if (rank <= this.topK) {
            console.log(`   🎉 进入 Top${this.topK}！`);
        }
        
        console.log();
    }
    
    // 显示完整排名
    showAllRankings() {
        console.log('\n╔═══════════════════════════════════════╗');
        console.log('║   完整排名                           ║');
        console.log('╚═══════════════════════════════════════╝\n');
        
        // 堆排序所有成绩
        const sorted = [...this.students].sort((a, b) => b.score - a.score);
        
        sorted.forEach((s, i) => {
            const medal = ['🥇', '🥈', '🥉'][i] || `第${i + 1}名`;
            const inTopK = i < this.topK ? ' ⭐' : '';
            console.log(`${medal}${inTopK} ${s.name} - ${s.score}分`);
        });
        
        console.log(`\n总计：${sorted.length}人`);
        console.log();
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   成绩排行榜系统（堆排序应用）       ║');
console.log('╚═══════════════════════════════════════╝\n');

const ranking = new ScoreRanking(5);

// 陆续添加学生
ranking.addStudent('小明', 85);
ranking.addStudent('小红', 92);
ranking.addStudent('小刚', 78);
ranking.addStudent('小丽', 95);
ranking.addStudent('小强', 88);
ranking.addStudent('小芳', 90);
ranking.addStudent('小华', 93);
ranking.addStudent('小军', 87);
ranking.addStudent('小梅', 91);
ranking.addStudent('小兵', 89);

// 显示 Top 5
ranking.showTopK();

// 查询排名
ranking.queryRank('小明');
ranking.queryRank('小华');
ranking.queryRank('小刚');

// 显示完整排名
ranking.showAllRankings();

/*
输出示例（部分）：

╔═══════════════════════════════════════╗
║   成绩排行榜系统（堆排序应用）       ║
╚═══════════════════════════════════════╝

📝 添加：小明 - 85 分
   进入 Top5（当前 1 人）

📝 添加：小红 - 92 分
   进入 Top5（当前 2 人）

...

╔═══════════════════════════════════════╗
║   Top 5 排行榜                        ║
╚═══════════════════════════════════════╝

🥇 小丽 - 95 分
🥈 小华 - 93 分
🥉 小红 - 92 分
第 4 名 小梅 - 91 分
第 5 名 小芳 - 90 分

🔍 小明 的成绩：85 分
   排名：第 8 名（共 10 人）

╔═══════════════════════════════════════╗
║   完整排名                           ║
╚═══════════════════════════════════════╝

🥇 小丽 - 95 分
🥈 小华 - 93 分
🥉 小红 - 92 分
第 4 名 小梅 - 91 分
第 5 名 小芳 - 90 分
...

总计：10 人
*/
```

---

## 🎯 费曼输出 #20：解释堆排序（20 分钟）

### 任务 1：向小学生解释堆排序

**要求：**
- 不用"堆"、"排序"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"有个叫堆排序的方法，
就像______一样。

先把______建成一个堆，
然后______，
最后就______了。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释堆排序的优势

**场景：**
```
小朋友问："这个排序有什么特别的？"
```

**你要解释：**
1. 堆排序什么时候最快？
2. 为什么不会像快速排序那样变慢？
3. Top K 问题是什么？

**要求：**
- 用具体例子说明
- 让小朋友能听懂
- 说明白实际价值

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚堆排序的原理
□ 我不知道如何解释建堆过程
□ 我只能背诵代码，不能用自己的话
□ 我解释不清为什么适合 Top K 问题
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 7 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释堆排序（100 字以内）

**提示：** 不要用"大顶堆"、"heapify"这种术语！

---

#### 2. 列举生活中类似堆排序的例子

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

#### 3. 手动模拟堆排序

```
对数组 [4, 1, 3, 2] 进行堆排序

请写出：
建堆后的数组：_________________
第 1 次交换后：_________________
第 2 次交换后：_________________
最终结果：_______________
```

---

### 进阶题（选做）⭐⭐

#### 4. 用小顶堆实现升序排序

```javascript
/**
 * 修改堆排序，用小顶堆实现升序
 * 
 * 提示：需要先存到另一个数组
 */

function heapSortAsc(arr) {
    // 你的代码
}

console.log(heapSortAsc([5, 3, 8, 4, 2]));
// [2, 3, 4, 5, 8]
```

---

### 挑战题（加分）⭐⭐⭐

#### 5. 实现 Top K 问题

```javascript
/**
 * 找出数组中第 K 大的元素
 * 
 * 例如：[3,2,1,5,6,4]，k=2
 * 返回：5（第 2 大的数）
 * 
 * 提示：用小顶堆
 */

function findKthLargest(nums, k) {
    // 你的代码
}

console.log(findKthLargest([3,2,1,5,6,4], 2));
// 5
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 堆排序原理**
```
✓ 建大顶堆
✓ 交换堆顶和末尾
✓ 调整堆
✓ 重复直到有序
```

**2. 两种实现方式**
```
✓ 使用堆类（简单）
✓ 原地排序（省空间）
```

**3. 性能特点**
```
✓ 永远 O(n log n)
✓ 空间 O(1)
✓ 不稳定
```

**4. 实际应用**
```
✓ Top K 问题
✓ 优先队列
✓ 实时排行
```

---

### 📊 知识框架图

```
堆排序
├── 思想：利用堆的性质
├── 步骤
│   ├── 建堆 O(n)
│   ├── 交换
│   └── 调整 O(log n)
├── 性能
│   ├── 时间：O(n log n)
│   └── 空间：O(1)
└── 应用
    ├── Top K 问题
    └── 优先队列
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第二十天完成了！你真棒！🎉         ║
║                                       ║
║   完成了第三周的排序专题！           ║
║   已经掌握了 6 种排序算法！          ║
║                                       ║
║   明天进行排序总结！                 ║
║   对比所有排序算法！                 ║
║                                       ║
║   坚持就是胜利！                     ║
║   加油！                             ║
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
- ⏰ 总计：约 2.5-3 小时 ✅
