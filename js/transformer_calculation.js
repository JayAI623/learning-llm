// 示例数据
const inputSequence = ['我', '爱', '编', '程'];
const embeddingDim = 4;
let currentStep = 0;
const totalSteps = 4;

// 生成随机矩阵数据（保持固定值以便演示）
function generateMatrix(rows, cols, seed = 1) {
    return Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) =>
            ((Math.sin(i + j + seed) * 0.5) + 0.5).toFixed(2)
        )
    );
}

// 矩阵乘法
function matrixMultiply(a, b) {
    const result = Array(a.length).fill().map(() => Array(b[0].length).fill(0));
    return result.map((row, i) => {
        return row.map((_, j) => {
            return a[i].reduce((sum, elm, k) => {
                return sum + (elm * b[k][j]);
            }, 0).toFixed(2);
        });
    });
}

// 矩阵转置
function transposeMatrix(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

// Softmax 函数
function softmax(arr) {
    const expValues = arr.map(x => Math.exp(parseFloat(x)));
    const sumExp = expValues.reduce((a, b) => a + b, 0);
    return expValues.map(x => (x / sumExp).toFixed(2));
}

// 创建矩阵显示
function createMatrixDisplay(matrix, label) {
    const container = document.createElement('div');
    container.className = 'matrix-group';
    
    const labelDiv = document.createElement('div');
    labelDiv.className = 'matrix-label';
    labelDiv.innerHTML = `${label} <span class="matrix-dimensions">(${matrix.length}×${matrix[0].length})</span>`;
    container.appendChild(labelDiv);

    const matrixDiv = document.createElement('div');
    matrixDiv.className = 'matrix';
    
    matrix.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        row.forEach((value, j) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.textContent = value;
            cell.title = `[${i},${j}]: ${value}`;
            rowDiv.appendChild(cell);
        });
        matrixDiv.appendChild(rowDiv);
    });

    container.appendChild(matrixDiv);
    return container;
}

// 更新步骤显示
function updateStep() {
    const content = document.getElementById('calculationContent');
    const stepTitle = document.getElementById('stepTitle');
    const stepExplanation = document.getElementById('stepExplanation');
    const formula = document.getElementById('currentFormula');
    content.innerHTML = '';

    const seqLength = inputSequence.length;
    
    switch(currentStep) {
        case 0: // 生成QKV矩阵
            stepTitle.textContent = '步骤1：生成QKV矩阵';
            stepExplanation.textContent = '通过线性变换将输入向量转换为查询(Q)、键(K)和值(V)矩阵';
            formula.textContent = 'Q = X × W_Q, K = X × W_K, V = X × W_V';

            const X = generateMatrix(seqLength, embeddingDim, 1);
            const WQ = generateMatrix(embeddingDim, embeddingDim, 2);
            const WK = generateMatrix(embeddingDim, embeddingDim, 3);
            const WV = generateMatrix(embeddingDim, embeddingDim, 4);

            content.appendChild(createMatrixDisplay(X, '输入矩阵 (X)'));
            content.appendChild(createMatrixDisplay(WQ, '查询权重 (W_Q)'));
            content.appendChild(createMatrixDisplay(WK, '键权重 (W_K)'));
            content.appendChild(createMatrixDisplay(WV, '值权重 (W_V)'));
            break;

        case 1: // 计算注意力分数
            stepTitle.textContent = '步骤2：计算注意力分数';
            stepExplanation.textContent = '计算查询矩阵(Q)和键矩阵(K)的转置的乘积，并进行缩放';
            formula.textContent = 'Attention Score = (Q × K^T) / √d_k';

            const Q = generateMatrix(seqLength, embeddingDim, 5);
            const K = generateMatrix(seqLength, embeddingDim, 6);
            const KT = transposeMatrix(K);
            const QK = matrixMultiply(Q, KT);
            const scaledQK = QK.map(row => 
                row.map(x => (parseFloat(x) / Math.sqrt(embeddingDim)).toFixed(2))
            );

            content.appendChild(createMatrixDisplay(Q, '查询矩阵 (Q)'));
            content.appendChild(createMatrixDisplay(K, '键矩阵 (K)'));
            content.appendChild(createMatrixDisplay(scaledQK, '缩放后的注意力分数'));
            break;

        case 2: // Softmax
            stepTitle.textContent = '步骤3：应用Softmax';
            stepExplanation.textContent = '对注意力分数应用Softmax函数，获得注意力权重';
            formula.textContent = 'Attention Weights = Softmax(QK^T / √d_k)';

            const scores = generateMatrix(seqLength, seqLength, 7);
            const weights = scores.map(row => softmax(row));

            content.appendChild(createMatrixDisplay(scores, '注意力分数'));
            content.appendChild(createMatrixDisplay(weights, 'Softmax后的权重'));
            break;

        case 3: // 最终输出
            stepTitle.textContent = '步骤4：计算最终输出';
            stepExplanation.textContent = '将注意力权重与值矩阵(V)相乘得到最终输出';
            formula.textContent = 'Output = Attention(Q, K, V) = Softmax(QK^T / √d_k) × V';

            const attentionWeights = generateMatrix(seqLength, seqLength, 8);
            const V = generateMatrix(seqLength, embeddingDim, 9);
            const output = matrixMultiply(attentionWeights, V);

            content.appendChild(createMatrixDisplay(attentionWeights, '注意力权重'));
            content.appendChild(createMatrixDisplay(V, '值矩阵 (V)'));
            content.appendChild(createMatrixDisplay(output, '最终输出'));
            break;
    }

    // 更新步骤计数器
    document.getElementById('currentStep').textContent = currentStep + 1;
    document.getElementById('totalSteps').textContent = totalSteps;

    // 更新按钮状态
    document.getElementById('prevStep').disabled = currentStep === 0;
    document.getElementById('nextStep').disabled = currentStep === totalSteps - 1;
}

// 步骤控制函数
function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        updateStep();
    }
}

function nextStep() {
    if (currentStep < totalSteps - 1) {
        currentStep++;
        updateStep();
    }
}

// 页面加载完成后初始化
window.onload = () => {
    updateStep();
};