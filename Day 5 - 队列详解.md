# 🎯 Day 5：队列 - 先来后到

> **今天学一个"公平公正"的数据结构！**  
> **理解 FIFO 原则！**  
> **预计时间：1.5-2 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 队列到底是什么？（用排队比喻）
□ 什么是 FIFO 原则？
□ enqueue 和 dequeue 操作详解
□ 循环队列的原理
□ 实战：叫号系统模拟
```

### 🎯 今天的任务清单

```
□ 理解队列概念（20 分钟）
□ 学习队列的基本操作（25 分钟）
□ 了解循环队列（20 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（15 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🎫 第 2 步：队列是什么？（20 分钟）

### 故事时间：食堂打饭排队

#### 场景：午餐时间的食堂

```
中午 12 点，同学们去食堂打饭：

队伍：
队尾 ← [小明][小红][小刚][小丽] ← 队头
                  ↓
                打饭窗口

来的顺序：
1. 小明第一个来 → 站队头
2. 小红第二个来 → 排小明后面
3. 小刚第三个来 → 排小红后面
4. 小丽第四个来 → 站队尾

打饭顺序：
1. 小明先打（第一个来的）
2. 小红打
3. 小刚打
4. 小丽最后打（最后一个来的）

新来的同学要插队？
→ 只能站队尾，不能插队！

有人想先打？
→ 不行，要讲规矩！先到先得！

这就是队列！🎫
```

---

### 💡 队列的定义

**官方说法：**
> 队列是一种遵循先进先出（FIFO）原则的线性数据结构

**人话版：**
> **队列 = 排队，先来的先服务，后来的后服务**

**FIFO 原则：**
```
First In, First Out
先进先出

第一个放进去的
第一个拿出来
```

```javascript
// JavaScript 中的队列（用数组实现）

const queue = [];

// 入队（enqueue）- 从队尾加入
queue.push('小明');
queue.push('小红');
queue.push('小刚');

console.log(queue);  // ['小明', '小红', '小刚']
// 小明在队头，小刚在队尾

// 出队（dequeue）- 从队头离开
const served = queue.shift();
console.log(served);    // '小明'（第一个来的，第一个被服务）
console.log(queue);     // ['小红', '小刚']

// 这就是 FIFO！
```

---

### 🎯 队列的形象比喻

#### 比喻 1：银行叫号

```
你去银行办事：

取号顺序：
A001 → 小王（8:00 取）
A002 → 小李（8:05 取）
A003 → 小张（8:10 取）
A004 → 小赵（8:15 取）

叫号顺序：
"请 A001 到 3 号窗口" → 小王
"请 A002 到 3 号窗口" → 小李
"请 A003 到 3 号窗口" → 小张
"请 A004 到 3 号窗口" → 小赵

VIP 来了怎么办？
→ 有优先队列（后面会学）
普通人只能老老实实排队！
```

---

#### 比喻 2：打印任务

```
办公室打印机：

提交顺序：
9:00  - 小王：10 页报告
9:01  - 小李：5 页合同
9:02  - 小张：20 页资料
9:03  - 小赵：2 页简历

打印顺序：
1. 先打印小王的报告（10 页）
2. 再打印小李的合同（5 页）
3. 然后打印小张的资料（20 页）
4. 最后打印小赵的简历（2 页）

即使小赵只有 2 页
也要等前面的人都打完！
```

---

#### 比喻 3：消息队列

```
你给朋友发微信：

发送顺序：
消息 1："在吗？"      (10:00:00)
消息 2："有个事..."   (10:00:01)
消息 3："想问你..."   (10:00:02)
消息 4："算了"        (10:00:03)

朋友收到顺序：
完全按发送顺序！
不会先收到"算了"
再收到"在吗？"

消息也要排队！
```

---

## ⚡ 第 3 步：队列的基本操作（25 分钟）

### 队列的常用方法

#### 1️⃣ enqueue() - 入队（从队尾加入）⭐

```javascript
const queue = [];

// 从队尾加入
queue.push('A');
queue.push('B');
queue.push('C');

console.log(queue);  // ['A', 'B', 'C']
// A 在队头，C 在队尾

// 时间复杂度：O(1) ✅
```

---

#### 2️⃣ dequeue() - 出队（从队头离开）⭐

