# 🎯 Day 23：贪心算法 - 目光短浅的智慧

> **今天学一种"短视"但有效的算法思想！**  
> **理解贪心策略的应用！**  
> **掌握经典贪心问题！**  
> **预计时间：2.5-3 小时（含费曼输出）**


📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  
⭐ **如果对你有帮助，请给个 Star！**

---

## 📖 第 1 步：明确今天的学习目标（5 分钟）

### ✅ 学完这一章，你将明白：

```
□ 贪心算法是什么？（用找零钱比喻）
□ 什么时候可以用贪心？
□ 贪心算法的局限性
□ 经典贪心问题案例
□ 实战：活动安排 + 找零钱系统
```

### 🎯 今天的任务清单

```
□ 理解贪心思想（25 分钟）
□ 学习经典案例（40 分钟）
□ 掌握代码实现（35 分钟）
□ 了解适用条件（20 分钟）
□ 完成实战项目（30 分钟）
□ 费曼输出练习（20 分钟）
```

**准备好了吗？开始吧！** 🚀

---

## 💰 第 2 步：什么是贪心算法？（25 分钟）

### 故事时间：超市收银员

#### 场景：找零钱

```
顾客买东西，需要找他 67 元零钱

你钱包里有这些面值：
100 元、50 元、20 元、10 元、5 元、1 元

怎么找钱最省事？

贪心做法（每次都选最大的）：⭐
1. 先找 50 元 ← 当前能用的最大面值
2. 还剩 17 元
3. 再找 10 元 ← 剩下能用的最大面值
4. 还剩 7 元
5. 再找 5 元 ← 剩下能用的最大面值
6. 还剩 2 元
7. 最后找 2 张 1 元

总共：50+10+5+1+1 = 67 元 ✅
用了 5 张纸币，是最优解！

这就是贪心算法！
每次都选当前看起来最好的！
```

---

### 💡 贪心算法的定义

**官方说法：**
> 贪心算法是一种在每一步选择中都采取在当前状态下最好或最优的选择，从而希望导致结果是全局最好或最优的算法

**人话版：**
> **贪心算法 = 每次都选眼前最好的，不管以后**

```javascript
// 贪心算法的思路

/**
 * 特点：
 * 1. 只看眼前，不看长远
 * 2. 做出局部最优选择
 * 3. 希望得到全局最优解
 * 
 * 注意：
 * ❗ 贪心不一定能得到全局最优
 * ❗ 但在某些问题上确实有效
 */

// 例子：背包问题的贪心解法

const items = [
    { name: '电脑', weight: 10, value: 60 },
    { name: '手机', weight: 5, value: 50 },
    { name: '耳机', weight: 2, value: 30 }
];

const capacity = 10;  // 背包容量 10kg

// 贪心策略 1：每次选价值最高的
// 选电脑（60 元），包装满了
// 总价值：60 元

// 贪心策略 2：每次选性价比最高的
// 性价比 = 价值 / 重量
// 电脑：60/10 = 6 元/kg
// 手机：50/5 = 10 元/kg ← 最高
// 耳机：30/2 = 15 元/kg ← 最高中的最高

// 按性价比贪心：
// 1. 选耳机（2kg, 30 元）
// 2. 选手机（5kg, 50 元）
// 3. 还剩 3kg，装不下电脑了
// 总价值：80 元 ✅ 比策略 1 好！
```

---

### 🎯 形象比喻

#### 比喻 1：饿汉吃饭

```
一个很饿的人去自助餐厅

贪心做法：
每次都拿眼前最好吃的

→ 看到龙虾，拿一只
→ 看到牛排，拿一份
→ 看到蛋糕，拿一块
→ ...

最后吃撑了，但可能营养不均衡 ❌

这就是贪心的问题：
只顾眼前，不考虑整体！
```

---

#### 比喻 2：学生做题

```
考试有 10 道题，时间不够了

贪心做法：
每次都做分值最高的题

→ 先做 20 分的大题
→ 再做 15 分的题
→ ...

结果：难题没做出来，简单题没时间做 ❌

更好的策略：
先做会做的，不管分值多少 ✅
```

---

#### 比喻 3：旅行路线规划

```
要从北京到上海游玩

贪心做法：
每次都去最近的城市

北京 → 天津 → 济南 → 南京 → 上海

看起来每步都很近
但总路程可能不是最短的 ❌

更好的策略：
看整体路线，可能直飞最快 ✅
```

---

## 🎪 第 3 步：经典贪心案例（40 分钟）

