import { getCurrentSequence } from '../config/data.js';

// 更新注意力热力图（添加动画）
function updateAttentionHeatmap(weights, qk, scaledQK, maskedQK) {
    const container = document.getElementById('attentionScores');
    const currentSeq = getCurrentSequence();
    
    // 清空容器
    container.innerHTML = '';
    
    // 归一化函数：将值映射到0-1范围
    const normalize = (value, min, max) => {
        if (min === max) return 0.5; // 避免除以零
        return (value - min) / (max - min);
    };
    
    // 查找矩阵中的最大值和最小值
    let maxValue = Number.NEGATIVE_INFINITY;
    let minValue = Number.POSITIVE_INFINITY;
    
    weights.forEach((row, i) => {
        row.forEach((value, j) => {
            if (j <= i) {
                maxValue = Math.max(maxValue, value);
                minValue = Math.min(minValue, value);
            }
        });
    });
    
    // 创建热力图容器 - 直接使用table
    const table = document.createElement('table');
    table.className = 'attention-table';
    
    // 创建表头（列标签）
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // 添加左上角空单元格
    const cornerCell = document.createElement('th');
    headerRow.appendChild(cornerCell);
    
    // 添加列标签
    currentSeq.forEach(token => {
        const th = document.createElement('th');
        th.className = 'heatmap-col-label';
        th.textContent = token;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 创建表格主体
    const tbody = document.createElement('tbody');
    
    // 添加行和单元格
    weights.forEach((row, i) => {
        const tr = document.createElement('tr');
        
        // 添加行标签
        const rowLabel = document.createElement('td');
        rowLabel.className = 'heatmap-row-label';
        rowLabel.textContent = currentSeq[i];
        tr.appendChild(rowLabel);
        
        // 添加数据单元格
        row.forEach((weight, j) => {
            const td = document.createElement('td');
            td.className = 'heatmap-cell';
            
            if (j > i) {
                // 掩码单元格
                td.classList.add('masked-cell');
                td.textContent = '×';
                td.title = `${currentSeq[i]} → ${currentSeq[j]}: 已掩码`;
            } else {
                // 使用归一化的值设置背景色深度
                td.style.backgroundColor = `rgba(0, 122, 255, ${weight})`;
                td.textContent = weight.toFixed(2);
                
                // 添加tooltip
                td.title = `${currentSeq[i]} → ${currentSeq[j]}: ${weight.toFixed(2)}`;
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
    
    // 查找非掩码值的最大和最小值，用于归一化颜色
    let maxValue = Number.NEGATIVE_INFINITY;
    let minValue = Number.POSITIVE_INFINITY;
    
    matrix.forEach((row, i) => {
        row.forEach((value, j) => {
            // 只考虑非掩码位置的值
            if (!(isMasked && j > i)) {
                maxValue = Math.max(maxValue, value);
                minValue = Math.min(minValue, value);
            }
        });
    });
    
    // 归一化函数：将值映射到0-1范围
    const normalize = (value, min, max) => {
        if (min === max) return 0.5; // 避免除以零
        return (value - min) / (max - min);
    };
    
    // 创建表格结构
    const currentSeq = getCurrentSequence();
    matrix.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        
        row.forEach((value, j) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            
            if (isMasked && j > i) {
                cell.classList.add('masked'); // 使用新的masked类
                cell.textContent = '-∞';
                // 添加token标签作为tooltip
                cell.title = `${currentSeq[i]} → ${currentSeq[j]}: 已掩码 (Masked)`;
            } else {
                // 计算归一化的值
                const normalizedValue = normalize(value, minValue, maxValue);
                
                // 添加渐变背景色
                const intensity = normalizedValue; // 使用归一化的值作为强度
                
                // 对于softmax结果使用不同的颜色方案
                if (elementId === 'softmaxMatrix') {
                    // 对于softmax结果，直接使用值作为强度（因为已经是0-1之间）
                    cell.style.backgroundColor = `rgba(0, 122, 255, ${value})`;
                } else {
                    // 对于其他矩阵，使用归一化的值
                    const hue = value >= 0 ? 200 : 0; // 正值蓝色，负值红色
                    cell.style.backgroundColor = `hsla(${hue}, 80%, 50%, ${intensity * 0.5})`;
                }
                cell.textContent = value.toFixed(2);
                
                // 添加token标签作为tooltip
                if (elementId === 'softmaxMatrix') {
                    cell.title = `${currentSeq[i]} → ${currentSeq[j]}: 注意力分数 = ${value.toFixed(4)}`;
                } else {
                    cell.title = `${currentSeq[i]} → ${currentSeq[j]}: ${value.toFixed(2)} (相对值: ${normalizedValue.toFixed(2)})`;
                }
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