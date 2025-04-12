#!/usr/bin/env /workspace/tmp_windsurf/py310/bin/python3

from openai import OpenAI
import argparse

def create_llm_client():
    client = OpenAI(
        base_url="http://192.168.180.137:8006/v1",
        api_key="not-needed"  # API key might not be needed for local deployment
    )
    return client

def query_llm(prompt, client=None, model="Qwen/Qwen2.5-32B-Instruct-AWQ"):
    if client is None:
        client = create_llm_client()
    
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error querying LLM: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description='Query an LLM with a prompt')
    parser.add_argument('--prompt', type=str, help='The prompt to send to the LLM', required=True)
    parser.add_argument('--model', type=str, default="Qwen/Qwen2.5-32B-Instruct-AWQ",
                       help='The model to use (default: Qwen/Qwen2.5-32B-Instruct-AWQ)')
    args = parser.parse_args()

    client = create_llm_client()
    response = query_llm(args.prompt, client, model=args.model)
    if response:
        print(response)
    else:
        print("Failed to get response from LLM")

if __name__ == "__main__":
    main()