### 案例 1：活动安排问题 ⭐⭐⭐

```javascript
/**
 * 问题描述：
 * 有多个活动，每个活动有开始时间和结束时间
 * 同一个教室同一时间只能举办一个活动
 * 问：最多能安排多少个活动？
 * 
 * 贪心策略：
 * 每次选结束时间最早的活动
 * 这样能给后面的活动留出更多时间
 */

function activitySelection(activities) {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   活动安排问题                       ║');
    console.log('╚═══════════════════════════════════════╝\n');
    
    // 按结束时间排序
    activities.sort((a, b) => a.end - b.end);
    
    console.log('按结束时间排序后的活动：');
    activities.forEach(act => {
        console.log(`  ${act.name}: ${act.start}-${act.end}`);
    });
    console.log();
    
    const selected = [];
    let lastEndTime = 0;
    
    // 依次选择
    for (let act of activities) {
        if (act.start >= lastEndTime) {
            // 这个活动可以安排
            selected.push(act);
            lastEndTime = act.end;
            
            console.log(`✅ 选择：${act.name} (${act.start}-${act.end})`);
        } else {
            console.log(`❌ 跳过：${act.name} (时间冲突)`);
        }
    }
    
    console.log(`\n📊 最终安排：`);
    selected.forEach((act, i) => {
        console.log(`  ${i + 1}. ${act.name}: ${act.start}-${act.end}`);
    });
    
    console.log(`\n最多能安排${selected.length}个活动\n`);
    
    return selected;
}

// ==================== 测试 ====================

const activities = [
    { name: '数学讲座', start: 1, end: 3 },
    { name: '物理实验', start: 2, end: 4 },
    { name: '化学报告', start: 3, end: 5 },
    { name: '编程比赛', start: 0, end: 6 },
    { name: '英语角', start: 5, end: 7 },
    { name: '艺术展览', start: 8, end: 9 },
    { name: '音乐欣赏', start: 5, end: 9 }
];

activitySelection(activities);

/*
输出示例：

╔═══════════════════════════════════════╗
║   活动安排问题                       ║
╚═══════════════════════════════════════╝

按结束时间排序后的活动：
  数学讲座：1-3
  物理实验：2-4
  化学报告：3-5
  编程比赛：0-6
  英语角：5-7
  音乐欣赏：5-9
  艺术展览：8-9

✅ 选择：数学讲座 (1-3)
❌ 跳过：物理实验 (时间冲突)
✅ 选择：化学报告 (3-5)
❌ 跳过：编程比赛 (时间冲突)
✅ 选择：英语角 (5-7)
❌ 跳过：音乐欣赏 (时间冲突)
✅ 选择：艺术展览 (8-9)

📊 最终安排：
  1. 数学讲座：1-3
  2. 化学报告：3-5
  3. 英语角：5-7
  4. 艺术展览：8-9

最多能安排 4 个活动
*/
```

---

### 案例 2：找零钱问题

```javascript
/**
 * 问题描述：
 * 有不同面值的钱币
 * 要找给顾客一定金额
 * 问：最少需要多少张钱币？
 * 
 * 贪心策略：
 * 每次都用面值最大的
 */

function coinChange(coins, amount) {
    console.log(`\n💰 找零钱问题\n`);
    console.log(`钱币面值：${coins.join(', ')}`);
    console.log(`需要找零：${amount}元\n`);
    
    // 从大到小排序
    coins.sort((a, b) => b - a);
    
    const result = [];
    let remaining = amount;
    
    for (let coin of coins) {
        const count = Math.floor(remaining / coin);
        
        if (count > 0) {
            result.push({ coin, count });
            remaining -= coin * count;
            
            console.log(`使用${coin}元 × ${count} = ${coin * count}元`);
        }
    }
    
    if (remaining === 0) {
        console.log(`\n✅ 找零完成！`);
        console.log(`总共需要${result.reduce((sum, r) => sum + r.count, 0)}张钱币\n`);
        return result;
    } else {
        console.log(`\n❌ 无法找零！还差${remaining}元\n`);
        return null;
    }
}

// 测试
coinChange([100, 50, 20, 10, 5, 1], 267);

/*
输出：

💰 找零钱问题

钱币面值：100, 50, 20, 10, 5, 1
需要找零：267 元

使用 100 元 × 2 = 200 元
使用 50 元 × 1 = 50 元
使用 10 元 × 1 = 10 元
使用 5 元 × 1 = 5 元
使用 1 元 × 2 = 2 元

✅ 找零完成！
总共需要 7 张钱币
*/
```

