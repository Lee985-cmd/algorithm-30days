# 🎯 Day 6：递归 - 自己调用自己

> **今天学一个"套娃"式的编程思想！**  
> **理解递归的关键：终止条件 + 递推关系！**  
> **预计时间：2-2.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 递归到底是什么？（用俄罗斯套娃比喻）
□ 递归的三要素是什么？
□ 如何写出正确的递归函数？
□ 递归的优缺点分析
□ 实战：汉诺塔问题
```

### 🎯 今天的任务清单

```
□ 理解递归概念（25 分钟）
□ 学习递归三要素（30 分钟）
□ 经典递归案例（40 分钟）
□ 了解递归的优缺点（15 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🪆 第 2 步：递归是什么？（25 分钟）

### 故事时间：俄罗斯套娃

#### 场景：打开套娃的过程

```
你有一个俄罗斯套娃：

第 1 步：打开最大的娃娃
        ↓
第 2 步：里面有个小一点的娃娃
        ↓
第 3 步：再打开，还有更小的
        ↓
第 4 步：继续打开...
        ↓
直到：发现最小的实心娃娃（不能再打开了）

这个过程就是递归！

打开娃娃 () {
    if (还能打开) {
        打开当前娃娃;
        打开里面的娃娃;  // 调用自己！
    } else {
        这是最小的娃娃;  // 终止条件
    }
}
```

---

### 💡 递归的定义

**官方说法：**
> 递归是函数直接或间接调用自身的编程技术

**人话版：**
> **递归 = 函数自己调用自己，就像套娃一样**

```javascript
// 最简单的递归例子

function openRussianDoll(doll) {
    // 终止条件：最小的娃娃
    if (doll === '最小娃娃') {
        console.log('到头了！');
        return;
    }
    
    // 递推关系：打开当前娃娃，继续打开里面的
    console.log(`打开第${doll}个娃娃`);
    openRussianDoll(doll - 1);  // 调用自己！
}

// 从第 5 个娃娃开始打开
openRussianDoll(5);

/*
输出：
打开第 5 个娃娃
打开第 4 个娃娃
打开第 3 个娃娃
打开第 2 个娃娃
打开第 1 个娃娃
到头了！
*/
```

---

### 🎯 递归的形象比喻

#### 比喻 1：镜子中的镜子

```
你去理发店，坐在两面镜子中间：

你看到：
- 镜子里有一个你
- 那个镜子里还有个小镜子
- 小镜子里还有更小的你
- 更小的镜子里还有更更小的你
...
无限循环！

这就是递归的视觉效果！
```

---

#### 比喻 2：讲故事哄睡觉

```
妈妈给孩子讲睡前故事：

"从前有座山，山里有座庙，
庙里有个老和尚在给小和尚讲故事，
讲的什么故事呢？
'从前有座山，山里有座庙...' "

无限循环的故事！
（除非孩子睡着了 - 终止条件）
```

---

#### 比喻 3：查找文件

```
你要在电脑里找一个文件：

function findFile(folder) {
    // 遍历文件夹里的所有内容
    for (let item of folder.contents) {
        if (item.isFile && item.name === '作业.doc') {
            return '找到了！';
        }
        
        if (item.isFolder) {
            // 如果是文件夹，递归查找
            findFile(item);  // 调用自己！
        }
    }
}

// 从 D 盘开始找
findFile(D 盘);

// 过程：
// D 盘 → 学习 → 算法 → 资料 → 找到了！
//       ↓
//     工作 → 项目 → ...
//       ↓
//     娱乐 → 音乐 → ...
```

---

## ⚡ 第 3 步：递归的三要素（30 分钟）

### 写递归必须想清楚这三点！

#### 要素 1：终止条件（Base Case）⭐⭐⭐

```javascript
/**
 * 终止条件 = 什么时候停下来？
 * 
 * 没有终止条件的递归 = 死循环 = 栈溢出
 */

// ❌ 错误示范：没有终止条件
function infiniteRecursion(n) {
    console.log(n);
    infiniteRecursion(n + 1);  // 无限调用！
}

// infiniteRecursion(1);
// 输出：1, 2, 3, 4, 5... 直到栈溢出！

// ✅ 正确示范：有终止条件
function safeRecursion(n) {
    // 终止条件
    if (n > 5) {
        console.log('到 5 了，停下！');
        return;
    }
    
    console.log(n);
    safeRecursion(n + 1);
}

safeRecursion(1);
/*
输出：
1
2
3
4
5
到 5 了，停下！
*/
```

