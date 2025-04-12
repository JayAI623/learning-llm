#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
CSS类提取器 - 用于扫描项目中的所有CSS文件，提取类并生成总结
"""

import os
import re
import json
from collections import defaultdict

def extract_css_classes(css_content):
    """从CSS内容中提取所有类选择器"""
    # 正则表达式匹配CSS类选择器
    class_pattern = r'\.([a-zA-Z0-9_-]+)(?=[^}]*\{)'
    classes = re.findall(class_pattern, css_content)
    return list(set(classes))  # 去重

def extract_css_properties(css_content, class_name):
    """提取CSS类的属性"""
    # 匹配特定类选择器的完整规则块
    try:
        escaped_class = re.escape(class_name)
        pattern = r'\.{}[^{{]*{{([^}}]*)}}'.format(escaped_class)
        matches = re.findall(pattern, css_content)
        
        properties = {}
        if matches:
            # 提取属性
            for match in matches:
                prop_pattern = r'([a-zA-Z-]+)\s*:\s*([^;]+);'
                props = re.findall(prop_pattern, match)
                for prop, value in props:
                    properties[prop.strip()] = value.strip()
        
        return properties
    except Exception as e:
        print(f"提取类 {class_name} 的属性时出错: {str(e)}")
        return {}

def scan_css_files(directory):
    """扫描目录及其子目录中的所有CSS文件"""
    css_files = []
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.css') and not file.endswith('.bak'):
                css_files.append(os.path.join(root, file))
    
    return css_files

def generate_css_summary(css_directory):
    """生成CSS类总结"""
    css_files = scan_css_files(css_directory)
    class_summary = defaultdict(dict)
    file_classes = {}
    
    for css_file in css_files:
        try:
            with open(css_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            rel_path = os.path.relpath(css_file, css_directory)
            classes = extract_css_classes(content)
            file_classes[rel_path] = classes
            
            for class_name in classes:
                properties = extract_css_properties(content, class_name)
                if properties:
                    class_summary[class_name][rel_path] = properties
        except Exception as e:
            print(f"处理文件 {css_file} 时出错: {str(e)}")
    
    return {
        'class_summary': dict(class_summary),
        'file_classes': file_classes
    }

def save_summary(summary, output_file):
    """保存总结到JSON文件"""
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)

def generate_markdown_summary(summary, output_file):
    """生成Markdown格式的总结"""
    class_summary = summary['class_summary']
    file_classes = summary['file_classes']
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# CSS类总结\n\n")
        
        # 按文件列出类
        f.write("## 按文件分类\n\n")
        for file_path, classes in sorted(file_classes.items()):
            f.write(f"### {file_path}\n\n")
            for class_name in sorted(classes):
                f.write(f"- `.{class_name}`\n")
            f.write("\n")
        
        # 按类列出属性和文件
        f.write("## 按类分类\n\n")
        for class_name, files in sorted(class_summary.items()):
            f.write(f"### .{class_name}\n\n")
            f.write("**出现在文件:**\n\n")
            for file_path in sorted(files.keys()):
                f.write(f"- {file_path}\n")
            
            # 显示第一个文件中的属性（通常属性在不同文件中相同）
            if files:
                first_file = next(iter(files.keys()))
                properties = files[first_file]
                if properties:
                    f.write("\n**属性:**\n\n```css\n")
                    for prop, value in sorted(properties.items()):
                        f.write(f"{prop}: {value};\n")
                    f.write("```\n\n")

def generate_css_utility_file(summary, output_file):
    """生成可复用的CSS工具类文件"""
    class_summary = summary['class_summary']
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("/* CSS工具类库 - 自动生成，用于提高复用性 */\n\n")
        
        for class_name, files in sorted(class_summary.items()):
            if files:
                # 获取第一个文件中的属性
                first_file = next(iter(files.keys()))
                properties = files[first_file]
                
                if properties:
                    f.write(f"/* 从 {first_file} 提取 */\n")
                    f.write(f".{class_name} {{\n")
                    for prop, value in sorted(properties.items()):
                        f.write(f"  {prop}: {value};\n")
                    f.write("}\n\n")

def extract_css_from_html(directory):
    """从HTML文件中提取内联CSS类"""
    html_files = []
    inline_classes = defaultdict(list)
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 匹配所有class属性
            class_pattern = r'class=["\'](.*?)["\']'
            matches = re.findall(class_pattern, content)
            
            if matches:
                rel_path = os.path.relpath(html_file, directory)
                for match in matches:
                    # 分割多个类名
                    class_names = match.split()
                    for class_name in class_names:
                        if class_name and class_name not in inline_classes[rel_path]:
                            inline_classes[rel_path].append(class_name)
        except Exception as e:
            print(f"处理HTML文件 {html_file} 时出错: {str(e)}")
    
    return dict(inline_classes)

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    css_dir = os.path.join(base_dir, "css")
    output_dir = os.path.join(css_dir, "summary")
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    summary = generate_css_summary(css_dir)
    
    # 从HTML文件中提取内联类
    html_classes = extract_css_from_html(base_dir)
    summary['html_classes'] = html_classes
    
    # 保存JSON格式
    save_summary(summary, os.path.join(output_dir, "css_summary.json"))
    
    # 生成Markdown文档
    generate_markdown_summary(summary, os.path.join(output_dir, "css_summary.md"))
    
    # 生成可复用CSS文件
    generate_css_utility_file(summary, os.path.join(output_dir, "utility.css"))
    
    print(f"CSS类总结已生成到 {output_dir} 目录") 