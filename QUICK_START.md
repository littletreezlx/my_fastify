# 快速参考

## 一键启动

```bash
pnpm install          # 首次运行
./start-dev.sh        # 开发模式
```

## 常用命令

```bash
pnpm run dev          # 开发（热重载）
pnpm run build        # 构建
pnpm start            # 生产模式
```

## 测试接口

```bash
# 健康检查
curl localhost:3000/health

# CRUD 示例
curl localhost:3000/api/items
curl -X POST localhost:3000/api/items -H 'Content-Type: application/json' -d '{"name":"测试"}'
curl -X PUT localhost:3000/api/items/1 -H 'Content-Type: application/json' -d '{"name":"更新"}'
curl -X DELETE localhost:3000/api/items/1
```

## 添加新功能

1. 在 `src/routes/` 创建路由文件
2. 在 `src/app.ts` 中注册：`app.register(myRoutes)`
3. 保存后自动重启

## 项目特点

- ✅ 最小化依赖，无过度设计
- ✅ 类型安全（TypeScript strict mode）
- ✅ 开发热重载
- ✅ 生产环境构建优化
- ✅ 清晰的代码注释