---

### 案例 3：区间覆盖问题

```javascript
/**
 * 问题描述：
 * 给定一些区间，选择最少的区间覆盖整个范围
 * 
 * 贪心策略：
 * 每次选能覆盖当前位置且延伸最远的区间
 */

function intervalCover(intervals, target) {
    console.log(`\n📏 区间覆盖问题\n`);
    console.log(`目标范围：[0, ${target}]`);
    console.log(`可用区间：`, intervals.map(i => `[${i.start},${i.end}]`).join(', '));
    console.log();
    
    // 按起点排序
    intervals.sort((a, b) => a.start - b.start);
    
    const selected = [];
    let currentEnd = 0;
    let i = 0;
    
    while (currentEnd < target) {
        let farthest = -1;
        let bestInterval = null;
        
        // 找能覆盖当前位置且延伸最远的
        while (i < intervals.length && intervals[i].start <= currentEnd) {
            if (intervals[i].end > farthest) {
                farthest = intervals[i].end;
                bestInterval = intervals[i];
            }
            i++;
        }
        
        if (!bestInterval) {
            console.log('❌ 无法完全覆盖\n');
            return null;
        }
        
        selected.push(bestInterval);
        console.log(`✅ 选择区间 [${bestInterval.start}, ${bestInterval.end}]`);
        
        currentEnd = farthest;
    }
    
    console.log(`\n📊 最少需要${selected.length}个区间\n`);
    return selected;
}

// 测试
const intervals = [
    { start: 0, end: 2 },
    { start: 1, end: 4 },
    { start: 2, end: 5 },
    { start: 3, end: 6 },
    { start: 5, end: 8 },
    { start: 6, end: 9 }
];

intervalCover(intervals, 9);
```

---

## ⚠️ 第 4 步：贪心的局限性和反例（20 分钟）

### 贪心不总是最优

```javascript
/**
 * 重要提醒：
 * 贪心算法不一定能得到全局最优解！
 * 
 * 有些问题用贪心会出错！
 */

// 反例 1：特殊的找零钱

/**
 * 钱币面值：[1, 3, 4]
 * 要找零：6 元
 * 
 * 贪心做法：
 * 4 + 1 + 1 = 6（用了 3 张）❌
 * 
 * 最优解：
 * 3 + 3 = 6（只用 2 张）✅
 * 
 * 贪心不是最优！
 */

function coinChangeGreedyWrong(coins, amount) {
    coins.sort((a, b) => b - a);
    
    let count = 0;
    let remaining = amount;
    
    for (let coin of coins) {
        const num = Math.floor(remaining / coin);
        count += num;
        remaining -= coin * num;
    }
    
    if (remaining !== 0) {
        return -1;  // 无法找零
    }
    
    return count;
}

console.log('贪心结果:', coinChangeGreedyWrong([4, 3, 1], 6));  // 3
console.log('最优结果:', 2);  // 3+3=6


// 反例 2：0-1 背包问题

/**
 * 背包容量：50kg
 * 物品：
 * A: 10kg, 60 元
 * B: 20kg, 100 元
 * C: 30kg, 120 元
 * 
 * 贪心策略（按性价比）：
 * A: 6 元/kg
 * B: 5 元/kg
 * C: 4 元/kg
 * 
 * 选 A，还剩 40kg
 * 选 B，还剩 20kg
 * C 装不下了
 * 总价值：160 元
 * 
 * 但最优解是：
 * B + C = 100 + 120 = 220 元 ✅
 * 
 * 贪心又不是最优！
 */
```

---

### 什么时候能用贪心？

```javascript
/**
 * 贪心算法适用的条件：
 * 
 * 1. 贪心选择性质
 *    局部最优能推出全局最优
 * 
 * 2. 最优子结构
 *    问题的最优解包含子问题的最优解
 * 
 * 常见能用贪心的问题：
 * ✓ 活动安排
 * ✓ 霍夫曼编码
 * ✓ 最小生成树（Prim、Kruskal）
 * ✓ 找零钱（特定面值）
 * ✓ 分数背包（可以分割物品）
 * 
 * 不能用贪心的问题：
 * ✗ 0-1 背包
 * ✗ 旅行商问题
 * ✗ 找零钱（任意面值）
 * → 这些要用动态规划！
 */
```

---

## 💻 第 5 步：实战项目（30 分钟）

### 项目：会议室调度系统

