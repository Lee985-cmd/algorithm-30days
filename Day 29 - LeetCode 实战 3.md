# 🎯 Day 29：LeetCode 刷题实战 - 综合提升

> **今天挑战综合性的高频面试题！**  
> **融会贯通所有学过的知识！**  
> **为面试做最后准备！**  
> **预计时间：3-3.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 中等难度题目的解题思路
□ 如何识别题目背后的算法思想
□ 多种解法的选择策略
□ 面试中的答题技巧
□ 实战：5 道经典中档题详解
```

### 🎯 今天的任务清单

```
□ 回溯算法专题（40 分钟）
□ 滑动窗口进阶（35 分钟）
□ 二分查找应用（30 分钟）
□ 综合训练（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🔙 第 2 步：回溯算法专题（40 分钟）

### 题目 1：全排列（Medium）⭐⭐⭐

```javascript
/**
 * LeetCode 46. 全排列
 * https://leetcode.cn/problems/permutations/
 * 
 * 难度：Medium
 * 标签：回溯、递归
 * 出现频率：极高
 * 
 * 题目：
 * 给定一个不含重复数字的数组 nums，返回其所有可能的全排列
 * 
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */

/**
 * 回溯算法模板：
 * 
 * function backtrack(路径，选择列表) {
 *     if (满足结束条件) {
 *         result.add(路径);
 *         return;
 *     }
 *     
 *     for (选择 in 选择列表) {
 *         做选择;
 *         backtrack(路径，选择列表);
 *         撤销选择;
 *     }
 * }
 */

function permute(nums) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   全排列 - 回溯算法                  ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    const result = [];
    const track = [];  // 路径
    const used = new Array(nums.length).fill(false);  // 标记是否已使用
    
    console.log(`输入数组：[${nums}]\n`);
    
    function backtrack() {
        // 结束条件：路径长度等于数组长度
        if (track.length === nums.length) {
            console.log(`${'  '.repeat(track.length)}✅ 找到一个排列：[${track}]`);
            result.push([...track]);
            return;
        }
        
        console.log(`${'  '.repeat(track.length)}当前路径：[${track}], used=[${used}]`);
        
        // 遍历选择列表
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) {
                console.log(`${'  '.repeat(track.length)}  nums[${i}]=${nums[i]} 已使用，跳过`);
                continue;
            }
            
            // 做选择
            console.log(`${'  '.repeat(track.length)}  选择 nums[${i}]=${nums[i]}`);
            track.push(nums[i]);
            used[i] = true;
            
            // 进入下一层决策树
            backtrack();
            
            // 撤销选择
            console.log(`${'  '.repeat(track.length)}  撤销选择，移除 ${nums[i]}`);
            track.pop();
            used[i] = false;
        }
    }
    
    backtrack();
    
    console.log(`\n共找到${result.length}个排列:`);
    result.forEach((p, i) => {
        console.log(`  ${i + 1}. [${p}]`);
    });
    console.log();
    
    return result;
}

// 测试
permute([1, 2, 3]);

/*
输出示例（部分）：

╔═══════════════════════════════════════╗
║   全排列 - 回溯算法                  ║
╚═══════════════════════════════════════╝

输入数组：[1,2,3]

当前路径：[], used=[false,false,false]
  选择 nums[0]=1
  当前路径：[1], used=[true,false,false]
    选择 nums[1]=2
    当前路径：[1,2], used=[true,true,false]
      选择 nums[2]=3
      ✅ 找到一个排列：[1,2,3]
      撤销选择，移除 3
    撤销选择，移除 2
...

共找到 6 个排列:
  1. [1,2,3]
  2. [1,3,2]
  3. [2,1,3]
  4. [2,3,1]
  5. [3,1,2]
  6. [3,2,1]
*/
```

---

### 题目 2：子集（Medium）⭐⭐