```javascript
const queue = ['A', 'B', 'C'];

// 从队头离开
const removed = queue.shift();
console.log(removed);  // 'A'（第一个来的）
console.log(queue);    // ['B', 'C']

// 如果队列为空
const emptyQueue = [];
const result = emptyQueue.shift();
console.log(result);   // undefined

// 时间复杂度：O(n) ❌
// 因为要移动所有元素
```

---

#### 3️⃣ peek() / front() - 查看队头（不离开）⭐

```javascript
const queue = ['A', 'B', 'C'];

// 只看队头，不出队
const front = queue[0];
console.log(front);    // 'A'
console.log(queue);    // ['A', 'B', 'C']（没变化）

// 封装成方法
class Queue {
    constructor() {
        this.items = [];
    }
    
    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }
}

// 时间复杂度：O(1) ✅
```

---

#### 4️⃣ isEmpty() - 判断是否为空

```javascript
class Queue {
    constructor() {
        this.items = [];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}

const queue = new Queue();
console.log(queue.isEmpty());  // true

queue.enqueue('A');
console.log(queue.isEmpty());  // false
```

---

#### 5️⃣ size() - 获取队列大小

```javascript
class Queue {
    constructor() {
        this.items = [];
    }
    
    size() {
        return this.items.length;
    }
}

const queue = new Queue();
queue.enqueue('A');
queue.enqueue('B');
console.log(queue.size());  // 2
```

---

### 完整的队列实现

```javascript
class Queue {
    constructor() {
        this.items = [];
    }
    
    // 入队
    enqueue(element) {
        this.items.push(element);
    }
    
    // 出队
    dequeue() {
        if (this.isEmpty()) {
            console.log('❌ 队列为空，无法出队');
            return null;
        }
        return this.items.shift();
    }
    
    // 查看队头
    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }
    
    // 查看队尾
    rear() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }
    
    // 判断是否为空
    isEmpty() {
        return this.items.length === 0;
    }
    
    // 获取大小
    size() {
        return this.items.length;
    }
    
    // 清空队列
    clear() {
        this.items = [];
    }
    
    // 打印队列
    print() {
        console.log(this.items.toString());
    }
}

// ==================== 测试 ====================

const queue = new Queue();

console.log('初始状态:', queue.isEmpty());  // true

// 入队
queue.enqueue('A');
queue.enqueue('B');
queue.enqueue('C');
console.log('入队后:');
queue.print();  // A,B,C

// 查看队头
console.log('队头元素:', queue.front());  // A

// 出队
const dequeued = queue.dequeue();
console.log('出队元素:', dequeued);  // A
console.log('出队后:');
queue.print();  // B,C

// 获取大小
console.log('队列大小:', queue.size());  // 2

// 清空
queue.clear();
console.log('清空后:', queue.isEmpty());  // true
```

---

## 🔄 第 4 步：循环队列（20 分钟）

### 问题：普通队列的缺点

```
用数组实现队列的问题：

操作过程：
1. enqueue('A') → [A]
2. enqueue('B') → [A, B]
3. dequeue()    → [B]      (A 走了，位置 0 空着)
4. enqueue('C') → [B, C]
5. dequeue()    → [C]      (B 走了，位置 0、1 空着)
6. dequeue()    → []       (C 走了，位置 0、1、2 空着)

发现问题了吗？
前面的空间都浪费了！
但数组还在往后增长！😫
```

---

### 解决方案：循环队列

```
让数组"首尾相连"：

初始：[ ][ ][ ][ ][ ]
      ↑
     head=0
     tail=0

enqueue('A'): [A][ ][ ][ ][ ]
               ↑        ↑
             head     tail
                   (指向下一个空位)

enqueue('B'): [A][B][ ][ ][ ]
               ↑           ↑
             head        tail

dequeue():    [ ][B][ ][ ][ ]
                  ↑     ↑
                head  tail
(A 走了，head 移到下一个)

enqueue('C'): [ ][B][C][ ][ ]
                  ↑        ↑
                head     tail

dequeue():    [ ][ ][C][ ][ ]
                     ↑   ↑
                   head tail

enqueue('D'): [ ][ ][C][D][ ]
                     ↑      ↑
                   head   tail

现在 tail 到末尾了，怎么办？
→ 绕回到开头！(因为是循环的)

enqueue('E'): [E][ ][C][D][ ]
                  ↑  ↑
                tail head
(tail 绕回来了！)

这就叫循环队列！🔄
```

---

### 循环队列的实现

