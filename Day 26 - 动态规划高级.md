# 🎯 Day 26：动态规划高级 - 难题突破

> **今天挑战 DP 中的高难度问题！**  
> **掌握复杂场景的解题技巧！**  
> **理解多维 DP 和区间 DP！**  
> **预计时间：3-3.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 什么是二维 DP 问题？
□ 区间 DP 的基本思想
□ 如何识别 DP 问题的变形？
□ 经典难题的解题思路
□ 实战：编辑距离 + 最长回文子串
```

### 🎯 今天的任务清单

```
□ 学习编辑距离（45 分钟）
□ 掌握区间 DP（40 分钟）
□ 学习路径问题（35 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## ✏️ 第 2 步：编辑距离问题（45 分钟）

### 问题描述

```javascript
/**
 * 编辑距离（Edit Distance / Levenshtein Distance）
 * 
 * 问题：
 * 给定两个单词 word1 和 word2
 * 计算将 word1 转换成 word2 最少需要多少步操作
 * 
 * 允许的操作：
 * 1. 插入一个字符
 * 2. 删除一个字符
 * 3. 替换一个字符
 * 
 * 例如：
 * word1 = "horse"
 * word2 = "ros"
 * 
 * horse → rorse (把 h 换成 r)
 * rorse → rose (删除 r)
 * rose → ros (删除 e)
 * 
 * 共 3 步
 */
```

---

### 形象比喻：改作文

```
老师批改作文：

学生写的是："我喜欢吃草梅"
正确答案是："我喜欢吃草莓"

怎么修改？

方案：
1. "草" → "草"（不变）
2. "梅" → "莓"（替换）

只需要改 1 个字！✅

这就是编辑距离！
```

---

### DP 解法详解

```javascript
/**
 * DP 思路：
 * 
 * dp[i][j] = word1 前 i 个字符变成 word2 前 j 个字符的最少操作数
 * 
 * 状态转移方程：
 * 
 * 如果 word1[i-1] == word2[j-1]：
 *   dp[i][j] = dp[i-1][j-1]  （不需要操作）
 * 
 * 否则：
 *   dp[i][j] = min(
 *     dp[i-1][j] + 1,      // 删除 word1[i]
 *     dp[i][j-1] + 1,      // 插入 word2[j]
 *     dp[i-1][j-1] + 1     // 替换 word1[i] 为 word2[j]
 *   )
 * 
 * 边界条件：
 * dp[0][j] = j  （word1 为空，需要插入 j 次）
 * dp[i][0] = i  （word2 为空，需要删除 i 次）
 */

function minDistance(word1, word2) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   编辑距离问题                        ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log(`word1: "${word1}" (${word1.length}个字符)`);
    console.log(`word2: "${word2}" (${word2.length}个字符)\n`);
    
    const m = word1.length;
    const n = word2.length;
    
    // 创建 DP 表
    const dp = Array.from({ length: m + 1 }, () => 
        new Array(n + 1).fill(0)
    );
    
    // 初始化边界
    console.log('初始化边界:\n');
    
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
        console.log(`dp[${i}][0] = ${i} (删除${i}次)`);
    }
    
    console.log();
    
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
        console.log(`dp[0][${j}] = ${j} (插入${j}次)`);
    }
    
    console.log('\n\n开始填表:\n');
    
    // 填表
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                // 字符相同，不需要操作
                dp[i][j] = dp[i - 1][j - 1];
                console.log(`"${word1[i-1]}" == "${word2[j-1]}", dp[${i}][${j}] = dp[${i-1}][${j-1}] = ${dp[i][j]} ✓`);
            } else {
                // 字符不同，取三种操作的最小值
                const deleteOp = dp[i - 1][j] + 1;
                const insertOp = dp[i][j - 1] + 1;
                const replaceOp = dp[i - 1][j - 1] + 1;
                
                dp[i][j] = Math.min(deleteOp, insertOp, replaceOp);
                
                console.log(`"${word1[i-1]}" != "${word2[j-1]}", ` +
                    `删(${deleteOp}),插(${insertOp}),换(${replaceOp}) → ` +
                    `dp[${i}][${j}] = ${dp[i][j]}`);
            }
        }
        console.log();
    }
    
    // 显示完整 DP 表
    console.log('\n完整的 DP 表:\n');
    
    // 打印表头
    console.log('      ', '∅  '.split('').map(c => c.padEnd(4)).join(''));
    console.log('      ', word2.split('').map(c => c.padEnd(4)).join(''));
    
    for (let i = 0; i <= m; i++) {
        const rowLabel = i === 0 ? '∅' : word1[i - 1];
        const row = [rowLabel.padEnd(4)];
        
        for (let j = 0; j <= n; j++) {
            row.push(dp[i][j].toString().padStart(3));
        }
        
        console.log(row.join(' '));
    }
    
    console.log(`\n最少操作数：${dp[m][n]}\n`);
    
    return dp[m][n];
}

// 测试
minDistance('horse', 'ros');

/*
输出示例（部分）：

╔═══════════════════════════════════════╗
║   编辑距离问题                        ║
╚═══════════════════════════════════════╝

word1: "horse" (5 个字符)
word2: "ros" (3 个字符)

初始化边界:

dp[0][0] = 0 (删除 0 次)
dp[1][0] = 1 (删除 1 次)
...

完整的 DP 表:

       ∅   r   o   s   
  ∅    0   1   2   3
  h    1   1   2   3
  o    2   2   1   2
  r    3   2   2   2
  s    4   3   3   2
  e    5   4   3   3

最少操作数：3
*/
```

