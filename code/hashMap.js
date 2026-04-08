/**
 * 哈希表 - Hash Table / Hash Map
 * 
 * 什么是哈希表？
 * 哈希表是一种通过键值对（key-value）存储数据的数据结构
 * 通过哈希函数将键转换为数组索引，实现快速查找
 * 
 * 核心概念：
 * 1. 哈希函数：把任意大小的输入映射到固定范围的输出
 * 2. 冲突：不同的键可能映射到同一个索引
 * 3. 解决冲突的方法：
 *    - 链地址法（Separate Chaining）：每个位置是一个链表
 *    - 开放地址法（Open Addressing）：找下一个空位
 * 
 * 时间复杂度（平均情况）：
 * - 插入：O(1)
 * - 查找：O(1)
 * - 删除：O(1)
 * 
 * 时间复杂度（最坏情况 - 所有键都冲突）：
 * - 插入：O(n)
 * - 查找：O(n)
 * - 删除：O(n)
 * 
 * 空间复杂度：O(n)
 * 
 * 优点：
 * - 查找、插入、删除都非常快
 * - 实现简单
 * 
 * 缺点：
 * - 需要好的哈希函数
 * - 处理冲突有额外开销
 * - 不支持有序遍历
 * 
 * 应用场景：
 * - 字典/映射
 * - 缓存
 * - 数据库索引
 * - 集合去重
 * - 计数
 */

/**
 * 哈希表类 - 使用链地址法解决冲突
 */
class HashMap {
    /**
     * 构造函数
     * @param {number} initialCapacity - 初始容量
     */
    constructor(initialCapacity = 16) {
        this.buckets = new Array(initialCapacity); // 桶数组
        this.size = 0;                             // 元素数量
        this.loadFactor = 0.75;                    // 负载因子
        this.threshold = initialCapacity * this.loadFactor; // 扩容阈值
        
        // 初始化桶
        for (let i = 0; i < initialCapacity; i++) {
            this.buckets[i] = [];
        }
    }
    
