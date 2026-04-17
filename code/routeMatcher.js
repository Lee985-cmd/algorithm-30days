/**
 * 前端路由路径匹配算法实现
 * 核心思想：路径树（Path Tree）+ 正则表达式匹配
 */

class RouteMatcher {
    constructor() {
        this.routes = []; // 路由配置表
    }
    
    // 注册路由
    addRoute(path, component) {
        this.routes.push({
            path,
            component,
            // 预编译正则表达式（性能优化）
            regex: this.compilePath(path),
            keys: this.extractKeys(path)
        });
    }
    
    // 核心算法：将路径模式编译成正则表达式
    compilePath(path) {
        // 将 /user/:id 转换成 /user/([^/]+)
        const pattern = path
            .replace(/:[^/]+/g, '([^/]+)')  // :param → 捕获组
            .replace(/\*/g, '(.*)');         // * → 任意字符
        
        return new RegExp(`^${pattern}$`);
    }
    
    // 提取路径参数名
    extractKeys(path) {
        const keys = [];
        const paramRegex = /:([^/]+)/g;
        let match;
        
        while ((match = paramRegex.exec(path)) !== null) {
            keys.push(match[1]); // 提取参数名（去掉冒号）
        }
        
        return keys;
    }
    
    // 核心算法：匹配当前 URL 并返回匹配的路由和参数
    match(url) {
        for (const route of this.routes) {
            const match = url.match(route.regex);
            
            if (match) {
                // 提取路径参数
                const params = {};
                for (let i = 0; i < route.keys.length; i++) {
                    params[route.keys[i]] = match[i + 1];
                }
                
                return {
                    route: route.component,
                    params,
                    path: route.path
                };
            }
        }
        
        return null; // 未匹配
    }
}

// ========================================
// 进阶：嵌套路由匹配（Path Tree）
// ========================================

class RouteTreeNode {
    constructor() {
        this.children = new Map(); // 子节点
        this.component = null;     // 当前节点的组件
        this.paramName = null;     // 参数名（如 :id）
    }
}

class NestedRouteMatcher {
    constructor() {
        this.root = new RouteTreeNode();
    }
    
    // 添加路由到树中
    addRoute(path, component) {
        const segments = path.split('/').filter(Boolean);
        let currentNode = this.root;
        
        for (const segment of segments) {
            if (!currentNode.children.has(segment)) {
                const newNode = new RouteTreeNode();
                
                // 如果是动态参数，记录参数名
                if (segment.startsWith(':')) {
                    newNode.paramName = segment.slice(1);
                }
                
                currentNode.children.set(segment, newNode);
            }
            
            currentNode = currentNode.children.get(segment);
        }
        
        currentNode.component = component;
    }
    
    // 匹配路径
    match(url) {
        const segments = url.split('/').filter(Boolean);
        return this.matchNode(this.root, segments, 0, {});
    }
    
    // 递归匹配
    matchNode(node, segments, index, params) {
        if (index === segments.length) {
            // 到达路径末尾
            return node.component ? { component: node.component, params } : null;
        }
        
        const segment = segments[index];
        
        // 1. 尝试精确匹配
        if (node.children.has(segment)) {
            const result = this.matchNode(
                node.children.get(segment), 
                segments, 
                index + 1, 
                params
            );
            if (result) return result;
        }
        
        // 2. 尝试动态参数匹配
        for (const [key, childNode] of node.children) {
            if (childNode.paramName) {
                const newParams = { ...params, [childNode.paramName]: segment };
                const result = this.matchNode(childNode, segments, index + 1, newParams);
                if (result) return result;
            }
        }
        
        return null;
    }
}

// ========================================
// 测试代码
// ========================================

console.log('=== 基础路由匹配测试 ===');
const matcher = new RouteMatcher();

matcher.addRoute('/home', 'HomeComponent');
matcher.addRoute('/user/:id', 'UserComponent');
matcher.addRoute('/user/:id/post/:postId', 'PostComponent');

const test1 = matcher.match('/home');
console.log('匹配 /home:', test1);
// 输出: { route: 'HomeComponent', params: {}, path: '/home' }

const test2 = matcher.match('/user/123');
console.log('匹配 /user/123:', test2);
// 输出: { route: 'UserComponent', params: { id: '123' }, path: '/user/:id' }

const test3 = matcher.match('/user/123/post/456');
console.log('匹配 /user/123/post/456:', test3);
// 输出: { route: 'PostComponent', params: { id: '123', postId: '456' }, path: '/user/:id/post/:postId' }

console.log('\n=== 嵌套路由匹配测试 ===');
const nestedMatcher = new NestedRouteMatcher();

nestedMatcher.addRoute('/app/home', 'Home');
nestedMatcher.addRoute('/app/user/:id', 'User');
nestedMatcher.addRoute('/app/user/:id/profile', 'Profile');

const nested1 = nestedMatcher.match('/app/user/42');
console.log('匹配 /app/user/42:', nested1);
// 输出: { component: 'User', params: { id: '42' } }

const nested2 = nestedMatcher.match('/app/user/42/profile');
console.log('匹配 /app/user/42/profile:', nested2);
// 输出: { component: 'Profile', params: { id: '42' } }

console.log('\n✅ 路由匹配算法实现完成！');
