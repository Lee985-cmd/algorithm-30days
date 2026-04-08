# 🎯 Day 10：堆和优先队列 - 急诊室的智慧

> **今天学一种特殊的树！**  
> **理解堆的特性和优先队列应用！**  
> **预计时间：2-2.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 堆到底是什么？（用急诊室分诊比喻）
□ 大顶堆和小顶堆的区别
□ 堆的插入和删除操作
□ 如何用数组实现堆
□ 优先队列的应用场景
□ 实战：任务调度系统
```

### 🎯 今天的任务清单

```
□ 理解堆的概念（20 分钟）
□ 学习堆的基本操作（40 分钟）
□ 掌握优先队列（30 分钟）
□ 了解堆排序思想（20 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🏥 第 2 步：什么是堆？（20 分钟）

### 故事时间：医院急诊室

#### 场景：病人分诊

```
医院急诊室来了很多病人：

普通排队（FIFO）：
队头 → [感冒][发烧][骨折][心脏骤停][擦伤] ← 队尾

问题：
✗ 心脏骤停的病人要等所有人看完
✗ 会出人命的！❌

正确做法（优先级队列）：
按病情严重程度排序：
[心脏骤停] → 立即抢救！⭐⭐⭐⭐⭐
[骨折] → 尽快处理 ⭐⭐⭐
[发烧] → 稍等一下 ⭐⭐
[感冒] → 最后再看 ⭐
[擦伤] → 自己贴创可贴吧

这就是堆的思想！🏥
```

---

### 💡 堆的定义

**官方说法：**
> 堆是一种特殊的完全二叉树，满足堆属性：父节点的值总是大于或等于（或小于等于）其子节点的值

**人话版：**
> **堆 = 一层一层比较，父节点永远比孩子大（或小）**

```javascript
// 大顶堆（Max Heap）
// 特点：父节点 ≥ 子节点
        100（根，最大）
       /   \
      85    90
     / \    / \
    70 80  75 60
    
验证：
✓ 100 > 85, 100 > 90
✓ 85 > 70, 85 > 80
✓ 90 > 75, 90 > 60
每层的父节点都比孩子大！
```

---

```javascript
// 小顶堆（Min Heap）
// 特点：父节点 ≤ 子节点
        10（根，最小）
       /  \
      20   30
     / \   / \
    40 50 60 70
    
验证：
✓ 10 < 20, 10 < 30
✓ 20 < 40, 20 < 50
✓ 30 < 60, 30 < 70
每层的父节点都比孩子小！
```

---

### 🎯 堆的形象比喻

#### 比喻 1：公司层级

```
大顶堆 = 按职位高低排列

        CEO（最高）
       /   \
    CTO    CFO（副总裁）
   /  \    /  \
 经理 经理 经理 经理（中层）
 
每个领导都比下属职位高！
```

---

#### 比喻 2：比赛排名

```
小顶堆 = 按成绩排名（数字越小越好）

        第 1 名
       /    \
    第 2 名  第 3 名
   /   \    /   \
 第 4 名 第 5 名 ...
 
每个名次都比后面的好！
```

---

#### 比喻 3：家庭辈分

```
大顶堆 = 按辈分排列

        爷爷（辈分最高）
       /   \
    爸爸    叔叔
   /  \    /  \
  我  妹妹 堂弟 堂妹
 
长辈永远在上面！
```

---

## 🔧 第 3 步：堆的基本操作（40 分钟）

### 重要特性：用数组实现堆

```javascript
/**
 * 堆可以用数组完美实现！
 * 
 * 对于索引 i 的节点：
 * - 父节点索引：Math.floor((i - 1) / 2)
 * - 左孩子索引：2 * i + 1
 * - 右孩子索引：2 * i + 2
 */

// 示例：
//       100(0)
//       /    \
//   85(1)    90(2)
//   /   \    /   \
// 70(3) 80(4) 75(5) 60(6)

// 括号里的是索引

const heap = [100, 85, 90, 70, 80, 75, 60];

// 验证关系：
// 索引 1（85）的父节点：(1-1)/2 = 0 → 100 ✓
// 索引 3（70）的父节点：(3-1)/2 = 1 → 85 ✓
// 索引 1（85）的左孩子：2*1+1 = 3 → 70 ✓
// 索引 1（85）的右孩子：2*1+2 = 4 → 80 ✓

// 太神奇了！不需要指针！
```

