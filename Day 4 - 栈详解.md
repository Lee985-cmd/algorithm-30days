# 🎯 Day 4：栈 - 后进先出的叠罗汉

> **今天学一个"后来居上"的数据结构！**  
> **理解 LIFO 原则的关键！**  
> **预计时间：1.5-2 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 栈到底是什么？（用一摞盘子比喻）
□ 什么是 LIFO 原则？
□ push 和 pop 操作详解
□ 栈的应用场景（浏览器后退、撤销功能）
□ 实战：括号匹配检查器
```

### 🎯 今天的任务清单

```
□ 理解栈的概念（20 分钟）
□ 学习栈的基本操作（25 分钟）
□ 了解栈的应用场景（20 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（15 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 🍽️ 第 2 步：栈是什么？（20 分钟）

### 故事时间：自助餐厅的盘子

#### 场景：一摞盘子

```
想象你在自助餐厅看到的一摞盘子：

        ┌─────┐  ← 最上面（最后放上去的）
        │ 盘 5 │
        ├─────┤
        │ 盘 4 │
        ├─────┤
        │ 盘 3 │
        ├─────┤
        │ 盘 2 │
        ├─────┤
        │ 盘 1 │  ← 最下面（最先放上去的）
        └─────┘

你要拿盘子：
→ 只能从最上面拿
→ 第一个拿到的是盘 5（最后放上去的）
→ 最后拿到的是盘 1（最先放上去的）

这就是栈！📚
```

---

### 💡 栈的定义

**官方说法：**
> 栈是一种遵循后进先出（LIFO）原则的线性数据结构

**人话版：**
> **栈 = 一摞东西，只能从最上面放或拿**

**LIFO 原则：**
```
Last In, First Out
后进先出

最后一个放进去的
第一个拿出来
```

```javascript
// JavaScript 中的栈（用数组实现）

const stack = [];

// 放盘子（push）
stack.push('盘 1');
stack.push('盘 2');
stack.push('盘 3');

console.log(stack);  // ['盘 1', '盘 2', '盘 3']

// 拿盘子（pop）
const top = stack.pop();
console.log(top);     // '盘 3'（最后一个放的，第一个被拿出）
console.log(stack);   // ['盘 1', '盘 2']

// 再看一眼最上面的盘子（peek）
console.log(stack[stack.length - 1]);  // '盘 2'
```

---

### 🎯 栈的形象比喻

#### 比喻 1：羽毛球筒

```
你把羽毛球放进球筒：

放球顺序：
1. 先放红球 → 筒底
2. 再放白球
3. 最后放黄球 → 筒口

取球顺序：
1. 先拿出黄球（最后放的）
2. 再拿出白球
3. 最后拿出红球（最先放的）

特点：
✓ 只能从筒口拿（栈顶）
✓ 不能直接从中间抽
✓ 后来的先出去
```

---

#### 比喻 2：电梯里的人

```
早高峰挤电梯：

进入顺序：
1. 小王先进入（站最里面）
2. 小李进入
3. 小张最后进入（站门口）

出来顺序：
1. 小张先出来（最后进的）
2. 小李出来
3. 小王最后出来（最先进去的）

如果小张要出来：
✓ 直接跨出来（O(1)）
✗ 不能让小王先出来（要挪开所有人）
```

---

#### 比喻 3：吃火锅夹菜

```
服务员往锅里下菜：

下菜顺序：
1. 先下土豆（沉底）
2. 再下牛肉
3. 最后下青菜（浮在上面）

你夹菜顺序：
1. 先夹到青菜（最后下的）
2. 再夹到牛肉
3. 最后夹到土豆（最先下的）

你想吃土豆怎么办？
→ 先把上面的都夹走
→ 才能吃到土豆
```

---

## ⚡ 第 3 步：栈的基本操作（25 分钟）

### 栈的常用方法

#### 1️⃣ push() - 压栈（放东西）⭐

```javascript
const stack = [];

// 放东西到栈顶
stack.push('A');
stack.push('B');
stack.push('C');

console.log(stack);  // ['A', 'B', 'C']
// C 在最上面（栈顶）

// 时间复杂度：O(1) ✅
```

---

#### 2️⃣ pop() - 弹栈（拿东西）⭐

```javascript
const stack = ['A', 'B', 'C'];

// 从栈顶拿走一个
const removed = stack.pop();
console.log(removed);  // 'C'（栈顶元素）
console.log(stack);    // ['A', 'B']

// 如果栈为空
const emptyStack = [];
const result = emptyStack.pop();
console.log(result);   // undefined

// 时间复杂度：O(1) ✅
```

