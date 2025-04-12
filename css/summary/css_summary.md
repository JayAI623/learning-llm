# CSS类总结

## 按文件分类

### base/layout.css

- `.attention-scores`
- `.back-button`
- `.back-button-container`
- `.btn`
- `.btn-secondary`
- `.calculation-container`
- `.calculation-flow`
- `.calculation-grid`
- `.card-container`
- `.center-align`
- `.component-section`
- `.container`
- `.flex-column`
- `.flex-layout`
- `.footer-back-button`
- `.grid-layout`
- `.grid-layout-2`
- `.grid-layout-3`
- `.matrices-grid`
- `.matrix-container`
- `.matrix-group`
- `.section-title`

### base/variables.css


### components/attention.css

- `.arrow`
- `.attention-calculation`
- `.attention-heatmap`
- `.attention-matrices`
- `.attention-matrices-grid`
- `.attention-scores`
- `.attention-scores-matrix`
- `.attention-section`
- `.attention-table`
- `.calculation-flow`
- `.component-section`
- `.flow-step`
- `.formula`
- `.formula-result-layout`
- `.heatmap-cell`
- `.heatmap-col-label`
- `.heatmap-col-labels`
- `.heatmap-container`
- `.heatmap-corner`
- `.heatmap-matrix`
- `.heatmap-row`
- `.heatmap-row-label`
- `.heatmap-row-labels`
- `.left-formula`
- `.masked-cell`
- `.masked-value`
- `.matrix-container`
- `.matrix-formula`
- `.matrix-multiplication-container`
- `.matrix-multiplication-section`
- `.process-explanation`
- `.right-result`
- `.token-label`

### components/controls.css

- `.buttons-container`
- `.current-step-info`
- `.header`
- `.scrolled`
- `.sequence-display`
- `.step-controls`
- `.step-explanation`
- `.step-indicator`
- `.token`

### components/matrix.css

- `.attention-matrices`
- `.attention-matrix`
- `.attention-table`
- `.compact-matrix`
- `.component-section`
- `.equals-sign`
- `.formula`
- `.formula-desc`
- `.formula-result-layout`
- `.heatmap-cell`
- `.left-formula`
- `.masked`
- `.matrices-grid`
- `.matrix`
- `.matrix-cell`
- `.matrix-container`
- `.matrix-dimensions`
- `.matrix-formula`
- `.matrix-group`
- `.matrix-label`
- `.matrix-multiplication-container`
- `.matrix-multiplication-section`
- `.matrix-row`
- `.matrix-section`
- `.multiplication-sign`
- `.right-result`
- `.section-title`
- `.token-label`
- `.ultra-compact-matrix`

### summary/utility.css


### transformer.css


### utils/responsive.css

- `.buttons-container`
- `.scrolled`
- `.step-controls`
- `.step-indicator`

## 按类分类

### .arrow

**出现在文件:**

- components/attention.css

**属性:**

```css
color: var(--primary-color);
font-size: 1.8em;
margin: 10px 0;
```

### .attention-calculation

**出现在文件:**

- components/attention.css

**属性:**

```css
align-items: stretch;
background: var(--matrix-bg);
border-radius: 8px;
display: flex;
flex: 1;
flex-direction: column;
gap: 20px;
justify-content: flex-start;
margin: 0 auto;
max-width: 400px;
min-height: 500px;
overflow: hidden;
padding: 0;
width: 100%;
```

### .attention-heatmap

**出现在文件:**

- components/attention.css

**属性:**

```css
background: var(--matrix-bg);
border-radius: 8px;
display: grid;
gap: 4px;
margin-top: 20px;
padding: 20px;
```

