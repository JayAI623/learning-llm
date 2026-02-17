import {
    inputSequence,
    embeddingDim,
    timeStep,
    maxTimeSteps,
    embeddingMatrix,
    W_Q,
    W_K,
    W_V,
    getCurrentSequence,
    updateTimeStep
} from './config/data.js';

import { matrixMultiply, transposeMatrix, softmax } from './utils/matrix.js';

// 当前时间步和动画状态
let currentTimeStep = 0; // 始终从0开始
let isAnimating = false;

// KV缓存
let kCache = []; // 存储每个时间步计算过的K矩阵
let vCache = []; // 存储每个时间步计算过的V矩阵

// 计算操作计数器
let standardComputations = 0;
let cacheComputations = 0;

// 初始化函数
function initializeApp() {
    console.log('KV缓存演示: 初始化中...');
    
    // 确保所有需要的DOM元素都存在
    const requiredElements = [
        'prevStep',
        'nextStep',
        'currentStep',
        'sequenceLength',
        'inputSequence',
        'qMatrixStandard',
        'kMatrixStandard',
        'vMatrixStandard',
        'qMatrixCache',
        'kMatrixCache',
        'vMatrixCache',
        'standardComputations',
        'cacheComputations',
        'computationSaved'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.error('缺少必要的DOM元素:', missingElements);
        return;
    }
    
    // 确保强制重置时间步为0（内部状态）
    console.log('强制重置时间步和状态');
    currentTimeStep = 0;
    updateTimeStep(0);
    
    // 清空缓存，并构建初始状态的缓存
    kCache = [];
    vCache = [];
    const initialSequence = getCurrentSequence(); // 应该只包含"我"
    rebuildCache(initialSequence);
    
    // 重置计数器
    standardComputations = 0;
    cacheComputations = 0;
    
    // 初始化显示
    updateVisualization();
    
    // 添加按钮事件监听器
    document.getElementById('prevStep').addEventListener('click', previousStep);
    document.getElementById('nextStep').addEventListener('click', nextStep);
    
    console.log('KV缓存演示: 初始化完成');
}

// 标准模式计算
function standardComputation(sequence) {
    // 重置计数器
    standardComputations = 0;
    
    // 获取当前序列的词嵌入
    const embeddings = sequence.map(token => {
        standardComputations += 1; // 每个词嵌入查询算一次操作
        return embeddingMatrix[token];
    });
    
    // 计算Q、K、V矩阵
    const Q = matrixMultiply(embeddings, W_Q);
    const K = matrixMultiply(embeddings, W_K);
    const V = matrixMultiply(embeddings, W_V);
    
    // 每个矩阵乘法算n次操作(n是序列长度)
    standardComputations += sequence.length * 3;
    
    // 计算注意力分数
    const QK = matrixMultiply(Q, transposeMatrix(K));
    standardComputations += sequence.length; // QK乘法
    
    // 缩放
    const scaledQK = QK.map(row => row.map(x => x / Math.sqrt(embeddingDim)));
    standardComputations += sequence.length; // 缩放操作
    
    // 应用掩码
    const maskedQK = scaledQK.map((row, i) => 
        row.map((x, j) => j > i ? -1e9 : x)
    );
    standardComputations += sequence.length; // 掩码操作
    
    // 计算注意力权重
    const attentionWeights = maskedQK.map(row => softmax(row));
    standardComputations += sequence.length; // Softmax操作
    
    // 计算输出
    const output = matrixMultiply(attentionWeights, V);
    standardComputations += sequence.length; // 最终矩阵乘法
    
    return {
        Q, K, V, 
        QK,            // 添加QK中间结果
        scaledQK,      // 添加缩放后结果
        maskedQK,      // 添加掩码后结果
        attentionWeights, 
        output
    };
}

