# 🎯 Day 25：动态规划进阶 - 经典问题实战

> **今天深入学习更多 DP 经典问题！**  
> **掌握状态转移方程的写法！**  
> **理解背包问题的核心思想！**  
> **预计时间：3-3.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 什么是状态转移方程？
□ 0-1 背包问题的解法
□ 完全背包 vs 0-1 背包
□ 最长递增子序列问题
□ 实战：背包问题 + 股票买卖
```

### 🎯 今天的任务清单

```
□ 理解状态转移方程（25 分钟）
□ 学习背包问题（50 分钟）
□ 掌握 LIS 问题（35 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 📐 第 2 步：什么是状态转移方程？（25 分钟）

### 核心概念

```javascript
/**
 * 状态转移方程 = 问题的递推关系式
 * 
 * 用数学公式表示：
 * dp[n] = f(dp[n-1], dp[n-2], ...)
 * 
 * 人话版：
 * 当前状态 = 由之前的状态推导出来
 */

// 例子：斐波那契数列的状态转移方程

/**
   F(n) = F(n-1) + F(n-2)
   
   解读：
   - 当前第 n 个数 = 前一个数 + 前两个数
   - 这就是状态转移！
   - 从已知状态转移到未知状态
*/

// 例子：爬楼梯的状态转移方程

/**
   dp[n] = dp[n-1] + dp[n-2]
   
   解读：
   - 到第 n 级台阶的方法数
   - = 到第 (n-1) 级的方法数 + 到第 (n-2) 级的方法数
   - 因为最后一步要么跨 1 级，要么跨 2 级
*/
```

---

### 写状态转移方程的步骤

```javascript
/**
 * 四步法：
 * 
 * 1. 定义 dp 数组的含义
 * 2. 找出基础情况（边界）
 * 3. 推导状态转移方程
 * 4. 确定计算顺序
 */

// 示例：零钱兑换问题

/**
   问题：有不同面额的硬币，凑出指定金额最少需要多少枚？
   
   第 1 步：定义 dp
   dp[i] = 凑出金额 i 最少需要的硬币数
   
   第 2 步：基础情况
   dp[0] = 0  （凑 0 元不需要硬币）
   
   第 3 步：状态转移
   对于每个金额 i，尝试每种硬币 coin：
   如果用一枚 coin，就还需要凑 (i - coin)
   dp[i] = min(dp[i], dp[i - coin] + 1)
   
   第 4 步：计算顺序
   从小到大：dp[1], dp[2], ..., dp[amount]
*/

function coinChange(coins, amount) {
    // dp 初始化
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    // 从小到大计算
    for (let i = 1; i <= amount; i++) {
        // 尝试每种硬币
        for (let coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// 测试
console.log(coinChange([1, 2, 5], 11));  // 3（5+5+1）
```

---

## 🎒 第 3 步：背包问题详解（50 分钟）

### 0-1 背包问题

```javascript
/**
 * 问题描述：
 * 有一个容量为 W 的背包
 * 有 N 个物品，每个物品有重量 w 和价值 v
 * 每个物品只能选或不选（不能分割）
 * 问：背包能装下的最大价值是多少？
 * 
 * 为什么叫"0-1"背包？
 * 因为每个物品只有两种选择：
 * 0 = 不选
 * 1 = 选
 */

// 形象理解：小偷进屋偷东西

/**
   小偷偷东西：
   - 保险柜重 10kg，值 60 元
   - 电脑重 20kg，值 100 元
   - 手机重 5kg，值 50 元
   
   背包只能装 30kg
   
   怎么选最值钱？
   
   方案 1：保险柜 + 手机 = 60 + 50 = 110 元（15kg）✅
   方案 2：电脑 + 手机 = 100 + 50 = 150 元（25kg）⭐最优
   方案 3：只拿电脑 = 100 元
   
   这就是 0-1 背包！
*/
```

---

### 0-1 背包的 DP 解法