### .attention-matrices

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
align-items: center;
background: white;
background-color: rgba(230, 245, 255, 0.8);
border-radius: 4px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
box-sizing: border-box;
color: var(--text-color);
display: flex;
flex: none;
flex-direction: column;
flex-wrap: nowrap;
font-size: 0.8em;
font-weight: 500;
gap: 5px;
grid-template-columns: 1fr;
height: 45px;
justify-content: center;
margin: 0;
margin-bottom: 5px;
margin-top: 10px;
max-width: 100%;
min-width: 45px;
overflow: hidden;
overflow-x: auto;
padding: 0;
text-align: center;
text-overflow: ellipsis;
transform: scale(1.1);
transition: transform 0.2s ease;
white-space: nowrap;
width: 100%;
z-index: 2;
```

### .attention-matrices-grid

**出现在文件:**

- components/attention.css

**属性:**

```css
display: flex;
flex-direction: row;
gap: 10px;
justify-content: space-between;
```

### .attention-matrix

**出现在文件:**

- components/matrix.css

**属性:**

```css
align-items: center;
background: white;
border-radius: 4px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
display: flex;
flex: none;
flex-wrap: nowrap;
font-size: 0.8em;
gap: 5px;
height: 45px;
justify-content: center;
margin-bottom: 5px;
min-width: 45px;
transition: transform 0.2s ease;
width: 100%;
```

### .attention-scores

**出现在文件:**

- base/layout.css
- components/attention.css

**属性:**

```css
align-items: center;
display: flex;
flex: 1;
flex-direction: column;
justify-content: center;
margin: 0 auto;
padding: 15px;
width: auto;
```

### .attention-scores-matrix

**出现在文件:**

- components/attention.css

**属性:**

```css
display: flex;
justify-content: center;
margin: 0 auto;
width: auto;
```

### .attention-table

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
background: rgba(248, 250, 252, 0.5);
border-collapse: separate;
border-radius: 8px;
border-spacing: 5px;
height: 45px;
margin: 0 auto;
padding: 0;
text-align: center;
width: 45px;
```

### .back-button

**出现在文件:**

- base/layout.css

**属性:**

```css
align-items: center;
background: none;
background-color: rgba(0, 122, 255, 0.1);
border: none;
border-radius: 6px;
color: var(--primary-color);
cursor: pointer;
display: inline-flex;
font-size: 1em;
font-weight: 500;
gap: 8px;
margin-bottom: 15px;
padding: 6px 12px;
text-decoration: none;
transition: all 0.2s ease;
```

### .back-button-container

**出现在文件:**

- base/layout.css

**属性:**

```css
margin-bottom: 15px;
```

### .btn

**出现在文件:**

- base/layout.css

**属性:**

```css
background-color: #e5e5e7;
border: none;
border-radius: 6px;
color: var(--text-color);
cursor: not-allowed;
font-size: 15px;
font-weight: 500;
padding: 8px 20px;
transition: all 0.3s ease;
```

### .btn-secondary

**出现在文件:**

- base/layout.css

**属性:**

```css
background-color: #e5e5e7;
color: var(--text-color);
```

### .buttons-container

**出现在文件:**

- components/controls.css
- utils/responsive.css

**属性:**

```css
display: flex;
justify-content: space-between;
width: 100%;
```

### .calculation-container

**出现在文件:**

- base/layout.css

**属性:**

```css
background: var(--matrix-bg);
border-radius: 6px;
color: var(--primary-color);
display: flex;
flex-direction: column;
font-size: 1.1em;
gap: 15px;
margin: 0;
padding: 10px;
text-align: center;
```

### .calculation-flow

**出现在文件:**

- base/layout.css
- components/attention.css

**属性:**

```css
align-items: center;
display: flex;
flex: 1;
flex-direction: column;
gap: 20px;
justify-content: center;
margin: 0 auto;
max-width: 400px;
padding: 15px;
padding-top: 30px;
width: 100%;
```

### .calculation-grid

**出现在文件:**

- base/layout.css

**属性:**

```css
display: grid;
gap: 20px;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
```

### .card-container

**出现在文件:**

- base/layout.css

**属性:**

```css
background-color: white;
border-radius: 10px;
box-shadow: 0 2px 8px rgba(0,0,0,0.05);
margin-bottom: 20px;
padding: 20px;
```

### .center-align

**出现在文件:**

- base/layout.css

**属性:**

