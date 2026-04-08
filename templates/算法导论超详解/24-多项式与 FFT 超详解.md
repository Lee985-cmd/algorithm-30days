# 📚 算法导论 Part VII - 多项式与 FFT 超详解

## 第 28 章：信号处理的魔法 - 快速傅里叶变换

### 28.1 什么是 FFT？为什么这么重要？

#### 生活中的例子

**场景 1：音频处理**

```
你用手机录了一段音乐

这段音乐其实是由很多不同频率的声波组成的：
- 低音：100Hz
- 中音：1000Hz
- 高音：5000Hz

怎么知道有哪些频率？
→ 用 FFT！

FFT 能把声音从"时间域"转换到"频率域"
告诉你每个频率的强度

这就是音频分析的基础！
```

**场景 2：图像压缩**

```
JPEG 图片格式

把图片从"空间域"转换到"频率域"

高频部分（细节）可以压缩
低频部分（轮廓）保留

这样图片就变小了！

这也是 FFT 的应用！
```

**说人话定义：**

```
FFT（快速傅里叶变换）= 一种快速计算多项式乘法的方法

传统方法：O(n²)
FFT 方法：O(n log n)

快了超级多！

应用：
✓ 信号处理（音频、视频）
✓ 图像压缩（JPEG）
✓ 数据压缩
✓ 快速乘法
✓ 卷积计算
```

---

### 28.2 多项式的两种表示

#### 系数表示法

```
这是我们熟悉的方式：

A(x) = a₀ + a₁x + a₂x² + ... + aₙ₋₁xⁿ⁻¹

例如：
A(x) = 3 + 2x + 5x²

系数向量：[3, 2, 5]

特点：
✓ 直观易懂
✗ 乘法很慢 O(n²)
```

#### 点值表示法

```
另一种神奇的方式：

用 n 个点来表示一个 n-1 次多项式

例如：
A(x) = 3 + 2x + 5x²

取 3 个点：
(0, 3), (1, 10), (-1, 6)

验证：
A(0) = 3 ✓
A(1) = 3+2+5 = 10 ✓
A(-1) = 3-2+5 = 6 ✓

点值表示：[(0,3), (1,10), (-1,6)]

特点：
✓ 乘法超快 O(n)
✗ 不直观
```

#### 多项式乘法的对比

```
问题：计算 C(x) = A(x) × B(x)

方法 1：系数表示法
A(x) = a₀ + a₁x + a₂x²
B(x) = b₀ + b₁x + b₂x²

C(x) = (a₀b₀) 
     + (a₀b₁ + a₁b₀)x 
     + (a₀b₂ + a₁b₁ + a₂b₀)x²
     + (a₁b₂ + a₂b₁)x³
     + (a₂b₂)x⁴

需要计算 9 次乘法！O(n²)

方法 2：点值表示法
A: [(x₀,y₀), (x₁,y₁), (x₂,y₂)]
B: [(x₀,z₀), (x₁,z₁), (x₂,z₂)]

C: [(x₀,y₀z₀), (x₁,y₁z₁), (x₂,y₂z₂)]

只需要 n 次乘法！O(n) ✓

但是...
需要先转换成点值，最后还要变回来
这个转换过程就是 FFT 干的！
```

---

### 28.3 FFT 的核心思想

#### 分治策略

```
FFT 的做法：
1. 选特殊的点：单位复数根
2. 用分治法快速求值
3. 点值相乘
4. 用逆 FFT 变回系数

关键技巧：
利用单位复数根的对称性
减少计算量！
```

#### 单位复数根

```
n 次单位复数根：
ωₙ = e^(2πi/n)

性质：
ωₙ⁰, ωₙ¹, ωₙ², ..., ωₙⁿ⁻¹

例如 n=4：
ω₄ = e^(2πi/4) = i

ω₄⁰ = 1
ω₄¹ = i
ω₄² = -1
ω₄³ = -i

重要性质：
1. ωₙⁿ = 1
2. ωₙ^(n/2) = -1
3. ω_(2n)² = ωₙ （消去引理）
4. ωₙ^(k+n/2) = -ωₙ^k （折半引理）
```

