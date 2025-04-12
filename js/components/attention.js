import { embeddingMatrix } from '../config/data.js';
import { matrixMultiply, transposeMatrix, softmax } from '../utils/matrix.js';

// 获取词嵌入向量
function getEmbeddings(sequence) {
    return sequence.map(token => embeddingMatrix[token]);
}

// 生成QKV矩阵
function generateQKVMatrices(embeddings, W_Q, W_K, W_V) {
    // 计算Q、K、V矩阵
    const Q = matrixMultiply(embeddings, W_Q);
    const K = matrixMultiply(embeddings, W_K);
    const V = matrixMultiply(embeddings, W_V);
    
    return { Q, K, V };
}

// 计算注意力分数和权重
function calculateAttention(Q, K, V, embeddingDim) {
    // 计算注意力分数
    const QK = matrixMultiply(Q, transposeMatrix(K));
    
    // 缩放
    const scaledQK = QK.map(row => 
        row.map(x => parseFloat((x / Math.sqrt(embeddingDim)).toFixed(2)))
    );
    
    // 应用 mask 并计算 softmax
    const maskedQK = scaledQK.map((row, i) => 
        row.map((x, j) => j > i ? -1e9 : x)
    );
    
    // 计算注意力权重
    const attentionWeights = maskedQK.map((row) => {
        return softmax(row);
    });
    
    return {
        QK,
        scaledQK,
        maskedQK,
        attentionWeights
    };
}

export {
    getEmbeddings,
    generateQKVMatrices,
    calculateAttention
}; 