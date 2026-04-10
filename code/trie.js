/**
 * Trie树（前缀树/字典树）- 高效字符串检索数据结构
 * 
 * 核心思想：
 * - 用树形结构存储字符串集合
 * - 共享公共前缀，节省空间
 * - 每个节点代表一个字符
 * 
 * 应用场景：
 * - 搜索引擎的自动补全
 * - 拼写检查
 * - IP路由表查找
 * - 敏感词过滤
 * 
 * 为什么不用哈希表？
 * - 哈希表只能精确匹配
 * - Trie支持前缀查询（"app"能查到"apple", "application"）
 * 
 * 时间复杂度：
 * - 插入：O(m)，m为字符串长度
 * - 搜索：O(m)
 * - 前缀查询：O(m)
 */

class TrieNode {
    constructor() {
        // 子节点映射：字符 -> TrieNode
        this.children = {};
        // 标记是否为某个单词的结尾
        this.isEndOfWord = false;
        // 可选：记录以该节点为前缀的单词数量
        this.wordCount = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
        this.size = 0; // 单词总数
    }

    /**
     * 插入单词到Trie树
     * 
     * 算法流程：
     * 1. 从根节点开始
     * 2. 逐字符遍历单词
     * 3. 如果字符不存在，创建新节点
     * 4. 移动到下一个节点
     * 5. 最后一个字符标记为单词结尾
     * 
     * @param {string} word - 要插入的单词
     */
    insert(word) {
        if (!word || word.length === 0) return;

        let node = this.root;

        for (let char of word) {
            // 如果该字符的子节点不存在，创建它
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            
            // 移动到子节点
            node = node.children[char];
            // 更新前缀计数
            node.wordCount++;
        }

        // 标记单词结尾
        if (!node.isEndOfWord) {
            node.isEndOfWord = true;
            this.size++;
        }
    }

    /**
     * 搜索完整单词
     * 
     * @param {string} word - 要搜索的单词
     * @returns {boolean} 是否存在该单词
     */
    search(word) {
        const node = this._searchPrefix(word);
        return node !== null && node.isEndOfWord;
    }

    /**
     * 检查是否有以prefix为前缀的单词
     * 
     * @param {string} prefix - 前缀
     * @returns {boolean} 是否存在该前缀
     */
    startsWith(prefix) {
        return this._searchPrefix(prefix) !== null;
    }

    /**
     * 删除单词
     * 
     * 注意：只删除标记，不删除节点（除非该节点没有其他用途）
     * 
     * @param {string} word - 要删除的单词
     * @returns {boolean} 是否删除成功
     */
    delete(word) {
        return this._delete(this.root, word, 0);
    }

    /**
     * 获取所有以prefix开头的单词
     * 
     * @param {string} prefix - 前缀
     * @param {number} maxResults - 最大返回数量（默认10）
     * @returns {Array} 匹配的单词数组
     */
    getWordsWithPrefix(prefix, maxResults = 10) {
        const node = this._searchPrefix(prefix);
        if (!node) return [];

        const results = [];
        this._collectWords(node, prefix, results, maxResults);
        return results;
    }

    /**
     * 统计以prefix为前缀的单词数量
     * 
     * @param {string} prefix - 前缀
     * @returns {number} 单词数量
     */
    countWordsWithPrefix(prefix) {
        const node = this._searchPrefix(prefix);
        return node ? node.wordCount : 0;
    }

    /**
     * 内部方法：搜索前缀
     * 
     * @param {string} prefix - 前缀
     * @returns {TrieNode|null} 前缀对应的节点，不存在返回null
     */
    _searchPrefix(prefix) {
        let node = this.root;

        for (let char of prefix) {
            if (!node.children[char]) {
                return null; // 前缀不存在
            }
            node = node.children[char];
        }

        return node;
    }