---

### 操作 1：插入元素（上滤）

```javascript
/**
 * 插入规则：
 * 1. 放在数组末尾（保持完全二叉树）
 * 2. 跟父节点比较，如果更大就交换（上滤）
 * 3. 重复直到满足堆性质
 */

class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    // 插入值
    insert(value) {
        console.log(`\n📌 插入：${value}`);
        
        // 步骤 1：放到末尾
        this.heap.push(value);
        let index = this.heap.length - 1;
        
        console.log(`   初始位置：索引${index}`);
        console.log(`   当前堆：${this.heap}`);
        
        // 步骤 2：上滤（跟父节点比较）
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.heap[index] <= this.heap[parentIndex]) {
                // 已经比父节点小了，停止
                break;
            }
            
            // 比父节点大，交换
            console.log(`   ${this.heap[index]} > ${this.heap[parentIndex]}，交换`);
            
            [this.heap[index], this.heap[parentIndex]] = 
            [this.heap[parentIndex], this.heap[index]];
            
            index = parentIndex;
            console.log(`   上移到索引${index}`);
            console.log(`   当前堆：${this.heap}`);
        }
    }
}

// ==================== 测试 ====================

const heap = new MaxHeap();

// 依次插入
heap.insert(10);
// [10]

heap.insert(20);
// 20 > 10，交换
// [20, 10]

heap.insert(15);
// 15 < 20，不交换
// [20, 10, 15]

heap.insert(30);
// 30 > 10，交换 → 30 > 20，再交换
// [30, 20, 15, 10]

/*
完整过程演示：

插入 10:
   初始位置：索引 0
   当前堆：[10]

插入 20:
   初始位置：索引 1
   当前堆：[10, 20]
   20 > 10，交换
   上移到索引 0
   当前堆：[20, 10]

插入 15:
   初始位置：索引 2
   当前堆：[20, 10, 15]
   15 < 20，停止

插入 30:
   初始位置：索引 3
   当前堆：[20, 10, 15, 30]
   30 > 10，交换
   上移到索引 1
   当前堆：[20, 30, 15, 10]
   30 > 20，交换
   上移到索引 0
   当前堆：[30, 20, 15, 10]
*/
```

---

### 操作 2：删除堆顶（下滤）

```javascript
class MaxHeap {
    // ... insert 方法 ...
    
    // 删除并返回最大值（堆顶）
    extractMax() {
        if (this.heap.length === 0) {
            console.log('❌ 堆为空');
            return null;
        }
        
        if (this.heap.length === 1) {
            const max = this.heap.pop();
            console.log(`🗑️  删除：${max}`);
            return max;
        }
        
        // 步骤 1：保存堆顶（最大值）
        const max = this.heap[0];
        
        // 步骤 2：把最后一个元素移到堆顶
        const last = this.heap.pop();
        this.heap[0] = last;
        
        console.log(`🗑️  删除：${max}`);
        console.log(`   把${last}移到堆顶`);
        console.log(`   当前堆：${this.heap}`);
        
        // 步骤 3：下滤（跟孩子比较）
        this._heapifyDown(0);
        
        return max;
    }
    
    _heapifyDown(index) {
        const length = this.heap.length;
        
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let largest = index;
            
            // 找最大的节点（自己和两个孩子）
            if (leftChildIndex < length && 
                this.heap[leftChildIndex] > this.heap[largest]) {
                largest = leftChildIndex;
            }
            
            if (rightChildIndex < length && 
                this.heap[rightChildIndex] > this.heap[largest]) {
                largest = rightChildIndex;
            }
            
            // 如果自己最大，停止
            if (largest === index) {
                break;
            }
            
            // 跟较大的孩子交换
            console.log(`   ${this.heap[index]} < ${this.heap[largest]}，交换`);
            
            [this.heap[index], this.heap[largest]] = 
            [this.heap[largest], this.heap[index]];
            
            index = largest;
            console.log(`   下移到索引${index}`);
            console.log(`   当前堆：${this.heap}`);
        }
    }
}

// ==================== 测试 ====================

const heap = new MaxHeap();
heap.insert(30);
heap.insert(20);
heap.insert(15);
heap.insert(10);
heap.insert(25);

console.log('\n原始堆:', heap.heap);
// [30, 25, 15, 10, 20]

console.log('\n--- 删除测试 ---');

heap.extractMax();
// 删除 30
// 把 20 移到堆顶
// 20 < 25，交换
// 20 < 15？不，停止
// 结果：[25, 20, 15, 10]

heap.extractMax();
// 删除 25
// 结果：[20, 10, 15]

/*
详细过程：

🗑️  删除：30
   把 20 移到堆顶
   当前堆：[20, 25, 15, 10]
   20 < 25，交换
   下移到索引 1
   当前堆：[25, 20, 15, 10]
   20 > 10，停止
*/
```