```css
align-items: center;
justify-content: center;
```

### .compact-matrix

**出现在文件:**

- components/matrix.css

**属性:**

```css
font-size: 0.75em;
gap: 1px;
height: 30px;
margin: 1px;
margin-bottom: 1px;
padding: 2px;
width: 30px;
```

### .component-section

**出现在文件:**

- base/layout.css
- components/attention.css
- components/matrix.css

**属性:**

```css
background: white;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
box-sizing: border-box;
margin: 10px 0;
max-width: 100%;
min-height: 500px;
overflow-x: auto;
padding: 15px;
width: 100%;
```

### .container

**出现在文件:**

- base/layout.css

**属性:**

```css
margin: 0 auto;
margin-top: 0;
max-width: 1280px;
padding: 20px;
```

### .current-step-info

**出现在文件:**

- components/controls.css

**属性:**

```css
background: var(--primary-color);
border-radius: 4px;
color: white;
font-size: 12px;
padding: 4px 8px;
position: absolute;
right: 10px;
top: 10px;
```

### .equals-sign

**出现在文件:**

- components/matrix.css

**属性:**

```css
align-self: center;
color: var(--primary-color);
flex: 0 0 auto;
font-size: 1.6em;
margin: 5px 10px;
padding: 5px;
text-shadow: 0 1px 2px rgba(0,0,0,0.1);
```

### .flex-column

**出现在文件:**

- base/layout.css

**属性:**

```css
flex-direction: column;
```

### .flex-layout

**出现在文件:**

- base/layout.css

**属性:**

```css
display: flex;
gap: 20px;
```

### .flow-step

**出现在文件:**

- components/attention.css

**属性:**

```css
background: white;
border-radius: 6px;
box-shadow: 0 2px 4px rgba(0,0,0,0.05);
color: var(--text-color);
font-family: "Computer Modern", serif;
font-size: 1.2em;
margin: 0 auto;
max-width: 300px;
padding: 20px;
text-align: center;
width: 100%;
```

### .footer-back-button

**出现在文件:**

- base/layout.css

**属性:**

```css
margin-top: 30px;
text-align: center;
```

### .formula

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
align-items: center;
background: white;
background-color: rgba(230, 245, 255, 0.8);
border-radius: 6px;
box-shadow: 0 1px 3px rgba(0,0,0,0.1);
color: var(--text-color);
display: flex;
flex: 1.5;
flex-direction: column;
flex-wrap: nowrap;
font-family: "Computer Modern", serif;
font-size: 1em;
font-weight: 500;
gap: 20px;
height: 100%;
justify-content: space-between;
margin-bottom: 20px;
margin-top: 10px;
max-width: 300px;
min-width: 100%;
overflow-x: auto;
padding: 20px;
text-align: center;
width: 100%;
```

### .formula-desc

**出现在文件:**

- components/matrix.css

**属性:**

```css
color: var(--text-color);
font-size: 1em;
margin-top: 10px;
max-width: 300px;
text-align: center;
```

### .formula-result-layout

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
align-items: center;
background: white;
background-color: rgba(230, 245, 255, 0.8);
border-radius: 6px;
box-shadow: 0 1px 3px rgba(0,0,0,0.1);
color: var(--text-color);
display: flex;
flex: 1.5;
flex-direction: column;
flex-wrap: nowrap;
font-family: "Computer Modern", serif;
font-size: 1.4em;
font-weight: 500;
gap: 20px;
height: 100%;
justify-content: space-between;
margin-bottom: 20px;
min-width: 100%;
overflow-x: auto;
padding: 15px;
text-align: center;
width: 100%;
```

### .grid-layout

**出现在文件:**

- base/layout.css

**属性:**

```css
display: grid;
gap: 20px;
grid-template-columns: 1fr 1fr 1fr;
```

### .grid-layout-2

**出现在文件:**

- base/layout.css

**属性:**

```css
grid-template-columns: 1fr 1fr;
```

### .grid-layout-3

**出现在文件:**

- base/layout.css

**属性:**

