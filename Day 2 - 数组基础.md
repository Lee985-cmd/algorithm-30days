# 🎯 Day 2：数组 - 最基础的数据结构

> **今天开始学真正的数据结构！**  
> **数组是所有数据结构的基础！**  
> **预计时间：2-2.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 数组到底是什么？（用电影院座位比喻）
□ 为什么访问数组元素那么快？
□ 数组的增删改查操作
□ 遍历数组的各种方法
□ 实战：学生成绩管理系统
```

### 🎯 今天的任务清单

```
□ 理解数组概念（20 分钟）
□ 学习数组的基本操作（30 分钟）
□ 掌握遍历方法（30 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
□ 做练习题（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🎬 第 2 步：数组是什么？（20 分钟）

### 故事时间：去电影院看电影

#### 场景 1：散座（没有数组）

```javascript
/*
你走进电影院，发现座位是随便坐的：

观众 A：坐在第 1 排中间
观众 B：坐在第 3 排角落
观众 C：坐在第 5 排过道
...

你想找"小王"在哪：
→ 要一个一个位置找过去
→ 找了半天："小王你在哪？！"
→ 效率极低！😤
*/
```

---

#### 场景 2：对号入座（有数组）

```javascript
/*
现在电影院升级了，实行对号入座：

座位表：
第 1 排：[1 号座][2 号座][3 号座][4 号座]...
第 2 排：[1 号座][2 号座][3 号座][4 号座]...
第 3 排：[1 号座][2 号座][3 号座][4 号座]...
...

每个座位都有编号：
- 排号（第几排）
- 座号（第几个）

你想找"小王"：
→ 问售票员："小王买的几排几号？"
→ 售票员："8 排 12 座"
→ 你直接走到第 8 排，找到 12 号座
→ 3 秒钟找到！✅
*/
```

**这就是数组！**

---

### 💡 数组的定义

**官方说法：**
> 数组是一种线性数据结构，用于存储相同类型的元素集合

**人话版：**
> **数组 = 一排连续的座位，每个座位都有编号**

```javascript
// JavaScript 中的数组

// 创建一个数组（一排座位）
const seats = ['小明', '小红', '小刚', '小丽'];

// 每个位置都有编号（索引），从 0 开始！
// 索引 0: '小明'
// 索引 1: '小红'
// 索引 2: '小刚'
// 索引 3: '小丽'

console.log(seats[0]);  // 输出：'小明'
console.log(seats[1]);  // 输出：'小红'
console.log(seats[2]);  // 输出：'小刚'
```

**重要特性：**
```
✓ 连续存储 → 所有元素在内存中挨着放
✓ 索引访问 → 通过编号快速找到元素
✓ 类型任意 → 可以存数字、字符串、对象等
✓ 长度可变 → 可以随时增加或减少元素
```

---

### 🎯 数组的形象比喻

#### 比喻 1：储物柜

```javascript
/*
健身房的储物柜：

[柜子 0][柜子 1][柜子 2][柜子 3][柜子 4]
 衣服   鞋子    水杯   毛巾    手机

你要拿水杯：
→ 直接打开柜子 2
→ 拿到水杯
→ 不需要翻其他柜子！
*/

const lockers = ['衣服', '鞋子', '水杯', '毛巾', '手机'];
console.log(lockers[2]);  // 输出：'水杯' ✅
```

---

#### 比喻 2：火车车厢

```javascript
/*
一列火车有 10 节车厢：

车头 [1 号车厢][2 号车厢][3 号车厢]...[10 号车厢]

每节车厢都有编号
乘客按车票上的车厢号上车
列车员查票也方便
*/

const train = [
    '1 号车厢乘客',
    '2 号车厢乘客',
    '3 号车厢乘客',
    // ...
    '10 号车厢乘客'
];

// 找 5 号车厢的乘客
console.log(train[4]);  // 注意：索引从 0 开始！
```

---

#### 比喻 3：鸡蛋盒

```javascript
/*
买鸡蛋时的那种盒子：

[🥚][🥚][🥚][🥚][🥚][🥚]
 1   2   3   4   5   6

你想拿第 3 个鸡蛋：
→ 直接伸手拿第 3 格
→ 不需要把前面的都拿出来
*/

const eggs = ['🥚', '🥚', '🥚', '🥚', '🥚', '🥚'];
const thirdEgg = eggs[2];  // 第 3 个鸡蛋（索引是 2）
console.log(thirdEgg);  // 输出：'🥚'
```

