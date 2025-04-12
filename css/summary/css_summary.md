# CSS类总结（精简版）

## 总体统计
- 总类数: 70+
- 文件数: 7
- 主要样式分类: 布局类、矩阵类、注意力机制类、热图类、按钮控制类

## 按文件分类

### base/layout.css (22个类)
`.attention-scores` `.back-button` `.back-button-container` `.btn` `.btn-secondary` `.calculation-container` `.calculation-flow` `.calculation-grid` `.card-container` `.center-align` `.component-section` `.container` `.flex-column` `.flex-layout` `.footer-back-button` `.grid-layout` `.grid-layout-2` `.grid-layout-3` `.matrices-grid` `.matrix-container` `.matrix-group` `.section-title`

### components/attention.css (33个类)
`.arrow` `.attention-calculation` `.attention-heatmap` `.attention-matrices` `.attention-matrices-grid` `.attention-scores` `.attention-scores-matrix` `.attention-section` `.attention-table` `.calculation-flow` `.component-section` `.flow-step` `.formula` `.formula-result-layout` `.heatmap-cell` `.heatmap-col-label` `.heatmap-col-labels` `.heatmap-container` `.heatmap-corner` `.heatmap-matrix` `.heatmap-row` `.heatmap-row-label` `.heatmap-row-labels` `.left-formula` `.masked-cell` `.masked-value` `.matrix-container` `.matrix-formula` `.matrix-multiplication-container` `.matrix-multiplication-section` `.process-explanation` `.right-result` `.token-label`

### components/controls.css (9个类)
`.buttons-container` `.current-step-info` `.header` `.scrolled` `.sequence-display` `.step-controls` `.step-explanation` `.step-indicator` `.token`

### components/matrix.css (29个类)
`.attention-matrices` `.attention-matrix` `.attention-table` `.compact-matrix` `.component-section` `.equals-sign` `.formula` `.formula-desc` `.formula-result-layout` `.heatmap-cell` `.left-formula` `.masked` `.matrices-grid` `.matrix` `.matrix-cell` `.matrix-container` `.matrix-dimensions` `.matrix-formula` `.matrix-group` `.matrix-label` `.matrix-multiplication-container` `.matrix-multiplication-section` `.matrix-row` `.matrix-section` `.multiplication-sign` `.right-result` `.section-title` `.token-label` `.ultra-compact-matrix`

### utils/responsive.css (4个类)
`.buttons-container` `.scrolled` `.step-controls` `.step-indicator`

## 类的重复使用情况

以下类在多个文件中重复使用，表明它们具有高度的复用价值：

| 类名 | 出现文件数 |
|------|----------|
| `.component-section` | 3 |
| `.attention-matrices` | 2 |
| `.attention-scores` | 2 |
| `.attention-table` | 2 |
| `.buttons-container` | 2 |
| `.calculation-flow` | 2 |
| `.formula` | 2 |
| `.formula-result-layout` | 2 |
| `.heatmap-cell` | 2 |
| `.left-formula` | 2 |
| `.matrices-grid` | 2 |
| `.matrix-container` | 3 |
| `.matrix-formula` | 2 |
| `.matrix-group` | 2 |
| `.matrix-multiplication-container` | 2 |
| `.matrix-multiplication-section` | 2 |
| `.right-result` | 2 |
| `.scrolled` | 2 |
| `.section-title` | 2 |
| `.step-controls` | 2 |
| `.step-indicator` | 2 |
| `.token-label` | 2 |

## 功能分组

### 核心布局类
`.container` `.flex-layout` `.flex-column` `.grid-layout` `.grid-layout-2` `.grid-layout-3` `.center-align` `.card-container` `.component-section` `.section-title`

### 矩阵相关类
`.matrix` `.matrix-container` `.matrix-cell` `.matrix-row` `.matrix-label` `.matrix-dimensions` `.matrix-group` `.compact-matrix` `.ultra-compact-matrix` `.matrices-grid` `.matrix-multiplication-container` `.matrix-section`

### 注意力机制类
`.attention-calculation` `.attention-scores` `.attention-matrices` `.attention-matrix` `.attention-table` `.attention-heatmap` `.calculation-flow` `.flow-step`

### 热图相关类
`.heatmap-container` `.heatmap-matrix` `.heatmap-cell` `.heatmap-row` `.heatmap-row-label` `.heatmap-col-label` `.masked-cell`

### 按钮和控制类
`.btn` `.btn-secondary` `.back-button` `.step-controls` `.step-indicator` `.buttons-container`

### 公式和结果类
`.formula` `.formula-desc` `.formula-result-layout` `.left-formula` `.right-result` `.process-explanation`

## 使用建议

对于新组件开发，建议优先参考`css/summary/css_reuse.md`中的常用组合示例，并使用`css/summary/utility.css`中提取的工具类以提高样式复用性。