```javascript
/**
 * 二维 DP 表
 * 
 * dp[i][w] = 前 i 个物品，在容量为 w 的背包中的最大价值
 */

function knapsack01(weights, values, capacity) {
    const n = weights.length;
    
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   0-1 背包问题                        ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log('物品信息：');
    for (let i = 0; i < n; i++) {
        console.log(`  物品${i}: 重量=${weights[i]}, 价值=${values[i]}`);
    }
    console.log(`背包容量：${capacity}\n`);
    
    // 创建 DP 表
    const dp = Array.from({ length: n + 1 }, () => 
        new Array(capacity + 1).fill(0)
    );
    
    console.log('开始填表:\n');
    
    // 填表
    for (let i = 1; i <= n; i++) {
        const w = weights[i - 1];
        const v = values[i - 1];
        
        for (let cap = 0; cap <= capacity; cap++) {
            // 不选当前物品
            const notTake = dp[i - 1][cap];
            
            // 选当前物品（如果能装下）
            let take = 0;
            if (cap >= w) {
                take = dp[i - 1][cap - w] + v;
            }
            
            // 选大的
            dp[i][cap] = Math.max(notTake, take);
            
            // 标记选择
            const choice = take > notTake && cap >= w ? '选' : '不选';
            console.log(`dp[${i}][${cap}] = ${choice === '选' ? '📦' : '⏭️'} ${dp[i][cap]}`);
        }
        console.log();
    }
    
    // 回溯找选了哪些物品
    console.log('\n🔍 回溯选择的物品:\n');
    const selected = [];
    let cap = capacity;
    
    for (let i = n; i > 0; i--) {
        if (dp[i][cap] !== dp[i - 1][cap]) {
            // 说明选了第 i 个物品
            selected.push(i - 1);
            cap -= weights[i - 1];
            console.log(`  选择物品${i-1} (重量${weights[i-1]}, 价值${values[i-1]})`);
        }
    }
    
    console.log(`\n最大价值：${dp[n][capacity]}`);
    console.log(`选择的物品索引：`, selected.reverse());
    console.log();
    
    return dp[n][capacity];
}

// 测试
const weights = [10, 20, 5];
const values = [60, 100, 50];
const capacity = 30;

knapsack01(weights, values, capacity);

/*
输出示例（简化）：

╔═══════════════════════════════════════╗
║   0-1 背包问题                        ║
╚═══════════════════════════════════════╝

物品信息：
  物品 0: 重量=10, 价值=60
  物品 1: 重量=20, 价值=100
  物品 2: 重量=5, 价值=50
背包容量：30

开始填表:

dp[1][0] = ⏭️ 0
dp[1][1] = ⏭️ 0
...
dp[1][10] = 📦 60
...

最大价值：150
选择的物品索引：[1, 2]（电脑 + 手机）
*/
```

---

### 空间优化版本

```javascript
/**
 * 发现：dp[i][...] 只依赖于 dp[i-1][...]
 * 所以可以用一维数组！
 */

function knapsack01Optimized(weights, values, capacity) {
    const n = weights.length;
    
    // 一维 DP 数组
    const dp = new Array(capacity + 1).fill(0);
    
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║   空间优化的 0-1 背包                  ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    // 注意：要倒序遍历容量！
    for (let i = 0; i < n; i++) {
        const w = weights[i];
        const v = values[i];
        
        console.log(`考虑物品${i} (重量${w}, 价值${v}):`);
        
        // 从大到小遍历容量
        for (let cap = capacity; cap >= w; cap--) {
            const newValue = dp[cap - w] + v;
            
            if (newValue > dp[cap]) {
                console.log(`  容量${cap}: ${dp[cap]} → ${newValue} ✅`);
                dp[cap] = newValue;
            }
        }
        console.log();
    }
    
    console.log(`最大价值：${dp[capacity]}\n`);
    return dp[capacity];
}

// 测试
knapsack01Optimized([10, 20, 5], [60, 100, 50], 30);
```

---

### 完全背包问题

```javascript
/**
 * 完全背包 vs 0-1 背包
 * 
 * 区别：
 * - 0-1 背包：每个物品只能选一次
 * - 完全背包：每个物品可以选无限次
 * 
 * 例如：
 * 0-1 背包：偷东西，每样东西只有一个
 * 完全背包：超市购物，每样商品可以买很多
 */

function unboundedKnapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = new Array(capacity + 1).fill(0);
    
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║   完全背包问题                        ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    // 正序遍历容量（和 0-1 背包相反）
    for (let i = 0; i < n; i++) {
        const w = weights[i];
        const v = values[i];
        
        console.log(`考虑物品${i} (重量${w}, 价值${v}):`);
        
        // 从小到大遍历
        for (let cap = w; cap <= capacity; cap++) {
            const newValue = dp[cap - w] + v;
            
            if (newValue > dp[cap]) {
                console.log(`  容量${cap}: ${dp[cap]} → ${newValue} ✅`);
                dp[cap] = newValue;
            }
        }
        console.log();
    }
    
    console.log(`最大价值：${dp[capacity]}\n`);
    return dp[capacity];
}

// 测试：同样的物品，完全背包能得到更大价值
unboundedKnapsack([10, 20, 5], [60, 100, 50], 30);

/*
0-1 背包：最大 150（电脑 + 手机）
完全背包：最大 300（6 个手机，5×6=30kg, 50×6=300 元）✅
*/
```