// KV缓存模式计算
function cacheComputation(sequence) {
    // 重置计数器
    cacheComputations = 0;
    
    const currentLength = sequence.length;
    let Q, K, V, QK, scaledQK, maskedQK, attentionWeights, output;
    
    // 确保缓存与序列长度匹配
    if (kCache.length !== currentLength) {
        console.log(`缓存长度(${kCache.length})与序列长度(${currentLength})不匹配，重建缓存...`);
        rebuildCache(sequence);
    }
    
    if (currentLength === 1) {
        // 第一个token，完整计算
        const embeddings = [embeddingMatrix[sequence[0]]];
        cacheComputations += 1; // 词嵌入查询
        
        Q = matrixMultiply([embeddings[0]], W_Q);
        K = matrixMultiply([embeddings[0]], W_K);
        V = matrixMultiply([embeddings[0]], W_V);
        cacheComputations += 3; // 三个矩阵乘法
        
        // 确保缓存正确
        kCache = [K[0]];
        vCache = [V[0]];
        
        // 注意力计算(对于单token，注意力权重是[1])
        QK = [[1]];
        scaledQK = [[1]];
        maskedQK = [[1]];
        attentionWeights = [[1]];
        output = V;
        
    } else {
        // 获取当前token的词嵌入
        const currentEmbedding = embeddingMatrix[sequence[currentLength - 1]];
        cacheComputations += 1; // 词嵌入查询
        
        // 只为当前token计算Q
        Q = matrixMultiply([currentEmbedding], W_Q);
        cacheComputations += 1; // Q矩阵乘法
        
        // 使用完整K和V矩阵(包含缓存+当前)
        K = kCache.slice(); // 复制缓存中的K矩阵
        V = vCache.slice(); // 复制缓存中的V矩阵
        
        // 计算注意力分数(仅计算当前token对所有token的注意力)
        // 首先使用现有的K计算QK
        const qk = [];
        for (let i = 0; i < K.length; i++) {
            let sum = 0;
            for (let j = 0; j < K[i].length; j++) {
                sum += Q[0][j] * K[i][j];
            }
            qk.push(sum);
        }
        cacheComputations += currentLength; // QK计算
        
        // 将单行QK结果转换为矩阵格式，方便统一处理
        QK = [];
        for (let i = 0; i < currentLength; i++) {
            const row = Array(currentLength).fill(-Infinity); // 初始化为负无穷
            if (i === currentLength - 1) {
                // 最后一行使用实际计算的结果
                for (let j = 0; j < currentLength; j++) {
                    row[j] = qk[j];
                }
            } else {
                // 其他行使用之前的计算结果
                for (let j = 0; j < currentLength; j++) {
                    let sum = 0;
                    for (let k = 0; k < K[j].length; k++) {
                        sum += K[i][k] * K[j][k]; // 使用 K[i] 作为 Q 向量
                    }
                    row[j] = sum;
                }
            }
            // 对上三角部分填充负无穷
            for (let j = i + 1; j < currentLength; j++) {
                row[j] = -Infinity;
            }
            QK.push(row);
        }
        
        // 缩放
        scaledQK = QK.map(row => 
            row.map(x => x === -Infinity ? -Infinity : x / Math.sqrt(embeddingDim))
        );
        cacheComputations += currentLength; // 缩放操作
        
        // 应用掩码(当前token只能看到自己及之前的token)
        maskedQK = scaledQK; // 我们已经在 QK 计算时应用了掩码
        cacheComputations += 1; // 掩码操作
        
        // 计算softmax
        attentionWeights = maskedQK.map(row => {
            const validValues = row.filter(x => x !== -Infinity);
            const maxVal = Math.max(...validValues);
            const expValues = row.map(x => x === -Infinity ? 0 : Math.exp(x - maxVal));
            const sumExp = expValues.reduce((a, b) => a + b, 0);
            return row.map((x, j) => x === -Infinity ? 0 : expValues[j] / sumExp);
        });
        cacheComputations += currentLength; // Softmax操作
        
        // 计算当前token的输出
        let currentOutput = [];
        for (let i = 0; i < embeddingDim; i++) {
            let sum = 0;
            for (let j = 0; j < attentionWeights[currentLength - 1].length; j++) {
                sum += attentionWeights[currentLength - 1][j] * V[j][i];
            }
            currentOutput.push(sum);
        }
        cacheComputations += 1; // 加权求和
        
        // 更新输出矩阵
        output = [currentOutput];
    }
    
    return {
        Q, K, V, 
        QK,            // 添加QK中间结果
        scaledQK,      // 添加缩放后结果
        maskedQK,      // 添加掩码后结果
        attentionWeights, 
        output
    };
}