---

### 28.4 FFT 算法实现

#### 递归版本

```javascript
/**
 * 复数类（简化版）
 */
class Complex {
    constructor(real, imag = 0) {
        this.real = real;
        this.imag = imag;
    }
    
    add(other) {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }
    
    sub(other) {
        return new Complex(this.real - other.real, this.imag - other.imag);
    }
    
    mul(other) {
        return new Complex(
            this.real * other.real - this.imag * other.imag,
            this.real * other.imag + this.imag * other.real
        );
    }
}

/**
 * FFT 递归实现
 * @param {Complex[]} a - 系数数组（长度必须是 2 的幂）
 * @param {number} invert - 是否逆变换（1 是，0 否）
 * @returns {Complex[]} - 点值或系数
 */
function fft(a, invert = 0) {
    const n = a.length;
    
    // 基本情况
    if (n === 1) {
        return a;
    }
    
    // 分成奇偶两部分
    const a0 = [], a1 = [];
    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) {
            a0.push(a[i]);
        } else {
            a1.push(a[i]);
        }
    }
    
    // 递归计算
    const y0 = fft(a0, invert);
    const y1 = fft(a1, invert);
    
    // 合并
    const y = new Array(n);
    const angle = (2 * Math.PI / n) * (invert ? -1 : 1);
    const wn = new Complex(Math.cos(angle), Math.sin(angle));
    
    let w = new Complex(1, 0);
    for (let i = 0; i < n / 2; i++) {
        const t = w.mul(y1[i]);
        y[i] = y0[i].add(t);
        y[i + n / 2] = y0[i].sub(t);
        
        if (invert) {
            // 逆变换要除以 n
            y[i] = new Complex(y[i].real / 2, y[i].imag / 2);
            y[i + n / 2] = new Complex(y[i + n / 2].real / 2, y[i + n / 2].imag / 2);
        }
        
        w = w.mul(wn);
    }
    
    return y;
}

// 测试
const A = [
    new Complex(3),  // 3
    new Complex(2),  // 2x
    new Complex(5),  // 5x²
    new Complex(0)   // 补零到 2 的幂
];

const result = fft(A);
console.log('FFT 结果:', result.map(c => `(${c.real.toFixed(2)}, ${c.imag.toFixed(2)})`));
```

#### 迭代版本（更快）

```javascript
/**
 * FFT 迭代实现（更高效）
 */
function fftIterative(a, invert = 0) {
    const n = a.length;
    
    // 位反转置换
    bitReverseCopy(a);
    
    // 蝶形运算
    for (let s = 1; s <= Math.log2(n); s++) {
        const m = 1 << s;  // 2^s
        const wm = new Complex(
            Math.cos((2 * Math.PI / m) * (invert ? -1 : 1)),
            Math.sin((2 * Math.PI / m) * (invert ? -1 : 1))
        );
        
        for (let k = 0; k < n; k += m) {
            let w = new Complex(1, 0);
            
            for (let j = 0; j < m / 2; j++) {
                const t = w.mul(a[k + j + m / 2]);
                const u = a[k + j];
                
                a[k + j] = u.add(t);
                a[k + j + m / 2] = u.sub(t);
                
                if (invert) {
                    a[k + j] = new Complex(a[k + j].real / 2, a[k + j].imag / 2);
                    a[k + j + m / 2] = new Complex(a[k + j + m / 2].real / 2, a[k + j + m / 2].imag / 2);
                }
                
                w = w.mul(wm);
            }
        }
    }
    
    if (invert) {
        // 逆变换最后要除以 n
        for (let i = 0; i < n; i++) {
            a[i] = new Complex(a[i].real / n, a[i].imag / n);
        }
    }
    
    return a;
}

/**
 * 位反转
 */
function bitReverseCopy(a) {
    const n = a.length;
    const bits = Math.log2(n);
    
    for (let i = 0; i < n; i++) {
        const rev = reverseBits(i, bits);
        if (i < rev) {
            [a[i], a[rev]] = [a[rev], a[i]];
        }
    }
}

/**
 * 反转二进制位
 */
function reverseBits(x, bits) {
    let result = 0;
    for (let i = 0; i < bits; i++) {
        result = (result << 1) | (x & 1);
        x >>= 1;
    }
    return result;
}
```