---

## 📈 第 4 步：最长递增子序列（LIS）（35 分钟）

### 问题描述

```javascript
/**
 * 最长递增子序列（Longest Increasing Subsequence）
 * 
 * 问题：
 * 给定一个数组，找最长的严格递增子序列的长度
 * 
 * 子序列：可以不连续，但顺序不能变
 * 
 * 例如：[10, 9, 2, 5, 3, 7, 101, 18]
 * 
 * 一个递增子序列：[2, 3, 7, 18]
 * 长度：4
 * 
 * 另一个：[2, 5, 7, 101]
 * 长度也是 4
 * 
 * 最长的是：[2, 3, 7, 18] 或 [2, 5, 7, 101]
 * 长度：4
 */
```

---

### DP 解法 O(n²)

```javascript
/**
 * DP 思路：
 * 
 * dp[i] = 以 nums[i] 结尾的最长递增子序列长度
 * 
 * 状态转移：
 * 对于每个 i，看前面所有 j < i：
 * 如果 nums[j] < nums[i]，就可以接在后面
 * dp[i] = max(dp[i], dp[j] + 1)
 */

function lengthOfLIS(nums) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   最长递增子序列                      ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log('数组:', nums);
    console.log();
    
    const n = nums.length;
    const dp = new Array(n).fill(1);  // 初始化为 1（每个元素本身就是长度为 1 的 LIS）
    
    console.log('初始化：每个位置至少为 1\n');
    
    // 填表
    for (let i = 1; i < n; i++) {
        console.log(`\n考虑 nums[${i}] = ${nums[i]}:`);
        
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                const newLen = dp[j] + 1;
                console.log(`  nums[${j}]=${nums[j]} < ${nums[i]}, dp[${j}]+1=${newLen}`);
                
                if (newLen > dp[i]) {
                    dp[i] = newLen;
                    console.log(`    更新 dp[${i}] = ${dp[i]} ✅`);
                }
            }
        }
        
        console.log(`最终 dp[${i}] = ${dp[i]}`);
    }
    
    console.log('\n\nDP 表:', dp);
    const result = Math.max(...dp);
    console.log(`最长递增子序列长度：${result}\n`);
    
    return result;
}

// 测试
lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]);

/*
输出示例（部分）：

数组：[10, 9, 2, 5, 3, 7, 101, 18]

初始化：每个位置至少为 1


考虑 nums[1] = 9:
  nums[0]=10 ≮ 9, 跳过
最终 dp[1] = 1

考虑 nums[2] = 2:
  nums[0]=10 ≮ 2, 跳过
  nums[1]=9 ≮ 2, 跳过
最终 dp[2] = 1

考虑 nums[3] = 5:
  nums[2]=2 < 5, dp[2]+1=2
    更新 dp[3] = 2
最终 dp[3] = 2

...

DP 表：[1, 1, 1, 2, 2, 3, 4, 4]
最长递增子序列长度：4
*/
```

---

## 💻 第 5 步：实战项目（30 分钟）

### 项目：股票买卖最佳时机