---

### 操作 3：查看堆顶

```javascript
class MaxHeap {
    // ... 其他方法 ...
    
    // 查看最大值（不删除）
    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }
    
    // 获取堆大小
    size() {
        return this.heap.length;
    }
    
    // 判断是否为空
    isEmpty() {
        return this.heap.length === 0;
    }
    
    // 打印堆
    print() {
        console.log(this.heap);
    }
}
```

---

## 🎫 第 4 步：优先队列（30 分钟）

### 什么是优先队列？

```javascript
/**
 * 优先队列 = 带优先级的队列
 * 
 * 特点：
 * ✓ 优先级高的先出队
 * ✓ 不是 FIFO
 * 
 * 实现：用堆！
 */

class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    // 入队（插入）
    enqueue(item, priority) {
        console.log(`📝 入队：${item}（优先级${priority}）`);
        this.heap.push({ item, priority });
        
        // 上滤
        let index = this.heap.length - 1;
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.heap[index].priority <= this.heap[parentIndex].priority) {
                break;
            }
            
            [this.heap[index], this.heap[parentIndex]] = 
            [this.heap[parentIndex], this.heap[index]];
            
            index = parentIndex;
        }
    }
    
    // 出队（删除优先级最高的）
    dequeue() {
        if (this.heap.length === 0) {
            console.log('❌ 队列为空');
            return null;
        }
        
        const front = this.heap[0];
        const last = this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._heapifyDown(0);
        }
        
        console.log(`📤 出队：${front.item}（优先级${front.priority}）`);
        return front;
    }
    
    _heapifyDown(index) {
        const length = this.heap.length;
        
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let highest = index;
            
            if (leftChildIndex < length && 
                this.heap[leftChildIndex].priority > this.heap[highest].priority) {
                highest = leftChildIndex;
            }
            
            if (rightChildIndex < length && 
                this.heap[rightChildIndex].priority > this.heap[highest].priority) {
                highest = rightChildIndex;
            }
            
            if (highest === index) {
                break;
            }
            
            [this.heap[index], this.heap[highest]] = 
            [this.heap[highest], this.heap[index]];
            
            index = highest;
        }
    }
    
    // 查看队首
    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }
    
    // 显示队列
    show() {
        console.log('\n=== 优先队列 ===');
        if (this.heap.length === 0) {
            console.log('空队列');
            return;
        }
        
        this.heap.forEach((node, index) => {
            const priority = '⭐'.repeat(node.priority);
            console.log(`${index}. ${node.item} ${priority}`);
        });
        console.log('===============\n');
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   优先队列 - 医院急诊室模拟           ║');
console.log('╚═══════════════════════════════════════╝\n');

const erQueue = new PriorityQueue();

// 病人陆续到来
erQueue.enqueue('感冒患者', 1);      // 轻微
erQueue.enqueue('骨折患者', 4);      // 严重
erQueue.enqueue('擦伤患者', 1);      // 轻微
erQueue.enqueue('心脏骤停', 5);      // 危急！
erQueue.enqueue('高烧患者', 3);      // 中等
erQueue.enqueue('呼吸困难', 5);      // 危急！

erQueue.show();

// 医生开始诊治
console.log('👨‍⚕️ 医生开始诊治：\n');

erQueue.dequeue();  // 心脏骤停（优先级 5）
erQueue.dequeue();  // 呼吸困难（优先级 5）
erQueue.dequeue();  // 骨折患者（优先级 4）
erQueue.dequeue();  // 高烧患者（优先级 3）
erQueue.dequeue();  // 感冒患者或擦伤患者（优先级 1）
erQueue.dequeue();  // 最后一个

erQueue.show();

/*
输出示例：

╔═══════════════════════════════════════╗
║   优先队列 - 医院急诊室模拟           ║
╚═══════════════════════════════════════╝

📝 入队：感冒患者（优先级 1）
📝 入队：骨折患者（优先级 4）
📝 入队：擦伤患者（优先级 1）
📝 入队：心脏骤停（优先级 5）
📝 入队：高烧患者（优先级 3）
📝 入队：呼吸困难（优先级 5）

=== 优先队列 ===
0. 心脏骤停 ⭐⭐⭐⭐⭐
1. 呼吸困难 ⭐⭐⭐⭐⭐
2. 骨折患者 ⭐⭐⭐⭐
3. 高烧患者 ⭐⭐⭐
4. 感冒患者 ⭐
5. 擦伤患者 ⭐
===============

👨‍⚕️ 医生开始诊治：

📤 出队：心脏骤停（优先级 5）
📤 出队：呼吸困难（优先级 5）
📤 出队：骨折患者（优先级 4）
📤 出队：高烧患者（优先级 3）
📤 出队：感冒患者（优先级 1）
📤 出队：擦伤患者（优先级 1）
*/
```

