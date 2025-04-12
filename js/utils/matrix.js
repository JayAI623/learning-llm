// 矩阵乘法
function matrixMultiply(A, B) {
    const result = [];
    for (let i = 0; i < A.length; i++) {
        result[i] = [];
        for (let j = 0; j < B[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < A[0].length; k++) {
                sum += A[i][k] * B[k][j];
            }
            result[i][j] = parseFloat(sum.toFixed(2));
        }
    }
    return result;
}

// 矩阵转置
function transposeMatrix(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

// Softmax 函数
function softmax(arr) {
    const maxVal = Math.max(...arr);
    const expArr = arr.map(x => Math.exp(x - maxVal));
    const sum = expArr.reduce((a, b) => a + b, 0);
    return expArr.map(x => parseFloat((x / sum).toFixed(2)));
}

// 生成 attention mask（用于演示目的，这里生成一个上三角mask）
function generateAttentionMask(length) {
    return Array.from({ length }, (_, i) =>
        Array.from({ length }, (_, j) => j <= i ? 1 : 0)
    );
}

export {
    matrixMultiply,
    transposeMatrix,
    softmax,
    generateAttentionMask
}; 