```javascript
/**
 * LeetCode 78. 子集
 * https://leetcode.cn/problems/subsets/
 * 
 * 难度：Medium
 * 标签：回溯、位运算
 * 
 * 题目：
 * 给你一个整数数组 nums，返回该数组所有可能的子集（幂集）
 * 
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */

function subsets(nums) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   子集问题 - 回溯算法                ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    const result = [];
    const track = [];
    
    console.log(`输入数组：[${nums}]\n`);
    
    function backtrack(start) {
        // 每个节点都是一个子集
        console.log(`${'  '.repeat(track.length)}当前子集：[${track}]`);
        result.push([...track]);
        
        // 从 start 开始，避免重复
        for (let i = start; i < nums.length; i++) {
            console.log(`${'  '.repeat(track.length)}  选择 nums[${i}]=${nums[i]}`);
            
            track.push(nums[i]);
            backtrack(i + 1);  // 注意：是 i+1，不是 start+1
            track.pop();
            
            console.log(`${'  '.repeat(track.length)}  撤销选择`);
        }
    }
    
    backtrack(0);
    
    console.log(`\n共找到${result.length}个子集:`);
    result.forEach((s, i) => {
        console.log(`  ${i + 1}. [${s}]`);
    });
    console.log();
    
    return result;
}

// 测试
subsets([1, 2, 3]);
```

---

## 🪟 第 3 步：滑动窗口进阶（35 分钟）

### 题目 3：无重复字符的最长子串（Medium）⭐⭐⭐

```javascript
/**
 * LeetCode 3. 无重复字符的最长子串
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 * 
 * 难度：Medium
 * 标签：字符串、滑动窗口、哈希表
 * 出现频率：极高
 * 
 * 题目：
 * 给定一个字符串 s，找出不含有重复字符的最长子串的长度
 * 
 * 输入：s = "abcabcbb"
 * 输出：3
 * 解释：因为无重复字符的最长子串是 "abc"，所以其长度为 3
 */

function lengthOfLongestSubstring(s) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   无重复字符的最长子串               ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log(`输入字符串："${s}"\n`);
    
    const window = new Set();  // 滑动窗口
    let left = 0;
    let maxLength = 0;
    
    console.log('开始滑动窗口:\n');
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        console.log(`right=${right}, 字符='${char}'`);
        console.log(`  当前窗口：[${Array.from(window).join('')}]`);
        
        // 如果字符已在窗口中，移动左指针
        while (window.has(char)) {
            console.log(`  '${char}' 已在窗口中，移除左边字符 '${s[left]}'`);
            window.delete(s[left]);
            left++;
            console.log(`  新窗口：[${Array.from(window).join('')}], left=${left}`);
        }
        
        // 加入当前字符
        window.add(char);
        console.log(`  加入 '${char}'，窗口：[${Array.from(window).join('')}]`);
        
        // 更新最大长度
        const currentLength = right - left + 1;
        if (currentLength > maxLength) {
            maxLength = currentLength;
            console.log(`  ✨ 新纪录！长度=${maxLength}`);
        }
        
        console.log();
    }
    
    console.log(`最长子串长度：${maxLength}\n`);
    return maxLength;
}

// 测试
lengthOfLongestSubstring('abcabcbb');
lengthOfLongestSubstring('bbbbb');
lengthOfLongestSubstring('pwwkew');

/*
输出示例（部分）：

╔═══════════════════════════════════════╗
║   无重复字符的最长子串               ║
╚═══════════════════════════════════════╝

输入字符串："abcabcbb"

开始滑动窗口:

right=0, 字符='a'
  当前窗口：[]
  加入 'a'，窗口：[a]
  ✨ 新纪录！长度=1

right=1, 字符='b'
  当前窗口：[a]
  加入 'b'，窗口：[ab]
  ✨ 新纪录！长度=2

right=2, 字符='c'
  当前窗口：[ab]
  加入 'c'，窗口：[abc]
  ✨ 新纪录！长度=3

right=3, 字符='a'
  当前窗口：[abc]
  'a' 已在窗口中，移除左边字符 'a'
  新窗口：[bc], left=1
  加入 'a'，窗口：[bca]
...

最长子串长度：3
*/
```

---

## 🎯 第 4 步：二分查找应用（30 分钟）

### 题目 4：搜索旋转排序数组（Medium）⭐⭐⭐

