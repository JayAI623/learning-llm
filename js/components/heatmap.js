import { getCurrentSequence } from '../config/data.js';

// 更新注意力热力图（添加动画）
function updateAttentionHeatmap(weights, qk, scaledQK, maskedQK) {
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
                // 添加计算过程的tooltip
                td.title = `
QK^T: ${qk[i][j].toFixed(2)}
Scale: ${scaledQK[i][j].toFixed(2)}
Mask: ${maskedQK[i][j].toFixed(2)}
Attention: Masked
                `.trim();
            } else {
                td.style.backgroundColor = `rgba(0, 122, 255, ${weight})`;
                td.setAttribute('data-value', weight.toFixed(2));
                // 添加计算过程的tooltip
                td.title = `
QK^T: ${qk[i][j].toFixed(2)}
Scale: ${scaledQK[i][j].toFixed(2)}
Mask: ${maskedQK[i][j].toFixed(2)}
Attention: ${weight.toFixed(2)}
                `.trim();
            }
            
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}

// 更新中间计算矩阵
function updateIntermediateMatrix(matrix, elementId, isMasked = false) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建表格结构
    const currentSeq = getCurrentSequence();
    matrix.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        
        row.forEach((value, j) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            
            if (isMasked && j > i) {
                cell.classList.add('masked-value');
                cell.textContent = '-∞';
            } else {
                // 添加渐变背景色
                const intensity = Math.abs(value);
                // 对于softmax结果使用不同的颜色方案
                if (elementId === 'softmaxMatrix') {
                    // 蓝色渐变，深度根据值
                    cell.style.backgroundColor = `rgba(0, 122, 255, ${value})`;
                } else {
                    const hue = value >= 0 ? 200 : 0;
                    cell.style.backgroundColor = `hsla(${hue}, 80%, 50%, ${intensity * 0.3})`;
                }
                cell.textContent = value.toFixed(2);
            }
            
            // 添加token标签作为tooltip
            if (elementId === 'softmaxMatrix') {
                cell.title = `${currentSeq[i]} → ${currentSeq[j]}: 注意力分数 = ${value.toFixed(4)}`;
            } else {
                cell.title = `${currentSeq[i]} → ${currentSeq[j]}: ${value.toFixed(2)}`;
            }
            
            rowDiv.appendChild(cell);
        });
        
        container.appendChild(rowDiv);
    });
}

export {
    updateAttentionHeatmap,
    updateIntermediateMatrix
}; 