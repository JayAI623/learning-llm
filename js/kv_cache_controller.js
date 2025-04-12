/**
 * KV缓存演示控制器 - 重用现有控制器结构
 */

// 设置总步骤数和当前步骤
const totalSteps = 5;
let currentStep = 1;
let isAnimating = false;

// 更新可视化
function updateVisualization() {
    // 更新步骤指示器
    document.getElementById('currentToken').textContent = currentStep;
    document.getElementById('stepInfo').textContent = `步骤 ${currentStep}/${totalSteps}`;
    
    // 高亮当前token
    document.querySelectorAll('.token').forEach(token => {
        token.classList.remove('active');
    });
    const currentToken = document.querySelector(`.token[data-token-id="${currentStep-1}"]`);
    if (currentToken) currentToken.classList.add('active');
    
    // 更新矩阵显示
    updateMatrices(currentStep);
    
    // 根据步骤更新说明文本
    updateStepExplanation(currentStep);
    
    // 更新计算量显示
    document.getElementById('computationCount').textContent = `计算量: O(${currentStep}²) = O(${currentStep*currentStep})`;
    document.getElementById('computationCountCache').textContent = `计算量: O(${currentStep}) = O(${currentStep})`;
    
    // 更新矩阵乘法组件
    updateMultiplicationComponent();
    
    // 更新注意力矩阵组件
    updateAttentionMatrices();
    
    // 禁用/启用按钮
    document.getElementById('prevStep').disabled = currentStep <= 1;
    document.getElementById('nextStep').disabled = currentStep >= totalSteps;
}

// 更新步骤说明
function updateStepExplanation(step) {
    const explanationEl = document.querySelector('.step-explanation p');
    switch(step) {
        case 1:
            explanationEl.textContent = '开始生成第一个token。无论是否使用KV缓存，我们都需要计算当前token的Q、K、V向量。';
            break;
        case 2:
            explanationEl.textContent = '生成第二个token。不使用缓存时，需要重新计算所有token的K和V；使用缓存时，只需计算新token的K和V，并将其添加到缓存中。';
            break;
        case 3:
            explanationEl.textContent = '生成第三个token。随着序列长度增加，不使用缓存的计算量呈平方增长，而使用缓存的计算量呈线性增长。';
            break;
        case 4:
            explanationEl.textContent = '生成第四个token。此时缓存的优势更加明显，节省了大量重复计算。';
            break;
        case 5:
            explanationEl.textContent = '生成最后一个token。在长序列生成中，KV缓存可以显著提高推理速度，这是大语言模型推理优化的关键技术之一。';
            break;
    }
}

// 时间步控制函数 - 上一步
function previousStep() {
    if (isAnimating || currentStep <= 1) return;
    
    console.log('Previous step clicked, current step:', currentStep);
    isAnimating = true;
    currentStep--;
    
    updateVisualization();
    
    // 等待动画完成
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// 时间步控制函数 - 下一步
function nextStep() {
    if (isAnimating || currentStep >= totalSteps) return;
    
    console.log('Next step clicked, current step:', currentStep);
    isAnimating = true;
    currentStep++;
    
    updateVisualization();
    
    // 等待动画完成
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// 更新矩阵显示
function updateMatrices(step) {
    // 更新不使用缓存的矩阵
    updateMatrixSize('keyMatrixFull', step, 4);
    updateMatrixSize('valueMatrixFull', step, 4);
    
    // 更新使用缓存的矩阵
    updateMatrixSize('keyCacheMatrix', step - 1, 4);
    updateMatrixSize('valueCacheMatrix', step - 1, 4);
}

// 更新矩阵大小
function updateMatrixSize(matrixId, rows, cols) {
    const matrix = document.getElementById(matrixId);
    if (!matrix) return;
    
    // 清空矩阵
    matrix.innerHTML = '';
    
    // 如果行数为0，创建占位元素
    if (rows <= 0) {
        const placeholder = document.createElement('div');
        placeholder.className = 'matrix-placeholder';
        placeholder.textContent = '空';
        matrix.appendChild(placeholder);
        return;
    }
    
    // 创建行和单元格
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'matrix-row';
        
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.textContent = getRandomValue();
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            // 为新添加的行添加高亮效果
            if (i === rows - 1 && matrixId.includes('Cache')) {
                cell.classList.add('new-added');
            }
            
            row.appendChild(cell);
        }
        
        matrix.appendChild(row);
    }
}

// 更新矩阵乘法组件
function updateMultiplicationComponent() {
    // 获取注意力矩阵乘法组件中的矩阵元素
    const attentionMatrix = document.getElementById('attentionMatrixForMultiply');
    const vMatrix = document.getElementById('vMatrixForMultiply');
    const weightedValues = document.getElementById('weightedValues');
    
    if (!attentionMatrix || !vMatrix || !weightedValues) {
        return;
    }
    
    // 更新大小和值
    updateComponentMatrix(attentionMatrix, 1, currentStep);
    updateComponentMatrix(vMatrix, currentStep, 4);
    updateComponentMatrix(weightedValues, 1, 4);
}