---

## ⚡ 第 3 步：为什么访问数组这么快？（20 分钟）

### 问题：为什么数组访问是 O(1)？

#### 计算机的内存长这样

```
内存地址：1000  1001  1002  1003  1004  1005
          ┌────┬────┬────┬────┬────┬────┐
数据：     │ 5  │ 8  │ 3  │ 9  │ 7  │ 2  │
          └────┴────┴────┴────┴────┴────┘
索引：      0    1    2    3    4    5
```

**关键秘密：**

```
数组的访问公式：
元素地址 = 起始地址 + (索引 × 每个元素的大小)

例如：
起始地址 = 1000
每个数字占 1 个内存单位

要找索引 3 的元素：
地址 = 1000 + (3 × 1) = 1003

一步到位！不需要遍历！
```

---

### 代码演示

```javascript
// 创建一个超大数组
const bigArray = new Array(1000000);  // 100 万元素

// 填充数据
for (let i = 0; i < bigArray.length; i++) {
    bigArray[i] = i * 2;
}

// 测试访问速度
console.time('访问第 1 个元素');
const first = bigArray[0];
console.timeEnd('访问第 1 个元素');

console.time('访问第 50 万个元素');
const middle = bigArray[499999];
console.timeEnd('访问第 50 万个元素');

console.time('访问最后 1 个元素');
const last = bigArray[999999];
console.timeEnd('访问最后 1 个元素');

/*
输出结果（大约）：
访问第 1 个元素：0.01ms
访问第 50 万个元素：0.01ms
访问最后 1 个元素：0.01ms

都一样快！这就是 O(1)！⚡
*/
```

---

### 对比：链表访问为什么慢？

```javascript
/*
链表访问是 O(n)，因为要一个一个找过去

找第 100 个元素：
→ 从第 1 个开始
→ 找到第 2 个
→ 找到第 3 个
→ ...
→ 找到第 100 个

要走 100 步！😫
*/

// 数组 vs 链表速度对比
const arrayAccess = (arr, index) => arr[index];  // 1 步
const linkedListAccess = (head, index) => {      // n 步
    let current = head;
    for (let i = 0; i < index; i++) {
        current = current.next;
    }
    return current.value;
};
```

---

## 🔧 第 4 步：数组的基本操作（30 分钟）

### 操作 1：访问元素（Read）⭐

```javascript
// 最简单的操作
const fruits = ['苹果', '香蕉', '橙子', '葡萄'];

console.log(fruits[0]);  // '苹果'
console.log(fruits[2]);  // '橙子'
console.log(fruits[3]);  // '葡萄'

// 访问不存在的索引
console.log(fruits[10]);  // undefined（不会报错）

// 负数索引？JavaScript 不支持！
console.log(fruits[-1]);  // undefined
```

**时间复杂度：O(1)** ✅

---

### 操作 2：修改元素（Update）⭐

```javascript
const fruits = ['苹果', '香蕉', '橙子', '葡萄'];

// 修改第 2 个元素
fruits[1] = '梨';

console.log(fruits);  // ['苹果', '梨', '橙子', '葡萄']

// 批量修改
for (let i = 0; i < fruits.length; i++) {
    fruits[i] = '新鲜的' + fruits[i];
}

console.log(fruits);
// ['新鲜的苹果', '新鲜的梨', '新鲜的橙子', '新鲜的葡萄']
```

**时间复杂度：O(1)** ✅

---

### 操作 3：添加元素（Create）⭐⭐

#### 方法 1：push() - 在末尾添加

```javascript
const fruits = ['苹果', '香蕉'];

fruits.push('橙子');
console.log(fruits);  // ['苹果', '香蕉', '橙子']

fruits.push('葡萄', '西瓜');  // 可以一次加多个
console.log(fruits);
// ['苹果', '香蕉', '橙子', '葡萄', '西瓜']
```

**时间复杂度：O(1)** ✅（很快）

---

#### 方法 2：unshift() - 在开头添加

```javascript
const fruits = ['苹果', '香蕉'];

fruits.unshift('橙子');
console.log(fruits);  // ['橙子', '苹果', '香蕉']

// 注意：这个操作比较慢！
// 因为要把后面所有元素都往后挪一位
```

