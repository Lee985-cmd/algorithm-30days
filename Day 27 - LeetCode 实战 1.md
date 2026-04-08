# 🎯 Day 27：LeetCode 刷题实战 - 数组与字符串

> **今天开始 LeetCode 实战训练！**  
> **应用学过的算法知识解题！**  
> **掌握面试高频题型！**  
> **预计时间：3-3.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ LeetCode 题目的解题套路
□ 数组类题目的多种解法
□ 字符串处理的技巧
□ 如何分析时间和空间复杂度
□ 实战：5 道经典题目详解
```

### 🎯 今天的任务清单

```
□ 学习解题模板（20 分钟）
□ 数组专题训练（50 分钟）
□ 字符串专题（45 分钟）
□ 双指针技巧（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 📝 第 2 步：LeetCode 解题通用思路（20 分钟）

### 四步解题法

```javascript
/**
 * 遇到任何题目，按这四步走：
 * 
 * 第 1 步：理解题意（5 分钟）
 * - 输入是什么？
 * - 输出是什么？
 * - 有什么约束条件？
 * - 有没有特殊情况？
 * 
 * 第 2 步：思考解法（10 分钟）
 * - 暴力解法是什么？
 * - 能不能优化？
 * - 用什么数据结构？
 * - 用什么算法思想？
 * 
 * 第 3 步：编写代码（15 分钟）
 * - 先写框架
 * - 填充细节
 * - 处理边界
 * - 添加注释
 * 
 * 第 4 步：测试验证（5 分钟）
 * - 普通测试用例
 * - 边界测试用例
 * - 特殊测试用例
 * - 检查复杂度
 */

// 示例：两数之和

/**
   题目：给定一个整数数组 nums 和一个目标值 target
        请你在该数组中找出和为目标值的那两个整数
        返回它们的数组下标
   
   第 1 步：理解题意
   - 输入：nums = [2, 7, 11, 15], target = 9
   - 输出：[0, 1]（因为 nums[0] + nums[1] = 2 + 7 = 9）
   - 约束：每种输入只对应一个答案，不能重复使用同一个元素
   
   第 2 步：思考解法
   
   解法 1：暴力枚举
   - 两层循环，尝试所有组合
   - 时间复杂度：O(n²)
   - 空间复杂度：O(1)
   
   解法 2：哈希表
   - 用 Map 记录已遍历的数字
   - 对于每个数 num，检查 (target - num) 是否在 Map 中
   - 时间复杂度：O(n)
   - 空间复杂度：O(n)
   
   显然解法 2 更优！✅
*/
```

---

## 🔢 第 3 步：数组专题（50 分钟）

### 题目 1：两数之和（Easy）⭐⭐⭐

```javascript
/**
 * LeetCode 1. 两数之和
 * https://leetcode.cn/problems/two-sum/
 * 
 * 难度：Easy
 * 标签：数组、哈希表
 * 出现频率：极高
 */

/**
 * 方法 1：暴力枚举
 */
function twoSumBrute(nums, target) {
    const n = nums.length;
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    
    return []; // 不会到这里，题目保证有解
}

// 测试
console.log(twoSumBrute([2, 7, 11, 15], 9));  // [0, 1]


/**
 * 方法 2：哈希表（推荐）⭐
 */
function twoSum(nums, target) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   两数之和 - 哈希表解法              ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    const map = new Map();  // 存储 {数字：索引}
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        console.log(`当前数字：${nums[i]} (索引${i})`);
        console.log(`需要找：${complement}`);
        
        if (map.has(complement)) {
            const foundIndex = map.get(complement);
            console.log(`✅ 在索引${foundIndex}找到了 ${complement}！\n`);
            return [foundIndex, i];
        }
        
        map.set(nums[i], i);
        console.log(`记录：${nums[i]} → 索引${i}\n`);
    }
    
    return [];
}

// 测试
twoSum([2, 7, 11, 15], 9);

/*
输出：

╔═══════════════════════════════════════╗
║   两数之和 - 哈希表解法              ║
╚═══════════════════════════════════════╝

当前数字：2 (索引 0)
需要找：7
记录：2 → 索引 0

当前数字：7 (索引 1)
需要找：2
✅ 在索引 0 找到了 2！

结果：[0, 1]
*/
```