---

## 🔄 第 3 步：区间 DP 问题（40 分钟）

### 最长回文子串

```javascript
/**
 * 最长回文子串
 * 
 * 问题：
 * 找一个字符串中最长的回文子串
 * 
 * 回文：正着读和反着读都一样
 * 例如："aba", "abba", "abcba"
 * 
 * 例如：
 * s = "babad"
 * 回文子串有："bab", "aba", "ada"
 * 最长的是："bab" 或 "aba"
 */
```

---

### 中心扩散法（推荐）⭐

```javascript
/**
 * 方法 1：中心扩散法
 * 
 * 思路：
 * 回文就像往水里扔石头产生的涟漪
 * 从中心向两边扩散
 * 
 * 每个位置都可能是回文中心
 * 有两种情况：
 * 1. 单个字符为中心（奇数长度）
 * 2. 两个字符之间为中心（偶数长度）
 */

function longestPalindromeExpand(s) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   最长回文子串 - 中心扩散法          ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log(`字符串：${s}\n`);
    
    let result = '';
    
    for (let i = 0; i < s.length; i++) {
        // 奇数长度回文
        const odd = expandAroundCenter(s, i, i);
        // 偶数长度回文
        const even = expandAroundCenter(s, i, i + 1);
        
        // 取较长的
        const longer = odd.length > even.length ? odd : even;
        
        if (longer.length > result.length) {
            result = longer;
            console.log(`发现新记录：${result} (长度${result.length})`);
        }
    }
    
    console.log(`\n最长回文子串：${result}\n`);
    return result;
}

// 辅助函数：从中心向两边扩散
function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return s.slice(left + 1, right);
}

// 测试
longestPalindromeExpand('babad');
longestPalindromeExpand('cbbd');
```

---

### DP 解法