    /**
     * 内部方法：递归删除
     * 
     * @param {TrieNode} node - 当前节点
     * @param {string} word - 要删除的单词
     * @param {number} index - 当前字符索引
     * @returns {boolean} 是否可以删除当前节点
     */
    _delete(node, word, index) {
        if (index === word.length) {
            // 到达单词末尾
            if (!node.isEndOfWord) return false; // 单词不存在

            node.isEndOfWord = false;
            this.size--;
            
            // 如果没有子节点，可以删除
            return Object.keys(node.children).length === 0;
        }

        const char = word[index];
        const childNode = node.children[char];

        if (!childNode) return false; // 单词不存在

        // 递归删除子节点
        const shouldDeleteChild = this._delete(childNode, word, index + 1);

        // 如果子节点可以删除
        if (shouldDeleteChild) {
            delete node.children[char];
            node.wordCount--;
            
            // 如果当前节点也不是单词结尾且没有其他子节点，可以删除
            return !node.isEndOfWord && Object.keys(node.children).length === 0;
        }

        return false;
    }

    /**
     * 内部方法：收集所有单词
     * 
     * @param {TrieNode} node - 当前节点
     * @param {string} prefix - 当前前缀
     * @param {Array} results - 结果数组
     * @param {number} maxResults - 最大结果数
     */
    _collectWords(node, prefix, results, maxResults) {
        if (results.length >= maxResults) return;

        // 如果当前节点是单词结尾，加入结果
        if (node.isEndOfWord) {
            results.push(prefix);
        }

        // 递归收集子节点的单词
        for (let char in node.children) {
            this._collectWords(node.children[char], prefix + char, results, maxResults);
            if (results.length >= maxResults) break;
        }
    }

    /**
     * 获取Trie树中的单词总数
     * 
     * @returns {number} 单词数量
     */
    getSize() {
        return this.size;
    }

    /**
     * 清空Trie树
     */
    clear() {
        this.root = new TrieNode();
        this.size = 0;
    }
}

// ==================== 测试示例 ====================

console.log('===== Trie树（前缀树）测试 =====\n');

// 测试1：基本操作
console.log('测试1：插入和搜索');
const trie = new Trie();

trie.insert('apple');
trie.insert('app');
trie.insert('application');
trie.insert('apply');
trie.insert('banana');
trie.insert('band');
trie.insert('bank');

console.log('插入单词: apple, app, application, apply, banana, band, bank');
console.log('搜索 "apple":', trie.search('apple'));     // true
console.log('搜索 "app":', trie.search('app'));         // true
console.log('搜索 "appl":', trie.search('appl'));       // false（不是完整单词）
console.log('搜索 "orange":', trie.search('orange'));   // false
console.log('单词总数:', trie.getSize());
console.log();

// 测试2：前缀查询
console.log('测试2：前缀查询');
console.log('是否有 "app" 前缀:', trie.startsWith('app'));      // true
console.log('是否有 "ban" 前缀:', trie.startsWith('ban'));      // true
console.log('是否有 "ora" 前缀:', trie.startsWith('ora'));      // false
console.log();

// 测试3：自动补全（获取所有以某前缀开头的单词）
console.log('测试3：自动补全功能');
console.log('以 "app" 开头的单词:', trie.getWordsWithPrefix('app'));
console.log('以 "ban" 开头的单词:', trie.getWordsWithPrefix('ban'));
console.log('以 "ban" 开头的前2个单词:', trie.getWordsWithPrefix('ban', 2));
console.log();

// 测试4：统计前缀数量
console.log('测试4：统计前缀数量');
console.log('以 "app" 为前缀的单词数:', trie.countWordsWithPrefix('app'));  // 4
console.log('以 "ban" 为前缀的单词数:', trie.countWordsWithPrefix('ban'));  // 3
console.log('以 "banan" 为前缀的单词数:', trie.countWordsWithPrefix('banan')); // 1
console.log();

// 测试5：删除操作
console.log('测试5：删除单词');
console.log('删除前搜索 "app":', trie.search('app'));  // true
trie.delete('app');
console.log('删除后搜索 "app":', trie.search('app'));  // false
console.log('但 "apple" 还在:', trie.search('apple'));  // true
console.log('以 "app" 为前缀的单词数:', trie.countWordsWithPrefix('app')); // 3
console.log('单词总数:', trie.getSize());
console.log();

// 测试6：实际应用场景 - 搜索引擎自动补全
console.log('测试6：搜索引擎自动补全模拟');
const searchTrie = new Trie();