---

## 💻 第 5 步：实战项目（30 分钟）

### 项目：CPU 任务调度系统

```javascript
/**
 * 操作系统任务调度
 * 
 * 功能：
 * 1. 添加任务（带优先级）
 * 2. 执行下一个任务（优先级最高的）
 * 3. 查看等待队列
 * 4. 统计任务完成情况
 */

class Task {
    constructor(name, priority, duration) {
        this.name = name;          // 任务名
        this.priority = priority;  // 优先级（1-10）
        this.duration = duration;  // 预计耗时（秒）
        this.id = Date.now() + Math.random(); // 唯一 ID
    }
    
    toString() {
        return `${this.name}(P${this.priority},${this.duration}s)`;
    }
}

class TaskScheduler {
    constructor() {
        this.taskHeap = [];
        this.completedTasks = [];
        this.totalExecuted = 0;
    }
    
    // 1. 添加任务
    addTask(name, priority, duration) {
        const task = new Task(name, priority, duration);
        
        console.log(`📝 添加任务：${task.toString()}`);
        
        this.taskHeap.push({ task, priority });
        
        // 上滤
        let index = this.taskHeap.length - 1;
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.taskHeap[index].priority <= 
                this.taskHeap[parentIndex].priority) {
                break;
            }
            
            [this.taskHeap[index], this.taskHeap[parentIndex]] = 
            [this.taskHeap[parentIndex], this.taskHeap[index]];
            
            index = parentIndex;
        }
        
        return task;
    }
    
    // 2. 执行下一个任务
    executeNext() {
        if (this.taskHeap.length === 0) {
            console.log('✅ 所有任务已完成，等待新任务...\n');
            return null;
        }
        
        // 取出优先级最高的任务
        const { task } = this.taskHeap.shift();
        
        // 重新调整堆
        if (this.taskHeap.length > 0) {
            const last = this.taskHeap.pop();
            this.taskHeap.unshift(last);
            this._heapifyDown(0);
        }
        
        console.log(`\n▶️  执行任务：${task.name}`);
        console.log(`   优先级：${task.priority}`);
        console.log(`   预计耗时：${task.duration}秒`);
        
        // 模拟执行
        this.completedTasks.push(task);
        this.totalExecuted++;
        
        console.log(`   ✅ 任务完成！\n`);
        
        return task;
    }
    
    _heapifyDown(index) {
        const length = this.taskHeap.length;
        
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let highest = index;
            
            if (leftChildIndex < length && 
                this.taskHeap[leftChildIndex].priority > 
                this.taskHeap[highest].priority) {
                highest = leftChildIndex;
            }
            
            if (rightChildIndex < length && 
                this.taskHeap[rightChildIndex].priority > 
                this.taskHeap[highest].priority) {
                highest = rightChildIndex;
            }
            
            if (highest === index) {
                break;
            }
            
            [this.taskHeap[index], this.taskHeap[highest]] = 
            [this.taskHeap[highest], this.taskHeap[index]];
            
            index = highest;
        }
    }
    
    // 3. 显示等待队列
    showWaitingQueue() {
        console.log('\n=== 等待执行的任务 ===');
        
        if (this.taskHeap.length === 0) {
            console.log('暂无等待任务');
        } else {
            this.taskHeap.forEach((node, index) => {
                const stars = '⭐'.repeat(node.priority);
                console.log(`${index + 1}. ${node.task.toString()} ${stars}`);
            });
        }
        
        console.log('========================\n');
    }
    
    // 4. 显示完成情况
    showCompletedTasks() {
        console.log('\n=== 已完成的任务 ===');
        
        if (this.completedTasks.length === 0) {
            console.log('暂无完成任务');
        } else {
            this.completedTasks.forEach((task, index) => {
                console.log(`${index + 1}. ${task.name} (P${task.priority})`);
            });
            
            console.log(`\n总共完成：${this.totalExecuted}个任务`);
        }
        
        console.log('======================\n');
    }
    
    // 5. 获取统计信息
    getStats() {
        const total = this.completedTasks.length;
        
        if (total === 0) {
            return { total: 0, avgPriority: 0, avgDuration: 0 };
        }
        
        const sumPriority = this.completedTasks.reduce(
            (sum, task) => sum + task.priority, 0
        );
        
        const sumDuration = this.completedTasks.reduce(
            (sum, task) => sum + task.duration, 0
        );
        
        return {
            total,
            avgPriority: (sumPriority / total).toFixed(2),
            avgDuration: (sumDuration / total).toFixed(2)
        };
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   CPU 任务调度系统 - 堆实现          ║');
console.log('╚═══════════════════════════════════════╝\n');

const scheduler = new TaskScheduler();

// 添加各种任务
scheduler.addTask('系统更新', 3, 120);
scheduler.addTask('病毒扫描', 8, 300);
scheduler.addTask('邮件发送', 2, 5);
scheduler.addTask('文件备份', 5, 60);
scheduler.addTask('紧急补丁', 10, 30);  // 最高优先级！
scheduler.addTask('日志清理', 1, 10);
scheduler.addTask('内存优化', 6, 20);
scheduler.addTask('网络诊断', 4, 45);

// 显示等待队列
scheduler.showWaitingQueue();

// 开始执行任务
console.log('🚀 开始执行任务...\n');

for (let i = 0; i < 10; i++) {
    scheduler.executeNext();
}

// 显示完成情况
scheduler.showCompletedTasks();

// 统计信息
const stats = scheduler.getStats();
console.log('\n📊 统计信息：');
console.log(`完成任务数：${stats.total}`);
console.log(`平均优先级：${stats.avgPriority}`);
console.log(`平均耗时：${stats.avgDuration}秒`);

/*
输出示例（部分）：

╔═══════════════════════════════════════╗
║   CPU 任务调度系统 - 堆实现          ║
╚═══════════════════════════════════════╝

📝 添加任务：系统更新 (P3,120s)
📝 添加任务：病毒扫描 (P8,300s)
📝 添加任务：邮件发送 (P2,5s)
📝 添加任务：文件备份 (P5,60s)
📝 添加任务：紧急补丁 (P10,30s)

=== 等待执行的任务 ===
1. 紧急补丁 (P10,30s) ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
2. 病毒扫描 (P8,300s) ⭐⭐⭐⭐⭐⭐⭐⭐
3. 文件备份 (P5,60s) ⭐⭐⭐⭐⭐
...
========================

🚀 开始执行任务...

▶️  执行任务：紧急补丁
   优先级：10
   预计耗时：30 秒
   ✅ 任务完成！

▶️  执行任务：病毒扫描
   优先级：8
   预计耗时：300 秒
   ✅ 任务完成！

...
*/
```