```javascript
/**
 * 方法 2：动态规划
 * 
 * dp[i][j] = s[i...j] 是否为回文
 * 
 * 状态转移：
 * 如果 s[i] == s[j] 且 dp[i+1][j-1] 是回文
 * 那么 dp[i][j] 也是回文
 * 
 * 边界：
 * dp[i][i] = true  （单个字符是回文）
 * dp[i][i+1] = (s[i] == s[i+1])  （两个字符）
 */

function longestPalindromeDP(s) {
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║   最长回文子串 - DP 方法              ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log(`字符串：${s}\n`);
    
    const n = s.length;
    const dp = Array.from({ length: n }, () => 
        new Array(n).fill(false)
    );
    
    let maxLength = 1;
    let start = 0;
    
    // 长度为 1 的子串都是回文
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    
    // 检查长度为 2 的子串
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            maxLength = 2;
            start = i;
        }
    }
    
    // 检查更长的子串
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                maxLength = len;
                start = i;
            }
        }
    }
    
    const result = s.slice(start, start + maxLength);
    console.log(`最长回文子串：${result} (长度${maxLength})\n`);
    
    return result;
}

// 测试
longestPalindromeDP('babad');
```

---

## 🛤️ 第 4 步：路径问题（35 分钟）

### 不同路径问题

```javascript
/**
 * 不同路径
 * 
 * 问题：
 * 机器人在 m×n 网格的左上角
 * 每次只能向右或向下移动
 * 问：到达右下角有多少条不同路径？
 * 
 * 例如：3×7 的网格
 * 
 * S . . . . . .
 * . . . . . . .
 * . . . . . . E
 * 
 * 从 S 到 E 有多少种走法？
 */
```

---

### DP 解法

```javascript
/**
 * DP 思路：
 * 
 * dp[i][j] = 到达位置 (i,j) 的路径数
 * 
 * 状态转移：
 * dp[i][j] = dp[i-1][j] + dp[i][j-1]
 * 
 * 解释：
 * 到 (i,j) 只能从上面或左边来
 * 所以路径数 = 从上面来的 + 从左边来的
 * 
 * 边界：
 * dp[0][j] = 1  （第一行只有一种走法：一直向右）
 * dp[i][0] = 1  （第一列只有一种走法：一直向下）
 */

function uniquePaths(m, n) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   不同路径问题                        ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log(`网格大小：${m} × ${n}\n`);
    
    // 创建 DP 表
    const dp = Array.from({ length: m }, () => 
        new Array(n).fill(0)
    );
    
    // 初始化边界
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    
    console.log('初始化边界后:\n');
    printGrid(dp);
    
    // 填表
    console.log('\n开始填表:\n');
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            console.log(`dp[${i}][${j}] = dp[${i-1}][${j}] + dp[${i}][${j-1}] = ${dp[i-1][j]} + ${dp[i][j-1]} = ${dp[i][j]}`);
        }
        console.log();
    }
    
    console.log('\n完整的 DP 表:\n');
    printGrid(dp);
    
    console.log(`\n总路径数：${dp[m-1][n-1]}\n`);
    
    return dp[m - 1][n - 1];
}

// 打印网格
function printGrid(grid) {
    for (let row of grid) {
        console.log('  ' + row.map(x => x.toString().padStart(3)).join(' '));
    }
    console.log();
}

// 测试
uniquePaths(3, 7);
uniquePaths(3, 3);

/*
输出示例（3×3）：

网格大小：3 × 3

初始化边界后:

    1   1   1
    1   0   0
    1   0   0

开始填表:

dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2
dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3
dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3
dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6

完整的 DP 表:

    1   1   1
    1   2   3
    1   3   6

总路径数：6
*/
```

---

## 💻 第 5 步：实战项目（30 分钟）

### 项目：文本相似度检测系统

