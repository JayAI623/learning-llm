// Transformer 演示相关的常量
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 400;
const TOKEN_RADIUS = 30;
const ANIMATION_DURATION = 1000;

// 初始化 D3 画布
const svg = d3.select('#visualization-container')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);

// 创建箭头标记定义
svg.append('defs')
    .append('marker')
    .attr('id', 'arrowhead')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 8)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#666');

// 主要的可视化函数
function startVisualization() {
    // 清除之前的可视化
    svg.selectAll('*').remove();
    
    // 重新添加箭头定义
    svg.append('defs')
        .append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#666');
    
    const inputText = document.getElementById('input-text').value;
    const tokens = inputText.split('');
    
    // 更新解释文本
    updateExplanation('第1步：输入文本被分词');
    
    // 绘制输入tokens
    const inputTokens = svg.selectAll('.input-token')
        .data(tokens)
        .enter()
        .append('g')
        .attr('class', 'input-token')
        .attr('transform', (d, i) => `translate(${100 + i * 100}, 50)`);
    
    // 添加圆形背景
    inputTokens.append('circle')
        .attr('r', TOKEN_RADIUS)
        .attr('fill', '#E3F2FD')
        .attr('stroke', '#1976D2')
        .attr('stroke-width', 2);
    
    // 添加文本
    inputTokens.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .attr('font-size', '16px')
        .text(d => d);
    
    // 延迟后显示Self-Attention
    setTimeout(() => showSelfAttention(tokens), ANIMATION_DURATION);
}

// 显示Self-Attention连接
function showSelfAttention(tokens) {
    updateExplanation('第2步：Self-Attention 机制计算token之间的关联度');
    
    const tokenCount = tokens.length;
    
    // 为每个token对创建连接线
    for(let i = 0; i < tokenCount; i++) {
        for(let j = 0; j < tokenCount; j++) {
            if (i !== j) {  // 只显示不同token之间的连接
                const opacity = 1 / (1 + Math.abs(i - j));
                
                svg.append('line')
                    .attr('class', 'attention-line')
                    .attr('x1', 100 + i * 100)
                    .attr('y1', 50)
                    .attr('x2', 100 + j * 100)
                    .attr('y2', 50)
                    .attr('stroke', '#2196F3')
                    .attr('stroke-width', 2)
                    .attr('opacity', 0)
                    .attr('marker-end', 'url(#arrowhead)')
                    .transition()
                    .duration(ANIMATION_DURATION)
                    .attr('opacity', opacity);
            }
        }
    }
    
    // 延迟后显示编码结果
    setTimeout(() => showEncodedTokens(tokens), ANIMATION_DURATION * 2);
}

// 显示编码后的结果
function showEncodedTokens(tokens) {
    updateExplanation('第3步：生成每个token的上下文感知表示');
    
    const encodedTokens = svg.selectAll('.encoded-token')
        .data(tokens)
        .enter()
        .append('g')
        .attr('class', 'encoded-token')
        .attr('transform', (d, i) => `translate(${100 + i * 100}, 200)`);
    
    // 添加圆形背景
    encodedTokens.append('circle')
        .attr('r', TOKEN_RADIUS)
        .attr('fill', '#E8F5E9')
        .attr('stroke', '#388E3C')
        .attr('stroke-width', 2);
    
    // 添加文本
    encodedTokens.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .attr('font-size', '16px')
        .text(d => d);
    
    // 添加连接线
    tokens.forEach((_, i) => {
        svg.append('line')
            .attr('x1', 100 + i * 100)
            .attr('y1', 80)
            .attr('x2', 100 + i * 100)
            .attr('y2', 170)
            .attr('stroke', '#4CAF50')
            .attr('stroke-width', 2)
            .attr('opacity', 0)
            .attr('marker-end', 'url(#arrowhead)')
            .transition()
            .duration(ANIMATION_DURATION)
            .attr('opacity', 1);
    });
}

// 更新解释文本
function updateExplanation(text) {
    document.getElementById('explanation').innerHTML = `<p>${text}</p>`;
}

// 页面加载完成后自动开始演示
window.onload = () => {
    startVisualization();
}; 