**时间复杂度：O(n)** ❌（慢）

**为什么慢？**

```javascript
/*
原始：[苹果][香蕉]
       ↑
     插入橙子

步骤：
1. 把香蕉往后挪：[?][香蕉]
2. 把苹果往后挪：[苹果][香蕉]
3. 插入橙子：    [橙子][苹果][香蕉]

要移动 n 个元素！😫
*/
```

---

#### 方法 3：splice() - 在任意位置添加

```javascript
const fruits = ['苹果', '香蕉', '橙子'];

// 在索引 1 的位置插入'葡萄'
fruits.splice(1, 0, '葡萄');
console.log(fruits);  // ['苹果', '葡萄', '香蕉', '橙子']

// 插入多个
fruits.splice(2, 0, '西瓜', '哈密瓜');
console.log(fruits);
// ['苹果', '葡萄', '西瓜', '哈密瓜', '香蕉', '橙子']
```

**时间复杂度：O(n)** ❌（也要移动元素）

---

### 操作 4：删除元素（Delete）⭐⭐

#### 方法 1：pop() - 删除最后一个

```javascript
const fruits = ['苹果', '香蕉', '橙子'];

const last = fruits.pop();
console.log(last);    // '橙子'
console.log(fruits);  // ['苹果', '香蕉']
```

**时间复杂度：O(1)** ✅

---

#### 方法 2：shift() - 删除第一个

```javascript
const fruits = ['苹果', '香蕉', '橙子'];

const first = fruits.shift();
console.log(first);   // '苹果'
console.log(fruits);  // ['香蕉', '橙子']
```

**时间复杂度：O(n)** ❌（要移动所有元素）

---

#### 方法 3：splice() - 删除任意位置

```javascript
const fruits = ['苹果', '香蕉', '橙子', '葡萄'];

// 删除索引 1 的元素（删除 1 个）
fruits.splice(1, 1);
console.log(fruits);  // ['苹果', '橙子', '葡萄']

// 删除从索引 1 开始的 2 个元素
fruits.splice(1, 2);
console.log(fruits);  // ['苹果', '葡萄']
```

**时间复杂度：O(n)** ❌

---

### 操作 5：查找元素（Search）⭐⭐

#### 方法 1：indexOf() - 找元素的索引

```javascript
const fruits = ['苹果', '香蕉', '橙子', '葡萄'];

const index = fruits.indexOf('香蕉');
console.log(index);  // 1

const notFound = fruits.indexOf('西瓜');
console.log(notFound);  // -1（没找到）
```

**时间复杂度：O(n)** ❌（要遍历整个数组）

---

#### 方法 2：includes() - 判断是否存在

```javascript
const fruits = ['苹果', '香蕉', '橙子'];

console.log(fruits.includes('香蕉'));  // true
console.log(fruits.includes('西瓜'));  // false
```

**时间复杂度：O(n)** ❌

---

### 📊 操作复杂度总结表

| 操作 | 方法 | 时间复杂度 | 说明 |
|-----|------|-----------|------|
| 访问 | `arr[i]` | O(1) ✅ | 最快 |
| 修改 | `arr[i] = x` | O(1) ✅ | 很快 |
| 末尾添加 | `push()` | O(1) ✅ | 推荐 |
| 开头添加 | `unshift()` | O(n) ❌ | 慢 |
| 中间添加 | `splice()` | O(n) ❌ | 慢 |
| 末尾删除 | `pop()` | O(1) ✅ | 快 |
| 开头删除 | `shift()` | O(n) ❌ | 慢 |
| 查找 | `indexOf()` | O(n) ❌ | 要遍历 |

**结论：**
```
✓ 数组适合：频繁访问、修改
✗ 数组不适合：频繁增删（特别是开头和中间）
```

---

## 🔄 第 5 步：遍历数组的方法（30 分钟）

### 方法 1：普通 for 循环（最基础）

```javascript
const fruits = ['苹果', '香蕉', '橙子', '葡萄'];

// 最传统的写法
for (let i = 0; i < fruits.length; i++) {
    console.log(`索引${i}: ${fruits[i]}`);
}

/*
输出：
索引 0: 苹果
索引 1: 香蕉
索引 2: 橙子
索引 3: 葡萄
*/

// 优点：可以控制索引，可以中途跳出
for (let i = 0; i < fruits.length; i++) {
    if (fruits[i] === '橙子') {
        break;  // 找到了，停止
    }
    console.log(fruits[i]);
}
```