---

#### 3️⃣ peek() / top() - 查看栈顶（不拿走）⭐

```javascript
const stack = ['A', 'B', 'C'];

// 只看最上面的，不拿走
const top = stack[stack.length - 1];
console.log(top);      // 'C'
console.log(stack);    // ['A', 'B', 'C']（没变化）

// 封装成方法
class Stack {
    constructor() {
        this.items = [];
    }
    
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }
}

// 时间复杂度：O(1) ✅
```

---

#### 4️⃣ isEmpty() - 判断是否为空

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}

const stack = new Stack();
console.log(stack.isEmpty());  // true

stack.push('A');
console.log(stack.isEmpty());  // false
```

---

#### 5️⃣ size() - 获取栈的大小

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    size() {
        return this.items.length;
    }
}

const stack = new Stack();
stack.push('A');
stack.push('B');
console.log(stack.size());  // 2
```

---

### 完整的栈实现

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    // 压栈
    push(element) {
        this.items.push(element);
    }
    
    // 弹栈
    pop() {
        if (this.isEmpty()) {
            console.log('❌ 栈为空，无法弹栈');
            return null;
        }
        return this.items.pop();
    }
    
    // 查看栈顶
    peek() {
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
    
    // 清空栈
    clear() {
        this.items = [];
    }
    
    // 打印栈
    print() {
        console.log(this.items.toString());
    }
}

// ==================== 测试 ====================

const stack = new Stack();

console.log('初始状态:', stack.isEmpty());  // true

// 压栈
stack.push('A');
stack.push('B');
stack.push('C');
console.log('压栈后:');
stack.print();  // A,B,C

// 查看栈顶
console.log('栈顶元素:', stack.peek());  // C

// 弹栈
const popped = stack.pop();
console.log('弹栈元素:', popped);  // C
console.log('弹栈后:');
stack.print();  // A,B

// 获取大小
console.log('栈大小:', stack.size());  // 2

// 清空
stack.clear();
console.log('清空后:', stack.isEmpty());  // true
```

---

## 🌐 第 4 步：栈的应用场景（20 分钟）

### 应用 1：浏览器后退按钮

```javascript
/**
 * 浏览器历史记录管理
 * 
 * 原理：
 * - 访问新页面 → push 到历史栈
 * - 点后退 → pop 当前页面，显示上一个
 */

class BrowserHistory {
    constructor() {
        this.historyStack = new Stack();
        this.current = null;
    }
    
    // 访问新页面
    visit(url) {
        if (this.current) {
            this.historyStack.push(this.current);
        }
        this.current = url;
        console.log(`🌐 访问：${url}`);
    }
    
    // 后退
    back() {
        if (this.historyStack.isEmpty()) {
            console.log('已经是第一个页面了');
            return;
        }
        
        const previous = this.historyStack.pop();
        console.log(`⬅️  后退到：${previous}`);
        this.current = previous;
    }
    
    // 显示当前页面
    showCurrent() {
        console.log(`当前页面：${this.current}`);
    }
}

// 使用示例
const browser = new BrowserHistory();

browser.visit('www.baidu.com');
browser.visit('www.taobao.com');
browser.visit('www.jd.com');

browser.showCurrent();  // www.jd.com

browser.back();  // 回到淘宝
browser.back();  // 回到百度
browser.back();  // 不能再退了
```

---

### 应用 2：撤销功能（Ctrl+Z）

```javascript
/**
 * 文本编辑器的撤销功能
 * 
 * 原理：
 * - 每次修改 → push 到撤销栈
 * - Ctrl+Z → pop 最近的操作，恢复原状
 */

class TextEditor {
    constructor() {
        this.text = '';
        this.undoStack = new Stack();
    }
    
    // 输入文字
    type(text) {
        // 保存当前状态到撤销栈
        this.undoStack.push(this.text);
        this.text += text;
        console.log(`✏️  输入："${text}"`);
    }
    
    // 撤销
    undo() {
        if (this.undoStack.isEmpty()) {
            console.log('没有可撤销的操作');
            return;
        }
        
        const previousState = this.undoStack.pop();
        console.log('↩️  撤销操作');
        this.text = previousState;
    }
    
    // 显示当前文本
    show() {
        console.log(`当前文本："${this.text}"`);
    }
}

// 使用示例
const editor = new TextEditor();