**生活比喻：**
```
套娃：最小的实心娃娃 → 停止打开
上楼：到了顶楼 → 不再往上走
吃包子：吃饱了 → 不再吃了
```

---

#### 要素 2：递推关系（Recursive Case）⭐⭐⭐

```javascript
/**
 * 递推关系 = 怎么把大问题变小？
 * 
 * 要把原问题分解成规模更小的相同问题
 */

// 例子：计算阶乘 n!
// n! = n × (n-1)!
// 例如：5! = 5 × 4!

function factorial(n) {
    // 终止条件
    if (n === 1) {
        return 1;
    }
    
    // 递推关系：n! = n × (n-1)!
    return n * factorial(n - 1);
}

// 执行过程：
factorial(5);
= 5 * factorial(4);
= 5 * (4 * factorial(3));
= 5 * (4 * (3 * factorial(2)));
= 5 * (4 * (3 * (2 * factorial(1))));
= 5 * (4 * (3 * (2 * 1)));
= 5 * (4 * (3 * 2));
= 5 * (4 * 6);
= 5 * 24;
= 120

console.log(factorial(5));  // 120
```

**生活比喻：**
```
打扫房间：
- 大房间 → 分成 4 个小区域
- 每个区域 → 继续细分
- 直到一小块地 → 直接打扫

搬砖头：
- 100 块砖 → 每次搬 10 块
- 90 块砖 → 每次搬 10 块
- ...
- 0 块砖 → 搬完了
```

---

#### 要素 3：向终止条件靠近⭐⭐

```javascript
/**
 * 每次递归都要更接近终止条件
 * 
 * 否则就是无限循环！
 */

// ❌ 错误示范：不向终止条件靠近
function badRecursion(n) {
    if (n === 10) {
        return '到了';
    }
    // 问题：n 一直是 5，永远不会变成 10！
    return badRecursion(n);  
}

// badRecursion(5);  // 无限循环！

// ✅ 正确示范：每次都更接近
function goodRecursion(n) {
    if (n === 0) {
        return '到了';
    }
    // 每次减 1，越来越接近 0
    return goodRecursion(n - 1);
}

goodRecursion(5);  // 正常结束
```

**生活比喻：**
```
上楼梯：
✓ 每次上一级 → 越来越接近顶楼
✗ 原地踏步 → 永远到不了

倒计时：
✓ 10, 9, 8, 7... → 接近 0
✗ 10, 10, 10... → 永远数不完
```

---

### 递归三要素总结

```javascript
/**
 * 写递归前先问自己三个问题：
 * 
 * 1. 什么时候停？（终止条件）
 * 2. 怎么分解问题？（递推关系）
 * 3. 有没有更接近？（向终止条件靠近）
 */

// 模板
function recursiveFunction(problem) {
    // 1. 终止条件
    if (problem 足够小) {
        return 直接解决;
    }
    
    // 2. 递推关系
    // 把大问题分解成小问题
    const smallerProblem = 分解 (problem);
    
    // 3. 确保向终止条件靠近
    return recursiveFunction(smallerProblem);
}
```

---

## 💻 第 4 步：经典递归案例（40 分钟）

### 案例 1：斐波那契数列

```javascript
/**
 * 斐波那契数列：
 * 0, 1, 1, 2, 3, 5, 8, 13, 21...
 * 
 * 规律：每个数等于前两个数之和
 * F(0) = 0
 * F(1) = 1
 * F(n) = F(n-1) + F(n-2)
 */

// 方法 1：递归实现（简单但慢）
function fib(n) {
    // 终止条件
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // 递推关系：F(n) = F(n-1) + F(n-2)
    return fib(n - 1) + fib(n - 2);
}

// 测试
console.log(fib(0));   // 0
console.log(fib(1));   // 1
console.log(fib(2));   // 1
console.log(fib(3));   // 2
console.log(fib(4));   // 3
console.log(fib(5));   // 5
console.log(fib(10));  // 55

// 问题：大量重复计算！
// fib(5) = fib(4) + fib(3)
// fib(4) = fib(3) + fib(2)  // fib(3) 算了两次！
```

