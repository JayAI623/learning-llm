# Transformer 原理交互演示

这是一个简单的网页应用，用于演示 Transformer 模型中的核心概念和工作原理。

## 功能特点

- 可视化展示输入文本的分词过程
- 动态演示 Self-Attention 机制
- 展示上下文编码的结果
- 交互式的动画效果

## 使用方法

1. 直接在浏览器中打开 `index.html` 文件
2. 在输入框中输入想要处理的文本
3. 点击"开始演示"按钮，观察可视化过程

## 技术栈

- HTML5
- CSS3
- JavaScript
- D3.js（用于数据可视化）

## 文件结构

```
.
├── index.html                 # 主页面
├── transformer_autoregressive.html  # 自回归模式演示页面
├── debug.html                 # 调试页面
├── js/                        # JavaScript 文件目录
│   └── transformer.js         # 核心逻辑实现
├── css/                       # CSS样式目录
│   ├── base/                  # 基础样式
│   │   ├── layout.css         # 布局样式
│   │   └── variables.css      # 变量定义
│   ├── components/            # 组件样式
│   │   ├── attention.css      # 注意力机制相关样式
│   │   ├── matrix.css         # 矩阵相关样式
│   │   └── controls.css       # 控制元素样式
│   ├── utils/                 # 工具样式
│   │   └── responsive.css     # 响应式布局样式
│   ├── summary/               # CSS分析和复用
│   │   ├── css_summary.md     # CSS类总结（精简版）
│   │   ├── css_reuse.md       # CSS复用指南
│   │   └── utility.css        # 提取的工具类库
│   └── transformer.css        # 主样式文件
├── components/                # HTML组件目录
│   ├── attention-calculation.html  # 注意力计算组件
│   ├── attention-matrices.html     # 注意力矩阵组件
│   ├── matrix-multiplication-section.html  # 矩阵乘法组件
│   ├── matrix-section.html    # 矩阵展示组件
│   └── sequence-section.html  # 序列展示组件
└── README.md                  # 项目说明文档
```

## CSS类复用

为了提高开发效率和保持样式一致性，项目提供了CSS类总结和复用指南：

- `css/summary/css_summary.md`: CSS类精简总结，按文件分类和功能分组，特别标注了复用频率高的类
- `css/summary/css_reuse.md`: 分类整理的CSS复用指南，提供常用组合示例
- `css/summary/utility.css`: 从项目中提取的可复用CSS类库

CSS总结主要包含以下部分：
1. 总体统计数据
2. 按文件分类的类列表
3. 多文件复用类统计
4. 按功能的类分组
5. 使用建议

在开发新组件时，建议首先查阅这些文档，尽量复用已有的CSS类。

## 后续优化方向

1. 添加更多 Transformer 组件的可视化（如 Multi-Head Attention）
2. 增加更详细的步骤说明和教学内容
3. 优化动画效果和交互体验
4. 添加更多自定义选项（如调整注意力权重）
5. 进一步优化CSS复用性，建立更完善的样式系统 