```css
grid-template-columns: 1fr 1fr 1fr;
```

### .header

**出现在文件:**

- components/controls.css

**属性:**

```css
background: none;
box-shadow: none;
color: var(--primary-color);
display: flex;
font-size: 1.8em;
justify-content: center;
margin: 0;
padding: 0;
text-align: center;
white-space: nowrap;
```

### .heatmap-cell

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
background: white;
border-radius: 4px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
font-size: 0.8em;
position: relative;
transition: transform 0.2s ease;
```

### .heatmap-col-label

**出现在文件:**

- components/attention.css

**属性:**

```css
align-items: center;
background-color: rgba(0, 122, 255, 0.1);
border-radius: 4px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
display: flex;
flex-direction: row;
font-size: 0.85em;
font-weight: bold;
gap: 4px;
grid-column: 2;
grid-row: 1;
height: 45px;
justify-content: center;
margin: 0;
padding: 0;
width: 45px;
```

### .heatmap-col-labels

**出现在文件:**

- components/attention.css

**属性:**

```css
align-items: center;
display: flex;
flex-direction: row;
gap: 4px;
grid-column: 2;
grid-row: 1;
justify-content: flex-start;
```

### .heatmap-container

**出现在文件:**

- components/attention.css

**属性:**

```css
background: rgba(248, 250, 252, 0.5);
border-radius: 8px;
box-shadow: 0 1px 3px rgba(0,0,0,0.1);
column-gap: 0;
display: grid;
grid-template-columns: auto auto;
grid-template-rows: auto auto;
margin: 0 auto;
padding: 10px;
row-gap: 0;
width: max-content;
```

### .heatmap-corner

**出现在文件:**

- components/attention.css

**属性:**

```css
grid-column: 1;
grid-row: 1;
height: 49px;
width: 49px;
```

### .heatmap-matrix

**出现在文件:**

- components/attention.css

**属性:**

```css
display: flex;
flex-direction: column;
gap: 4px;
grid-column: 2;
grid-row: 2;
```

### .heatmap-row

**出现在文件:**

- components/attention.css

**属性:**

```css
align-items: center;
background-color: rgba(0, 122, 255, 0.1);
border-radius: 4px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
display: flex;
flex-direction: row;
font-size: 0.85em;
font-weight: bold;
gap: 4px;
grid-column: 1;
grid-row: 2;
height: 45px;
justify-content: center;
margin: 0;
padding: 0;
width: 45px;
```

### .heatmap-row-label

**出现在文件:**

- components/attention.css

**属性:**

```css
align-items: center;
background-color: rgba(0, 122, 255, 0.1);
border-radius: 4px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
display: flex;
flex-direction: column;
font-size: 0.85em;
font-weight: bold;
gap: 4px;
grid-column: 1;
grid-row: 2;
height: 45px;
justify-content: center;
margin: 0;
padding: 0;
width: 45px;
```

### .heatmap-row-labels

**出现在文件:**

- components/attention.css

**属性:**

```css
align-items: center;
display: flex;
flex-direction: column;
gap: 4px;
grid-column: 1;
grid-row: 2;
justify-content: flex-start;
```

### .left-formula

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
align-items: center;
display: flex;
flex: 0.8;
flex-direction: column;
height: 100%;
justify-content: center;
min-width: 100%;
padding: 20px;
width: 100%;
```

### .masked

**出现在文件:**

- components/matrix.css

**属性:**

```css
background-color: rgba(230, 230, 230, 0.5) !important;
color: #888;
font-style: italic;
```

### .masked-cell

**出现在文件:**

- components/attention.css

**属性:**

```css
background-color: rgba(230, 230, 230, 0.5);
color: #888;
content: '×';
font-size: 1.2em;
left: 50%;
position: absolute;
top: 50%;
transform: translate(-50%, -50%);
```

### .masked-value

**出现在文件:**

- components/attention.css

**属性:**

```css
background-color: #f0f0f0;
color: #999;
```

### .matrices-grid

**出现在文件:**

- base/layout.css
- components/matrix.css

**属性:**

