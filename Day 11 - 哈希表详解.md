# 🎯 Day 11：哈希表 - 超级快的字典

> **今天学一个查找超快的数据结构！**  
> **理解哈希函数和冲突解决！**  
> **预计时间：2-2.5 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 哈希表是什么？（用字典部首查字比喻）
□ 哈希函数的作用
□ 什么是哈希冲突？怎么解决？
□ 为什么哈希表查找是 O(1)？
□ 实战：单词拼写检查器
```

### 🎯 今天的任务清单

```
□ 理解哈希表概念（25 分钟）
□ 学习哈希函数设计（30 分钟）
□ 掌握冲突解决方法（40 分钟）
□ 了解性能分析（20 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 📖 第 2 步：什么是哈希表？（25 分钟）

### 故事时间：图书馆索书号

#### 场景：找一本书

```
图书馆有 100 万本书，怎么快速找到《JavaScript 高级编程》？

方法 1：一本一本找（顺序查找）
→ 从第一本开始翻
→ 可能要翻 100 万次！
→ 时间复杂度：O(n) ❌

方法 2：按书名拼音首字母（哈希表思想）⭐
→ J 开头的在 J 区
→ JavaScript 在 JS 分类
→ 很快找到！
→ 时间复杂度：O(1) ✅

这就是哈希表的智慧！
```

---

### 💡 哈希表的定义

**官方说法：**
> 哈希表是一种通过键值对直接访问数据的数据结构，通过哈希函数将键映射到数组的某个位置

**人话版：**
> **哈希表 = 给每个数据一个编号，根据编号直接找到位置**

```javascript
// 哈希表的基本思想

const hashMap = new Map();

// 存数据
hashMap.set('name', '小明');
hashMap.set('age', 18);
hashMap.set('city', '北京');

// 取数据
console.log(hashMap.get('name'));  // '小明'
console.log(hashMap.get('age'));   // 18

// 为什么快？
// 'name' → 哈希函数 → 索引 3 → 直接访问 array[3]
```

---

### 🎯 哈希表的形象比喻

#### 比喻 1：字典部首查字

```
查"河"字：

步骤：
1. 确定部首 → "氵"（三点水）
2. 找到部首目录 → 第 5 页
3. 数笔画 → 6 画
4. 找到"河"字 → 第 128 页

部首 = 键（key）
页码 = 哈希值
查字 = 查找操作

不用从第一页翻到最后一页！
```

---

#### 比喻 2：超市存包柜

```
存包流程：
1. 按"存包"按钮
2. 机器给你一张纸条：A-05-12
   A 区 - 第 5 排 - 12 号柜子
3. 把包放进去

取包流程：
1. 看纸条：A-05-12
2. 直接走到 A 区 5 排 12 号
3. 输入密码，拿走包

不需要一个一个柜子试！
纸条上的号码 = 哈希值
```

---

#### 比喻 3：学校分班

```
新生入学：

按姓氏分班：
- 姓李、刘、陈 → 1 班
- 姓张、王、赵 → 2 班
- 姓杨、黄、周 → 3 班

找张三同学：
1. 看姓氏 → "张"
2. 知道在 2 班
3. 直接去 2 班找

比挨个班级问快多了！
姓氏 = 键
班级 = 哈希值
```

---

## 🔧 第 3 步：哈希函数（30 分钟）

### 什么是哈希函数？

```javascript
/**
 * 哈希函数 = 把任意输入变成固定长度的数字
 * 
 * 公式：
 * index = hash(key) % arrayLength
 */

// 简单的哈希函数示例
function simpleHash(key, arraySize) {
    let hash = 0;
    
    // 把字符串每个字符的 ASCII 码相加
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
    }
    
    // 取模，确保在数组范围内
    return hash % arraySize;
}

// 测试
console.log(simpleHash('name', 10));    // 例如：3
console.log(simpleHash('age', 10));     // 例如：7
console.log(simpleHash('city', 10));    // 例如：2
```

---

### 好的哈希函数的特点

#### 1️⃣ 确定性

```javascript
/**
 * 同样的输入，永远得到同样的输出
 */

hash('hello');  // 每次都返回同一个数，比如 99
hash('hello');  // 还是 99
hash('hello');  // 还是 99

// 不能这次 99，下次 100，那就乱套了！
```

---

#### 2️⃣ 均匀分布