---

### 方法 2：forEach（专用遍历）

```javascript
const fruits = ['苹果', '香蕉', '橙子', '葡萄'];

// 简洁写法
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});

// 箭头函数简化版
fruits.forEach((fruit, i) => console.log(`${i}: ${fruit}`));

// 注意：不能用 break 跳出
// 要用 return 代替 continue
fruits.forEach((fruit) => {
    if (fruit === '橙子') return;  // 跳过这个
    console.log(fruit);
});
```

---

### 方法 3：for...of（ES6 新语法）⭐推荐

```javascript
const fruits = ['苹果', '香蕉', '橙子', '葡萄'];

// 只遍历值
for (const fruit of fruits) {
    console.log(fruit);
}

// 同时遍历索引和值
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}

// 可以用 break
for (const fruit of fruits) {
    if (fruit === '橙子') break;
    console.log(fruit);
}
```

---

### 方法 4：map（转换数组）⭐⭐⭐超重要

```javascript
const numbers = [1, 2, 3, 4, 5];

// 每个元素乘以 2
const doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// 给每个水果加前缀
const fruits = ['苹果', '香蕉', '橙子'];
const withPrefix = fruits.map(fruit => '新鲜的' + fruit);
console.log(withPrefix);
// ['新鲜的苹果', '新鲜的香蕉', '新鲜的橙子']

// map 会返回新数组，不修改原数组
console.log(numbers);  // [1, 2, 3, 4, 5] 原数组不变
```

**map vs forEach：**
```javascript
// map 有返回值，forEach 没有
const nums = [1, 2, 3];

const result1 = nums.map(n => n * 2);
console.log(result1);  // [2, 4, 6] 新数组

const result2 = nums.forEach(n => n * 2);
console.log(result2);  // undefined 没有返回值
```

---

### 方法 5：filter（过滤数组）⭐⭐⭐超重要

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 找出偶数
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]

// 找出大于 5 的数
const greaterThan5 = numbers.filter(num => num > 5);
console.log(greaterThan5);  // [6, 7, 8, 9, 10]

// 找出包含'果'字的水果
const fruits = ['苹果', '香蕉', '火龙果', '西瓜'];
const withGuo = fruits.filter(fruit => fruit.includes('果'));
console.log(withGuo);  // ['苹果', '火龙果']
```

---

### 方法 6：reduce（归并数组）⭐⭐进阶

```javascript
const numbers = [1, 2, 3, 4, 5];

// 求和
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum);  // 15

// 执行过程：
// acc=0, num=1 → 返回 1
// acc=1, num=2 → 返回 3
// acc=3, num=3 → 返回 6
// acc=6, num=4 → 返回 10
// acc=10, num=5 → 返回 15

// 求最大值
const max = numbers.reduce((acc, num) => {
    return acc > num ? acc : num;
}, 0);
console.log(max);  // 5

// 统计每种水果的数量
const fruits = ['苹果', '香蕉', '苹果', '橙子', '香蕉', '苹果'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count);  // {苹果：3, 香蕉：2, 橙子：1}
```

---

### 📊 遍历方法对比表

| 方法 | 用途 | 返回值 | 可中断 | 推荐度 |
|-----|------|--------|--------|--------|
| `for` | 通用 | 无 | ✅ | ⭐⭐⭐ |
| `forEach` | 遍历 | undefined | ❌ | ⭐⭐ |
| `for...of` | 遍历 | 无 | ✅ | ⭐⭐⭐ |
| `map` | 转换 | 新数组 | ❌ | ⭐⭐⭐⭐⭐ |
| `filter` | 过滤 | 新数组 | ❌ | ⭐⭐⭐⭐⭐ |
| `reduce` | 归并 | 单个值 | ❌ | ⭐⭐⭐⭐ |

---

## 💻 第 6 步：实战项目（30 分钟）

### 项目：学生成绩管理系统

```javascript
/**
 * 学生成绩管理系统
 * 功能：
 * 1. 添加学生
 * 2. 查找学生
 * 3. 修改成绩
 * 4. 删除学生
 * 5. 统计平均分
 * 6. 排名
 */