editor.type('Hello ');
editor.type('World');
editor.type('!');
editor.show();  // "Hello World!"

editor.undo();  // 撤销最后的 !
editor.show();  // "Hello World"

editor.undo();  // 撤销 World
editor.show();  // "Hello "
```

---

### 应用 3：函数调用栈

```javascript
/**
 * 程序执行时的函数调用
 * 
 * 原理：
 * - 调用函数 → push 到调用栈
 * - 函数返回 → pop 出栈
 */

// 示例代码
function main() {
    console.log('main 开始');
    funcA();
    console.log('main 结束');
}

function funcA() {
    console.log('funcA 开始');
    funcB();
    console.log('funcA 结束');
}

function funcB() {
    console.log('funcB 开始');
    console.log('funcB 结束');
}

// 执行过程（调用栈）：
/*
1. main() 入栈
   栈：[main]

2. main 调用 funcA()
   funcA 入栈
   栈：[main, funcA]

3. funcA 调用 funcB()
   funcB 入栈
   栈：[main, funcA, funcB]

4. funcB 执行完毕，出栈
   栈：[main, funcA]

5. funcA 执行完毕，出栈
   栈：[main]

6. main 执行完毕，出栈
   栈：[]
*/

main();

/*
输出：
main 开始
funcA 开始
funcB 开始
funcB 结束
funcA 结束
main 结束
*/
```

---

## 💻 第 5 步：实战项目（30 分钟）

### 项目：括号匹配检查器

```javascript
/**
 * 括号匹配检查器
 * 
 * 问题：检查代码中的括号是否正确匹配
 * 
 * 例子：
 * ✓ ((()))  - 正确
 * ✓ ()()()  - 正确
 * ✓ (())()  - 正确
 * ❌ (()    - 错误（少右括号）
 * ❌ ())    - 错误（多右括号）
 * ❌ )(     - 错误（顺序错）
 * 
 * 原理：
 * - 遇到左括号 → push 入栈
 * - 遇到右括号 → pop 出栈，检查是否匹配
 * - 最后栈应该为空
 */

class BracketMatcher {
    constructor() {
        this.stack = new Stack();
        // 定义括号对
        this.pairs = {
            ')': '(',
            ']': '[',
            '}': '{'
        };
    }
    
    // 检查单个表达式
    check(expression) {
        this.stack.clear();  // 清空栈
        
        console.log(`\n检查：${expression}`);
        
        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];
            
            // 如果是左括号，入栈
            if (['(', '[', '{'].includes(char)) {
                this.stack.push(char);
                console.log(`  位置${i}: '${char}' → 入栈`);
            }
            // 如果是右括号，检查匹配
            else if ([')', ']', '}'].includes(char)) {
                const expectedLeft = this.pairs[char];
                const actualLeft = this.stack.pop();
                
                if (actualLeft !== expectedLeft) {
                    console.log(`  位置${i}: '${char}' → 不匹配！期望${expectedLeft}，得到${actualLeft}`);
                    return false;
                }
                console.log(`  位置${i}: '${char}' → 匹配 ${actualLeft}`);
            }
        }
        
        // 最后检查栈是否为空
        if (this.stack.isEmpty()) {
            console.log('  ✅ 括号匹配正确！');
            return true;
        } else {
            console.log('  ❌ 还有未匹配的左括号！');
            return false;
        }
    }
    
    // 批量检查
    checkMultiple(expressions) {
        console.log('\n=== 括号匹配检查器 ===\n');
        
        expressions.forEach(expr => {
            const result = this.check(expr);
            console.log(`结果：${result ? '✅ 正确' : '❌ 错误'}\n`);
        });
    }
}

// ==================== 测试 ====================

const matcher = new BracketMatcher();

// 测试用例
const testCases = [
    '((()))',           // 正确
    '()()()',           // 正确
    '(())()',           // 正确
    '(()',              // 错误：少右括号
    '())',              // 错误：多右括号
    ')(',               // 错误：顺序错
    '([]{})',           // 正确：混合括号
    '([)]',             // 错误：交叉
    '{[()]}',           // 正确：嵌套
    'function() { if(true) { return []; } }'  // 实际代码
];

matcher.checkMultiple(testCases);