```javascript
/**
 * 公司会议室管理
 * 
 * 功能：
 * 1. 提交会议申请
 * 2. 自动安排会议室
 * 3. 最大化会议室利用率
 * 4. 显示会议安排
 */

class MeetingScheduler {
    constructor(roomCount) {
        this.roomCount = roomCount;
        this.rooms = Array.from({ length: roomCount }, () => []);
        this.meetings = [];
    }
    
    // 提交会议申请
    requestMeeting(name, startTime, endTime) {
        const meeting = { name, startTime, endTime };
        this.meetings.push(meeting);
        
        console.log(`\n📝 收到会议申请：${name} (${startTime}-${endTime})`);
        
        // 尝试安排
        this.scheduleMeeting(meeting);
    }
    
    // 安排会议（贪心算法）
    scheduleMeeting(meeting) {
        // 找一个可用的会议室
        for (let i = 0; i < this.roomCount; i++) {
            const room = this.rooms[i];
            
            // 检查是否与已有会议冲突
            const hasConflict = room.some(m => {
                return !(meeting.endTime <= m.startTime || 
                        meeting.startTime >= m.endTime);
            });
            
            if (!hasConflict) {
                // 可以安排
                room.push(meeting);
                
                // 按开始时间排序
                room.sort((a, b) => a.startTime - b.startTime);
                
                console.log(`✅ 安排在会议室${i + 1}`);
                return;
            }
        }
        
        console.log(`❌ 所有会议室都满了，无法安排`);
    }
    
    // 重新优化所有会议（贪心策略）
    optimizeSchedule() {
        console.log('\n🔄 重新优化会议安排...\n');
        
        // 清空所有会议室
        this.rooms = Array.from({ length: this.roomCount }, () => []);
        
        // 按结束时间排序（贪心策略）
        const sortedMeetings = [...this.meetings].sort(
            (a, b) => a.endTime - b.endTime
        );
        
        // 依次安排
        for (let meeting of sortedMeetings) {
            this.scheduleMeeting(meeting);
        }
    }
    
    // 显示所有会议室的安排
    showSchedule() {
        console.log('\n╔═══════════════════════════════════════╗');
        console.log('║   会议室安排表                       ║');
        console.log('╚═══════════════════════════════════════╝\n');
        
        for (let i = 0; i < this.roomCount; i++) {
            console.log(`会议室${i + 1}:`);
            
            const room = this.rooms[i];
            if (room.length === 0) {
                console.log('  （空闲）');
            } else {
                room.forEach(m => {
                    console.log(`  ${m.startTime}-${m.endTime} ${m.name}`);
                });
            }
            
            console.log();
        }
        
        const totalMeetings = this.rooms.reduce((sum, r) => sum + r.length, 0);
        console.log(`总计安排了${totalMeetings}场会议`);
        console.log();
    }
    
    // 统计利用率
    getUtilizationRate() {
        const totalCapacity = this.roomCount;
        const usedRooms = this.rooms.filter(r => r.length > 0).length;
        
        const rate = (usedRooms / totalCapacity * 100).toFixed(1);
        console.log(`会议室利用率：${rate}%\n`);
        
        return parseFloat(rate);
    }
}

// ==================== 测试 ====================

console.log('╔═══════════════════════════════════════╗');
console.log('║   会议室调度系统                     ║');
console.log('╚═══════════════════════════════════════╝\n');

const scheduler = new MeetingScheduler(3);

// 提交会议申请
scheduler.requestMeeting('晨会', 9, 10);
scheduler.requestMeeting('产品评审', 9.5, 11);
scheduler.requestMeeting('技术分享', 10, 12);
scheduler.requestMeeting('客户会议', 11, 12);
scheduler.requestMeeting('团队聚餐', 12, 13);
scheduler.requestMeeting('项目汇报', 13, 15);
scheduler.requestMeeting('培训', 14, 16);
scheduler.requestMeeting('总结会', 15, 17);

// 显示安排
scheduler.showSchedule();

// 优化
scheduler.optimizeSchedule();
scheduler.showSchedule();
scheduler.getUtilizationRate();

/*
输出示例：

╔═══════════════════════════════════════╗
║   会议室调度系统                     ║
╚═══════════════════════════════════════╝

📝 收到会议申请：晨会 (9-10)
✅ 安排在会议室 1

📝 收到会议申请：产品评审 (9.5-11)
✅ 安排在会议室 2

...

╔═══════════════════════════════════════╗
║   会议室安排表                       ║
╚═══════════════════════════════════════╝

会议室 1:
  9-10 晨会
  10-12 技术分享
  13-15 项目汇报

会议室 2:
  9.5-11 产品评审
  11-12 客户会议
  14-16 培训

会议室 3:
  12-13 团队聚餐
  15-17 总结会

总计安排了 8 场会议
会议室利用率：100%
*/
```