```javascript
/**
 * 文本相似度检测
 * 
 * 功能：
 * 1. 计算两个文本的编辑距离
 * 2. 转换为相似度百分比
 * 3. 批量比较文本
 * 4. 找出最相似/最不同的文本对
 */

class TextSimilarityChecker {
    constructor() {
        this.cache = new Map();
    }
    
    // 计算编辑距离
    editDistance(text1, text2) {
        const key = `${text1}|${text2}`;
        
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        
        const m = text1.length;
        const n = text2.length;
        const dp = Array.from({ length: m + 1 }, () => 
            new Array(n + 1).fill(0)
        );
        
        // 初始化
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        
        // 填表
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (text1[i - 1] === text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j],      // 删除
                        dp[i][j - 1],      // 插入
                        dp[i - 1][j - 1]   // 替换
                    );
                }
            }
        }
        
        this.cache.set(key, dp[m][n]);
        return dp[m][n];
    }
    
    // 计算相似度（百分比）
    similarity(text1, text2) {
        const distance = this.editDistance(text1, text2);
        const maxLength = Math.max(text1.length, text2.length);
        
        if (maxLength === 0) return 100;
        
        const similarity = ((maxLength - distance) / maxLength * 100).toFixed(1);
        return parseFloat(similarity);
    }
    
    // 批量比较
    batchCompare(texts) {
        console.log('╔═══════════════════════════════════════╗');
        console.log('║   文本相似度分析                     ║');
        console.log('╚═══════════════════════════════════════╝\n');
        
        console.log(`共有${texts.length}段文本\n`);
        
        const results = [];
        
        for (let i = 0; i < texts.length; i++) {
            for (let j = i + 1; j < texts.length; j++) {
                const sim = this.similarity(texts[i], texts[j]);
                results.push({
                    text1: texts[i],
                    text2: texts[j],
                    similarity: sim
                });
            }
        }
        
        // 按相似度排序
        results.sort((a, b) => b.similarity - a.similarity);
        
        // 显示结果
        console.log('📊 相似度排名:\n');
        
        results.forEach((r, i) => {
            const medal = ['🥇', '🥈', '🥉'][i] || `${i + 1}.`;
            const bar = '█'.repeat(Math.floor(r.similarity / 5));
            
            console.log(`${medal} ${bar} ${r.similarity}%`);
            console.log(`   "${r.text1}" vs "${r.text2}"\n`);
        });
        
        // 找出最相似和最不同
        const mostSimilar = results[0];
        const leastSimilar = results[results.length - 1];
        
        console.log('💡 结论:\n');
        console.log(`最相似：${mostSimilar.similarity}%`);
        console.log(`  "${mostSimilar.text1}"`);
        console.log(`  "${mostSimilar.text2}"\n`);
        
        console.log(`最不同：${leastSimilar.similarity}%`);
        console.log(`  "${leastSimilar.text1}"`);
        console.log(`  "${leastSimilar.text2}"\n`);
        
        return results;
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   文本相似度检测系统                 ║');
console.log('╚═══════════════════════════════════════╝\n');

const checker = new TextSimilarityChecker();

// 测试用例
const texts = [
    '我喜欢吃苹果',
    '我喜欢吃香蕉',
    '他喜欢吃苹果',
    '我不喜欢吃苹果',
    '苹果很好吃'
];

checker.batchCompare(texts);

/*
输出示例：

╔═══════════════════════════════════════╗
║   文本相似度检测系统                 ║
╚═══════════════════════════════════════╝

共有 5 段文本

📊 相似度排名:

🥇 ████████████ 80.0%
   "我喜欢吃苹果" vs "他喜欢吃苹果"

🥈 ██████████ 60.0%
   "我喜欢吃苹果" vs "我不喜欢吃苹果"

🥉 █████████ 60.0%
   "我喜欢吃苹果" vs "我喜欢吃香蕉"

...

💡 结论:

最相似：80.0%
  "我喜欢吃苹果"
  "他喜欢吃苹果"

最不同：40.0%
  "他喜欢吃苹果"
  "苹果很好吃"
*/
```

---

## 🎯 费曼输出 #26：解释动态规划高级（20 分钟）

### 任务 1：向小学生解释编辑距离

**要求：**
- 不用"动态规划"、"递归"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"有个叫编辑距离的东西，
就像______一样。

