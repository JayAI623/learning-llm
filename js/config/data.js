// 示例数据
const inputSequence = ['我', '爱', '编', '程'];
const embeddingDim = 4;
let timeStep = 0;  // 当前时间步（初始值为0，对应UI显示的时间步1）
const maxTimeSteps = inputSequence.length;

// 模拟词嵌入矩阵（为了演示保持固定值）
const embeddingMatrix = {
    '我': [0.5, 0.2, 0.8, 0.1],
    '爱': [0.3, 0.9, 0.4, 0.6],
    '编': [0.7, 0.5, 0.2, 0.8],
    '程': [0.4, 0.6, 0.7, 0.3]
};

// 模拟线性变换权重矩阵（为了演示保持固定值）
// 生成固定的0-1之间的权重矩阵
const W_Q = [
    [0.2, 0.5, 0.3, 0.8],
    [0.7, 0.1, 0.6, 0.4],
    [0.3, 0.9, 0.2, 0.5],
    [0.6, 0.4, 0.7, 0.2]
];
const W_K = [
    [0.5, 0.3, 0.7, 0.2],
    [0.1, 0.8, 0.4, 0.6],
    [0.9, 0.2, 0.5, 0.3],
    [0.4, 0.7, 0.1, 0.8]
];
const W_V = [
    [0.8, 0.2, 0.6, 0.3],
    [0.4, 0.9, 0.1, 0.5],
    [0.2, 0.6, 0.8, 0.4],
    [0.7, 0.3, 0.5, 0.1]
];

// 获取当前时间步的序列
function getCurrentSequence() {
    // 截取从0到timeStep的序列（包含timeStep位置的元素）
    const result = inputSequence.slice(0, timeStep + 1);
    console.log('getCurrentSequence: timeStep =', timeStep, '返回序列 =', result);
    return result;
}

// 添加更新timeStep的函数
function updateTimeStep(newTimeStep) {
    console.log('updateTimeStep: 从', timeStep, '更新为', newTimeStep);
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
    getCurrentSequence,
    updateTimeStep
}; 