```javascript
class CircularQueue {
    constructor(size) {
        this.items = new Array(size);
        this.maxSize = size;
        this.head = 0;  // 队头指针
        this.tail = 0;  // 队尾指针（指向下一个空位）
        this.count = 0; // 当前元素个数
    }
    
    // 入队
    enqueue(element) {
        if (this.isFull()) {
            console.log('❌ 队列已满');
            return false;
        }
        
        this.items[this.tail] = element;
        // tail 移到下一个位置（循环）
        this.tail = (this.tail + 1) % this.maxSize;
        this.count++;
        
        console.log(`✅ 入队：${element}`);
        return true;
    }
    
    // 出队
    dequeue() {
        if (this.isEmpty()) {
            console.log('❌ 队列为空');
            return null;
        }
        
        const element = this.items[this.head];
        // head 移到下一个位置（循环）
        this.head = (this.head + 1) % this.maxSize;
        this.count--;
        
        console.log(`出队：${element}`);
        return element;
    }
    
    // 查看队头
    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.head];
    }
    
    // 判断是否为空
    isEmpty() {
        return this.count === 0;
    }
    
    // 判断是否已满
    isFull() {
        return this.count === this.maxSize;
    }
    
    // 获取大小
    size() {
        return this.count;
    }
    
    // 打印队列
    print() {
        if (this.isEmpty()) {
            console.log('队列为空');
            return;
        }
        
        let result = '[';
        for (let i = 0; i < this.count; i++) {
            const index = (this.head + i) % this.maxSize;
            result += this.items[index];
            if (i < this.count - 1) {
                result += ', ';
            }
        }
        result += ']';
        console.log(result);
    }
}

// ==================== 测试 ====================

const queue = new CircularQueue(5);  // 容量为 5

// 入队
queue.enqueue('A');
queue.enqueue('B');
queue.enqueue('C');
queue.print();  // [A, B, C]

// 出队
queue.dequeue();  // A
queue.print();    // [B, C]

// 继续入队
queue.enqueue('D');
queue.enqueue('E');
queue.enqueue('F');
queue.print();  // [B, C, D, E, F]（满了）

// 尝试再入队
queue.enqueue('G');  // ❌ 队列已满

// 出队几个
queue.dequeue();  // B
queue.dequeue();  // C
queue.print();    // [D, E, F]

// 现在可以继续入队
queue.enqueue('H');
queue.enqueue('I');
queue.print();  // [D, E, F, H, I]（又满了）
```

---

## 💻 第 5 步：实战项目（30 分钟）

### 项目：银行叫号系统