要把______变成______，
可以______、______、或者______，
数一数最少要几步。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释为什么 DP 能解决这些问题

**场景：**
```
小朋友问："这个方法为什么这么厉害？"
```

**你要解释：**
1. DP 的核心思想是什么？
2. 为什么要记住中间结果？
3. 怎么从简单情况推到复杂情况？

**要求：**
- 用具体例子说明
- 让小朋友能听懂
- 说明白"化繁为简"的思想

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚编辑距离的三种操作
□ 我不知道如何解释区间 DP 的思路
□ 我只能背诵代码，不能用自己的话
□ 我解释不清路径问题的递推关系
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 6 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 计算编辑距离

```
word1 = "intention"
word2 = "execution"

请手动计算编辑距离：

提示：
intention → inention (删除 t)
inention → enention (替换 i→e)
enention → exention (替换 n→x)
exention → exection (替换 n→c)
exection → execution (插入 u)

答案：____步
```

---

#### 2. 找最长回文子串

```
s = "racecar"

最长回文子串是：_______
长度是：_______
```

---

### 进阶题（选做）⭐⭐

#### 3. 实现最小路径和

```javascript
/**
 * 在 m×n 网格中，每个格子有数字
 * 从左上角到右下角
 * 每次只能向右或向下
 * 求路径上数字之和的最小值
 * 
 * 例如：
 * [[1,3,1],
 *  [1,5,1],
 *  [4,2,1]]
 * 
 * 最小路径：1→3→1→1→1 = 7
 */

function minPathSum(grid) {
    // 你的代码
}

const grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
];

console.log(minPathSum(grid));  // 7
```

---

### 挑战题（加分）⭐⭐⭐

#### 4. 正则表达式匹配

```javascript
/**
 * 实现支持 '.' 和 '*' 的正则匹配
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的元素
 * 
 * 例如：
 * s = "aa"
 * p = "a*"
 * 返回：true（a* 可以匹配 aa）
 * 
 * s = "ab"
 * p = ".*"
 * 返回：true（.* 匹配任意字符串）
 * 
 * 提示：二维 DP
 */

function isMatch(s, p) {
    // 你的代码
}

console.log(isMatch("aa", "a"));      // false
console.log(isMatch("aa", "a*"));     // true
console.log(isMatch("ab", ".*"));     // true
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 编辑距离**
```
✓ 三种操作：插入、删除、替换
✓ 二维 DP 表
✓ 实际应用场景
```

**2. 区间 DP**
```
✓ 最长回文子串
✓ 中心扩散法
✓ DP 填表顺序
```

**3. 路径问题**
```
✓ 不同路径数
✓ 最小路径和
✓ 组合数学应用
```

**4. 综合应用**
```
✓ 文本相似度
✓ 拼写检查
✓ DNA 序列比对
```

---

### 📊 知识框架图

```
动态规划高级
├── 编辑距离
│   ├── 三种操作
│   └── 二维 DP
├── 区间 DP
│   ├── 回文问题
│   └── 中心扩散
├── 路径问题
│   ├── 不同路径
│   └── 最小路径
└── 应用
    ├── 文本匹配
    ├── 生物信息
    └── 编译器
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第二十六天完成了！你真棒！🎉       ║
║                                       ║
║   动态规划专题完结！                 ║
║   掌握了算法中最难的部分！           ║
║                                       ║
║   明天开始 LeetCode 实战！           ║
║   用学到的知识刷题！                 ║
║                                       ║
║   坚持就是胜利！                     ║
║   加油！                             ║
║                                       ║
╚═══════════════════════════════════════╝
```

**明天见！继续加油！** ✨

---

**学习时长统计：**
- 📖 阅读 + 理解：120 分钟
- 💻 实战项目：30 分钟
- 💭 思考 + 笔记：15 分钟
- ✍️ 练习 + 费曼输出：20 分钟
- ⏰ 总计：约 3-3.5 小时 ✅