---

### 28.5 用 FFT 做多项式乘法

#### 完整流程

```javascript
/**
 * 用 FFT 计算多项式乘法
 * @param {number[]} poly1 - 第一个多项式的系数
 * @param {number[]} poly2 - 第二个多项式的系数
 * @returns {number[]} - 乘积的系数
 */
function multiplyPolynomials(poly1, poly2) {
    // 确定结果长度（向上取整到 2 的幂）
    const resultLen = poly1.length + poly2.length - 1;
    const n = 1;
    while (n < resultLen) {
        n *= 2;
    }
    
    // 补零
    const A = poly1.map(c => new Complex(c));
    const B = poly2.map(c => new Complex(c));
    
    while (A.length < n) A.push(new Complex(0));
    while (B.length < n) B.push(new Complex(0));
    
    // FFT 转换到点值
    fftIterative(A, 0);
    fftIterative(B, 0);
    
    // 点值相乘
    const C = [];
    for (let i = 0; i < n; i++) {
        C.push(A[i].mul(B[i]));
    }
    
    // 逆 FFT 变回系数
    fftIterative(C, 1);
    
    // 提取实部（虚部应该接近 0）
    const result = C.map(c => Math.round(c.real));
    
    // 去掉末尾的零
    while (result.length > resultLen && result[result.length - 1] === 0) {
        result.pop();
    }
    
    return result;
}

// 测试
const poly1 = [3, 2, 5];  // 3 + 2x + 5x²
const poly2 = [1, 4];      // 1 + 4x

const result = multiplyPolynomials(poly1, poly2);
console.log('乘积:', result);
// 输出：[3, 14, 13, 20]
// 验证：(3+2x+5x²)(1+4x) = 3 + 12x + 2x + 8x² + 5x² + 20x³
//                     = 3 + 14x + 13x² + 20x³ ✓
```

#### 详细执行过程

```
计算：(3 + 2x + 5x²) × (1 + 4x)

═══════════════════════════════════
第 1 步：补零到 2 的幂
═══════════════════════════════════
结果长度 = 3 + 2 - 1 = 4
已经是 2 的幂，不用补

A = [3, 2, 5, 0]
B = [1, 4, 0, 0]

═══════════════════════════════════
第 2 步：FFT 转换
═══════════════════════════════════
FFT(A) → 点值表示
FFT(B) → 点值表示

假设得到：
A': [y₀, y₁, y₂, y₃]
B': [z₀, z₁, z₂, z₃]

═══════════════════════════════════
第 3 步：点值相乘
═══════════════════════════════════
C'[i] = A'[i] × B'[i]

C' = [y₀z₀, y₁z₁, y₂z₂, y₃z₃]

═══════════════════════════════════
第 4 步：逆 FFT
═══════════════════════════════════
IFFT(C') → 系数表示

得到：[3, 14, 13, 20]

即：3 + 14x + 13x² + 20x³ ✓

总时间复杂度：O(n log n)
比直接计算的 O(n²) 快多了！
```

---

### 28.6 时间复杂度分析

```
FFT 的时间复杂度：

递归版本：
T(n) = 2T(n/2) + O(n)
根据主定理：T(n) = O(n log n)

迭代版本：
同样是 O(n log n)
但常数更小，实际更快

空间复杂度：O(n)

对比：
- 朴素乘法：O(n²)
- FFT 乘法：O(n log n)

n=1000 时：
朴素：100 万次操作
FFT：约 1 万次操作
快 100 倍！
```

---

### 28.7 实际应用

#### 应用 1：大整数乘法

```
计算两个超大整数的乘积：
12345678901234567890 × 98765432109876543210

传统方法：O(n²)
FFT 方法：O(n log n)

把整数看成多项式：
1234 = 1×10³ + 2×10² + 3×10¹ + 4×10⁰

用 FFT 加速！
```