// 模拟热门搜索词
const hotSearches = [
    'javascript教程',
    'javascript框架',
    'java面试题',
    'java学习路线',
    'python数据分析',
    'python爬虫',
    'react入门',
    'react hooks',
    'vue3新特性',
    '算法导论'
];

hotSearches.forEach(word => searchTrie.insert(word));

console.log('用户输入 "java" 时的推荐:');
console.log(searchTrie.getWordsWithPrefix('java', 5));

console.log('\n用户输入 "py" 时的推荐:');
console.log(searchTrie.getWordsWithPrefix('py', 5));

console.log('\n用户输入 "re" 时的推荐:');
console.log(searchTrie.getWordsWithPrefix('re', 5));
console.log();

// 测试7：敏感词过滤
console.log('测试7：敏感词过滤应用');
const sensitiveTrie = new Trie();

// 添加敏感词
const sensitiveWords = ['暴力', '色情', '赌博', '诈骗'];
sensitiveWords.forEach(word => sensitiveTrie.insert(word));

function filterSensitiveText(text, trie) {
    let filtered = text;
    for (let i = 0; i < text.length; i++) {
        for (let j = i + 1; j <= text.length; j++) {
            const substring = text.substring(i, j);
            if (trie.search(substring)) {
                // 替换为*号
                filtered = filtered.replace(substring, '*'.repeat(substring.length));
            }
        }
    }
    return filtered;
}

const testText = '这个网站有暴力和诈骗内容';
console.log('原始文本:', testText);
console.log('过滤后:', filterSensitiveText(testText, sensitiveTrie));
console.log();

// 测试8：性能测试
console.log('测试8：性能测试');
const perfTrie = new Trie();
const words = [];

// 插入10000个随机单词
for (let i = 0; i < 10000; i++) {
    const word = 'word' + Math.random().toString(36).substring(2, 8);
    words.push(word);
    perfTrie.insert(word);
}

console.log(`插入10000个单词完成`);
console.log(`单词总数: ${perfTrie.getSize()}`);

// 测试搜索性能
const startTime = Date.now();
let found = 0;
for (let i = 0; i < 1000; i++) {
    if (perfTrie.search(words[i])) {
        found++;
    }
}
const endTime = Date.now();

console.log(`搜索1000次，找到${found}个，耗时: ${endTime - startTime}ms`);
console.log(`平均每次搜索: ${(endTime - startTime) / 1000}ms`);
console.log();

// 测试9：IP路由表模拟
console.log('测试9：IP路由表查找（简化版）');
const ipTrie = new Trie();

// 模拟IP前缀路由
ipTrie.insert('192.168.1');  // 局域网
ipTrie.insert('10.0.0');      // 内网
ipTrie.insert('8.8.8');       // Google DNS
ipTrie.insert('114.114.114'); // 114 DNS

function lookupIP(ip, trie) {
    const parts = ip.split('.');
    for (let i = parts.length; i > 0; i--) {
        const prefix = parts.slice(0, i).join('.');
        if (trie.search(prefix)) {
            return prefix;
        }
    }
    return '未知路由';
}

console.log('192.168.1.100 的路由:', lookupIP('192.168.1.100', ipTrie));
console.log('10.0.0.1 的路由:', lookupIP('10.0.0.1', ipTrie));
console.log('8.8.8.8 的路由:', lookupIP('8.8.8.8', ipTrie));
console.log('1.2.3.4 的路由:', lookupIP('1.2.3.4', ipTrie));
console.log();

console.log('===== Trie树特点总结 =====');
console.log('✅ 前缀查询效率极高 O(m)');
console.log('✅ 支持自动补全、拼写检查等应用');
console.log('✅ 共享前缀，节省空间');
console.log('⚠️  空间消耗较大（每个节点都有子节点映射）');
console.log('⚠️  不适合存储大量短字符串');
console.log('\n实际应用：');
console.log('- 搜索引擎自动补全（Google、百度）');
console.log('- IDE代码提示');
console.log('- 浏览器URL自动补全');
console.log('- IP路由表查找');
console.log('- 敏感词过滤系统');
console.log('- 拼写检查器');
