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

import { getEmbeddings, generateQKVMatrices, calculateAttention } from './components/attention.js';
import { updateMatrixDisplay, updateSequenceDisplay } from './components/ui.js';
import { updateAttentionHeatmap, updateIntermediateMatrix } from './components/heatmap.js';
import { updateWeightedValues } from './components/weighted.js';

// 使时间步和动画状态可修改
let currentTimeStep = timeStep;
let isAnimating = false;

// 更新可视化
function updateVisualization() {
    const currentSeq = getCurrentSequence();
    const currentLength = currentSeq.length;

    // 获取当前序列的词嵌入
    const embeddings = getEmbeddings(currentSeq);
    
    // 更新词嵌入矩阵显示
    updateMatrixDisplay(embeddings, 'embeddingMatrix', 'Embedding');
    
    // 生成QKV矩阵
    const { Q, K, V } = generateQKVMatrices(embeddings, W_Q, W_K, W_V);

    // 更新参数矩阵显示
    updateMatrixDisplay(W_Q, 'wqMatrix', 'W_Q');
    updateMatrixDisplay(W_K, 'wkMatrix', 'W_K');
    updateMatrixDisplay(W_V, 'wvMatrix', 'W_V');

    // 更新QKV矩阵显示
    updateMatrixDisplay(Q, 'qMatrix', 'Q');
    updateMatrixDisplay(K, 'kMatrix', 'K');
    updateMatrixDisplay(V, 'vMatrix', 'V');

    // 计算注意力分数
    const { QK, scaledQK, maskedQK, attentionWeights } = calculateAttention(Q, K, V, embeddingDim);

    // 更新中间计算矩阵
    updateIntermediateMatrix(QK, 'qkMatrix');
    updateIntermediateMatrix(scaledQK, 'scaledQKMatrix');
    updateIntermediateMatrix(maskedQK, 'maskedQKMatrix', true);
    updateIntermediateMatrix(attentionWeights, 'softmaxMatrix');

    // 更新注意力热力图，传入所有中间计算结果
    updateAttentionHeatmap(attentionWeights, QK, scaledQK, maskedQK);
    
    // 更新注意力加权值
    updateWeightedValues(attentionWeights, V);

    // 更新序列显示
    updateSequenceDisplay(inputSequence, currentTimeStep, maxTimeSteps);

    // 更新按钮状态
    document.getElementById('prevStep').disabled = currentTimeStep === 0;
    document.getElementById('nextStep').disabled = currentTimeStep === maxTimeSteps - 1;
}

// 时间步控制函数
function previousStep() {
    if (isAnimating || currentTimeStep <= 0) return;
    
    console.log('Previous step clicked, current step:', currentTimeStep);
    isAnimating = true;
    currentTimeStep--;
    
    // 更新全局时间步变量
    updateTimeStep(currentTimeStep);
    
    updateVisualization();
    
    // 等待动画完成
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

function nextStep() {
    if (isAnimating || currentTimeStep >= maxTimeSteps - 1) return;
    
    console.log('Next step clicked, current step:', currentTimeStep);
    isAnimating = true;
    currentTimeStep++;
    
    // 更新全局时间步变量
    updateTimeStep(currentTimeStep);
    
    updateVisualization();
    
    // 等待动画完成
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// 页面加载完成后初始化
function initializeApp() {
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
        'attentionScores',
        'qkMatrix',
        'scaledQKMatrix',
        'maskedQKMatrix',
        'softmaxMatrix',
        'weightedValues',
        'attentionMatrixForMultiply',
        'vMatrixForMultiply'
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
    
    // 添加页面滚动检测功能
    const stepControls = document.querySelector('.step-controls');
    const header = document.querySelector('.header');
    
    if (stepControls && header) {
        const headerBottom = header.offsetTop + header.offsetHeight;
        
        // 滚动时检测位置，添加或移除scrolled类
        window.addEventListener('scroll', function() {
            if (window.scrollY > headerBottom) {
                stepControls.classList.add('scrolled');
            } else {
                stepControls.classList.remove('scrolled');
            }
        });
    }
    
    // 初始检查
    window.dispatchEvent(new Event('scroll'));
    
    console.log('Initialization complete');
}

// 导出公共函数
export {
    initializeApp,
    previousStep,
    nextStep,
    updateVisualization
};

// 初始化应用程序
document.addEventListener('DOMContentLoaded', initializeApp); 