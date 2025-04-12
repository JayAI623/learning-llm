// 示例数据
const inputSequence = ['我', '爱', '编', '程'];
const embeddingDim = 4;
let timeStep = 0;  // 当前时间步
const maxTimeSteps = inputSequence.length;

// 模拟词嵌入矩阵（为了演示保持固定值）
const embeddingMatrix = {
    '我': [0.5, 0.2, 0.8, 0.1],
    '爱': [0.3, 0.9, 0.4, 0.6],
    '编': [0.7, 0.5, 0.2, 0.8],
    '程': [0.4, 0.6, 0.7, 0.3]
};

// 模拟线性变换权重矩阵（为了演示保持固定值）
const W_Q = generateMatrix(embeddingDim, embeddingDim, 1);
const W_K = generateMatrix(embeddingDim, embeddingDim, 2);
const W_V = generateMatrix(embeddingDim, embeddingDim, 3);

// 获取词嵌入向量
function getEmbeddings(sequence) {
    return sequence.map(token => embeddingMatrix[token]);
}

// 生成QKV矩阵
function generateQKVMatrices(embeddings) {
    // 计算Q、K、V矩阵
    const Q = matrixMultiply(embeddings, W_Q);
    const K = matrixMultiply(embeddings, W_K);
    const V = matrixMultiply(embeddings, W_V);
    
    return { Q, K, V };
}

// 生成固定的随机矩阵（用于演示）
function generateMatrix(rows, cols, seed) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            // 使用固定的seed生成伪随机数
            matrix[i][j] = parseFloat(((Math.sin(i * j + seed) + 1) / 2).toFixed(2));
        }
    }
    return matrix;
}

// 获取当前时间步的序列
function getCurrentSequence() {
    return inputSequence.slice(0, timeStep + 1);
}

// 生成 attention mask（用于演示目的，这里生成一个上三角mask）
function generateAttentionMask(length) {
    return Array.from({ length }, (_, i) =>
        Array.from({ length }, (_, j) => j <= i ? 1 : 0)
    );
}

// 矩阵乘法
function matrixMultiply(A, B) {
    const result = [];
    for (let i = 0; i < A.length; i++) {
        result[i] = [];
        for (let j = 0; j < B[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < A[0].length; k++) {
                sum += A[i][k] * B[k][j];
            }
            result[i][j] = parseFloat(sum.toFixed(2));
        }
    }
    return result;
}

// 矩阵转置
function transposeMatrix(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

// Softmax 函数
function softmax(arr) {
    const maxVal = Math.max(...arr);
    const expArr = arr.map(x => Math.exp(x - maxVal));
    const sum = expArr.reduce((a, b) => a + b, 0);
    return expArr.map(x => parseFloat((x / sum).toFixed(2)));
}

// 添加动画效果的辅助函数（优化版本）
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用更平滑的缓动函数
        const easeProgress = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
        const current = start + (end - start) * easeProgress;
        element.textContent = current.toFixed(2);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 更新矩阵显示（添加动画）
function updateMatrixDisplay(matrix, elementId, matrixType) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    const dimensionSpan = document.getElementById(`${matrixType}MatrixSize`);
    if (dimensionSpan) {
        dimensionSpan.textContent = `(${matrix.length} × ${matrix[0].length})`;
    }
    
    // 保存当前值用于动画
    const oldValues = [];
    container.querySelectorAll('.matrix-cell').forEach(cell => {
        oldValues.push(parseFloat(cell.textContent || '0'));
    });
    
    // 清空并重建矩阵显示
    container.innerHTML = '';
    
    matrix.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        
        row.forEach((value, j) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            
            // 获取旧值（如果存在）
            const oldValue = oldValues[i * row.length + j] || 0;
            cell.textContent = oldValue.toFixed(2);
            
            // 添加渐变背景色
            const intensity = Math.abs(value);
            const hue = value >= 0 ? 200 : 0;
            cell.style.backgroundColor = `hsla(${hue}, 80%, 50%, 0)`;
            
            // 使用 requestAnimationFrame 进行动画
            requestAnimationFrame(() => {
                cell.style.transition = 'all 0.5s ease';
                cell.style.backgroundColor = `hsla(${hue}, 80%, 50%, ${intensity * 0.5})`;
                animateValue(cell, oldValue, value, 500);
            });
            
            rowDiv.appendChild(cell);
        });
        
        container.appendChild(rowDiv);
    });
}