---

### 题目 2：合并两个有序数组（Easy）⭐⭐

```javascript
/**
 * LeetCode 88. 合并两个有序数组
 * https://leetcode.cn/problems/merge-sorted-array/
 * 
 * 难度：Easy
 * 标签：数组、双指针
 * 技巧：从后往前遍历
 */

/**
 * 题目：
 * 给你两个有序整数数组 nums1 和 nums2
 * 将 nums2 合并到 nums1 中，使 num1 成为一个有序数组
 * 
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6],       n = 3
 * 
 * 输出：[1,2,2,3,5,6]
 */

function merge(nums1, m, nums2, n) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   合并两个有序数组                   ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log(`nums1: [${nums1}], 有效长度：${m}`);
    console.log(`nums2: [${nums2}], 长度：${n}\n`);
    
    // 三个指针
    let p1 = m - 1;      // nums1 的末尾（有效元素的最后一个）
    let p2 = n - 1;      // nums2 的末尾
    let p = m + n - 1;   // 合并后的末尾
    
    console.log('初始位置：');
    console.log(`p1=${p1}, p2=${p2}, p=${p}\n`);
    
    // 从后往前填 nums1
    while (p2 >= 0) {
        console.log(`比较 nums1[${p1}]=${nums1[p1]} 和 nums2[${p2}]=${nums2[p2]}`);
        
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            console.log(`  ${nums1[p1]} 更大，放到位置${p}`);
            p1--;
        } else {
            nums1[p] = nums2[p2];
            console.log(`  ${nums2[p2]} 更大（或相等），放到位置${p}`);
            p2--;
        }
        
        console.log(`  nums1 现在是：[${nums1}]\n`);
        p--;
    }
    
    console.log('最终结果:', nums1);
    console.log();
}

// 测试
const nums1 = [1, 2, 3, 0, 0, 0];
const nums2 = [2, 5, 6];
merge(nums1, 3, nums2, 3);

/*
输出：

╔═══════════════════════════════════════╗
║   合并两个有序数组                   ║
╚═══════════════════════════════════════╝

nums1: [1,2,3,0,0,0], 有效长度：3
nums2: [2,5,6], 长度：3

初始位置：
p1=2, p2=2, p=5

比较 nums1[2]=3 和 nums2[2]=6
  6 更大（或相等），放到位置 5
  nums1 现在是：[1,2,3,0,0,6]

比较 nums1[2]=3 和 nums2[1]=5
  5 更大（或相等），放到位置 4
  nums1 现在是：[1,2,3,0,5,6]

比较 nums1[2]=3 和 nums2[0]=2
  3 更大，放到位置 3
  nums1 现在是：[1,2,3,3,5,6]

...

最终结果：[1,2,2,3,5,6]
*/
```

---

### 题目 3：移动零（Easy）⭐⭐

