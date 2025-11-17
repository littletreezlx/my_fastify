#!/bin/bash

# 开发环境启动脚本

echo "🚀 Starting development server..."

# 检查是否安装了依赖
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# 启动开发服务器
pnpm run dev