```css
display: grid;
gap: 15px;
grid-template-columns: 1fr;
margin: 0 auto;
padding: 10px;
width: 100%;
```

### .matrix

**出现在文件:**

- components/matrix.css

**属性:**

```css
align-items: center;
align-self: center;
background: white;
background-color: rgba(230, 230, 230, 0.5) !important;
border: 1px solid rgba(0,0,0,0.1);
border-radius: 4px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
color: #888;
display: flex;
flex: none;
flex-direction: column;
flex-wrap: nowrap;
font-family: "Computer Modern", serif;
font-size: 0.8em;
font-style: italic;
font-weight: bold;
gap: 5px;
height: 45px;
justify-content: center;
margin: 5px 10px;
margin-bottom: 5px;
margin-top: 10px;
max-width: 100%;
min-height: 500px;
min-width: 45px;
opacity: 0.8;
overflow: hidden;
overflow-x: auto;
padding: 5px;
position: relative;
text-align: center;
text-overflow: ellipsis;
transform: scale(1.1);
transition: transform 0.2s ease;
white-space: nowrap;
width: 100%;
z-index: 2;
```

### .matrix-cell

**出现在文件:**

- components/matrix.css

**属性:**

```css
align-items: center;
background: white;
background-color: rgba(230, 230, 230, 0.5) !important;
border: 1px solid rgba(0,0,0,0.1);
border-radius: 4px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
color: #888;
display: flex;
flex: none;
font-family: monospace;
font-size: 0.8em;
font-style: italic;
height: 45px;
justify-content: center;
margin: 1px;
min-width: 45px;
overflow: hidden;
padding: 0;
position: relative;
text-overflow: ellipsis;
transform: scale(1.1);
transition: transform 0.2s ease;
white-space: nowrap;
width: 45px;
z-index: 2;
```

### .matrix-container

**出现在文件:**

- base/layout.css
- components/attention.css
- components/matrix.css

**属性:**

```css
align-items: center;
background: rgba(255, 255, 255, 0.7);
border-radius: 6px;
box-shadow: 0 1px 3px rgba(0,0,0,0.05);
display: flex;
flex-direction: column;
padding: 15px;
width: 100%;
```

### .matrix-dimensions

**出现在文件:**

- components/matrix.css

**属性:**

```css
color: var(--primary-color);
font-size: 0.75em;
opacity: 0.8;
```

### .matrix-formula

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
align-items: center;
background: white;
border-radius: 6px;
box-shadow: 0 2px 4px rgba(0,0,0,0.05);
color: var(--text-color);
display: flex;
flex-direction: column;
font-family: "Computer Modern", serif;
font-size: 1.4em;
height: 100%;
justify-content: center;
margin-bottom: 20px;
max-width: 300px;
padding: 20px;
text-align: center;
width: 100%;
```

### .matrix-group

**出现在文件:**

- base/layout.css
- components/matrix.css

**属性:**

```css
align-items: center;
background: rgba(255, 255, 255, 0.7);
border-radius: 6px;
box-shadow: 0 1px 3px rgba(0,0,0,0.1);
display: flex;
flex: 0 0 auto;
flex-direction: column;
margin: 5px;
margin-top: 10px;
max-width: 100%;
min-width: 0;
padding: 10px;
white-space: normal;
width: 100%;
```

### .matrix-label

**出现在文件:**

- components/matrix.css

**属性:**

```css
align-items: center;
display: flex;
font-size: 0.8em;
font-weight: bold;
gap: 10px;
margin-bottom: 3px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