```javascript
/**
 * LeetCode 283. 移动零
 * https://leetcode.cn/problems/move-zeroes/
 * 
 * 难度：Easy
 * 标签：数组、双指针
 * 技巧：快慢指针
 */

/**
 * 题目：
 * 给定一个数组 nums，将所有 0 移动到数组末尾
 * 保持非零元素的相对顺序
 * 
 * 输入：[0,1,0,3,12]
 * 输出：[1,3,12,0,0]
 */

function moveZeroes(nums) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   移动零 - 双指针                    ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log('原始数组:', nums);
    console.log();
    
    let slow = 0;  // 慢指针：指向下一个非零元素应该放的位置
    let fast = 0;  // 快指针：遍历数组
    
    console.log('开始遍历:\n');
    
    for (fast = 0; fast < nums.length; fast++) {
        console.log(`fast=${fast}, nums[fast]=${nums[fast]}, slow=${slow}`);
        
        if (nums[fast] !== 0) {
            // 遇到非零元素，和 slow 位置交换
            if (slow !== fast) {
                console.log(`  发现非零元素，交换 nums[${slow}] 和 nums[${fast}]`);
                [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
                console.log(`  交换后：[${nums}]`);
            } else {
                console.log(`  非零元素，但 slow==fast，不交换`);
            }
            slow++;
        } else {
            console.log(`  是 0，跳过`);
        }
        
        console.log(`  当前数组：[${nums}]\n`);
    }
    
    console.log('最终结果:', nums);
    console.log();
}

// 测试
moveZeroes([0, 1, 0, 3, 12]);

/*
输出：

╔═══════════════════════════════════════╗
║   移动零 - 双指针                    ║
╚═══════════════════════════════════════╝

原始数组：[0,1,0,3,12]

开始遍历:

fast=0, nums[fast]=0, slow=0
  是 0，跳过
  当前数组：[0,1,0,3,12]

fast=1, nums[fast]=1, slow=0
  发现非零元素，交换 nums[0] 和 nums[1]
  交换后：[1,0,0,3,12]
  当前数组：[1,0,0,3,12]

fast=2, nums[fast]=0, slow=1
  是 0，跳过
  当前数组：[1,0,0,3,12]

fast=3, nums[fast]=3, slow=1
  发现非零元素，交换 nums[1] 和 nums[3]
  交换后：[1,3,0,0,12]
  当前数组：[1,3,0,0,12]

fast=4, nums[fast]=12, slow=2
  发现非零元素，交换 nums[2] 和 nums[4]
  交换后：[1,3,12,0,0]
  当前数组：[1,3,12,0,0]

最终结果：[1,3,12,0,0]
*/
```

---

## 🔤 第 4 步：字符串专题（45 分钟）

### 题目 4：验证回文串（Easy）⭐

```javascript
/**
 * LeetCode 125. 验证回文串
 * https://leetcode.cn/problems/valid-palindrome/
 * 
 * 难度：Easy
 * 标签：字符串、双指针
 * 技巧：忽略大小写和非字母数字字符
 */

/**
 * 题目：
 * 给定一个字符串，验证它是否是回文串
 * 只考虑字母和数字字符，忽略大小写
 * 
 * 输入："A man, a plan, a canal: Panama"
 * 输出：true
 */

function isPalindrome(s) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   验证回文串                         ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log(`原始字符串："${s}"\n`);
    
    // 预处理：只保留字母数字，转小写
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    console.log(`清理后："${cleaned}"`);
    console.log(`长度：${cleaned.length}\n`);
    
    // 双指针判断
    let left = 0;
    let right = cleaned.length - 1;
    
    console.log('开始比较:\n');
    
    while (left < right) {
        console.log(`left=${left}('${cleaned[left]}'), right=${right}('${cleaned[right]}')`);
        
        if (cleaned[left] !== cleaned[right]) {
            console.log(`  ❌ 不相等，不是回文\n`);
            return false;
        }
        
        console.log(`  ✅ 相等\n`);
        left++;
        right--;
    }
    
    console.log('所有字符都匹配，是回文！✅\n');
    return true;
}

// 测试
isPalindrome('A man, a plan, a canal: Panama');
isPalindrome('race a car');

/*
输出：

╔═══════════════════════════════════════╗
║   验证回文串                         ║
╚═══════════════════════════════════════╝

原始字符串："A man, a plan, a canal: Panama"

清理后："amanaplanacanalpanama"
长度：21

开始比较:

left=0('a'), right=20('a')
  ✅ 相等

left=1('m'), right=19('a')
  ✅ 相等

...

所有字符都匹配，是回文！✅
*/
```

---

### 题目 5：最长公共前缀（Easy）⭐⭐

