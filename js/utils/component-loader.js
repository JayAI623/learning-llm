/**
 * 组件加载器 - 用于动态加载HTML组件
 */

/**
 * 从组件文件加载HTML片段并插入到指定元素中
 * @param {string} url - 组件HTML文件的路径
 * @param {string} targetSelector - 目标容器的CSS选择器
 * @returns {Promise} - 返回Promise以便链式调用
 */
async function loadComponent(url, targetSelector) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`无法加载组件: ${url}, 状态: ${response.status}`);
        }
        
        const html = await response.text();
        const targetElement = document.querySelector(targetSelector);
        
        if (!targetElement) {
            throw new Error(`目标元素不存在: ${targetSelector}`);
        }
        
        targetElement.innerHTML = html;
        return true;
        
    } catch (error) {
        console.error('加载组件时出错:', error);
        return false;
    }
}

/**
 * 加载多个组件到指定容器中
 * @param {Array} componentConfigs - 组件配置数组，每个元素包含{url, target}
 * @returns {Promise} - 返回Promise以便链式调用
 */
async function loadComponents(componentConfigs) {
    const loadPromises = componentConfigs.map(config => 
        loadComponent(config.url, config.target)
    );
    
    return Promise.all(loadPromises);
}

export {
    loadComponent,
    loadComponents
}; 