---

## 🎯 费曼输出 #10：解释堆（20 分钟）

### 任务 1：向小学生解释堆

**要求：**
- 不用"堆"、"优先级"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"这种结构就像______一样。

比如______，
最重要的放______，
次要的放______，
每次取______。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释为什么用堆实现优先队列

**场景：**
```
小朋友问："为什么要用这种奇怪的树？"
```

**你要解释：**
1. 普通队列有什么问题？（不管轻重缓急）
2. 堆怎么解决问题？（自动排序）
3. 为什么堆快？（父子关系）

**要求：**
- 用医院急诊室比喻
- 让小朋友能听懂
- 说明白"插队"的合理性

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚堆和普通树的区别
□ 我不知道如何解释上滤和下滤
□ 我只能背诵定义，不能用自己的话
□ 我解释不清为什么堆能用数组实现
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 6 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释堆（100 字以内）

**提示：** 不要用"完全二叉树"这种术语！

---

#### 2. 列举 3 个生活中类似堆的例子

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

#### 3. 画出堆的插入过程

```
依次插入：10, 20, 15, 30, 25

请画出每一步的堆结构：
```

---

### 进阶题（选做）⭐⭐

#### 4. 实现小顶堆

```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    insert(value) {
        // 你的代码
        // 注意：父节点 ≤ 子节点
    }
    
    extractMin() {
        // 你的代码
    }
}
```