```javascript
/**
 * 不同的键应该尽量分散到不同的位置
 * 
 * 避免都挤在一起！
 */

// 好的哈希函数：
hash('apple')  → 5
hash('banana') → 12
hash('orange') → 8
hash('grape')  → 15
分散在不同位置 ✅

// 坏的哈希函数：
hash('apple')  → 3
hash('banana') → 3
hash('orange') → 3
hash('grape')  → 3
都挤在位置 3，全是冲突 ❌
```

---

#### 3️⃣ 快速计算

```javascript
/**
 * 哈希函数要算得快
 * 
 * 如果算哈希都要很久，就没意义了
 */

// 好的：简单加法，O(1)
hash = char1 + char2 + ... 

// 不好的：复杂计算，O(n²)
hash = 复杂的数学运算...
```

---

### 常见的哈希函数

#### 方法 1：除留余数法（最常用）

```javascript
/**
 * hash(key) = key % tableSize
 * 
 * tableSize 最好是质数（减少冲突）
 */

function hash1(key, size) {
    return key % size;
}

// 例子
console.log(15 % 7);  // 1
console.log(22 % 7);  // 1 ← 冲突了！
console.log(30 % 7);  // 2
```

---

#### 方法 2：平方取中法

```javascript
/**
 * 先平方，再取中间几位
 */

function hash2(key, size) {
    const square = key * key;
    // 取中间两位
    const middle = Math.floor((square / 100)) % 100;
    return middle % size;
}

// 例子
console.log(hash2(12, 100));  
// 12² = 144
// 取中间位：4
// 4 % 100 = 4
```

---

#### 方法 3：字符串哈希

```javascript
/**
 * 处理字符串的哈希函数
 */

function stringHash(str, size) {
    let hash = 0;
    
    for (let i = 0; i < str.length; i++) {
        // 每个字符的 ASCII 码乘以权重
        hash += str.charCodeAt(i) * (i + 1);
    }
    
    return hash % size;
}

// 测试
console.log(stringHash('hello', 100));
console.log(stringHash('world', 100));
```

---

## ⚠️ 第 4 步：哈希冲突及解决（40 分钟）

### 什么是哈希冲突？

```javascript
/**
 * 冲突 = 两个不同的键，哈希到了同一个位置
 * 
 * 不可避免！只能减少！
 */

// 例子
const arr = new Array(10);

arr[simpleHash('name', 10)] = '小明';    // 位置 3
arr[simpleHash('age', 10)] = 18;         // 位置 7
arr[simpleHash('email', 10)] = 'xxx@xx.com';  // 位置 3 ← 冲突！

// 位置 3 已经有值了，怎么办？
```

---

### 解决方法 1：链地址法（拉链法）⭐推荐

```javascript
/**
 * 每个位置是一个链表/数组
 * 
 * 冲突了就往链表里加
 */

class HashTableChaining {
    constructor(size = 16) {
        this.size = size;
        // 每个位置是一个空数组
        this.buckets = new Array(size).fill(null).map(() => []);
    }
    
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }
    
    // 插入
    set(key, value) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        // 查找是否已存在
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;  // 更新
                return;
            }
        }
        
        // 不存在，添加到链表
        bucket.push([key, value]);
        console.log(`✅ 插入：${key} → ${value}（位置${index}）`);
    }
    
    // 查找
    get(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                console.log(`✅ 找到：${key} → ${bucket[i][1]}`);
                return bucket[i][1];
            }
        }
        
        console.log(`❌ 未找到：${key}`);
        return undefined;
    }
    
    // 删除
    delete(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                const deleted = bucket.splice(i, 1)[0];
                console.log(`🗑️  删除：${key}`);
                return deleted[1];
            }
        }
        
        console.log(`❌ 未找到：${key}`);
        return null;
    }
    
    // 显示所有
    show() {
        console.log('\n=== 哈希表内容 ===');
        for (let i = 0; i < this.size; i++) {
            const bucket = this.buckets[i];
            if (bucket.length > 0) {
                console.log(`位置${i}:`, bucket.map(kv => `${kv[0]}:${kv[1]}`).join(', '));
            }
        }
        console.log('===============\n');
    }
}

// ==================== 测试 ====================

const hashTable = new HashTableChaining(10);

hashTable.set('name', '小明');
hashTable.set('age', 18);
hashTable.set('city', '北京');

// 可能会有冲突
hashTable.set('email', 'test@example.com');
hashTable.set('phone', '123456');

hashTable.show();

/*
可能的输出：

=== 哈希表内容 ===
位置 2: name:小明
位置 5: age:18, email:test@example.com  ← 冲突了，在同一个链表
位置 7: city:北京
位置 8: phone:123456
===============
*/
```

