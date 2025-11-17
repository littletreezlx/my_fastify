# My Fastify Server

简单的 Fastify + TypeScript 服务器，用于功能验证和个人使用。

## 特点

- ✅ TypeScript 支持
- ✅ 开箱即用的热重载开发环境
- ✅ 简洁的项目结构
- ✅ 示例 CRUD 路由
- ✅ 健康检查接口

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm run dev
# 或
./start-dev.sh
```

服务器将在 http://localhost:3000 启动，代码修改后自动重启。

### 生产模式

```bash
pnpm run build
pnpm start
# 或
./start.sh
```

## API 接口

### 健康检查

- `GET /health` - 服务健康状态
- `GET /ping` - 简单的 ping-pong

### 示例 CRUD

- `GET /` - 欢迎页面和接口列表
- `GET /api/items` - 获取所有项目（支持 `?limit=N` 查询参数）
- `GET /api/items/:id` - 获取单个项目
- `POST /api/items` - 创建新项目（请求体：`{ "name": "..." }`）
- `PUT /api/items/:id` - 更新项目（请求体：`{ "name": "..." }`）
- `DELETE /api/items/:id` - 删除项目

## 项目结构

```
my_fastify/
├── src/
│   ├── app.ts              # Fastify 应用工厂
│   ├── server.ts           # 服务器入口
│   ├── routes/             # 路由目录
│   │   ├── health.ts       # 健康检查路由
│   │   └── example.ts      # 示例 CRUD 路由
│   └── utils/              # 工具函数
│       └── logger.ts       # 日志工具
├── .env                    # 环境变量
├── package.json
├── tsconfig.json
├── start-dev.sh            # 开发启动脚本
└── start.sh                # 生产启动脚本
```

## 环境变量

在 `.env` 文件中配置：

```bash
PORT=3000           # 服务端口
HOST=0.0.0.0        # 服务地址
LOG_LEVEL=info      # 日志级别 (debug, info, warn, error)
```

## 添加新路由

1. 在 `src/routes/` 创建新文件
2. 导出异步函数接收 `FastifyInstance`
3. 在 `src/app.ts` 中注册路由

示例：

```typescript
// src/routes/my-route.ts
import { FastifyInstance } from 'fastify';

export default async function myRoutes(app: FastifyInstance) {
  app.get('/my-endpoint', async () => {
    return { message: 'Hello!' };
  });
}
```

```typescript
// src/app.ts
import myRoutes from './routes/my-route';

// ...
app.register(myRoutes);
```

## 测试接口

使用 curl 或 Postman 测试：

```bash
# 健康检查
curl http://localhost:3000/health

# 获取所有项目
curl http://localhost:3000/api/items

# 创建项目
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "测试项目"}'

# 更新项目
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "更新的项目"}'

# 删除项目
curl -X DELETE http://localhost:3000/api/items/1
```

## 常用命令

```bash
pnpm run dev      # 开发模式（带热重载）
pnpm run build    # 构建生产版本
pnpm start        # 启动生产服务器
pnpm run clean    # 清理构建目录
```

## 注意事项

- 项目使用内存存储数据（重启后数据丢失），仅用于演示
- 生产环境需要配置具体的 CORS 域名
- 根据需要添加数据库、认证等功能