---

## 🎯 费曼输出 #23：解释贪心算法（20 分钟）

### 任务 1：向小学生解释贪心算法

**要求：**
- 不用"贪心"、"最优"这些术语
- 用生活中的例子比喻
- 让小学生能听懂

**参考模板：**
```
"有个叫贪心的方法，
就像______一样。

每次都______，
不管______，
结果______。"
```

**⏰ 时间：10 分钟**

---

### 任务 2：解释贪心的优缺点

**场景：**
```
小朋友问："这个方法好不好？"
```

**你要解释：**
1. 贪心有什么好处？
2. 贪心有什么问题？
3. 什么时候能用贪心？

**要求：**
- 用具体例子说明
- 让小朋友能听懂
- 说明白适用场景

**⏰ 时间：15 分钟**

---

### 💡 卡壳检查点

如果你在解释时卡住了：
```
□ 我说不清楚贪心的原理
□ 我不知道如何解释为什么有时不最优
□ 我只能背诵定义，不能用自己的话
□ 我解释不清贪心和动态规划的区别
```

**这很正常！** 标记下来，回去再看上面的内容，然后重新尝试解释！

---

## 📝 第 6 步：课后练习（20 分钟）

### 基础题（必做）⭐

#### 1. 用自己的话解释贪心算法（100 字以内）

**提示：** 不要用"局部最优"这种术语！

---

#### 2. 列举生活中贪心的例子

**你的答案：**
```
1. _________________________________
2. _________________________________
3. _________________________________
```

#### 3. 判断是否适合用贪心

```
问题 1：找零钱（面值 1,5,10,50,100）
能用贪心吗？____
理由：_________________

问题 2：0-1 背包问题
能用贪心吗？____
理由：_________________

问题 3：活动安排
能用贪心吗？____
理由：_________________
```

---

### 进阶题（选做）⭐⭐

#### 4. 实现分数背包问题

```javascript
/**
 * 物品可以分割
 * 用贪心求最大价值
 * 
 * 策略：按性价比从高到低选
 */

function fractionalKnapsack(items, capacity) {
    // 你的代码
}

const items = [
    { name: '金砂', weight: 10, value: 60 },
    { name: '银块', weight: 20, value: 100 },
    { name: '铜锭', weight: 30, value: 120 }
];

console.log(fractionalKnapsack(items, 50));
```

---

### 挑战题（加分）⭐⭐⭐

#### 5. 证明活动安排的贪心策略正确性

```
思考题：

为什么"每次选结束时间最早的活动"
这个贪心策略是正确的？

提示：
1. 假设存在一个更优的安排
2. 用反证法证明
3. 构造矛盾

请写出你的证明思路：
_________________________________
_________________________________
_________________________________
```

---

## 📚 今日总结

### ✅ 你今天学到了：

**1. 贪心思想**
```
✓ 只看眼前最优
✓ 局部最优推全局
✓ 不一定总是最优
```

**2. 经典案例**
```
✓ 活动安排
✓ 找零钱
✓ 区间覆盖
✓ 会议室调度
```

**3. 适用条件**
```
✓ 贪心选择性质
✓ 最优子结构
✓ 需要证明正确性
```

**4. 注意事项**
```
✓ 不是所有问题都能用
✓ 0-1 背包不能用
✓ 需要验证最优性
```

---

### 📊 知识框架图

```
贪心算法
├── 思想：局部最优推全局
├── 经典问题
│   ├── 活动安排⭐
│   ├── 找零钱
│   ├── 区间覆盖
│   └── 霍夫曼编码
├── 适用条件
│   ├── 贪心选择性质
│   └── 最优子结构
└── 注意
    ├── 不总是最优
    └── 需要证明
```

---

## 💪 最后的鼓励

```
╔═══════════════════════════════════════╗
║                                       ║
║   第二十三天完成了！你真棒！🎉       ║
║                                       ║
║   又学会了一个算法思想！             ║
║   贪心算法！                         ║
║                                       ║
║   明天开始动态规划！                 ║
║   算法中最难的部分！                 ║
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
- ⏰ 总计：约 2.5-3 小时 ✅