#### 应用 2：信号滤波

```
音频处理：
去除噪音
增强低音
均衡器

步骤：
1. FFT 转换到频域
2. 过滤不需要的频率
3. 逆 FFT 变回时域
```

#### 应用 3：图像处理

```
JPEG 压缩：
1. 把图像分成 8×8 块
2. 对每块做二维 DCT（类似 FFT）
3. 量化（丢弃高频）
4. 编码

压缩率可达 10:1 甚至更高！
```

---

### 28.8 完整代码模板（背诵版）

```javascript
/**
 * 复数类
 */
class Complex {
    constructor(real, imag = 0) {
        this.real = real;
        this.imag = imag;
    }
    
    add(o) { return new Complex(this.real + o.real, this.imag + o.imag); }
    sub(o) { return new Complex(this.real - o.real, this.imag - o.imag); }
    mul(o) {
        return new Complex(
            this.real * o.real - this.imag * o.imag,
            this.real * o.imag + this.imag * o.real
        );
    }
}

/**
 * FFT 迭代实现
 */
function fft(a, invert = 0) {
    const n = a.length;
    const bits = Math.log2(n);
    
    // 位反转
    for (let i = 0; i < n; i++) {
        const rev = reverseBits(i, bits);
        if (i < rev) [a[i], a[rev]] = [a[rev], a[i]];
    }
    
    // 蝶形运算
    for (let len = 2; len <= n; len *= 2) {
        const angle = (2 * Math.PI / len) * (invert ? -1 : 1);
        const wlen = new Complex(Math.cos(angle), Math.sin(angle));
        
        for (let i = 0; i < n; i += len) {
            let w = new Complex(1, 0);
            for (let j = 0; j < len / 2; j++) {
                const u = a[i + j];
                const v = w.mul(a[i + j + len / 2]);
                a[i + j] = u.add(v);
                a[i + j + len / 2] = u.sub(v);
                w = w.mul(wlen);
            }
        }
    }
    
    if (invert) {
        for (let i = 0; i < n; i++) {
            a[i] = new Complex(a[i].real / n, a[i].imag / n);
        }
    }
    
    return a;
}

function reverseBits(x, bits) {
    let res = 0;
    for (let i = 0; i < bits; i++) {
        res = (res << 1) | (x & 1);
        x >>= 1;
    }
    return res;
}

/**
 * 多项式乘法
 */
function multiplyPolys(p1, p2) {
    const n = 1;
    while (n < p1.length + p2.length - 1) n *= 2;
    
    const A = p1.map(c => new Complex(c));
    const B = p2.map(c => new Complex(c));
    
    while (A.length < n) A.push(new Complex(0));
    while (B.length < n) B.push(new Complex(0));
    
    fft(A, 0);
    fft(B, 0);
    
    const C = A.map((a, i) => a.mul(B[i]));
    
    fft(C, 1);
    
    return C.map(c => Math.round(c.real));
}
```

---

## 总结：FFT 核心要点

### 必须掌握的

```
✓ FFT 的基本思想（分治）
✓ 单位复数根的性质
✓ 点值表示 vs 系数表示
✓ FFT 加速多项式乘法
✓ 时间复杂度 O(n log n)
```

### 理解的

```
✓ 为什么 FFT 能加速
✓ 位反转的作用
✓ 蝶形运算的过程
✓ 逆变换的原理
```

### 应用的

```
✓ 大整数乘法
✓ 信号处理
✓ 图像压缩
✓ 卷积计算
✓ 频谱分析
```

---

**现在理解 FFT 了吗？** 🎉

记住这些要点：
- **FFT** = 快速傅里叶变换
- **核心思想** = 分治 + 单位复数根
- **时间复杂度** = O(n log n)
- **应用** = 信号处理、图像压缩、大数乘法

**这是工程界最重要的算法之一！**
**改变了整个世界！** 💡

**加油！你一定能掌握的！** 💪🌟