class StudentManager {
    constructor() {
        // 用数组存储学生数据
        this.students = [];
    }
    
    // 1. 添加学生
    addStudent(name, chinese, math, english) {
        const student = {
            id: this.students.length + 1,
            name: name,
            scores: {
                chinese: chinese,
                math: math,
                english: english
            },
            total: chinese + math + english,
            average: ((chinese + math + english) / 3).toFixed(2)
        };
        
        this.students.push(student);
        console.log(`✅ 添加学生：${name}`);
    }
    
    // 2. 查找学生（按姓名）
    findStudent(name) {
        const found = this.students.find(s => s.name === name);
        
        if (found) {
            console.log(`找到学生：${found.name}`);
            console.log(`语文：${found.scores.chinese}`);
            console.log(`数学：${found.scores.math}`);
            console.log(`英语：${found.scores.english}`);
            console.log(`总分：${found.total}`);
            console.log(`平均分：${found.average}`);
            return found;
        } else {
            console.log(`❌ 未找到学生：${name}`);
            return null;
        }
    }
    
    // 3. 修改成绩
    updateScore(name, subject, newScore) {
        const student = this.students.find(s => s.name === name);
        
        if (!student) {
            console.log(`❌ 未找到学生：${name}`);
            return;
        }
        
        if (!['chinese', 'math', 'english'].includes(subject)) {
            console.log(`❌ 无效的科目：${subject}`);
            return;
        }
        
        const oldScore = student.scores[subject];
        student.scores[subject] = newScore;
        
        // 重新计算总分和平均分
        student.total = student.scores.chinese + 
                       student.scores.math + 
                       student.scores.english;
        student.average = (student.total / 3).toFixed(2);
        
        console.log(`✅ 修改成功：${name}的${subject}从${oldScore}改为${newScore}`);
    }
    
    // 4. 删除学生
    removeStudent(name) {
        const index = this.students.findIndex(s => s.name === name);
        
        if (index !== -1) {
            this.students.splice(index, 1);
            console.log(`✅ 删除学生：${name}`);
            
            // 重新编号
            this.students.forEach((s, i) => {
                s.id = i + 1;
            });
        } else {
            console.log(`❌ 未找到学生：${name}`);
        }
    }
    
    // 5. 统计平均分
    getAverage(subject) {
        if (this.students.length === 0) {
            console.log('❌ 没有学生数据');
            return 0;
        }
        
        const total = this.students.reduce((sum, s) => {
            return sum + s.scores[subject];
        }, 0);
        
        const avg = (total / this.students.length).toFixed(2);
        console.log(`${subject}平均分：${avg}`);
        return avg;
    }
    
    // 6. 按总分排名
    rankByTotal() {
        // 复制一份再排序，不修改原数组
        const ranked = [...this.students].sort((a, b) => {
            return b.total - a.total;  // 降序
        });
        
        console.log('\n=== 成绩排行榜 ===');
        ranked.forEach((student, index) => {
            console.log(`第${index + 1}名：${student.name} - 总分${student.total}`);
        });
        
        return ranked;
    }
    
    // 显示所有学生
    showAllStudents() {
        console.log('\n=== 全体学生 ===');
        if (this.students.length === 0) {
            console.log('暂无学生数据');
            return;
        }
        
        this.students.forEach(student => {
            console.log(`${student.id}. ${student.name} - 均分${student.average}`);
        });
    }
}

// ==================== 测试 ====================

// 创建管理器
const manager = new StudentManager();

// 添加学生
manager.addStudent('小明', 85, 92, 88);
manager.addStudent('小红', 90, 88, 95);
manager.addStudent('小刚', 78, 85, 82);
manager.addStudent('小丽', 92, 95, 90);

// 显示所有学生
manager.showAllStudents();

// 查找学生
manager.findStudent('小明');

// 修改成绩
manager.updateScore('小明', 'math', 95);

// 再次查找看看变化
manager.findStudent('小明');

// 统计平均分
manager.getAverage('chinese');
manager.getAverage('math');
manager.getAverage('english');

// 排名
manager.rankByTotal();

// 删除学生
manager.removeStudent('小刚');

// 再次显示
manager.showAllStudents();

