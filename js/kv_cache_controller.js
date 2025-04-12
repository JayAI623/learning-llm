/**
 * KV缓存演示控制器 - 用于处理KV缓存页面的交互逻辑
 */

export function initializeKVCacheDemo() {
    const prevButton = document.getElementById('prevStep');
    const nextButton = document.getElementById('nextStep');
    const currentTokenEl = document.getElementById('currentToken');
    const stepInfoEl = document.getElementById('stepInfo');
    
    let currentStep = 1;
    const totalSteps = 5;
    
    // 矩阵数据初始化
    initializeMatrices();
    
    // 更新展示
    function updateDisplay() {
        currentTokenEl.textContent = currentStep;
        stepInfoEl.textContent = `步骤 ${currentStep}/${totalSteps}`;
        
        // 高亮当前token
        document.querySelectorAll('.token').forEach(token => {
            token.classList.remove('active');
        });
        const currentToken = document.querySelector(`.token[data-token-id="${currentStep-1}"]`);
        if (currentToken) currentToken.classList.add('active');
        
        // 更新矩阵显示
        updateMatrices(currentStep);
        
        // 根据步骤更新说明文本
        const explanationEl = document.querySelector('.step-explanation p');
        switch(currentStep) {
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
        
        // 更新计算量显示
        document.getElementById('computationCount').textContent = `计算量: O(${currentStep}²) = O(${currentStep*currentStep})`;
        document.getElementById('computationCountCache').textContent = `计算量: O(${currentStep}) = O(${currentStep})`;
        
        // 更新矩阵乘法组件
        updateMultiplicationComponent();
        
        // 更新注意力矩阵组件
        updateAttentionMatrices();
        
        // 禁用/启用按钮
        prevButton.disabled = currentStep <= 1;
        nextButton.disabled = currentStep >= totalSteps;
    }
    
    // 绑定按钮事件
    prevButton.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateDisplay();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateDisplay();
        }
    });
    
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
    
    // 生成随机值
    function getRandomValue() {
        return (Math.random() - 0.5).toFixed(2);
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
    
    // 添加CSS样式
    function addStyles() {
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
    
    // 添加样式并初始化显示
    addStyles();
    updateDisplay();
} 