```javascript
/**
 * LeetCode 33. 搜索旋转排序数组
 * https://leetcode.cn/problems/search-in-rotated-sorted-array/
 * 
 * 难度：Medium
 * 标签：数组、二分查找
 * 出现频率：高
 * 
 * 题目：
 * 整数数组 nums 按升序排列，但在某个未知的 pivot 下进行了旋转
 * 例如：[0,1,2,4,5,6,7] → [4,5,6,7,0,1,2]
 * 
 * 给定旋转后的数组和一个目标值 target
 * 如果存在则返回索引，否则返回 -1
 * 
 * 要求：时间复杂度 O(log n) → 必须用二分查找
 */

function search(nums, target) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   搜索旋转排序数组                   ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log(`数组：[${nums}]`);
    console.log(`目标：${target}\n`);
    
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        console.log(`范围：[${left}, ${right}], mid=${mid}, nums[mid]=${nums[mid]}`);
        
        // 找到目标
        if (nums[mid] === target) {
            console.log(`✅ 找到目标，索引=${mid}\n`);
            return mid;
        }
        
        // 判断哪一半是有序的
        if (nums[left] <= nums[mid]) {
            // 左半部分有序
            console.log(`  左半部分 [${left}..${mid}] 有序`);
            
            if (nums[left] <= target && target < nums[mid]) {
                // 目标在左半部分
                console.log(`  目标在左半部分`);
                right = mid - 1;
            } else {
                // 目标在右半部分
                console.log(`  目标在右半部分`);
                left = mid + 1;
            }
        } else {
            // 右半部分有序
            console.log(`  右半部分 [${mid}..${right}] 有序`);
            
            if (nums[mid] < target && target <= nums[right]) {
                // 目标在右半部分
                console.log(`  目标在右半部分`);
                left = mid + 1;
            } else {
                // 目标在左半部分
                console.log(`  目标在左半部分`);
                right = mid - 1;
            }
        }
        
        console.log();
    }
    
    console.log(`❌ 未找到目标\n`);
    return -1;
}

// 测试
const rotated = [4, 5, 6, 7, 0, 1, 2];
search(rotated, 0);
search(rotated, 3);
```

---

## 💻 第 5 步：综合技巧总结（30 分钟）

### 回溯算法通用模板

```javascript
/**
 * 回溯算法适用于：
 * ✓ 排列组合问题
 * ✓ 子集问题
 * ✓ 分割问题
 * ✓ N 皇后问题
 */

function backtrackTemplate(nums) {
    const result = [];
    const track = [];
    const used = new Array(nums.length).fill(false);
    
    function backtrack(start) {
        // 结束条件
        if (满足条件) {
            result.push([...track]);
            return;
        }
        
        // 做选择
        for (let i = start; i < nums.length; i++) {
            if (used[i]) continue;  // 剪枝
            
            track.push(nums[i]);
            used[i] = true;
            
            backtrack(i + 1);
            
            // 撤销选择
            track.pop();
            used[i] = false;
        }
    }
    
    backtrack(0);
    return result;
}


/**
 * 滑动窗口通用模板
 * 
 * 适用于：
 * ✓ 连续子数组/子串问题
 * ✓ 满足某条件的最值
 */

function slidingWindowTemplate(s) {
    const window = new Map();  // 或 Set
    let left = 0;
    let result = 0;
    
    for (let right = 0; right < s.length; right++) {
        // 扩大窗口
        const c = s[right];
        window.set(c, (window.get(c) || 0) + 1);
        
        // 收缩窗口（当不满足条件时）
        while (需要收缩) {
            const d = s[left];
            window.set(d, window.get(d) - 1);
            left++;
        }
        
        // 更新结果
        result = Math.max(result, right - left + 1);
    }
    
    return result;
}
```

---

### 面试答题技巧

```javascript
/**
 * 面试中遇到算法题：
 * 
 * 1. 澄清题意（1-2 分钟）
 *    - 确认输入输出
 *    - 问清楚边界条件
 *    - 询问数据范围
 * 
 * 2. 思考解法（3-5 分钟）
 *    - 先说暴力解法
 *    - 再想优化方案
 *    - 分析时间复杂度
 * 
 * 3. 编写代码（10-15 分钟）
 *    - 边写边解释思路
 *    - 注意代码规范
 *    - 处理边界情况
 * 
 * 4. 测试验证（3-5 分钟）
 *    - 给几个测试用例
 *    - 检查是否有 bug
 *    - 分析复杂度
 */

// 示例：面试中这样说

/**
   "这道题我首先想到的是暴力解法...
   
   但是时间复杂度是 O(n²)，可能不够优
   
   我考虑用双指针/哈希表/二分查找来优化...
   
   这样可以把时间复杂度降到 O(n) 或 O(log n)
   
   让我写一下代码..."
*/
```