---

```javascript
// 方法 2：带缓存的递归（快很多！）⭐推荐

function fibWithMemo(n, memo = {}) {
    // 先看看有没有算过
    if (memo[n]) {
        return memo[n];
    }
    
    // 终止条件
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // 递推关系
    const result = fibWithMemo(n - 1, memo) + fibWithMemo(n - 2, memo);
    
    // 记住结果
    memo[n] = result;
    
    return result;
}

// 测试
console.log(fibWithMemo(50));  // 瞬间算出！
// 而普通递归可能要算几分钟...
```

---

```javascript
// 方法 3：迭代实现（最快）

function fibIterative(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    let prev2 = 0;  // F(n-2)
    let prev1 = 1;  // F(n-1)
    let current;
    
    for (let i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return current;
}

// 测试
console.log(fibIterative(100));  // 瞬间！而且不会栈溢出
```

---

### 案例 2：计算幂次方

```javascript
/**
 * 计算 x 的 n 次方：x^n
 * 
 * 普通方法：O(n)
 * 递归优化：O(log n)
 */

// 方法 1：普通递归（慢）
function power(x, n) {
    if (n === 0) return 1;
    
    return x * power(x, n - 1);
}

console.log(power(2, 10));  // 1024
// 要乘 10 次
```

---

```javascript
// 方法 2：快速幂（聪明办法）⭐

function fastPower(x, n) {
    if (n === 0) return 1;
    
    // 如果 n 是偶数：x^n = (x²)^(n/2)
    if (n % 2 === 0) {
        return fastPower(x * x, n / 2);
    }
    // 如果 n 是奇数：x^n = x × x^(n-1)
    else {
        return x * fastPower(x, n - 1);
    }
}

console.log(fastPower(2, 10));  // 1024
// 只要乘 4 次！快多了！

/*
执行过程：
2^10
= (2×2)^5 = 4^5
= 4 × 4^4
= 4 × (4×4)^2 = 4 × 16^2
= 4 × (16×16)^1
= 4 × 256
= 1024
*/
```

---

### 案例 3：求最大公约数

```javascript
/**
 * 辗转相除法（欧几里得算法）
 * 
 * gcd(a, b) = gcd(b, a % b)
 * 
 * 例如：gcd(48, 18)
 * = gcd(18, 48%18) = gcd(18, 12)
 * = gcd(12, 18%12) = gcd(12, 6)
 * = gcd(6, 12%6) = gcd(6, 0)
 * = 6
 */

function gcd(a, b) {
    // 终止条件：b 为 0
    if (b === 0) {
        return a;
    }
    
    // 递推关系
    return gcd(b, a % b);
}

// 测试
console.log(gcd(48, 18));  // 6
console.log(gcd(100, 35)); // 5
console.log(gcd(17, 19));  // 1（互质）
```

---

### 案例 4：字符串反转

```javascript
/**
 * 用递归反转字符串
 * 
 * reverse("hello")
 * = reverse("ello") + "h"
 * = reverse("llo") + "e" + "h"
 * = ...
 */

function reverseString(str) {
    // 终止条件：空字符串或单字符
    if (str.length <= 1) {
        return str;
    }
    
    // 递推关系：反转后面的 + 第一个字符
    return reverseString(str.slice(1)) + str[0];
}

// 测试
console.log(reverseString("hello"));      // "olleh"
console.log(reverseString("JavaScript")); // "tpircSvaJ"
```

---

## ⚠️ 第 5 步：递归的优缺点（15 分钟）

### 优点

#### 1️⃣ 代码简洁优雅

```javascript
// 递归版本（简洁）
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

// 迭代版本（啰嗦）
function factorialIterative(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

---

#### 2️⃣ 适合解决递归定义的问题

```javascript
// 树、图的遍历天然适合递归
function traverseTree(node) {
    if (!node) return;
    
    // 处理当前节点
    console.log(node.value);
    
    // 递归遍历子节点
    traverseTree(node.left);
    traverseTree(node.right);
}

