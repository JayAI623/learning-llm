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

// 添加更新timeStep的函数
function updateTimeStep(newTimeStep) {
    timeStep = newTimeStep;
}

// 导出
export {
    inputSequence,
    embeddingDim,
    timeStep,
    maxTimeSteps,
    embeddingMatrix,
    W_Q,
    W_K,
    W_V,
    generateMatrix,
    getCurrentSequence,
    updateTimeStep
}; 