```javascript
/**
 * 银行叫号系统
 * 
 * 功能：
 * 1. 取号（普通号、VIP 号）
 * 2. 叫号（按顺序呼叫）
 * 3. 显示等待人数
 * 4. 查询当前号码
 */

class BankQueueSystem {
    constructor() {
        this.normalQueue = new Queue();  // 普通队列
        this.vipQueue = new Queue();     // VIP 队列
        this.currentNumber = 0;          // 当前叫到的号码
        this.nextNormalNumber = 1;       // 下一个普通号码
        this.nextVipNumber = 1;          // 下一个 VIP 号码
    }
    
    // 1. 取普通号
    getNormalNumber(customerName) {
        const number = this.nextNormalNumber++;
        const ticket = {
            type: '普通',
            number: number,
            name: customerName,
            time: new Date().toLocaleTimeString()
        };
        
        this.normalQueue.enqueue(ticket);
        console.log(`🎫 ${customerName}取了普通号：A${number}`);
        console.log(`   前面还有${this.normalQueue.size()}人等待`);
        
        return number;
    }
    
    // 2. 取 VIP 号
    getVipNumber(customerName) {
        const number = this.nextVipNumber++;
        const ticket = {
            type: 'VIP',
            number: number,
            name: customerName,
            time: new Date().toLocaleTimeString()
        };
        
        this.vipQueue.enqueue(ticket);
        console.log(`💎 ${customerName}取了 VIP 号：V${number}`);
        console.log(`   前面还有${this.vipQueue.size()}个 VIP 等待`);
        
        return number;
    }
    
    // 3. 叫号（优先叫 VIP）
    callNext() {
        // 先看有没有 VIP
        if (!this.vipQueue.isEmpty()) {
            const vipTicket = this.vipQueue.dequeue();
            this.currentNumber = vipTicket.number;
            
            console.log('\n📢 请以下客户到窗口办理业务：');
            console.log(`   VIP${vipTicket.number}号 - ${vipTicket.name}`);
            console.log(`   （取号时间：${vipTicket.time}）\n`);
            
            return vipTicket;
        }
        
        // 没有 VIP，叫普通号
        if (!this.normalQueue.isEmpty()) {
            const normalTicket = this.normalQueue.dequeue();
            this.currentNumber = normalTicket.number;
            
            console.log('\n📢 请以下客户到窗口办理业务：');
            console.log(`   A${normalTicket.number}号 - ${normalTicket.name}`);
            console.log(`   （取号时间：${normalTicket.time}）\n`);
            
            return normalTicket;
        }
        
        console.log('暂时没有客户，请稍候...');
        return null;
    }
    
    // 4. 显示当前状态
    showStatus() {
        console.log('\n=== 银行排队系统状态 ===');
        console.log(`当前叫号：${this.currentNumber}`);
        console.log(`普通队列：${this.normalQueue.size()}人等待`);
        console.log(`VIP 队列：${this.vipQueue.size()}人等待`);
        
        if (!this.normalQueue.isEmpty()) {
            console.log('\n普通队列等待中：');
            let current = this.normalQueue.front();
            console.log(`  下一位：A${current.number}号 - ${current.name}`);
        }
        
        if (!this.vipQueue.isEmpty()) {
            console.log('\nVIP 队列等待中：');
            let current = this.vipQueue.front();
            console.log(`  下一位：V${current.number}号 - ${current.name}`);
        }
        
        console.log('=========================\n');
    }
    
    // 5. 查询某人的等待时间
    getWaitTime(type, number) {
        let queue = type === 'VIP' ? this.vipQueue : this.normalQueue;
        let position = 0;
        
        // 简单估算（实际需要遍历队列）
        position = queue.size();
        
        if (position === 0) {
            console.log('该客户已在办理或已离开');
            return 0;
        }
        
        // 假设每人办理需要 5 分钟
        const waitMinutes = position * 5;
        console.log(`${type}${number}号，前面还有${position}人`);
        console.log(`预计等待约${waitMinutes}分钟\n`);
        
        return waitMinutes;
    }
}

// ==================== 测试 ====================

const bankQueue = new BankQueueSystem();

// 显示初始状态
bankQueue.showStatus();

// 客户陆续来取号
bankQueue.getNormalNumber('小王');
bankQueue.getNormalNumber('小李');
bankQueue.getVipNumber('张总');
bankQueue.getNormalNumber('小张');
bankQueue.getVipNumber('李总');
bankQueue.getNormalNumber('小赵');

// 显示当前状态
bankQueue.showStatus();

// 开始叫号
console.log('=== 开始叫号 ===\n');
bankQueue.callNext();  // 应该是 V1 张总
bankQueue.callNext();  // 应该是 V2 李总
bankQueue.callNext();  // 应该是 A1 小王
bankQueue.callNext();  // 应该是 A2 小李

// 查询等待时间
bankQueue.getWaitTime('普通', 3);
bankQueue.getWaitTime('普通', 4);

// 再次显示状态
bankQueue.showStatus();

/*
输出示例：

=== 银行排队系统状态 ===
当前叫号：0
普通队列：0 人等待
VIP 队列：0 人等待
=========================

🎫 小王取了普通号：A1
   前面还有 1 人等待
🎫 小李取了普通号：A2
   前面还有 2 人等待
💎 张总取了 VIP 号：V1
   前面还有 1 个 VIP 等待
🎫 小张取了普通号：A3
   前面还有 3 人等待
💎 李总取了 VIP 号：V2
   前面还有 2 个 VIP 等待
🎫 小赵取了普通号：A4
   前面还有 4 人等待

=== 银行排队系统状态 ===
当前叫号：0
普通队列：4 人等待
VIP 队列：2 人等待

普通队列等待中：
  下一位：A1 号 - 小王

VIP 队列等待中：
  下一位：V1 号 - 张总
=========================

=== 开始叫号 ===

📢 请以下客户到窗口办理业务：
   VIP1 号 - 张总
   （取号时间：10:30:15）

📢 请以下客户到窗口办理业务：
   VIP2 号 - 李总
   （取号时间：10:31:20）

📢 请以下客户到窗口办理业务：
   A1 号 - 小王
   （取号时间：10:30:05）

A3 号，前面还有 2 人
预计等待约 10 分钟
*/
```