// 用迭代写？太复杂了！
```

---

### 缺点

#### 1️⃣ 可能栈溢出

```javascript
// 递归太深会爆栈
function deepRecursion(n) {
    if (n === 0) return;
    deepRecursion(n - 1);
}

// deepRecursion(10000);  // RangeError: Maximum call stack size exceeded
```

**原因：**
```
每次函数调用都要占用栈空间
JavaScript 默认栈大小约 10000 层
超过就溢出！
```

---

#### 2️⃣ 可能有大量重复计算

```javascript
// 斐波那契的重复计算
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// fib(5) 的计算树：
//                fib(5)
//              /        \
//         fib(4)        fib(3)
//        /     \        /     \
//    fib(3)  fib(2)  fib(2)  fib(1)
//    /    \
// fib(2) fib(1)

// fib(3) 算了 2 次！
// fib(2) 算了 3 次！
// 效率极低！O(2^n)
```

**解决方案：**
```javascript
// 用缓存（记忆化）
function fibMemo(n, memo = {}) {
    if (memo[n]) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// 现在每个 fib(n) 只算一次！O(n)
```

---

#### 3️⃣ 性能通常比迭代差

```javascript
// 递归：函数调用有开销
// 迭代：简单的循环

// 能用迭代的，优先用迭代
```

---

## 💻 第 6 步：实战项目（30 分钟）

### 项目：汉诺塔问题

```javascript
/**
 * 汉诺塔问题
 * 
 * 有三根柱子 A、B、C
 * A 柱上有 n 个盘子，从小到大叠放
 * 
 * 目标：把所有盘子从 A 移到 C
 * 
 * 规则：
 * 1. 每次只能移动一个盘子
 * 2. 大盘子不能放在小盘子上面
 * 
 * 思路：
 * 1. 把 n-1 个盘子从 A 移到 B（借助 C）
 * 2. 把第 n 个盘子从 A 移到 C
 * 3. 把 n-1 个盘子从 B 移到 C（借助 A）
 */

function hanoi(n, from, to, aux) {
    // 终止条件：只有一个盘子
    if (n === 1) {
        console.log(`把盘子 1 从${from}移到${to}`);
        return;
    }
    
    // 步骤 1：把 n-1 个盘子从 from 移到 aux
    hanoi(n - 1, from, aux, to);
    
    // 步骤 2：把第 n 个盘子从 from 移到 to
    console.log(`把盘子${n}从${from}移到${to}`);
    
    // 步骤 3：把 n-1 个盘子从 aux 移到 to
    hanoi(n - 1, aux, to, from);
}

// ==================== 测试 ====================

console.log('=== 3 个盘子的汉诺塔 ===\n');
hanoi(3, 'A', 'C', 'B');

/*
输出：
把盘子 1 从 A 移到 C
把盘子 2 从 A 移到 B
把盘子 1 从 C 移到 B
把盘子 3 从 A 移到 C
把盘子 1 从 B 移到 A
把盘子 2 从 B 移到 C
把盘子 1 从 A 移到 C

总共移动 7 次（2^3 - 1）
*/

console.log('\n=== 4 个盘子的汉诺塔 ===\n');
hanoi(4, 'A', 'C', 'B');
// 总共移动 15 次（2^4 - 1）

console.log('\n=== 移动次数统计 ===');
function countMoves(n) {
    if (n === 1) return 1;
    return 2 * countMoves(n - 1) + 1;
}

console.log(`3 个盘子需要移动${countMoves(3)}次`);  // 7
console.log(`4 个盘子需要移动${countMoves(4)}次`);  // 15
console.log(`5 个盘子需要移动${countMoves(5)}次`);  // 31
console.log(`10 个盘子需要移动${countMoves(10)}次`); // 1023
console.log(`64 个盘子需要移动${countMoves(64)}次`); // 天文数字！
```

---

## 🎯 费曼输出 #6：解释递归（20 分钟）

### 任务 1：向小学生解释递归

**要求：**
- 不用"函数"、"调用栈"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"递归就像______一样。

比如你要______，
第一步是______，
然后______，
直到______就停下来。

关键是要知道什么时候停！"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释递归三要素

**场景：**
```
小朋友问："怎么写一个不会出错的递归？"
```

**你要解释：**
1. 为什么要设置终止条件？（用下楼比喻）
2. 怎么把大问题变小？（用切蛋糕比喻）
3. 怎么确保越来越近？（用倒计时比喻）

**要求：**
- 至少创造 3 个不同的比喻
- 用学校、游戏、运动等生活场景
- 让小朋友能听懂

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚递归是怎么执行的
□ 我不知道如何解释终止条件的重要性
□ 我只能背诵定义，不能用自己的话
□ 我解释不清为什么会有栈溢出
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 7 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释什么是递归（100 字以内）

**提示：** 不要用"函数调用自身"这种术语！

---

#### 2. 列举 3 个生活中类似递归的例子

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

#### 3. 写出以下递归的终止条件和递推关系

```javascript
// (1) 计算 n 的阶乘
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

终止条件：_____________
递推关系：_____________

// (2) 计算 x 的 n 次方
function power(x, n) {
    if (n === 0) return 1;
    return x * power(x, n - 1);
}

终止条件：_____________
递推关系：_____________
```

---

### 进阶题（选做）⭐⭐

#### 4. 用递归实现数组求和

```javascript
/**
 * 用递归计算数组所有元素的和
 * 
 * sum([1, 2, 3, 4, 5]) = 15
 * 
 * 提示：
 * sum(arr) = arr[0] + sum(arr.slice(1))
 */

function sumArray(arr) {
    // 你的代码
}

console.log(sumArray([1, 2, 3, 4, 5]));  // 15
console.log(sumArray([10, 20, 30]));     // 60
```

---

#### 5. 用递归实现二分查找

```javascript
/**
 * 在有序数组中查找目标值
 * 
 * 提示：
 * 1. 找到中间位置
 * 2. 如果中间值等于目标，返回索引
 * 3. 如果目标小于中间值，在左半部分递归
 * 4. 如果目标大于中间值，在右半部分递归
 */

function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    // 你的代码
}