```javascript
/**
 * LeetCode 14. 最长公共前缀
 * https://leetcode.cn/problems/longest-common-prefix/
 * 
 * 难度：Easy
 * 标签：字符串
 * 技巧：纵向扫描
 */

/**
 * 题目：
 * 编写一个函数查找字符串数组中的最长公共前缀
 * 
 * 输入：["flower","flow","flight"]
 * 输出："fl"
 */

function longestCommonPrefix(strs) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   最长公共前缀                        ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    console.log('字符串数组:', strs);
    console.log();
    
    if (strs.length === 0) return '';
    
    // 以第一个字符串为基准
    const first = strs[0];
    
    console.log(`以 "${first}" 为基准\n`);
    
    // 遍历第一个字符串的每个字符
    for (let i = 0; i < first.length; i++) {
        const char = first[i];
        
        console.log(`检查第${i}个字符 '${char}':`);
        
        // 检查其他字符串的第 i 个字符
        for (let j = 1; j < strs.length; j++) {
            const other = strs[j];
            
            if (i >= other.length || other[i] !== char) {
                console.log(`  ❌ "${other}" 的第${i}个字符不匹配`);
                const result = first.slice(0, i);
                console.log(`\n公共前缀："${result}"\n`);
                return result;
            }
            
            console.log(`  ✅ "${other}" 的第${i}个字符也是 '${char}'`);
        }
        
        console.log();
    }
    
    console.log(`所有字符都匹配，公共前缀："${first}"\n`);
    return first;
}

// 测试
longestCommonPrefix(['flower', 'flow', 'flight']);
longestCommonPrefix(['dog', 'racecar', 'car']);

/*
输出：

╔═══════════════════════════════════════╗
║   最长公共前缀                        ║
╚═══════════════════════════════════════╝

字符串数组：['flower', 'flow', 'flight']

以 "flower" 为基准

检查第 0 个字符 'f':
  ✅ "flow" 的第 0 个字符也是 'f'
  ✅ "flight" 的第 0 个字符也是 'f'

检查第 1 个字符 'l':
  ✅ "flow" 的第 1 个字符也是 'l'
  ✅ "flight" 的第 1 个字符也是 'l'

检查第 2 个字符 'o':
  ❌ "flight" 的第 2 个字符不匹配

公共前缀："fl"
*/
```

---

## 💻 第 5 步：综合技巧总结（30 分钟）

### 数组题常见套路

```javascript
/**
 * 1. 双指针法
 * 
 * 适用场景：
 * ✓ 有序数组
 * ✓ 查找两数之和
 * ✓ 反转数组
 * ✓ 滑动窗口
 * 
 * 模板：
 */

// 左右指针向中间移动
function twoPointers(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // 处理逻辑
        if (condition) {
            left++;
        } else {
            right--;
        }
    }
}

// 快慢指针
function fastSlowPointers(arr) {
    let slow = 0;
    let fast = 0;
    
    while (fast < arr.length) {
        // 处理逻辑
        if (condition) {
            slow++;
        }
        fast++;
    }
}


/**
 * 2. 前缀和
 * 
 * 适用场景：
 * ✓ 区间和查询
 * ✓ 子数组问题
 * 
 * 模板：
 */

function prefixSum(arr) {
    const n = arr.length;
    const prefix = new Array(n + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    
    // 查询 [i, j] 的和
    // sum(i, j) = prefix[j+1] - prefix[i]
    
    return prefix;
}


/**
 * 3. 滑动窗口
 * 
 * 适用场景：
 * ✓ 连续子数组
 * ✓ 满足某条件的最值
 * 
 * 模板：
 */

function slidingWindow(arr, k) {
    let left = 0;
    let sum = 0;
    let result = 0;
    
    for (let right = 0; right < arr.length; right++) {
        sum += arr[right];  // 扩大窗口
        
        while (right - left + 1 > k) {  // 缩小窗口
            sum -= arr[left];
            left++;
        }
        
        // 更新结果
        result = Math.max(result, sum);
    }
    
    return result;
}
```

---

## 🎯 费曼输出 #27：解释 LeetCode 解题思路（20 分钟）