```javascript
/**
 * 股票买卖问题
 * 
 * 功能：
 * 1. 给定每天股价
 * 2. 计算最大利润
 * 3. 多次买卖（最多持有一股）
 */

class StockTrader {
    constructor(prices) {
        this.prices = prices;
        this.n = prices.length;
    }
    
    // 方法 1：暴力搜索（会超时）
    maxProfitBruteForce() {
        console.log('╔═══════════════════════════════════════╗');
        console.log('║   暴力搜索（仅演示思路）             ║');
        console.log('╚═══════════════════════════════════════╝\n');
        
        console.log('股价:', this.prices);
        console.log('天数:', this.n);
        console.log('\n尝试所有买卖组合...\n');
        
        let maxProfit = 0;
        
        // 枚举所有买入卖出组合
        for (let buy = 0; buy < this.n; buy++) {
            for (let sell = buy + 1; sell < this.n; sell++) {
                const profit = this.prices[sell] - this.prices[buy];
                
                if (profit > maxProfit) {
                    maxProfit = profit;
                    console.log(`第${buy+1}天买 (${this.prices[buy]})，第${sell+1}天卖 (${this.prices[sell]})，利润=${profit}`);
                }
            }
        }
        
        console.log(`\n最大利润：${maxProfit}\n`);
        return maxProfit;
    }
    
    // 方法 2：贪心算法（推荐）⭐
    maxProfitGreedy() {
        console.log('╔═══════════════════════════════════════╗');
        console.log('║   贪心算法                           ║');
        console.log('╚═══════════════════════════════════════╝\n');
        
        console.log('股价:', this.prices);
        console.log('\n策略：低买高卖，只要赚钱就交易\n');
        
        let totalProfit = 0;
        
        for (let i = 1; i < this.n; i++) {
            const profit = this.prices[i] - this.prices[i - 1];
            
            if (profit > 0) {
                totalProfit += profit;
                console.log(`第${i}天→第${i+1}天：+${profit}元 (累计${totalProfit}元) ✅`);
            } else {
                console.log(`第${i}天→第${i+1}天：${profit}元 (不操作)`);
            }
        }
        
        console.log(`\n总利润：${totalProfit}元\n`);
        return totalProfit;
    }
    
    // 方法 3：动态规划
    maxProfitDP() {
        console.log('╔═══════════════════════════════════════╗');
        console.log('║   动态规划                           ║');
        console.log('╚═══════════════════════════════════════╝\n');
        
        console.log('股价:', this.prices);
        console.log('\n状态定义：');
        console.log('  hold[i] = 第 i 天持有股票的最大利润');
        console.log('  cash[i] = 第 i 天不持有股票的最大利润\n');
        
        // 初始化
        let hold = -this.prices[0];  // 第一天买入
        let cash = 0;                 // 第一天不买
        
        console.log(`第 1 天：hold=${hold}, cash=${cash}\n`);
        
        // 状态转移
        for (let i = 1; i < this.n; i++) {
            const prevHold = hold;
            const prevCash = cash;
            
            // 今天持有 = 昨天就持有 OR 今天买入
            hold = Math.max(prevHold, prevCash - this.prices[i]);
            
            // 今天不持有 = 昨天就不持有 OR 今天卖出
            cash = Math.max(prevCash, prevHold + this.prices[i]);
            
            console.log(`第${i+1}天 (股价${this.prices[i]}):`);
            console.log(`  hold = max(${prevHold}, ${prevCash}-${this.prices[i]}) = ${hold}`);
            console.log(`  cash = max(${prevCash}, ${prevHold}+${this.prices[i]}) = ${cash}\n`);
        }
        
        console.log(`最大利润：${cash}\n`);
        return cash;
    }
    
    // 显示价格趋势
    showTrend() {
        console.log('📈 股价趋势图:\n');
        
        const maxPrice = Math.max(...this.prices);
        const scale = 20 / maxPrice;
        
        this.prices.forEach((price, i) => {
            const bar = '█'.repeat(Math.floor(price * scale));
            console.log(`第${(i+1).toString().padStart(2)}天: ${bar} (${price}元)`);
        });
        
        console.log();
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   股票买卖系统                       ║');
console.log('╚═══════════════════════════════════════╝\n');

const prices = [7, 1, 5, 3, 6, 4];
const trader = new StockTrader(prices);

// 显示趋势
trader.showTrend();

// 三种方法对比
console.log('=== 方法 1：暴力搜索 ===\n');
trader.maxProfitBruteForce();

console.log('=== 方法 2：贪心算法 ===\n');
trader.maxProfitGreedy();

console.log('=== 方法 3：动态规划 ===\n');
trader.maxProfitDP();

/*
输出示例（部分）：

📈 股价趋势图:

第 1 天: ███████ (7 元)
第 2 天: █ (1 元)
第 3 天: █████ (5 元)
第 4 天: ███ (3 元)
第 5 天: ██████ (6 元)
第 6 天: ████ (4 元)

=== 方法 2：贪心算法 ===

股价：[7, 1, 5, 3, 6, 4]

策略：低买高卖，只要赚钱就交易

第 1 天→第 2 天：-6 元 (不操作)
第 2 天→第 3 天：+4 元 (累计 4 元) ✅
第 3 天→第 4 天：-2 元 (不操作)
第 4 天→第 5 天：+3 元 (累计 7 元) ✅
第 5 天→第 6 天：-2 元 (不操作)

总利润：7 元

解释：
第 2 天买 (1 元)，第 3 天卖 (5 元)，赚 4 元
第 4 天买 (3 元)，第 5 天卖 (6 元)，赚 3 元
总共：7 元 ✅
*/
```