    /**
     * 哈希函数
     * 将键转换为数组索引
     * 
     * 常用方法：
     * 1. 除留余数法：hash(key) = key % capacity
     * 2. 乘法散列法：hash(key) = floor(capacity * (key * A % 1))
     * 3. 字符串哈希：逐字符累加
     * 
     * @param {*} key - 键
     * @returns {number} - 数组索引
     */
    _hash(key) {
        // 处理不同类型的键
        if (typeof key === 'number') {
            return key % this.buckets.length;
        } else if (typeof key === 'string') {
            // 字符串哈希：霍纳法则
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash = ((hash << 5) - hash) + key.charCodeAt(i);
                hash = hash & hash; // 转为32位整数
            }
            return Math.abs(hash) % this.buckets.length;
        } else {
            // 其他类型：转为字符串
            return this._hash(String(key));
        }
    }
    
    /**
     * 插入或更新键值对
     * 时间复杂度：O(1) 平均
     * @param {*} key - 键
     * @param {*} value - 值
     */
    put(key, value) {
        // 检查是否需要扩容
        if (this.size >= this.threshold) {
            this._resize();
        }
        
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        // 检查是否已存在该键
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                // 键已存在，更新值
                bucket[i].value = value;
                return;
            }
        }
        
        // 键不存在，添加新键值对
        bucket.push({ key, value });
        this.size++;
    }
    
    /**
     * 获取值
     * 时间复杂度：O(1) 平均
     * @param {*} key - 键
     * @returns {*} - 值，如果不存在返回 undefined
     */
    get(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (let item of bucket) {
            if (item.key === key) {
                return item.value;
            }
        }
        
        return undefined;
    }
    
    /**
     * 删除键值对
     * 时间复杂度：O(1) 平均
     * @param {*} key - 键
     * @returns {boolean} - 是否删除成功
     */
    remove(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * 判断是否包含某个键
     * @param {*} key - 键
     * @returns {boolean}
     */
    has(key) {
        return this.get(key) !== undefined;
    }
    
    /**
     * 扩容
     * 当元素数量超过阈值时，将容量翻倍
     * 时间复杂度：O(n)
     * @private
     */
    _resize() {
        const oldBuckets = this.buckets;
        const newCapacity = oldBuckets.length * 2;
        
        console.log(`扩容: ${oldBuckets.length} -> ${newCapacity}`);
        
        // 创建新的桶数组
        this.buckets = new Array(newCapacity);
        for (let i = 0; i < newCapacity; i++) {
            this.buckets[i] = [];
        }
        
        // 更新阈值
        this.threshold = newCapacity * this.loadFactor;
        
        // 重新哈希所有元素
        this.size = 0;
        for (let bucket of oldBuckets) {
            for (let item of bucket) {
                this.put(item.key, item.value);
            }
        }
    }
    
    /**
     * 获取元素数量
     * @returns {number}
     */
    getSize() {
        return this.size;
    }
    
    /**
     * 判断是否为空
     * @returns {boolean}
     */
    isEmpty() {
        return this.size === 0;
    }
    
    /**
     * 清空哈希表
     */
    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = [];
        }
        this.size = 0;
    }
    
    /**
     * 获取所有键
     * @returns {Array}
     */
    keys() {
        const result = [];
        for (let bucket of this.buckets) {
            for (let item of bucket) {
                result.push(item.key);
            }
        }
        return result;
    }
    
    /**
     * 获取所有值
     * @returns {Array}
     */
    values() {
        const result = [];
        for (let bucket of this.buckets) {
            for (let item of bucket) {
                result.push(item.value);
            }
        }
        return result;
    }
    
    /**
     * 获取所有键值对
     * @returns {Array}
     */
    entries() {
        const result = [];
        for (let bucket of this.buckets) {
            for (let item of bucket) {
                result.push([item.key, item.value]);
            }
        }
        return result;
    }
    
    /**
     * 遍历所有键值对
     * @param {Function} callback - 回调函数 (key, value) => void
     */
    forEach(callback) {
        for (let bucket of this.buckets) {
            for (let item of bucket) {
                callback(item.key, item.value);
            }
        }
    }
    
    /**
     * 打印哈希表状态
     */
    print() {
        console.log(`哈希表大小: ${this.size}, 容量: ${this.buckets.length}`);
        console.log(`负载因子: ${(this.size / this.buckets.length).toFixed(2)}`);
        
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i].length > 0) {
                const items = this.buckets[i].map(item => `${item.key}:${item.value}`);
                console.log(`  桶[${i}]: ${items.join(' -> ')}`);
            }
        }
    }
}

/**
 * 应用1：两数之和
 * 
 * 问题：给定一个数组和一个目标值，找到两个数使它们的和等于目标值
 * 
 * 思路：
 * 1. 遍历数组
 * 2. 对于每个数num，检查target-num是否已经在哈希表中
 * 3. 如果在，就找到了答案
 * 4. 否则，把num加入哈希表
 * 
 * @param {number[]} nums - 数组
 * @param {number} target - 目标值
 * @returns {number[]} - 两个数的索引
 */
function twoSum(nums, target) {
    const map = new HashMap();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // 检查补数是否已经在哈希表中
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        // 把当前数加入哈希表
        map.put(nums[i], i);
    }
    
    return []; // 没有找到
}

/**
 * 应用2：单词频率统计
 * 
 * @param {string} text - 文本
 * @returns {HashMap} - 单词频率哈希表
 */
function wordFrequency(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const freqMap = new HashMap();
    
    for (let word of words) {
        const count = freqMap.get(word) || 0;
        freqMap.put(word, count + 1);
    }
    
    return freqMap;
}

/**
 * 应用3：LRU缓存（最近最少使用）
 * 
 * 结合哈希表和双向链表实现O(1)的LRU缓存
 */
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map(); // 使用JS原生Map
        this.cache = new DoubleLinkedList();
    }
    
    get(key) {
        if (!this.map.has(key)) {
            return -1;
        }
        
        // 移动到链表头部（表示最近使用）
        const node = this.map.get(key);
        this.cache.moveToHead(node);
        
        return node.value;
    }
    
    put(key, value) {
        if (this.map.has(key)) {
            // 更新已有节点
            const node = this.map.get(key);
            node.value = value;
            this.cache.moveToHead(node);
        } else {
            // 添加新节点
            const newNode = new DListNode(key, value);
            
            if (this.cache.size >= this.capacity) {
                // 移除最久未使用的节点（链表尾部）
                const tail = this.cache.removeTail();
                this.map.delete(tail.key);
            }
            
            this.cache.addToHead(newNode);
            this.map.set(key, newNode);
        }
    }
}