---

### 解决方法 2：开放寻址法

```javascript
/**
 * 冲突了就找下一个空位
 * 
 * 线性探测：一个个往后找
 */

class HashTableOpenAddressing {
    constructor(size = 16) {
        this.size = size;
        this.keys = new Array(size).fill(null);
        this.values = new Array(size).fill(null);
    }
    
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }
    
    // 插入（线性探测）
    set(key, value) {
        let index = this._hash(key);
        
        // 如果位置被占了，找下一个
        while (this.keys[index] !== null) {
            if (this.keys[index] === key) {
                // 键已存在，更新
                this.values[index] = value;
                console.log(`🔄 更新：${key} → ${value}`);
                return;
            }
            
            // 线性探测：下一个位置
            index = (index + 1) % this.size;
            console.log(`   位置${index - 1}被占，探测位置${index}`);
        }
        
        // 找到空位，插入
        this.keys[index] = key;
        this.values[index] = value;
        console.log(`✅ 插入：${key} → ${value}（位置${index}）`);
    }
    
    // 查找
    get(key) {
        let index = this._hash(key);
        const startIndex = index;
        
        while (this.keys[index] !== null) {
            if (this.keys[index] === key) {
                console.log(`✅ 找到：${key} → ${this.values[index]}`);
                return this.values[index];
            }
            
            index = (index + 1) % this.size;
            
            // 转了一圈回到原点，说明没有
            if (index === startIndex) {
                break;
            }
        }
        
        console.log(`❌ 未找到：${key}`);
        return undefined;
    }
    
    // 显示
    show() {
        console.log('\n=== 哈希表（开放寻址）===');
        for (let i = 0; i < this.size; i++) {
            if (this.keys[i] !== null) {
                console.log(`位置${i}: ${this.keys[i]} → ${this.values[i]}`);
            }
        }
        console.log('===========================\n');
    }
}

// ==================== 测试 ====================

const hashOA = new HashTableOpenAddressing(10);

hashOA.set('name', '小明');
hashOA.set('age', 18);

// 如果冲突，会看到探测过程
hashOA.set('email', 'test@example.com');

hashOA.show();
```

---

### 两种方法对比

| 方法 | 优点 | 缺点 | 适用场景 |
|-----|------|------|---------|
| **链地址法** | ✓ 简单<br>✓ 不会满<br>✓ 删除方便 | ✗ 需要额外空间<br>✗ 链表长时变慢 | 通用场景 |
| **开放寻址** | ✓ 节省空间<br>✓ 缓存友好 | ✗ 会满<br>✗ 删除麻烦<br>✗ 聚集问题 | 数据量已知 |

---

## 📊 第 5 步：性能分析（20 分钟）

### 时间复杂度

| 操作 | 平均情况 | 最坏情况 | 说明 |
|-----|---------|---------|------|
| **查找** | O(1) | O(n) | 不冲突时很快 |
| **插入** | O(1) | O(n) | 可能需要探测 |
| **删除** | O(1) | O(n) | 需要先找到 |

---

### 影响性能的因素

#### 1️⃣ 负载因子（Load Factor）

```javascript
/**
 * 负载因子 = 元素个数 / 数组大小
 * 
 * α = n / m
 */

// 例子
const table = new Array(10);  // 容量 10

table 里有 5 个元素 → α = 5/10 = 0.5
table 里有 10 个元素 → α = 10/10 = 1.0（满了）
table 里有 20 个元素 → α = 20/10 = 2.0（严重冲突）

// 经验法则：
α < 0.7  → 良好 ✅
α > 0.7  → 考虑扩容 ⚠️
α > 1.0  → 必须扩容 ❌
```

---

#### 2️⃣ 哈希函数质量

```javascript
/**
 * 好的哈希函数 → 均匀分布 → 冲突少
 * 坏的哈希函数 → 聚集分布 → 冲突多
 */

// 坏的例子
function badHash(key, size) {
    return 0;  // 所有键都哈希到位置 0
}

// 结果：所有数据都在位置 0 的链表
// 查找退化成 O(n) ❌
```

---

#### 3️⃣ 数组大小

```javascript
/**
 * 数组太小 → 容易冲突
 * 数组太大 → 浪费空间
 * 
 * 选择质数作为大小可以减少冲突
 */

const goodSizes = [17, 31, 61, 127, 251];  // 都是质数 ✅

// 避免使用
const badSizes = [10, 20, 100, 1000];  // 容易有规律 ❌
```

---

