#!/usr/bin/env python3
import argparse
import subprocess
import sys
from datetime import datetime
from llm_api import query_llm, create_llm_client

def run_git_command(command):
    """运行 git 命令并返回输出"""
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Git 命令执行错误: {e.stderr}", file=sys.stderr)
        sys.exit(1)

def get_git_diff():
    """获取当前更改的 diff 信息"""
    try:
        # 获取未暂存的更改
        unstaged = subprocess.run(['git', 'diff'], capture_output=True, text=True, check=True).stdout
        # 获取已暂存的更改
        staged = subprocess.run(['git', 'diff', '--cached'], capture_output=True, text=True, check=True).stdout
        # 获取未跟踪的文件列表
        untracked = subprocess.run(['git', 'ls-files', '--others', '--exclude-standard'], 
                                 capture_output=True, text=True, check=True).stdout
        
        diff_summary = ""
        if unstaged:
            diff_summary += "未暂存的更改:\n" + unstaged + "\n"
        if staged:
            diff_summary += "已暂存的更改:\n" + staged + "\n"
        if untracked:
            diff_summary += "未跟踪的文件:\n" + untracked
            
        return diff_summary.strip()
    except subprocess.CalledProcessError as e:
        print(f"获取 diff 信息失败: {e.stderr}", file=sys.stderr)
        return None

def generate_commit_message(diff_content):
    """使用 LLM 生成提交信息"""
    prompt = f"""请根据以下 Git 更改生成一个简洁的提交信息（不超过一行）。
更改内容:
{diff_content}

请直接返回提交信息，不要包含任何其他解释或格式。提交信息应该简明扼要地描述这些更改的主要目的。"""
    
    try:
        client = create_llm_client()
        message = query_llm(prompt, client)
        if message:
            # 清理消息（移除多余的换行和引号）
            message = message.strip().strip('"\'').split('\n')[0]
            return message
        return None
    except Exception as e:
        print(f"生成提交信息失败: {e}", file=sys.stderr)
        return None

def create_snapshot(message=None, use_llm=False):
    """创建当前更改的快照"""
    # 检查是否有未提交的更改
    status = run_git_command(['git', 'status', '--porcelain'])
    if not status:
        print("没有检测到任何更改，无需创建快照", file=sys.stderr)
        return

    # 如果启用了 LLM 且没有提供消息，使用 LLM 生成提交信息
    if use_llm and not message:
        diff_content = get_git_diff()
        if diff_content:
            generated_message = generate_commit_message(diff_content)
            if generated_message:
                message = generated_message
                print(f"LLM 生成的提交信息: {message}")
            else:
                print("LLM 生成提交信息失败，将使用默认时间戳", file=sys.stderr)

    # 如果没有提供消息且 LLM 生成失败，使用时间戳
    if not message:
        message = f"Snapshot created at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"

    # 添加所有更改
    run_git_command(['git', 'add', '.'])
    
    # 创建提交
    commit_hash = run_git_command(['git', 'commit', '-m', message])
    print(f"成功创建快照: {commit_hash}")
    return commit_hash

def rollback_snapshot(steps):
    """回滚到之前的快照"""
    try:
        steps = int(steps)
        if steps < 1:
            raise ValueError("回滚步数必须大于 0")
    except ValueError as e:
        print(f"无效的回滚步数: {e}", file=sys.stderr)
        sys.exit(1)

    # 获取当前分支
    current_branch = run_git_command(['git', 'rev-parse', '--abbrev-ref', 'HEAD'])
    
    # 回滚指定步数
    target_commit = run_git_command(['git', 'rev-parse', f'HEAD~{steps}'])
    
    # 执行回滚
    run_git_command(['git', 'reset', '--hard', target_commit])
    print(f"成功回滚到 {steps} 个提交之前: {target_commit}")

def main():
    parser = argparse.ArgumentParser(description='Git 快照工具')
    subparsers = parser.add_subparsers(dest='command', help='可用命令')

    # 创建快照命令
    snapshot_parser = subparsers.add_parser('snapshot', help='创建当前更改的快照')
    snapshot_parser.add_argument('-m', '--message', help='快照描述信息')
    snapshot_parser.add_argument('--llm', action='store_true', help='使用 LLM 自动生成提交信息')

    # 回滚命令
    rollback_parser = subparsers.add_parser('rollback', help='回滚到之前的快照')
    rollback_parser.add_argument('steps', help='回滚的步数')

    args = parser.parse_args()

    if args.command == 'snapshot':
        create_snapshot(args.message, args.llm)
    elif args.command == 'rollback':
        rollback_snapshot(args.steps)
    else:
        parser.print_help()
        sys.exit(1)

if __name__ == '__main__':
    main() 