// 双向链表节点
class DListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

// 双向链表
class DoubleLinkedList {
    constructor() {
        this.head = new DListNode(0, 0); // 伪头节点
        this.tail = new DListNode(0, 0); // 伪尾节点
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0;
    }
    
    addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
        this.size++;
    }
    
    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.size--;
    }
    
    moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }
    
    removeTail() {
        const node = this.tail.prev;
        this.removeNode(node);
        return node;
    }
}

// ==================== 测试代码 ====================

console.log('===== 哈希表基本操作测试 =====\n');

const map = new HashMap();

console.log('插入键值对');
map.put('name', 'Alice');
map.put('age', 25);
map.put('city', 'Beijing');
map.put('email', 'alice@example.com');
map.print();
console.log();

console.log('获取值:');
console.log('name:', map.get('name'));
console.log('age:', map.get('age'));
console.log('phone:', map.get('phone')); // undefined
console.log();

console.log('更新值:');
map.put('age', 26);
console.log('age:', map.get('age'));
console.log();

console.log('删除键:');
map.remove('city');
console.log('city:', map.get('city')); // undefined
console.log('大小:', map.getSize());
console.log();

console.log('检查键是否存在:');
console.log('has name:', map.has('name'));
console.log('has city:', map.has('city'));
console.log();

console.log('获取所有键:', map.keys());
console.log('获取所有值:', map.values());
console.log();

console.log('遍历所有键值对:');
map.forEach((key, value) => {
    console.log(`  ${key}: ${value}`);
});
console.log();

// 测试扩容
console.log('===== 扩容测试 =====\n');

const smallMap = new HashMap(2); // 小容量，容易触发扩容
for (let i = 0; i < 10; i++) {
    smallMap.put(`key${i}`, i);
}
smallMap.print();
console.log();

console.log('===== 两数之和测试 =====\n');

const testCases = [
    { nums: [2, 7, 11, 15], target: 9 },
    { nums: [3, 2, 4], target: 6 },
    { nums: [3, 3], target: 6 }
];

testCases.forEach((test, index) => {
    const result = twoSum(test.nums, test.target);
    console.log(`测试 ${index + 1}: nums=[${test.nums}], target=${test.target}`);
    console.log(`  结果: [${result}] -> ${test.nums[result[0]]} + ${test.nums[result[1]]} = ${test.target}`);
});
console.log();

console.log('===== 单词频率统计测试 =====\n');

const text = "the quick brown fox jumps over the lazy dog the fox";
const freqMap = wordFrequency(text);
console.log(`文本: "${text}"`);
console.log('单词频率:');
freqMap.forEach((word, count) => {
    console.log(`  ${word}: ${count}`);
});
console.log();

// 性能测试
console.log('===== 性能测试 =====\n');

function measureTime(operation, name) {
    const start = Date.now();
    operation();
    const end = Date.now();
    console.log(`${name}: ${end - start}ms`);
}

// 测试大量插入
console.log('插入10000个键值对:');
measureTime(() => {
    const perfMap = new HashMap();
    for (let i = 0; i < 10000; i++) {
        perfMap.put(`key${i}`, i);
    }
}, '批量插入');

// 测试查找
console.log('\n查找10000次:');
const largeMap = new HashMap();
for (let i = 0; i < 10000; i++) {
    largeMap.put(`key${i}`, i);
}

measureTime(() => {
    for (let i = 0; i < 10000; i++) {
        largeMap.get(`key${i}`);
    }
}, '批量查找');

// 导出类和函数（如果在Node.js环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HashMap,
        twoSum,
        wordFrequency,
        LRUCache
    };
}