// 更新可视化
function updateVisualization() {
    // 先确保从data.js获取最新序列
    const currentSeq = getCurrentSequence();
    console.log('当前时间步:', currentTimeStep, '序列:', currentSeq, '序列长度:', currentSeq.length);
    
    // 更新序列和时间步显示（UI显示时间步+1，从1开始）
    document.getElementById('currentStep').textContent = currentTimeStep + 1;
    document.getElementById('sequenceLength').textContent = currentSeq.length;
    
    // 更新输入序列显示
    const sequenceContainer = document.getElementById('inputSequence');
    sequenceContainer.innerHTML = '';
    
    inputSequence.forEach((token, index) => {
        const tokenElement = document.createElement('div');
        tokenElement.className = 'token';
        tokenElement.textContent = token;
        
        if (index <= currentTimeStep) {
            tokenElement.classList.add('active');
        }
        
        sequenceContainer.appendChild(tokenElement);
    });
    
    // 计算标准模式
    const standard = standardComputation(currentSeq);
    
    // 计算KV缓存模式
    const cache = cacheComputation(currentSeq);
    
    // 更新矩阵显示
    updateMatrixDisplay(standard.Q, 'qMatrixStandard');
    updateMatrixDisplay(standard.K, 'kMatrixStandard');
    updateMatrixDisplay(standard.V, 'vMatrixStandard');
    
    updateMatrixDisplay(cache.Q, 'qMatrixCache');
    updateMatrixDisplay(cache.K, 'kMatrixCache', true);
    updateMatrixDisplay(cache.V, 'vMatrixCache', true);
    
    // 更新计算次数
    document.getElementById('standardComputations').textContent = standardComputations;
    document.getElementById('cacheComputations').textContent = cacheComputations;
    
    // 计算节省百分比
    const savedPercent = Math.round((standardComputations - cacheComputations) / standardComputations * 100);
    document.getElementById('computationSaved').textContent = `${savedPercent}%`;
    
    // 更新注意力分数计算对比
    updateAttentionScoreComparison(standard, cache, currentSeq);
    
    // 更新按钮状态 (考虑UI时间步从1开始的逻辑)
    document.getElementById('prevStep').disabled = currentTimeStep === 0;
    document.getElementById('nextStep').disabled = currentTimeStep === maxTimeSteps - 1;
    
    // 更新矩阵维度显示
    const dimensions = document.querySelectorAll('.matrix-dimensions');
    dimensions.forEach(dim => {
        // 更新t值为当前序列长度
        const text = dim.textContent;
        if (text.includes('t×4')) {
            dim.textContent = `(${currentSeq.length}×4)`;
        }
    });
    
    // 动态调整缓存模式所有矩阵的高度，使其与标准模式对齐
    setTimeout(() => {
        // Q矩阵高度对齐
        const qMatrixStandard = document.getElementById('qMatrixStandard');
        const qMatrixCache = document.getElementById('qMatrixCache');
        
        if (qMatrixStandard && qMatrixCache) {
            // 获取标准Q矩阵的高度
            const standardHeight = qMatrixStandard.offsetHeight;
            
            // 设置缓存Q矩阵的高度
            if (standardHeight > 0) {
                qMatrixCache.style.minHeight = `${standardHeight}px`;
                console.log('已调整Q矩阵高度:', standardHeight);
            }
        }
        
        // K矩阵高度对齐
        const kMatrixStandard = document.getElementById('kMatrixStandard');
        const kMatrixCache = document.getElementById('kMatrixCache');
        
        if (kMatrixStandard && kMatrixCache) {
            const standardHeight = kMatrixStandard.offsetHeight;
            if (standardHeight > 0) {
                kMatrixCache.style.minHeight = `${standardHeight}px`;
                console.log('已调整K矩阵高度:', standardHeight);
            }
        }
        
        // V矩阵高度对齐
        const vMatrixStandard = document.getElementById('vMatrixStandard');
        const vMatrixCache = document.getElementById('vMatrixCache');
        
        if (vMatrixStandard && vMatrixCache) {
            const standardHeight = vMatrixStandard.offsetHeight;
            if (standardHeight > 0) {
                vMatrixCache.style.minHeight = `${standardHeight}px`;
                console.log('已调整V矩阵高度:', standardHeight);
            }
        }
    }, 50); // 短暂延迟确保DOM已经更新
}