### 任务 1：向小学生解释双指针法

**要求：**
- 不用"指针"、"索引"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"有个叫双指针的方法，
就像______一样。

两个人分别从______和______开始，
然后______，
最后就能______。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释为什么哈希表能快速查找

**场景：**
```
小朋友问："为什么用 Map 就快了？"
```

**你要解释：**
1. 暴力方法为什么慢？
2. 哈希表怎么做到 O(1) 查找？
3. 空间换时间的含义？

**要求：**
- 用具体例子说明
- 让小朋友能听懂
- 说明白"用空间换时间"的思想

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚双指针的移动规则
□ 我不知道如何解释哈希表的优势
□ 我只能背诵代码，不能用自己的话
□ 我解释不清滑动窗口的原理
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 6 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 实现删除排序数组中的重复项

```javascript
/**
 * LeetCode 26. 删除排序数组中的重复项
 * 
 * 给定一个排序数组，原地删除重复元素
 * 使每个元素只出现一次
 * 返回新数组的长度
 * 
 * 输入：[1,1,2]
 * 输出：2，且数组变为 [1,2,...]
 * 
 * 提示：用快慢指针
 */

function removeDuplicates(nums) {
    // 你的代码
}

console.log(removeDuplicates([1, 1, 2]));  // 2
```

---

#### 2. 实现有效的括号

```javascript
/**
 * LeetCode 20. 有效的括号
 * 
 * 给定一个只包括 '()[]{}' 的字符串
 * 判断是否有效
 * 
 * 有效条件：
 * 1. 左括号必须用相同类型的右括号闭合
 * 2. 左括号必须以正确的顺序闭合
 * 
 * 输入："()[]{}"
 * 输出：true
 * 
 * 输入："(]"
 * 输出：false
 * 
 * 提示：用栈
 */

function isValid(s) {
    // 你的代码
}

console.log(isValid('()[]{}'));  // true
console.log(isValid('(]'));      // false
```

---

### 进阶题（选做）⭐⭐

#### 3. 三数之和

```javascript
/**
 * LeetCode 15. 三数之和
 * 
 * 给你一个包含 n 个整数的数组 nums
 * 判断是否存在三元组 [nums[a], nums[b], nums[c]]
 * 满足 a != b、a != c 且 b != c
 * 且 nums[a] + nums[b] + nums[c] == 0
 * 
 * 返回所有和为 0 且不重复的三元组
 * 
 * 输入：[-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 
 * 提示：排序 + 双指针
 */

function threeSum(nums) {
    // 你的代码
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// [[-1,-1,2],[-1,0,1]]
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. LeetCode 解题套路**
```
✓ 四步解题法
✓ 理解题意的重要性
✓ 多角度看问题
```

**2. 数组技巧**
```
✓ 双指针法
✓ 快慢指针
✓ 从后往前遍历
```

**3. 字符串技巧**
```
✓ 预处理简化问题
✓ 纵向扫描
✓ 回文判断
```

**4. 常用数据结构**
```
✓ 哈希表 O(1) 查找
✓ 栈的应用
✓ 滑动窗口
```

---

### 📊 知识框架图

```
LeetCode 实战
├── 解题方法
│   ├── 理解题意
│   ├── 思考解法
│   ├── 编写代码
│   └── 测试验证
├── 数组专题
│   ├── 双指针
│   ├── 哈希表
│   └── 滑动窗口
├── 字符串专题
│   ├── 预处理
│   ├── 回文判断
│   └── 公共前缀
└── 常用技巧
    ├── 前缀和
    ├── 栈
    └── 贪心
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第二十七天完成了！你真棒！🎉       ║
║                                       ║
║   开始 LeetCode 实战训练！           ║
║   掌握了数组和字符串的基础题！       ║
║                                       ║
║   明天继续刷题！                     ║
║   学习更多解题技巧！                 ║
║                                       ║
║   坚持就是胜利！                     ║
║   加油！                             ║
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
- ⏰ 总计：约 3-3.5 小时 ✅