// 更新注意力热力图（添加动画）
function updateAttentionHeatmap(weights) {
    const container = document.getElementById('attentionScores');
    const currentSeq = getCurrentSequence();
    
    // 清空容器
    container.innerHTML = '';
    
    // 根据序列长度动态调整单元格大小
    const baseSize = Math.max(30, Math.min(50, 160 / weights.length));
    
    // 创建表格结构
    const table = document.createElement('table');
    table.className = 'attention-table';
    
    // 添加表头（目标tokens）
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // 空单元格用于对齐
    
    currentSeq.forEach(token => {
        const th = document.createElement('th');
        th.className = 'token-label';
        th.style.width = `${baseSize}px`;
        th.style.height = `${baseSize}px`;
        th.textContent = token;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 添加表体（源tokens和注意力权重）
    const tbody = document.createElement('tbody');
    weights.forEach((row, i) => {
        const tr = document.createElement('tr');
        
        // 添加行标签（源token）
        const labelCell = document.createElement('td');
        labelCell.className = 'token-label';
        labelCell.style.width = `${baseSize}px`;
        labelCell.style.height = `${baseSize}px`;
        labelCell.textContent = currentSeq[i];
        tr.appendChild(labelCell);
        
        // 添加注意力权重单元格
        row.forEach((weight, j) => {
            const td = document.createElement('td');
            td.className = 'heatmap-cell';
            td.style.width = `${baseSize}px`;
            td.style.height = `${baseSize}px`;
            
            if (j > i) {
                td.classList.add('masked-cell');
            } else {
                td.style.backgroundColor = `rgba(0, 122, 255, ${weight})`;
                td.setAttribute('data-value', weight.toFixed(2));
                td.title = `从 ${currentSeq[i]} 到 ${currentSeq[j]}: ${weight.toFixed(2)}`;
            }
            
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}

// 更新序列显示
function updateSequenceDisplay() {
    const container = document.getElementById('inputSequence');
    const currentSeq = getCurrentSequence();
    const seqLength = document.getElementById('sequenceLength');
    const currentStepSpan = document.getElementById('currentStep');
    
    // 更新序列长度和当前步骤
    seqLength.textContent = currentSeq.length;
    currentStepSpan.textContent = timeStep + 1;
    
    // 清空并重建序列显示
    container.innerHTML = '';
    
    inputSequence.forEach((token, index) => {
        const tokenDiv = document.createElement('div');
        tokenDiv.className = 'token';
        
        if (index <= timeStep) {
            // 已生成的token
            tokenDiv.textContent = token;
            tokenDiv.style.backgroundColor = 'var(--matrix-bg)';
        } else {
            // 未生成的token
            tokenDiv.textContent = '?';
            tokenDiv.style.backgroundColor = '#E0E0E0';
            tokenDiv.style.color = '#999';
        }
        
        container.appendChild(tokenDiv);
    });
}

// 更新可视化
function updateVisualization() {
    const currentSeq = getCurrentSequence();
    const currentLength = currentSeq.length;

    // 获取当前序列的词嵌入
    const embeddings = getEmbeddings(currentSeq);
    
    // 生成QKV矩阵
    const { Q, K, V } = generateQKVMatrices(embeddings);

    // 更新参数矩阵显示
    updateMatrixDisplay(W_Q, 'wqMatrix', 'W_Q');
    updateMatrixDisplay(W_K, 'wkMatrix', 'W_K');
    updateMatrixDisplay(W_V, 'wvMatrix', 'W_V');

    // 更新QKV矩阵显示
    updateMatrixDisplay(Q, 'qMatrix', 'Q');
    updateMatrixDisplay(K, 'kMatrix', 'K');
    updateMatrixDisplay(V, 'vMatrix', 'V');

    // 计算注意力分数
    const QK = matrixMultiply(Q, transposeMatrix(K));
    const scaledQK = QK.map(row => 
        row.map(x => parseFloat((x / Math.sqrt(embeddingDim)).toFixed(2)))
    );

    // 应用 mask 并计算 softmax
    const attentionWeights = scaledQK.map((row, i) => {
        const maskedRow = row.map((x, j) => j > i ? -1e9 : x);
        return softmax(maskedRow);
    });

    // 更新注意力热力图
    updateAttentionHeatmap(attentionWeights);

    // 更新序列显示
    updateSequenceDisplay();

    // 更新按钮状态
    document.getElementById('prevStep').disabled = timeStep === 0;
    document.getElementById('nextStep').disabled = timeStep === maxTimeSteps - 1;
}

// 时间步控制函数
let isAnimating = false;

function previousStep() {
    if (isAnimating || timeStep <= 0) return;
    
    console.log('Previous step clicked, current step:', timeStep);
    isAnimating = true;
    timeStep--;
    
    updateVisualization();
    
    // 等待动画完成
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

function nextStep() {
    if (isAnimating || timeStep >= maxTimeSteps - 1) return;
    
    console.log('Next step clicked, current step:', timeStep);
    isAnimating = true;
    timeStep++;
    
    updateVisualization();
    
    // 等待动画完成
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing...');
    
    // 确保所有需要的DOM元素都存在
    const requiredElements = [
        'prevStep',
        'nextStep',
        'currentStep',
        'sequenceLength',
        'inputSequence',
        'qMatrix',
        'kMatrix',
        'vMatrix',
        'attentionScores'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.error('Missing required elements:', missingElements);
        return;
    }
    
    // 初始化显示
    updateVisualization();
    
    // 添加按钮事件监听器
    document.getElementById('prevStep').addEventListener('click', previousStep);
    document.getElementById('nextStep').addEventListener('click', nextStep);
    
    console.log('Initialization complete');
}); 