---

## 🎯 费曼输出 #29：解释回溯和滑动窗口（20 分钟）

### 任务 1：向小学生解释回溯算法

**要求：**
- 不用"递归"、"回溯"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"有个叫回溯的方法，
就像______一样。

每次都要______，
如果发现不对，
就______，
然后试______。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释滑动窗口的优势

**场景：**
```
小朋友问："为什么滑动窗口这么快？"
```

**你要解释：**
1. 暴力方法为什么慢？
2. 滑动窗口怎么避免重复计算？
3. 什么情况下能用滑动窗口？

**要求：**
- 用具体例子说明
- 让小朋友能听懂
- 说明白"不回头"的思想

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚回溯的撤销选择
□ 我不知道如何解释滑动窗口的收缩
□ 我只能背诵代码，不能用自己的话
□ 我解释不清旋转数组的二分查找
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 6 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 实现组合问题

```javascript
/**
 * LeetCode 77. 组合
 * 
 * 给定两个整数 n 和 k
 * 返回范围 [1, n] 中所有可能的 k 个数的组合
 * 
 * 输入：n = 4, k = 2
 * 输出：[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
 * 
 * 提示：用回溯算法
 */

function combine(n, k) {
    // 你的代码
}

console.log(combine(4, 2));
```

---

#### 2. 实现最小覆盖子串

```javascript
/**
 * LeetCode 76. 最小覆盖子串
 * 
 * 给你一个字符串 s、一个字符串 t
 * 返回 s 中涵盖 t 所有字符的最小子串
 * 
 * 输入：s = "ADOBECODEBANC", t = "ABC"
 * 输出："BANC"
 * 
 * 难度：Hard
 * 提示：滑动窗口 + 哈希表
 */

function minWindow(s, t) {
    // 你的代码
}

console.log(minWindow('ADOBECODEBANC', 'ABC'));  // "BANC"
```

---

### 进阶题（选做）⭐⭐

#### 3. 实现单词搜索

```javascript
/**
 * LeetCode 79. 单词搜索
 * 
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word
 * 判断 word 是否存在于网格中
 * 
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成
 * 相邻单元格是水平或垂直相邻的单元格
 * 同一个单元格内的字母不允许被重复使用
 * 
 * 提示：回溯算法
 */

function exist(board, word) {
    // 你的代码
}

const board = [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
];

console.log(exist(board, 'ABCCED'));  // true
console.log(exist(board, 'SEE'));     // true
console.log(exist(board, 'ABCB'));    // false
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 回溯算法**
```
✓ 排列问题
✓ 组合问题
✓ 子集问题
✓ 选择与撤销
```

**2. 滑动窗口**
```
✓ 无重复字符子串
✓ 窗口扩张与收缩
✓ 最优解维护
```

**3. 二分查找进阶**
```
✓ 旋转数组
✓ 判断有序区间
✓ 缩小搜索范围
```

**4. 面试技巧**
```
✓ 解题思路表达
```

---

### 📊 知识框架图

```
LeetCode 实战 - 综合提升
├── 回溯算法
│   ├── 排列（全排列）
│   ├── 组合（子集）
│   └── 搜索（N 皇后）
├── 滑动窗口
│   ├── 无重复子串
│   ├── 最小覆盖子串
│   └── 定长窗口
└── 二分查找
    ├── 旋转数组
    └── 变种应用
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第二十九天完成了！你真棒！🎉       ║
║                                       ║
║   LeetCode 实战训练完结！            ║
║   掌握了面试高频题型！               ║
║                                       ║
║   明天就是最后一天！                 ║
║   总复习 + 毕业致辞！                ║
║                                       ║
║   坚持就是胜利！                     ║
║   加油！                             ║
║                                       ║
╚═══════════════════════════════════════╝
```

**明天见！最后一天的冲刺！** ✨

---

**学习时长统计：**
- 📖 阅读 + 理解：105 分钟
- 💻 实战项目：30 分钟
- 💭 思考 + 笔记：15 分钟
- ✍️ 练习 + 费曼输出：20 分钟
- ⏰ 总计：约 3-3.5 小时 ✅