## 💻 第 6 步：实战项目（30 分钟）

### 项目：单词拼写检查器

```javascript
/**
 * 英语单词拼写检查
 * 
 * 功能：
 * 1. 加载词典（哈希表存储）
 * 2. 检查单词拼写
 * 3. 添加新单词
 * 4. 统计词汇量
 */

class SpellChecker {
    constructor() {
        // 用哈希表存储词典
        this.dictionary = new Map();
        this.loadDefaultWords();
    }
    
    // 加载基础词汇
    loadDefaultWords() {
        const words = [
            'apple', 'banana', 'orange', 'grape', 'pear',
            'red', 'green', 'yellow', 'blue', 'purple',
            'cat', 'dog', 'bird', 'fish', 'rabbit',
            'hello', 'world', 'javascript', 'algorithm',
            'computer', 'program', 'code', 'function', 'variable'
        ];
        
        words.forEach(word => {
            this.dictionary.set(word.toLowerCase(), true);
        });
        
        console.log(`✅ 已加载${words.length}个基础单词\n`);
    }
    
    // 检查拼写
    check(word) {
        const lowerWord = word.toLowerCase();
        
        if (this.dictionary.has(lowerWord)) {
            console.log(`✅ "${word}" 拼写正确`);
            return true;
        } else {
            console.log(`❌ "${word}" 拼写错误！`);
            this.suggestSimilar(lowerWord);
            return false;
        }
    }
    
    // 建议相似单词
    suggestSimilar(wrongWord) {
        console.log('   可能的正确拼写：');
        
        const suggestions = [];
        
        for (let [word] of this.dictionary) {
            if (this.isSimilar(wrongWord, word)) {
                suggestions.push(word);
                if (suggestions.length >= 5) break;
            }
        }
        
        if (suggestions.length > 0) {
            console.log('   ', suggestions.join(', '));
        } else {
            console.log('   （没有找到相似单词）');
        }
    }
    
    // 判断两个单词是否相似（编辑距离简单版）
    isSimilar(word1, word2) {
        // 长度差不能超过 2
        if (Math.abs(word1.length - word2.length) > 2) {
            return false;
        }
        
        // 计算不同字符数
        let diff = 0;
        const len = Math.max(word1.length, word2.length);
        
        for (let i = 0; i < len; i++) {
            if (word1[i] !== word2[i]) {
                diff++;
            }
            if (diff > 2) return false;
        }
        
        return diff <= 2;
    }
    
    // 添加新单词
    addWord(word) {
        const lowerWord = word.toLowerCase();
        
        if (this.dictionary.has(lowerWord)) {
            console.log(`ℹ️  "${word}" 已在词典中`);
            return false;
        }
        
        this.dictionary.set(lowerWord, true);
        console.log(`✅ 已添加："${word}"`);
        return true;
    }
    
    // 显示统计信息
    showStats() {
        console.log('\n=== 词典统计 ===');
        console.log(`词汇总数：${this.dictionary.size}`);
        
        // 按首字母统计
        const letterCount = {};
        for (let [word] of this.dictionary) {
            const firstLetter = word[0];
            letterCount[firstLetter] = (letterCount[firstLetter] || 0) + 1;
        }
        
        console.log('\n按首字母分布：');
        Object.entries(letterCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .forEach(([letter, count]) => {
                console.log(`  ${letter}: ${count}个单词`);
            });
        
        console.log('==============\n');
    }
    
    // 批量检查句子
    checkSentence(sentence) {
        console.log(`\n检查句子：${sentence}`);
        
        // 提取单词
        const words = sentence.toLowerCase().match(/\b\w+\b/g) || [];
        
        let correct = 0;
        let wrong = 0;
        
        words.forEach(word => {
            if (this.dictionary.has(word)) {
                correct++;
            } else {
                wrong++;
                console.log(`   ❌ ${word}`);
            }
        });
        
        console.log(`\n结果：${correct}个正确，${wrong}个错误`);
        return wrong === 0;
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   单词拼写检查器 - 哈希表实现        ║');
console.log('╚═══════════════════════════════════════╝\n');

const checker = new SpellChecker();

// 检查单词
checker.check('Apple');
checker.check('Banana');
checker.check('Javscript');  // 拼写错误
checker.check('Algorithmm'); // 拼写错误

// 添加新单词
checker.addWord('React');
checker.addWord('Vue');
checker.addWord('Angular');

// 检查句子
checker.checkSentence('I love javascript programming');

// 显示统计
checker.showStats();

// 互动模式
console.log('=== 互动模式 ===');
console.log('输入单词检查拼写（输入 q 退出）\n');

// 模拟用户输入
const testWords = ['computr', 'fucntion', 'varible', 'q'];

for (const word of testWords) {
    if (word === 'q') break;
    checker.check(word);
    console.log();
}

/*
输出示例：

╔═══════════════════════════════════════╗
║   单词拼写检查器 - 哈希表实现        ║
╚═══════════════════════════════════════╝

✅ 已加载 25 个基础单词

✅ "Apple" 拼写正确
✅ "Banana" 拼写正确
❌ "Javscript" 拼写错误！
   可能的正确拼写：
    javascript
❌ "Algorithmm" 拼写错误！
   可能的正确拼写：
    algorithm

✅ 已添加："React"
✅ 已添加："Vue"
✅ 已添加："Angular"

检查句子：I love javascript programming
   ❌ javascript

结果：3 个正确，1 个错误

=== 词典统计 ===
词汇总数：28

按首字母分布：
  a: 4 个单词
  c: 4 个单词
  p: 3 个单词
  b: 3 个单词
  ...
==============
*/
```