/*
输出示例：

=== 括号匹配检查器 ===

检查：((()))
  位置 0: '(' → 入栈
  位置 1: '(' → 入栈
  位置 2: '(' → 入栈
  位置 3: ')' → 匹配 (
  位置 4: ')' → 匹配 (
  位置 5: ')' → 匹配 (
  ✅ 括号匹配正确！
结果：✅ 正确

检查：(()
  位置 0: '(' → 入栈
  位置 1: '(' → 入栈
  位置 2: ')' → 匹配 (
  ❌ 还有未匹配的左括号！
结果：❌ 错误

检查：([)]
  位置 0: '(' → 入栈
  位置 1: '[' → 入栈
  位置 2: ')' → 不匹配！期望 (，得到 [
结果：❌ 错误
*/
```

---

## 🎯 费曼输出 #4：解释栈（15 分钟）

### 任务 1：向小学生解释栈

**要求：**
- 不用"LIFO"、"栈顶"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"栈就像______一样。

比如你要______，
第一个放进去的是______，
最后一个放进去的是______，
第一个拿出来的是______。

这就是"后来居上"的道理。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释栈的应用

**场景：**
```
小朋友问："电脑的后退按钮是怎么工作的？"
```

**你要解释：**
1. 浏览网页时，栈在做什么？
2. 为什么撤销功能是 Ctrl+Z？
3. 生活中还有哪些类似栈的例子？

**要求：**
- 至少创造 2 个不同的比喻
- 用学校、游戏、运动等生活场景
- 让小朋友能听懂

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚为什么叫"后进先出"
□ 我不知道如何解释浏览器后退原理
□ 我只能背诵定义，不能用自己的话
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 6 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释什么是栈（100 字以内）

**提示：** 不要用"LIFO"这种术语！

---

#### 2. 列举 3 个生活中类似栈的例子

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

#### 3. 预测以下代码的输出

```javascript
const stack = [];

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop());  // 输出：？
console.log(stack.pop());  // 输出：？
console.log(stack.pop());  // 输出：？
```

---

### 进阶题（选做）⭐⭐

#### 4. 实现逆波兰表达式计算器

```javascript
/**
 * 逆波兰表达式（后缀表达式）
 * 
 * 正常写法：3 + 4
 * 逆波兰：3 4 +
 * 
 * 复杂例子：
 * (3 + 4) × 5 - 6
 * 逆波兰：3 4 + 5 × 6 -
 * 
 * 用栈实现计算
 */
function evaluateRPN(expression) {
    const stack = [];
    const tokens = expression.split(' ');
    
    for (const token of tokens) {
        if (!isNaN(token)) {
            // 数字，入栈
            stack.push(Number(token));
        } else {
            // 运算符，弹出两个数计算
            const b = stack.pop();
            const a = stack.pop();
            
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(a / b); break;
            }
        }
    }
    
    return stack.pop();
}

// 测试
console.log(evaluateRPN('3 4 +'));           // 7
console.log(evaluateRPN('3 4 + 5 *'));       // 35
console.log(evaluateRPN('3 4 + 5 * 6 -'));   // 29
```

---

### 挑战题（加分）⭐⭐⭐

#### 5. 用两个栈实现队列

```javascript
/**
 * 用两个栈实现队列的 FIFO 功能
 * 
 * 提示：
 * - 一个栈用于入队
 * - 另一个栈用于出队
 * - 出队时，如果第二个栈为空，把第一个栈的元素全部倒入
 */

class QueueWithTwoStacks {
    constructor() {
        this.stack1 = new Stack();  // 入队用
        this.stack2 = new Stack();  // 出队用
    }
    
    enqueue(item) {
        // 你的代码
    }
    
    dequeue() {
        // 你的代码
    }
}
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 栈的概念**
```
✓ 后进先出（LIFO）
✓ 像一摞盘子
✓ 只能从栈顶操作
```

**2. 栈的操作**
```
✓ push - 压栈（放东西）
✓ pop - 弹栈（拿东西）
✓ peek - 看栈顶（不拿走）
✓ 都是 O(1) 很快
```

**3. 栈的应用**
```
✓ 浏览器后退
✓ 撤销功能（Ctrl+Z）
✓ 函数调用栈
✓ 括号匹配
```

---

### 📊 知识框架图

```
栈（Stack）
├── 原则：LIFO（后进先出）
├── 操作
│   ├── push - O(1)
│   ├── pop - O(1)
│   └── peek - O(1)
└── 应用
    ├── 浏览器后退
    ├── 撤销功能
    ├── 函数调用
    └── 括号匹配
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第四天完成了！你真棒！🎉           ║
║                                       ║
║   栈是后面学习树和图的基础           ║
║   特别是递归和深度优先搜索！         ║
║                                       ║
║   继续保持！明天学习队列！           ║
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
