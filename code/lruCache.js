/**
 * LRU 缓存 - 最近最少使用淘汰策略
 * 
 * 核心思想：
 * - 缓存容量有限，满了要淘汰数据
 * - 淘汰策略：最近最少使用的先淘汰
 * - 结合哈希表（O(1)查询）+ 双向链表（O(1)移动）
 * 
 * 为什么不用普通对象？
 * - 普通对象无法维护访问顺序
 * - 删除中间节点需要 O(n) 时间
 * - 哈希表 + 双向链表是最佳组合
 * 
 * 应用场景：
 * - Redis 缓存淘汰（LRU/LFU）
 * - 浏览器缓存
 * - 操作系统页面置换
 * - 数据库缓冲池
 * 
 * 时间复杂度：
 * - 获取：O(1)
 * - 设置：O(1)
 */

class LRUCache {
    /**
     * @param {number} capacity - 缓存容量
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // 哈希表：key -> value
        
        // 双向链表的虚拟头尾节点
        this.head = { key: null, value: null };
        this.tail = { key: null, value: null };
        this.head.next = this.tail;
        this.tail.prev = this.head;
        
        this.size = 0;
    }

    /**
     * 获取缓存值
     * 
     * @param {number} key - 键
     * @returns {number} 值，不存在返回-1
     */
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        // 获取节点
        const node = this.cache.get(key);
        
        // 移动到头部（标记为最近使用）
        this._moveToHead(node);
        
        return node.value;
    }

    /**
     * 设置缓存值
     * 
     * @param {number} key - 键
     * @param {number} value - 值
     */
    put(key, value) {
        if (this.cache.has(key)) {
            // 键已存在，更新值并移动到头部
            const node = this.cache.get(key);
            node.value = value;
            this._moveToHead(node);
        } else {
            // 键不存在，创建新节点
            const newNode = { key, value };
            this.cache.set(key, newNode);
            this._addToHead(newNode);
            this.size++;

            // 如果超出容量，删除尾部节点
            if (this.size > this.capacity) {
                const tailNode = this._removeTail();
                this.cache.delete(tailNode.key);
                this.size--;
            }
        }
    }

    /**
     * 将节点添加到头部
     */
    _addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    /**
     * 从链表中删除节点
     */
    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    /**
     * 将节点移动到头部
     */
    _moveToHead(node) {
        this._removeNode(node);
        this._addToHead(node);
    }

    /**
     * 删除尾部节点（最近最少使用）
     */
    _removeTail() {
        const tailNode = this.tail.prev;
        this._removeNode(tailNode);
        return tailNode;
    }

    /**
     * 获取缓存大小
     */
    getSize() {
        return this.size;
    }

    /**
     * 打印缓存内容（调试用）
     */
    print() {
        const items = [];
        let current = this.head.next;
        while (current !== this.tail) {
            items.push(`${current.key}:${current.value}`);
            current = current.next;
        }
        console.log(`Cache(${this.size}/${this.capacity}): [${items.join(' -> ')}]`);
    }
}

// ==================== 测试示例 ====================

console.log('===== LRU 缓存测试 =====\n');

// 测试1：基本操作
console.log('测试1：基本操作');
const cache = new LRUCache(3);

cache.put(1, 10);
cache.print(); // [1:10]

cache.put(2, 20);
cache.print(); // [2:20 -> 1:10]

cache.put(3, 30);
cache.print(); // [3:30 -> 2:20 -> 1:10]

console.log('获取键1:', cache.get(1)); // 10
cache.print(); // [1:10 -> 3:30 -> 2:20]（1被移动到头部）

cache.put(4, 40); // 超出容量，淘汰键2
cache.print(); // [4:40 -> 1:10 -> 3:30]

console.log('获取键2:', cache.get(2)); // -1（已被淘汰）
console.log();

// 测试2：更新已有键
console.log('测试2：更新已有键');
const cache2 = new LRUCache(2);

cache2.put(1, 100);
cache2.print(); // [1:100]

cache2.put(1, 200); // 更新值
cache2.print(); // [1:200]

console.log('获取键1:', cache2.get(1)); // 200
console.log();

// 测试3：容量为1的极端情况
console.log('测试3：容量为1');
const cache3 = new LRUCache(1);

cache3.put(1, 10);
console.log('获取键1:', cache3.get(1)); // 10

cache3.put(2, 20); // 淘汰键1
console.log('获取键1:', cache3.get(1)); // -1
console.log('获取键2:', cache3.get(2)); // 20
console.log();

// 测试4：性能测试
console.log('测试4：性能测试');
const cache4 = new LRUCache(1000);

const startTime = Date.now();

// 插入10万次
for (let i = 0; i < 100000; i++) {
    cache4.put(i, i * 10);
}

const insertTime = Date.now() - startTime;
console.log(`插入10万次: ${insertTime}ms`);
console.log(`平均每次: ${(insertTime / 100000).toFixed(3)}ms`);

// 查询10万次
const queryStart = Date.now();
for (let i = 0; i < 100000; i++) {
    cache4.get(i);
}
const queryTime = Date.now() - queryStart;
console.log(`查询10万次: ${queryTime}ms`);
console.log(`平均每次: ${(queryTime / 100000).toFixed(3)}ms`);
console.log();

// 测试5：实际应用 - 模拟 Redis 缓存
console.log('测试5：模拟 Redis 缓存');

class RedisCache {
    constructor(maxMemory) {
        // 假设每个键值对占用 1MB
        this.lru = new LRUCache(maxMemory);
        this.stats = {
            hits: 0,
            misses: 0
        };
    }

    set(key, value) {
        this.lru.put(key, value);
        console.log(`✅ SET ${key}`);
    }

    get(key) {
        const value = this.lru.get(key);
        if (value !== -1) {
            this.stats.hits++;
            console.log(`✅ GET ${key} = ${value}（缓存命中）`);
            return value;
        } else {
            this.stats.misses++;
            console.log(`❌ GET ${key} = null（缓存未命中）`);
            return null;
        }
    }

    getStats() {
        const total = this.stats.hits + this.stats.misses;
        const hitRate = total > 0 ? (this.stats.hits / total * 100).toFixed(1) : 0;
        console.log(`缓存统计:`);
        console.log(`  命中: ${this.stats.hits}`);
        console.log(`  未命中: ${this.stats.misses}`);
        console.log(`  命中率: ${hitRate}%`);
    }
}

const redis = new RedisCache(3);

// 模拟用户访问
redis.set('user:1', 'Alice');
redis.set('user:2', 'Bob');
redis.set('user:3', 'Charlie');

redis.get('user:1'); // 命中
redis.get('user:2'); // 命中

redis.set('user:4', 'David'); // 淘汰 user:3

redis.get('user:3'); // 未命中（已被淘汰）
redis.get('user:1'); // 命中

console.log();
redis.getStats();
console.log();

console.log('===== LRU 缓存特点总结 =====');
console.log('✅ O(1)时间复杂度的get和put操作');
console.log('✅ 自动淘汰最近最少使用的数据');
console.log('✅ 广泛应用于缓存系统');
console.log('⚠️  无法处理突发访问模式');
console.log('⚠️  对于周期性访问的数据不友好');
console.log('\n实际应用：');
console.log('- Redis：LRU/LFU淘汰策略');
console.log('- 浏览器：HTTP缓存');
console.log('- 操作系统：页面置换算法');
console.log('- 数据库：InnoDB缓冲池');
console.log('- CDN：边缘节点缓存');
