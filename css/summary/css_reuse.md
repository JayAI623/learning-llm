# CSS类复用指南

本文档提供了项目中CSS类的分类和复用建议，帮助开发者在开发新组件时复用已有的样式类。

## 核心布局类

这些类用于基本的布局和容器：

| 类名 | 用途 | 源文件 |
|------|------|--------|
| `.container` | 页面主容器 | base/layout.css |
| `.flex-layout` | Flexbox布局容器 | base/layout.css |
| `.flex-column` | 垂直Flexbox布局 | base/layout.css |
| `.grid-layout` | 网格布局容器 | base/layout.css |
| `.grid-layout-2` | 两列网格布局 | base/layout.css |
| `.grid-layout-3` | 三列网格布局 | base/layout.css |
| `.center-align` | 居中对齐内容 | base/layout.css |
| `.card-container` | 卡片式容器 | base/layout.css |

## 组件布局类

这些类用于特定组件的布局：

| 类名 | 用途 | 源文件 |
|------|------|--------|
| `.component-section` | 组件节区容器 | base/layout.css |
| `.section-title` | 节区标题 | base/layout.css |
| `.calculation-container` | 计算容器 | base/layout.css |
| `.formula-result-layout` | 公式结果布局 | components/matrix.css |
| `.left-formula` | 左侧公式容器 | components/matrix.css |
| `.right-result` | 右侧结果容器 | components/matrix.css |

## 按钮和控制类

这些类用于按钮和用户控制元素：

| 类名 | 用途 | 源文件 |
|------|------|--------|
| `.btn` | 基本按钮 | base/layout.css |
| `.btn-secondary` | 次要按钮 | base/layout.css |
| `.back-button` | 返回按钮 | base/layout.css |
| `.step-controls` | 步骤控制容器 | components/controls.css |
| `.step-indicator` | 步骤指示器 | components/controls.css |
| `.buttons-container` | 按钮容器 | utils/responsive.css |

## 矩阵和计算相关类

这些类用于矩阵显示和相关计算：

| 类名 | 用途 | 源文件 |
|------|------|--------|
| `.matrix` | 基本矩阵 | components/matrix.css |
| `.matrix-container` | 矩阵容器 | components/matrix.css |
| `.matrix-cell` | 矩阵单元格 | components/matrix.css |
| `.matrix-row` | 矩阵行 | components/matrix.css |
| `.matrix-label` | 矩阵标签 | components/matrix.css |
| `.matrix-dimensions` | 矩阵维度显示 | components/matrix.css |
| `.matrix-group` | 矩阵组 | components/matrix.css |
| `.compact-matrix` | 紧凑型矩阵 | components/matrix.css |
| `.ultra-compact-matrix` | 超紧凑型矩阵 | components/matrix.css |
| `.matrices-grid` | 矩阵网格 | components/matrix.css |
| `.matrix-multiplication-container` | 矩阵乘法容器 | components/matrix.css |
| `.matrix-multiplication-section` | 矩阵乘法节区 | components/matrix.css |
| `.matrix-formula` | 矩阵公式 | components/matrix.css |
| `.multiplication-sign` | 乘法符号 | components/matrix.css |
| `.equals-sign` | 等号符号 | components/matrix.css |

## 注意力机制相关类

这些类用于注意力机制的可视化：

| 类名 | 用途 | 源文件 |
|------|------|--------|
| `.attention-calculation` | 注意力计算容器 | components/attention.css |
| `.attention-scores` | 注意力分数 | components/attention.css |
| `.attention-scores-matrix` | 注意力分数矩阵 | components/attention.css |
| `.attention-matrices` | 注意力矩阵容器 | components/attention.css |
| `.attention-matrices-grid` | 注意力矩阵网格 | components/attention.css |
| `.attention-matrix` | 注意力矩阵 | components/matrix.css |
| `.attention-table` | 注意力表格 | components/matrix.css |
| `.attention-heatmap` | 注意力热图 | components/attention.css |
| `.calculation-flow` | 计算流程容器 | components/attention.css |
| `.flow-step` | 流程步骤 | components/attention.css |

## 热图相关类

这些类用于热图的可视化：

| 类名 | 用途 | 源文件 |
|------|------|--------|
| `.heatmap-container` | 热图容器 | components/attention.css |
| `.heatmap-matrix` | 热图矩阵 | components/attention.css |
| `.heatmap-cell` | 热图单元格 | components/attention.css |
| `.heatmap-row` | 热图行 | components/attention.css |
| `.heatmap-row-label` | 热图行标签 | components/attention.css |
| `.heatmap-row-labels` | 热图行标签容器 | components/attention.css |
| `.heatmap-col-label` | 热图列标签 | components/attention.css |
| `.heatmap-col-labels` | 热图列标签容器 | components/attention.css |
| `.heatmap-corner` | 热图角落元素 | components/attention.css |
| `.masked-cell` | 被遮蔽的单元格 | components/attention.css |
| `.masked-value` | 被遮蔽的值 | components/attention.css |
| `.masked` | 基本遮蔽类 | components/matrix.css |

## 文本和公式类

这些类用于文本和公式的显示：

| 类名 | 用途 | 源文件 |
|------|------|--------|
| `.formula` | 公式容器 | components/matrix.css |
| `.formula-desc` | 公式描述 | components/matrix.css |
| `.process-explanation` | 过程解释文本 | components/attention.css |
| `.token` | 标记元素 | components/controls.css |
| `.token-label` | 标记标签 | components/matrix.css |
| `.arrow` | 箭头元素 | components/attention.css |

## 建议复用策略

在开发新组件时，建议按以下策略复用CSS类：

1. **布局和容器**：优先使用核心布局类如`.container`、`.flex-layout`等来搭建基础布局
2. **组件框架**：使用`.component-section`和`.section-title`来保持组件的一致性
3. **特定功能区域**：根据功能选择适当的专用类，如矩阵相关的类、注意力机制相关的类等
4. **按钮和控件**：保持使用统一的按钮和控件类以维持UI一致性

## 常用组合示例

### 矩阵展示组合
```html
<div class="component-section">
  <h3 class="section-title">矩阵标题</h3>
  <div class="matrix-container">
    <div class="matrix-group">
      <div class="matrix-label">标签</div>
      <div class="matrix-dimensions">维度</div>
      <div class="matrix"><!-- 矩阵内容 --></div>
    </div>
  </div>
</div>
```

### 公式和结果组合
```html
<div class="formula-result-layout">
  <div class="left-formula">
    <div class="formula"><!-- 公式内容 --></div>
    <div class="formula-desc">公式描述</div>
  </div>
  <div class="right-result">
    <!-- 结果内容 -->
  </div>
</div>
```

### 注意力计算流程组合
```html
<div class="calculation-flow">
  <div class="flow-step">
    <div class="formula"><!-- 步骤1公式 --></div>
  </div>
  <div class="arrow">→</div>
  <div class="flow-step">
    <div class="formula"><!-- 步骤2公式 --></div>
  </div>
</div>
``` 