---

## 🎯 费曼输出 #5：解释队列（15 分钟）

### 任务 1：向小学生解释队列

**要求：**
- 不用"FIFO"、"入队"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"队列就像______一样。

比如你要______，
第一个来的是______，
最后一个来的是______，
第一个被服务的是______。

这就是"先到先得"的道理。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释为什么需要循环队列

**场景：**
```
小朋友问："为什么要让队列循环起来？"
```

**你要解释：**
1. 普通队列有什么问题？（用浪费空间比喻）
2. 循环队列怎么解决？（用旋转寿司比喻）
3. 生活中还有哪些类似循环的例子？

**要求：**
- 至少创造 1 个不同的比喻
- 用餐厅、游乐场等生活场景
- 让小朋友能听懂

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚为什么叫"先进先出"
□ 我不知道如何解释循环队列的优势
□ 我只能背诵定义，不能用自己的话
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 6 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释什么是队列（100 字以内）

**提示：** 不要用"FIFO"这种术语！

---

#### 2. 列举 3 个生活中类似队列的例子

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

#### 3. 预测以下代码的输出

```javascript
const queue = [];

queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue.shift());  // 输出：？
console.log(queue.shift());  // 输出：？
console.log(queue.shift());  // 输出：？
```

---

### 进阶题（选做）⭐⭐

#### 4. 实现优先级队列

```javascript
/**
 * 带优先级的队列
 * 
 * 规则：
 * - 数字越小，优先级越高
 * - 出队时，优先级高的先出
 */

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        // 你的代码
        // 提示：要找到合适的插入位置
    }
    
    dequeue() {
        // 你的代码
    }
    
    print() {
        console.log(this.items);
    }
}

// 测试
const pq = new PriorityQueue();
pq.enqueue('普通任务', 3);
pq.enqueue('紧急任务', 1);
pq.enqueue('重要任务', 2);

pq.print();  // 应该按优先级排序
console.log(pq.dequeue());  // 紧急任务
console.log(pq.dequeue());  // 重要任务
console.log(pq.dequeue());  // 普通任务
```

---

### 挑战题（加分）⭐⭐⭐

#### 5. 用两个队列实现栈

```javascript
/**
 * 用两个队列实现栈的 LIFO 功能
 * 
 * 提示：
 * - 一个队列用于入栈
 * - 另一个队列用于辅助
 * - 出栈时，把 n-1 个元素倒到另一个队列
 */

class StackWithTwoQueues {
    constructor() {
        this.queue1 = new Queue();
        this.queue2 = new Queue();
    }
    
    push(item) {
        // 你的代码
    }
    
    pop() {
        // 你的代码
    }
}
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 队列的概念**
```
✓ 先进先出（FIFO）
✓ 像排队一样
✓ 队尾进，队头出
```

**2. 队列的操作**
```
✓ enqueue - 入队 O(1)
✓ dequeue - 出队 O(n)
✓ front - 查看队头 O(1)
```

**3. 循环队列**
```
✓ 解决空间浪费问题
✓ 首尾相连的设计
✓ head 和 tail 指针循环移动
```

**4. 队列的应用**
```
✓ 银行叫号系统
✓ 打印任务管理
✓ 消息队列
✓ BFS 算法（后面会学）
```

---

### 📊 知识框架图

```
队列（Queue）
├── 原则：FIFO（先进先出）
├── 操作
│   ├── enqueue - O(1)
│   ├── dequeue - O(n)
│   └── front - O(1)
├── 变种
│   ├── 循环队列
│   └── 优先队列
└── 应用
    ├── 叫号系统
    ├── 打印任务
    └── BFS 算法
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第五天完成了！你真棒！🎉           ║
║                                       ║
║   第一周的基础结束了！               ║
║   你已经掌握了：                     ║
║   ✓ 算法复杂度概念                   ║
║   ✓ 数组和链表                       ║
║   ✓ 栈和队列                         ║
║                                       ║
║   明天学习递归！                     ║
║   这是很重要的思想！                 ║
║                                       ║
╚═══════════════════════════════════════╝
```

**明天见！继续加油！** ✨

---

**学习时长统计：**
- 📖 阅读 + 理解：65 分钟
- 💻 实战项目：30 分钟
- 💭 思考 + 笔记：15 分钟
- ✍️ 练习 + 费曼输出：20 分钟
- ⏰ 总计：约 2 小时 ✅