/*
输出示例：
✅ 添加学生：小明
✅ 添加学生：小红
✅ 添加学生：小刚
✅ 添加学生：小丽

=== 全体学生 ===
1. 小明 - 均分 88.33
2. 小红 - 均分 91.00
3. 小刚 - 均分 81.67
4. 小丽 - 均分 92.33

找到学生：小明
语文：85
数学：92
英语：88
总分：265
平均分：88.33

✅ 修改成功：小明的 math 从 92 改为 95

语文平均分：86.25
数学平均分：90.00
英语平均分：88.75

=== 成绩排行榜 ===
第 1 名：小丽 - 总分 277
第 2 名：小红 - 总分 273
第 3 名：小明 - 总分 268
第 4 名：小刚 - 总分 245

✅ 删除学生：小刚

=== 全体学生 ===
1. 小明 - 均分 91.67
2. 小红 - 均分 91.00
3. 小丽 - 均分 92.33
*/
```

---

## 🎯 费曼输出 #2：解释数组（20 分钟）

### 任务 1：向小学生解释数组

**要求：**
- 不用"索引"、"数据结构"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"数组就像______一样。

比如你要______，
如果没有数组会______，
有了数组就会______。

区别就是______。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释为什么数组访问快

**场景：**
```
小朋友问："为什么电脑找数组里的东西那么快？"
```

**你要解释：**
1. 数组在内存中是怎么排列的？（用排队比喻）
2. 为什么可以直接跳到某个位置？（用电影院座位比喻）
3. 链表为什么慢？（用寻宝游戏比喻）

**要求：**
- 至少创造 2 个不同的比喻
- 用学校、游戏、运动等生活场景
- 让小朋友能听懂

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚数组和链表的区别
□ 我不知道如何解释 O(1) 访问
□ 我只能背诵定义，不能用自己的话
□ 我解释不清为什么 push 快 unshift 慢
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 7 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释什么是数组（100 字以内）

**提示：** 不要用"线性数据结构"这种术语！

---

#### 2. 列举 3 个生活中类似数组的例子

**示例：**
```
□ 电影院的座位
□ 超市的储物柜
□ 停车场的车位
```

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

#### 3. 预测以下代码的输出

```javascript
const arr = [1, 2, 3, 4, 5];

arr.push(6);
console.log(arr);  // 输出：？

arr.pop();
console.log(arr);  // 输出：？

arr.unshift(0);
console.log(arr);  // 输出：？

arr.shift();
console.log(arr);  // 输出：？
```

---

#### 4. 写出以下操作的时间复杂度

```javascript
□ arr[5]           → O(?)
□ arr[3] = 10      → O(?)
□ arr.push(x)      → O(?)
□ arr.unshift(x)   → O(?)
□ arr.pop()        → O(?)
□ arr.shift()      → O(?)
□ arr.indexOf(x)   → O(?)
```

---

### 进阶题（选做）⭐⭐

#### 5. 实现一个数组去重函数

```javascript
// 输入：[1, 2, 2, 3, 3, 3, 4]
// 输出：[1, 2, 3, 4]

function removeDuplicates(arr) {
    // 你的代码
    // 提示：可以用 filter 或 reduce
}

const test = [1, 2, 2, 3, 3, 3, 4];
console.log(removeDuplicates(test));  // [1, 2, 3, 4]
```

---

#### 6. 实现数组扁平化

```javascript
// 输入：[1, [2, [3, [4]]]]
// 输出：[1, 2, 3, 4]

function flatten(arr) {
    // 你的代码
    // 提示：可以用递归或 flat()
}

const nested = [1, [2, [3, [4, 5], 6], 7], 8];
console.log(flatten(nested));  // [1, 2, 3, 4, 5, 6, 7, 8]
```

---

### 挑战题（加分）⭐⭐⭐

#### 7. 实现一个简单的数组类

```javascript
class MyArray {
    constructor() {
        this.data = {};
        this.length = 0;
    }
    
    // 实现以下方法：
    push(item) {
        // 在末尾添加元素
    }
    
    pop() {
        // 删除最后一个元素
    }
    
    get(index) {
        // 获取指定索引的元素
    }
    
    delete(index) {
        // 删除指定索引的元素
        // 注意：要移动后面的元素
    }
    
    // 测试你的实现
}

const myArr = new MyArray();
myArr.push('苹果');
myArr.push('香蕉');
myArr.push('橙子');