### .matrix-multiplication-container

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
align-items: center;
align-self: center;
background: rgba(255, 255, 255, 0.7);
border-radius: 6px;
box-shadow: 0 1px 3px rgba(0,0,0,0.1);
color: var(--primary-color);
display: flex;
flex: 0 0 auto;
flex-direction: column;
flex-wrap: wrap;
font-size: 0.8em;
gap: 2px;
height: 24px;
justify-content: flex-start;
margin: 5px 10px;
margin-bottom: 4px;
max-width: 100%;
min-width: 0;
overflow: hidden;
overflow-x: auto;
padding: 5px;
text-align: center;
text-overflow: ellipsis;
white-space: nowrap;
width: 100%;
```

### .matrix-multiplication-section

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
align-items: center;
display: flex;
flex: 0.8;
flex-direction: column;
flex-wrap: wrap;
gap: 20px;
height: 100%;
justify-content: center;
min-height: 500px;
min-width: 0;
overflow-x: auto;
padding: 20px;
width: 100%;
```

### .matrix-row

**出现在文件:**

- components/matrix.css

**属性:**

```css
align-items: center;
display: flex;
flex-wrap: nowrap;
gap: 5px;
justify-content: center;
margin: 0;
margin-bottom: 5px;
min-width: 0;
padding: 0;
width: 100%;
```

### .matrix-section

**出现在文件:**

- components/matrix.css

**属性:**

```css
display: flex;
flex-direction: column;
gap: 20px;
```

### .multiplication-sign

**出现在文件:**

- components/matrix.css

**属性:**

```css
align-self: center;
color: var(--primary-color);
flex: 0 0 auto;
font-size: 1.6em;
margin: 5px 10px;
padding: 5px;
text-shadow: 0 1px 2px rgba(0,0,0,0.1);
```

### .process-explanation

**出现在文件:**

- components/attention.css

**属性:**

```css
color: var(--primary-color);
margin: 10px 0;
margin-top: 0;
padding-left: 20px;
```

### .right-result

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
align-items: flex-start;
display: flex;
flex: 1.5;
flex-direction: column;
flex-wrap: wrap;
gap: 20px;
justify-content: center;
min-width: 100%;
overflow-x: auto;
padding: 20px 10px;
width: 100%;
```

### .scrolled

**出现在文件:**

- components/controls.css
- utils/responsive.css

**属性:**

```css
padding-top: 12px;
```

### .section-title

**出现在文件:**

- base/layout.css
- components/matrix.css

**属性:**

```css
border-bottom: 1px solid var(--border-color, #e0e0e0);
font-size: 1.2em;
margin-bottom: 12px;
padding-bottom: 10px;
```

### .sequence-display

**出现在文件:**

- components/controls.css

**属性:**

```css
display: flex;
gap: 10px;
margin: 20px 0;
```

### .step-controls

**出现在文件:**

- components/controls.css
- utils/responsive.css

**属性:**

```css
display: flex;
flex-direction: column;
font-size: 14px;
gap: 10px;
justify-content: space-between;
padding: 6px 14px;
padding-top: 12px;
width: 100%;
```

### .step-explanation

**出现在文件:**

- components/controls.css

**属性:**

```css
background: white;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
margin: 20px 0;
padding: 20px;
position: relative;
```

### .step-indicator

**出现在文件:**

- components/controls.css
- utils/responsive.css

**属性:**

```css
font-size: 14px;
justify-content: center;
order: -1;
width: 100%;
```

### .token

**出现在文件:**

- components/controls.css

**属性:**

```css
background: var(--matrix-bg);
border-radius: 6px;
color: var(--primary-color);
font-weight: bold;
padding: 10px 15px;
```

### .token-label

**出现在文件:**

- components/attention.css
- components/matrix.css

**属性:**

```css
align-items: center;
background: rgba(0, 122, 255, 0.1);
border-radius: 4px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
color: var(--text-color);
display: flex;
flex: 0 0 auto;
font-weight: bold;
height: 28px;
justify-content: center;
margin-bottom: 2px;
margin-right: 5px;
min-width: 20px;
padding: 0 5px;
```

### .ultra-compact-matrix

**出现在文件:**

- components/matrix.css

**属性:**

```css
align-items: center;
border: 1px solid rgba(0,0,0,0.1);
border-radius: 0;
display: flex;
flex-direction: column;
font-size: 1em;
gap: 1px;
height: 32px;
justify-content: center;
margin: 0;
margin-bottom: 1px;
padding: 0;
width: 40px;
```