---

### 挑战题（加分）⭐⭐⭐

#### 5. 堆排序

```javascript
/**
 * 用堆实现排序
 * 
 * 思路：
 * 1. 把所有元素建成大顶堆
 * 2. 依次取出堆顶（最大值）
 * 3. 得到有序序列
 */

function heapSort(arr) {
    // 你的代码
}

console.log(heapSort([3, 1, 4, 1, 5, 9, 2, 6]));
// [1, 1, 2, 3, 4, 5, 6, 9]
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 堆的概念**
```
✓ 特殊的完全二叉树
✓ 大顶堆：父 ≥ 子
✓ 小顶堆：父 ≤ 子
```

**2. 堆的操作**
```
✓ 插入：上滤 O(log n)
✓ 删除：下滤 O(log n)
✓ 查看堆顶：O(1)
```

**3. 优先队列**
```
✓ 优先级高的先出
✓ 用堆实现
✓ 应用场景广泛
```

**4. 实际应用**
```
✓ CPU 任务调度
✓ 医院急诊分诊
✓ 事件驱动模拟
```

---

### 📊 知识框架图

```
堆（Heap）
├── 类型
│   ├── 大顶堆（根最大）
│   └── 小顶堆（根最小）
├── 实现：数组
├── 操作
│   ├── 插入（上滤）
│   ├── 删除（下滤）
│   └── 查看堆顶
└── 应用
    ├── 优先队列⭐
    ├── 堆排序
    └── Top K 问题
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第十天完成了！你真棒！🎉           ║
║                                       ║
║   第二周过半了！                     ║
║   你已经掌握了树和堆！               ║
║                                       ║
║   明天学习哈希表！                   ║
║   另一种重要的数据结构！             ║
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