console.log(myArr.get(0));  // '苹果'
console.log(myArr.length);  // 3

myArr.pop();
console.log(myArr.length);  // 2

myArr.delete(0);
console.log(myArr.get(0));  // '香蕉'
```

---

## 🎁 彩蛋时间

### JavaScript 数组的冷知识

```javascript
// 1. 数组也是对象
const arr = [1, 2, 3];
console.log(typeof arr);  // 'object'

// 2. 数组可以有"洞"
const sparse = [1, , , 4];
console.log(sparse.length);  // 4
console.log(sparse[1]);  // undefined

// 3. 数组索引可以是字符串
const arr2 = [];
arr2['age'] = 18;  // 不会改变 length
arr2[0] = 'first';  // 这才是真正的数组元素
console.log(arr2.length);  // 1

// 4. 空数组等于 true 还是 false？
console.log([] == false);  // true
console.log(![]);  // false（数组本身是 truthy）

// 5. 最大长度是多少？
const maxArr = new Array(4294967295);  // 2^32 - 1
console.log(maxArr.length);  // 4294967295
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 数组是什么**
```
✓ 一排连续的座位
✓ 每个位置都有编号（索引）
✓ 可以快速访问任意元素
```

**2. 数组的操作**
```
✓ 访问：O(1) - 最快
✓ 修改：O(1) - 很快
✓ 末尾增删：O(1) - 推荐
✓ 开头/中间增删：O(n) - 慢
```

**3. 遍历方法**
```
✓ for 循环 - 基础但灵活
✓ forEach - 专用但不可中断
✓ for...of - ES6 推荐
✓ map/filter/reduce - 函数式编程三剑客
```

---

### 📊 知识框架图

```
数组
├── 特点：连续存储、索引访问
├── 优势：访问快 O(1)
├── 劣势：增删慢 O(n)
├── 操作
│   ├── 查：arr[i]
│   ├── 改：arr[i] = x
│   ├── 增：push/unshift/splice
│   └── 删：pop/shift/splice
└── 遍历
    ├── for
    ├── forEach
    ├── for...of
    ├── map（转换）
    ├── filter（过滤）
    └── reduce（归并）
```

---

## 📞 打卡模板

```
╔═══════════════════════════════════════╗
║         Day 2 学习打卡                ║
╠═══════════════════════════════════════╣
║ 日期：__________                     ║
║ 学习时长：__________                 ║
╠═══════════════════════════════════════╣
║                                       ║
║ 今天我学会了：                       ║
║ □ 数组的概念和特点                   ║
║ □ 数组的各种操作                     ║
║ □ 遍历数组的方法                     ║
║ □ 实战：学生成绩管理                 ║
║                                       ║
║ 我的通俗比喻：                       ║
║ • 数组就像 ______                    ║
║ • 索引就像 ______                    ║
║ • push 快是因为 ______              ║
║                                       ║
║ 我还想知道：                         ║
║ _________________________________    ║
║                                       ║
╚═══════════════════════════════════════╝
```

---

## 🚀 下一章预告

**明天你将学习：**

```
主题：链表 - 灵活的链条

内容：
✓ 链表是什么？（寻宝游戏线索链）
✓ 节点结构详解（信封里的信和地址）
✓ 单向链表实现
✓ 双向链表实现
✓ 链表 vs 数组大对比
✓ 实战：音乐播放列表

需要准备：
✓ 复习今天的数组操作
✓ 理解指针/引用的概念
✓ 准备好纸笔画图
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第二天完成了！你真棒！🎉           ║
║                                       ║
║   数组是所有数据结构的基础           ║
║   今天的内容一定要掌握好！           ║
║                                       ║
║   特别是：                           ║
║   ✓ 数组的访问为什么快               ║
║   ✓ 各种操作的时间复杂度             ║
║   ✓ map/filter/reduce 的用法          ║
║                                       ║
║   继续保持！明天学习更有趣的链表！   ║
║                                       ║
╚═══════════════════════════════════════╝
```

**明天见！继续加油！** ✨

---

**学习时长统计：**
- 📖 阅读 + 理解：80 分钟
- 💻 实战项目：30 分钟
- 💭 思考 + 笔记：20 分钟
- ✍️ 练习 + 费曼输出：30 分钟
- ⏰ 总计：约 2.5 小时 ✅