---

## 🎯 费曼输出 #25：解释动态规划进阶（20 分钟）

### 任务 1：向小学生解释背包问题

**要求：**
- 不用"动态规划"、"状态转移"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"有个叫背包问题的事情，
就像______一样。

有______和______，
每次都要决定______，
最后就能______。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释 0-1 背包和完全背包的区别

**场景：**
```
小朋友问："这两个有什么区别？"
```

**你要解释：**
1. 0-1 背包是什么情况？
2. 完全背包是什么情况？
3. 为什么解法不同？

**要求：**
- 用具体例子说明
- 让小朋友能听懂
- 说明白本质区别

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚状态转移方程的含义
□ 我不知道如何解释为什么要倒序遍历
□ 我只能背诵代码，不能用自己的话
□ 我解释不清 LIS 问题的思路
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 6 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 写出下列问题的状态转移方程

```
问题 1：爬楼梯（每次 1 或 2 级）
dp[n] = _________________

问题 2：斐波那契数列
F(n) = _________________

问题 3：零钱兑换
dp[i] = _________________
```

---

#### 2. 手动模拟 0-1 背包

```
物品：A(重 2, 值 3), B(重 3, 值 4), C(重 4, 值 5)
背包容量：5

请画出 DP 表并填写：

     0  1  2  3  4  5
   ┌─────────────────
A  │
B  │
C  │

最大价值：_______
```

---

### 进阶题（选做）⭐⭐

#### 3. 实现分割等和子集

```javascript
/**
 * 判断能否把数组分成和相等的两部分
 * 
 * 例如：[1, 5, 11, 5]
 * 可以分成 [1, 5, 5] 和 [11]
 * 返回 true
 * 
 * 提示：转化为背包问题
 */

function canPartition(nums) {
    // 你的代码
}

console.log(canPartition([1, 5, 11, 5]));  // true
console.log(canPartition([1, 2, 3, 5]));   // false
```

---

### 挑战题（加分）⭐⭐⭐

#### 4. 最长公共子序列（LCS）

```javascript
/**
 * 找两个字符串的最长公共子序列
 * 
 * 例如：
 * text1 = "abcde"
 * text2 = "ace"
 * LCS = "ace"，长度 3
 * 
 * 提示：二维 DP
 * dp[i][j] = text1 前 i 个和 text2 前 j 个的 LCS 长度
 */

function longestCommonSubsequence(text1, text2) {
    // 你的代码
}

console.log(longestCommonSubsequence("abcde", "ace"));  // 3
console.log(longestCommonSubsequence("abc", "def"));    // 0
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 状态转移方程**
```
✓ 定义 dp 含义
✓ 找出基础情况
✓ 推导转移方程
✓ 确定计算顺序
```

**2. 背包问题**
```
✓ 0-1 背包（每个选一次）
✓ 完全背包（可选无限次）
✓ 空间优化技巧
```

**3. LIS 问题**
```
✓ 定义 dp[i]
✓ 双重循环
✓ O(n²) 复杂度
```

**4. 实际应用**
```
✓ 股票买卖
✓ 资源分配
✓ 最优决策
```

---

### 📊 知识框架图

```
动态规划进阶
├── 状态转移方程
│   ├── 定义 dp
│   ├── 基础情况
│   └── 递推关系
├── 背包问题
│   ├── 0-1 背包
│   │   ├── 二维 DP
│   │   └── 一维优化（倒序）
│   └── 完全背包
│       └── 一维 DP（正序）
├── LIS 问题
│   ├── dp[i] 定义
│   └── O(n²) 解法
└── 应用
    ├── 股票买卖
    └── 资源分配
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第二十五天完成了！你真棒！🎉       ║
║                                       ║
║   掌握了动态规划的精髓！             ║
║   背包问题 + LIS！                   ║
║                                       ║
║   明天继续动态规划！                 ║
║   学习更多难题！                     ║
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
- ⏰ 总计：约 3-3.5 小时 ✅
