import { getCurrentSequence } from '../config/data.js';
import { animateValue } from '../utils/animation.js';

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
        
        // 如果是embedding矩阵，添加token标签
        if (matrixType === 'Embedding') {
            const tokenLabel = document.createElement('div');
            tokenLabel.className = 'token-label';
            tokenLabel.style.width = '30px';
            tokenLabel.style.marginRight = '10px';
            tokenLabel.textContent = getCurrentSequence()[i];
            rowDiv.appendChild(tokenLabel);
        }
        
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

// 更新序列显示
function updateSequenceDisplay(inputSequence, timeStep, maxTimeSteps) {
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

export {
    updateMatrixDisplay,
    updateSequenceDisplay
}; 