// 更新组件中的矩阵
function updateComponentMatrix(matrixEl, rows, cols) {
    matrixEl.innerHTML = '';
    
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'matrix-row';
        
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.textContent = getRandomValue();
            row.appendChild(cell);
        }
        
        matrixEl.appendChild(row);
    }
}

// 更新注意力矩阵组件
function updateAttentionMatrices() {
    // 获取注意力矩阵组件中的矩阵元素
    const qkMatrix = document.getElementById('qkMatrix');
    const scaledQKMatrix = document.getElementById('scaledQKMatrix');
    const maskedQKMatrix = document.getElementById('maskedQKMatrix');
    const softmaxMatrix = document.getElementById('softmaxMatrix');
    
    if (!qkMatrix || !scaledQKMatrix || !maskedQKMatrix || !softmaxMatrix) {
        return;
    }
    
    // 更新所有矩阵
    updateAttentionMatrix(qkMatrix, currentStep);
    updateAttentionMatrix(scaledQKMatrix, currentStep);
    updateAttentionMatrix(maskedQKMatrix, currentStep);
    updateAttentionMatrix(softmaxMatrix, currentStep);
}

// 更新注意力矩阵
function updateAttentionMatrix(matrixEl, cols) {
    matrixEl.innerHTML = '';
    
    const row = document.createElement('div');
    row.className = 'matrix-row';
    
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement('div');
        cell.className = 'matrix-cell';
        // 为softmax矩阵生成正值，总和接近1
        const value = matrixEl.id === 'softmaxMatrix' ? 
                        (1 / cols + Math.random() * 0.1).toFixed(2) : 
                        getRandomValue();
        cell.textContent = value;
        row.appendChild(cell);
    }
    
    matrixEl.appendChild(row);
}

// 生成随机值
function getRandomValue() {
    return (Math.random() - 0.5).toFixed(2);
}

// 初始化矩阵数据
function initializeMatrices() {
    // 创建矩阵单元格
    createMatrixCells('queryMatrix', 1, 4);
    createMatrixCells('keyMatrixFull', 1, 4);
    createMatrixCells('valueMatrixFull', 1, 4);
    
    createMatrixCells('queryCacheMatrix', 1, 4);
    createMatrixCells('keyCacheMatrix', 0, 4);
    createMatrixCells('keyNewMatrix', 1, 4);
    createMatrixCells('valueCacheMatrix', 0, 4);
    createMatrixCells('valueNewMatrix', 1, 4);
}

// 创建矩阵单元格
function createMatrixCells(matrixId, rows, cols) {
    const matrix = document.getElementById(matrixId);
    if (!matrix) return;
    
    matrix.innerHTML = '';
    
    // 如果行数为0，创建占位元素
    if (rows === 0) {
        const placeholder = document.createElement('div');
        placeholder.className = 'matrix-placeholder';
        placeholder.textContent = '空';
        matrix.appendChild(placeholder);
        return;
    }
    
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'matrix-row';
        
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.textContent = getRandomValue();
            cell.dataset.row = i;
            cell.dataset.col = j;
            row.appendChild(cell);
        }
        
        matrix.appendChild(row);
    }
}

// 添加CSS样式
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .token.active {
            background-color: var(--primary-color);
            color: white;
            transform: scale(1.05);
            transition: all 0.3s ease;
        }
        
        .matrix-placeholder {
            align-items: center;
            background: rgba(230, 230, 230, 0.3);
            border-radius: 4px;
            color: #999;
            display: flex;
            font-style: italic;
            height: 45px;
            justify-content: center;
            width: 100%;
        }
        
        .new-added {
            animation: highlight 1.5s ease;
            background-color: rgba(0, 122, 255, 0.2);
        }
        
        @keyframes highlight {
            0% { background-color: var(--primary-color); color: white; }
            100% { background-color: rgba(0, 122, 255, 0.2); color: inherit; }
        }
    `;
    document.head.appendChild(style);
}

// 页面加载完成后初始化
function initializeKVCacheDemo() {
    console.log('KV Cache Demo: Initializing...');
    
    // 确保所有需要的DOM元素都存在
    const requiredElements = [
        'prevStep',
        'nextStep',
        'currentToken',
        'stepInfo',
        'computationCount',
        'computationCountCache'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.error('Missing required elements:', missingElements);
        return;
    }
    
    // 初始化矩阵
    initializeMatrices();
    
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
    
    // 添加自定义样式
    addCustomStyles();
    
    // 初始化显示
    updateVisualization();
    
    // 初始检查
    window.dispatchEvent(new Event('scroll'));
    
    console.log('KV Cache Demo: Initialization complete');
}

// 导出公共函数
export {
    initializeKVCacheDemo,
    previousStep,
    nextStep,
    updateVisualization
}; 