// 更新矩阵显示
function updateMatrixDisplay(matrix, containerId, isCache = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    // 处理不同形状的矩阵
    const isVector = !Array.isArray(matrix[0]); // 检查是否为向量
    
    if (isVector) {
        // 如果是向量，转换为只有一行的矩阵
        matrix = [matrix];
    }
    
    // 创建表格
    const table = document.createElement('table');
    table.className = 'matrix-table';
    
    // 添加行
    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');
        row.className = 'matrix-row';
        
        // 添加单元格
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('td');
            cell.className = 'matrix-cell';
            
            const value = typeof matrix[i][j] === 'number' 
                ? matrix[i][j].toFixed(2) 
                : matrix[i][j];
            
            cell.textContent = value;
            
            // 样式处理
            if (isCache) {
                if (containerId === 'qMatrixCache') {
                    // Q矩阵不需要缓存样式（设置为標准蓝色）
                    // 这里不加具体样式，因为通过HTML的standard-matrix类已添加
                } else if (containerId === 'kMatrixCache') {
                    // KT矩阵最后一列为蓝色，其他为橘黄色
                    if (j === matrix[i].length - 1) {
                        cell.classList.add('new-value');
                    } else {
                        cell.classList.add('cached-value');
                    }
                } else if (containerId === 'vMatrixCache') {
                    // V矩阵最后一行为蓝色，其他行为橘黄色
                    if (i === matrix.length - 1) {
                        cell.classList.add('new-value');
                    } else {
                        cell.classList.add('cached-value');
                    }
                } else {
                    // 最新添加的行标记为"新值"（蓝色）
                    if (i === matrix.length - 1) {
                        cell.classList.add('new-value');
                    } 
                    // 之前的缓存行标记为"缓存值"（橘黄色）
                    else if (i < matrix.length - 1) {
                        cell.classList.add('cached-value');
                    }
                }
            }
            
            row.appendChild(cell);
        }
        
        table.appendChild(row);
    }
    
    container.appendChild(table);
}

