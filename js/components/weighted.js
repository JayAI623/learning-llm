import { getCurrentSequence } from '../config/data.js';

// 更新注意力加权值显示
function updateWeightedValues(attentionWeights, V) {
    // 获取需要显示的容器
    const attentionContainer = document.getElementById('attentionMatrixForMultiply');
    const vContainer = document.getElementById('vMatrixForMultiply');
    const outputContainer = document.getElementById('weightedValues');
    
    if (!attentionContainer || !vContainer || !outputContainer) return;
    
    // 清空容器
    attentionContainer.innerHTML = '';
    vContainer.innerHTML = '';
    outputContainer.innerHTML = '';
    
    // 计算 Z = Attention × V
    const Z = [];
    for (let i = 0; i < attentionWeights.length; i++) {
        const newRow = [];
        for (let j = 0; j < V[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < V.length; k++) {
                sum += attentionWeights[i][k] * V[k][j];
            }
            newRow.push(parseFloat(sum.toFixed(2)));
        }
        Z.push(newRow);
    }
    
    // 获取当前序列
    const currentSeq = getCurrentSequence();
    
    // 显示注意力矩阵
    attentionWeights.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        
        // 添加行标签（token）
        const tokenLabel = document.createElement('div');
        tokenLabel.className = 'token-label';
        tokenLabel.style.width = '30px';
        tokenLabel.style.marginRight = '10px';
        tokenLabel.textContent = currentSeq[i];
        rowDiv.appendChild(tokenLabel);
        
        row.forEach((value, j) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            
            // 添加蓝色渐变背景
            cell.style.backgroundColor = `rgba(0, 122, 255, ${value})`;
            cell.textContent = value.toFixed(2);
            
            // Tooltip显示注意力关系
            cell.title = `${currentSeq[i]} → ${currentSeq[j]}: ${value.toFixed(2)}`;
            
            rowDiv.appendChild(cell);
        });
        
        attentionContainer.appendChild(rowDiv);
    });
    
    // 显示V矩阵
    V.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        
        // 添加行标签（token）
        const tokenLabel = document.createElement('div');
        tokenLabel.className = 'token-label';
        tokenLabel.style.width = '30px';
        tokenLabel.style.marginRight = '10px';
        tokenLabel.textContent = currentSeq[i];
        rowDiv.appendChild(tokenLabel);
        
        row.forEach((value, j) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            
            // 添加渐变背景色
            const intensity = Math.abs(value);
            const hue = value >= 0 ? 200 : 0;
            cell.style.backgroundColor = `hsla(${hue}, 80%, 50%, ${intensity * 0.5})`;
            cell.textContent = value.toFixed(2);
            
            // Tooltip显示维度信息
            cell.title = `V[${i}][${j}]: ${value.toFixed(2)}`;
            
            rowDiv.appendChild(cell);
        });
        
        vContainer.appendChild(rowDiv);
    });
    
    // 显示输出矩阵Z
    Z.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        
        // 添加行标签（token）
        const tokenLabel = document.createElement('div');
        tokenLabel.className = 'token-label';
        tokenLabel.style.width = '30px';
        tokenLabel.style.marginRight = '10px';
        tokenLabel.textContent = currentSeq[i];
        rowDiv.appendChild(tokenLabel);
        
        row.forEach((value, j) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            
            // 添加渐变背景色
            const intensity = Math.abs(value) / 5; // 归一化
            const hue = value >= 0 ? 200 : 0;
            cell.style.backgroundColor = `hsla(${hue}, 80%, 50%, ${intensity})`;
            cell.textContent = value.toFixed(2);
            
            // Tooltip显示计算过程
            cell.title = `Z[${i}][${j}] = Σ(Attention[${i}][k] * V[k][${j}])`;
            
            rowDiv.appendChild(cell);
        });
        
        outputContainer.appendChild(rowDiv);
    });
}

export {
    updateWeightedValues
}; 