const sorted = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(sorted, 7));   // 3
console.log(binarySearch(sorted, 10));  // -1（没找到）
```

---

### 挑战题（加分）⭐⭐⭐

#### 6. 用递归生成全排列

```javascript
/**
 * 生成字符串的所有排列
 * 
 * permutations("abc") = ["abc", "acb", "bac", "bca", "cab", "cba"]
 * 
 * 提示：
 * 固定第一个字符，递归排列剩余字符
 */

function permutations(str) {
    // 你的代码
}

console.log(permutations("abc"));
// ["abc", "acb", "bac", "bca", "cab", "cba"]
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 递归的概念**
```
✓ 函数调用自己
✓ 像俄罗斯套娃
✓ 必须有终止条件
```

**2. 递归三要素**
```
✓ 终止条件（什么时候停）
✓ 递推关系（怎么分解问题）
✓ 向终止条件靠近（别无限循环）
```

**3. 经典递归案例**
```
✓ 斐波那契数列
✓ 阶乘计算
✓ 幂次方
✓ 最大公约数
✓ 字符串反转
```

**4. 递归的优缺点**
```
优点：代码简洁、适合递归问题
缺点：可能栈溢出、重复计算、性能较差
```

---

### 📊 知识框架图

```
递归
├── 三要素
│   ├── 终止条件
│   ├── 递推关系
│   └── 向终止靠近
├── 经典案例
│   ├── 斐波那契
│   ├── 阶乘
│   ├── 幂运算
│   └── 汉诺塔
├── 优化方法
│   └── 记忆化（缓存）
└── 注意事项
    ├── 防止栈溢出
    └── 避免重复计算
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第六天完成了！你真棒！🎉           ║
║                                       ║
║   递归是很重要的思想！               ║
║   后面学树、图、排序都会用到！       ║
║                                       ║
║   明天是第一周复习！                 ║
║   把前面的内容好好巩固一下！         ║
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
