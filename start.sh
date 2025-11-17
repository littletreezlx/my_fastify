#!/bin/bash

# 生产环境启动脚本

echo "🏗️  Building project..."
pnpm run clean
pnpm run build

echo "🚀 Starting production server..."
pnpm start