// 时间步控制函数
function previousStep() {
    if (isAnimating || currentTimeStep <= 0) return;
    
    console.log('上一步被点击，当前步骤:', currentTimeStep);
    isAnimating = true;
    
    // 先减少时间步
    currentTimeStep--;
    
    // 更新全局时间步变量
    updateTimeStep(currentTimeStep);
    
    // 在修改缓存前保存当前序列
    const newSequence = getCurrentSequence();
    
    // 重新构建完整缓存，确保与当前序列完全匹配
    rebuildCache(newSequence);
    
    updateVisualization();
    
    // 等待动画完成
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// 完全重建缓存数据，确保与指定序列匹配
function rebuildCache(sequence) {
    // 如果未提供序列，使用当前序列
    const seq = sequence || getCurrentSequence();
    
    // 清空缓存
    kCache = [];
    vCache = [];
    
    // 从头开始重建完整缓存
    for (let i = 0; i < seq.length; i++) {
        const embedding = embeddingMatrix[seq[i]];
        const currentK = matrixMultiply([embedding], W_K)[0];
        const currentV = matrixMultiply([embedding], W_V)[0];
        
        kCache.push(currentK);
        vCache.push(currentV);
    }
    
    console.log('缓存已完全重建，当前序列:', seq, '缓存长度:', kCache.length);
}

function nextStep() {
    if (isAnimating || currentTimeStep >= maxTimeSteps - 1) return;
    
    console.log('下一步被点击，当前步骤:', currentTimeStep);
    isAnimating = true;
    currentTimeStep++;
    
    // 更新全局时间步变量
    updateTimeStep(currentTimeStep);
    
    // 获取当前序列
    const currentSeq = getCurrentSequence();
    
    // 如果当前序列长度大于缓存长度，计算并添加新token的K和V
    if (currentSeq.length > kCache.length) {
        const newTokenIndex = currentSeq.length - 1;
        const newToken = currentSeq[newTokenIndex];
        const embedding = embeddingMatrix[newToken];
        
        const newK = matrixMultiply([embedding], W_K)[0];
        const newV = matrixMultiply([embedding], W_V)[0];
        
        kCache.push(newK);
        vCache.push(newV);
        
        console.log('添加新token到缓存:', newToken, '当前缓存长度:', kCache.length);
    }
    
    updateVisualization();
    
    // 等待动画完成
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// 添加注意力分数计算对比函数
function updateAttentionScoreComparison(standard, cache, sequence) {
    const seqLength = sequence.length;
    
    // 检查必要的元素是否存在
    const requiredElements = [
        'standardQ',
        'standardKT',
        'standardAttentionQK',
        'standardSoftmaxQK',
        'cacheQ',
        'cacheKT',
        'cacheAttentionQK',
        'cacheSoftmaxQK',
        'attentionStandardComputations',
        'attentionCacheComputations',
        'attentionComputationSaved'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.warn('缺少注意力分数对比所需的DOM元素:', missingElements);
        return;
    }
    
    // 1. 标准模式 - 显示Q矩阵和K^T矩阵
    updateAttentionMatrix(standard.Q, 'standardQ');
    updateAttentionMatrix(transposeMatrix(standard.K), 'standardKT');
    
    // 显示Q×K^T矩阵乘积
    updateAttentionMatrix(standard.QK, 'standardAttentionQK');
    
    // 显示最终注意力权重（缩放+掩码+Softmax的结果）
    updateAttentionMatrix(standard.attentionWeights, 'standardSoftmaxQK');
    
    // 2. KV缓存模式 - 显示Q矩阵和K^T矩阵
    updateAttentionMatrix(cache.Q, 'cacheQ'); 
    
    // 转置K缓存矩阵
    const kCacheTransposed = transposeMatrix(cache.K);
    // 在此处标记最后一列为新值（蓝色），其他列为缓存值（橘黄色）
    updateAttentionMatrix(kCacheTransposed, 'cacheKT', true);
    
    // 显示Q×K^T矩阵乘积
    updateAttentionMatrix(cache.QK, 'cacheAttentionQK', true);
    
    // 显示最终注意力权重
    updateAttentionMatrix(cache.attentionWeights, 'cacheSoftmaxQK', true);
    
    // 3. 计算量对比
    const standardOps = seqLength * seqLength; // t x t 操作
    const cacheOps = seqLength; // t 操作
    const savedPercent = Math.round((standardOps - cacheOps) / standardOps * 100);
    
    document.getElementById('attentionStandardComputations').textContent = `${standardOps} 操作 (t×t)`;
    document.getElementById('attentionCacheComputations').textContent = `${cacheOps} 操作 (t)`;
    document.getElementById('attentionComputationSaved').textContent = `${savedPercent}% 节省`;
}

// 更新注意力矩阵显示
function updateAttentionMatrix(matrix, containerId, isCache = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 获取当前序列
    const currentSeq = getCurrentSequence();
    
    // 查找最大值和最小值用于颜色归一化
    let maxValue = Number.NEGATIVE_INFINITY;
    let minValue = Number.POSITIVE_INFINITY;
    
    matrix.forEach(row => {
        row.forEach(val => {
            if (val !== -Infinity && !isNaN(val)) {
                maxValue = Math.max(maxValue, val);
                minValue = Math.min(minValue, val);
            }
        });
    });
    
    // 生成矩阵行和单元格
    matrix.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        
        // 为缓存模式下的注意力权重矩阵添加特殊类
        if (isCache) {
            if (containerId === 'cacheSoftmaxQK') {
                if (i === matrix.length - 1) {
                    rowDiv.classList.add('current-row');
                } else {
                    rowDiv.classList.add('cached-row');
                }
            }
        }
        
        row.forEach((value, j) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            
            // 处理掩码值
            if (value === -Infinity || value <= -1e9) {
                cell.classList.add('masked');
                cell.textContent = '×';
                cell.title = '已掩码';
            } else {
                // 根据值设置背景色深度
                const normalized = maxValue === minValue ? 0.5 : (value - minValue) / (maxValue - minValue);
                
                // 对于softmax结果使用不同的颜色方案
                if (containerId.includes('Softmax')) {
                    cell.style.backgroundColor = `rgba(0, 122, 255, ${value})`;
                } else {
                    // 使用归一化的值
                    const intensity = normalized;
                    const hue = value >= 0 ? 200 : 0; // 正值蓝色，负值红色
                    cell.style.backgroundColor = `hsla(${hue}, 80%, 50%, ${intensity * 0.5})`;
                }
                
                cell.textContent = value.toFixed(2);
                
                // 添加tooltip和样式
                if (isCache) {
                    cell.title = `当前token → ${currentSeq[j]}: ${value.toFixed(2)}`;
                    
                    // 为KT矩阵的样式设置
                    if (containerId === 'cacheKT') {
                        if (j === matrix[i].length - 1) {
                            cell.classList.add('new-value');
                        } else {
                            cell.classList.add('cached-value');
                        }
                    }
                    // 为QKT和Softmax矩阵的样式设置
                    else if (containerId === 'cacheAttentionQK' || containerId === 'cacheSoftmaxQK') {
                        if (i === matrix.length - 1) {
                            cell.classList.add('new-value');
                            cell.classList.add('current-cell');
                        } else {
                            cell.classList.add('cached-value');
                            cell.classList.add('cached-cell');
                        }
                    }
                    // 其他默认样式
                    else {
                        cell.classList.add('new-value');
                    }
                } else {
                    cell.title = `${currentSeq[i]} → ${currentSeq[j]}: ${value.toFixed(2)}`;
                }
            }
            
            rowDiv.appendChild(cell);
        });
        
        container.appendChild(rowDiv);
    });
    
    // 对于缓存模式，添加一个指示器
    if (isCache && container.querySelector('.cached-indicator') === null) {
        const indicator = document.createElement('div');
        indicator.className = 'cached-indicator';
        indicator.textContent = '仅计算最后一行';
        container.appendChild(indicator);
    }
}

// 导出初始化函数，供组件加载器使用
export { initializeApp }; 