---

## 🎯 费曼输出 #11：解释哈希表（20 分钟）

### 任务 1：向小学生解释哈希表

**要求：**
- 不用"哈希"、"映射"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"这种结构就像______一样。

比如你要找______，
先______，
然后______，
一下子就找到了！"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释为什么哈希表快

**场景：**
```
小朋友问："为什么这个查找只要一步？"
```

**你要解释：**
1. 普通查找是怎么做的？（一个一个找）
2. 哈希表是怎么做的？（直接定位）
3. 为什么会有冲突？怎么解决？

**要求：**
- 用图书馆找书比喻
- 让小朋友能听懂
- 说明白"编号"的作用

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚哈希函数的作用
□ 我不知道如何解释冲突解决
□ 我只能背诵定义，不能用自己的话
□ 我解释不清为什么是 O(1)
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 7 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释哈希表（100 字以内）

**提示：** 不要用"散列"、"桶"这种术语！

---

#### 2. 列举 3 个生活中类似哈希表的例子

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

#### 3. 计算哈希值

```
给定哈希函数：hash(key) = key % 10

计算以下数字的哈希值：
15 % 10 = ?
27 % 10 = ?
35 % 10 = ?
42 % 10 = ?

哪些会冲突？____
```

---

### 进阶题（选做）⭐⭐

#### 4. 实现完整的哈希表

```javascript
class HashTable {
    constructor(size = 16) {
        this.size = size;
        this.buckets = new Array(size).fill(null)
            .map(() => []);
    }
    
    _hash(key) {
        // 你的哈希函数
    }
    
    set(key, value) {
        // 你的代码
    }
    
    get(key) {
        // 你的代码
    }
    
    delete(key) {
        // 你的代码
    }
}
```

---

### 挑战题（加分）⭐⭐⭐

#### 5. 实现两数之和

```javascript
/**
 * LeetCode 第 1 题
 * 
 * 给定一个整数数组和一个目标值，
 * 找出数组中和为目标值的两个数
 * 
 * 提示：用哈希表存储已遍历的数
 */

function twoSum(nums, target) {
    // 你的代码
}

console.log(twoSum([2, 7, 11, 15], 9));
// [0, 1]（因为 nums[0] + nums[1] = 2 + 7 = 9）
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 哈希表的概念**
```
✓ 键值对存储
✓ 通过哈希函数定位
✓ O(1) 的快速查找
```

**2. 哈希函数**
```
✓ 确定性
✓ 均匀分布
✓ 快速计算
```

**3. 冲突解决**
```
✓ 链地址法（拉链法）
✓ 开放寻址法
✓ 各自优缺点
```

**4. 实际应用**
```
✓ 字典、集合
✓ 缓存系统
✓ 数据库索引
✓ 拼写检查
```

---

### 📊 知识框架图

```
哈希表
├── 核心思想
│   ├── 键值对
│   └── 哈希函数
├── 冲突解决
│   ├── 链地址法⭐
│   └── 开放寻址
├── 性能
│   ├── 平均 O(1)
│   └── 最坏 O(n)
└── 应用
    ├── 快速查找
    ├── 去重
    └── 缓存
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第十一天完成了！你真棒！🎉          ║
║                                       ║
║   第二周接近尾声！                   ║
║   你已经掌握了树、堆、哈希表！       ║
║                                       ║
║   明天开始学习图结构！               ║
║   更复杂但更有趣！                   ║
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
