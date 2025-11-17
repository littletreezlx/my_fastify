/**
 * Example Routes
 *
 * 示例路由，展示常见用法：
 * - GET/POST/PUT/DELETE
 * - 路径参数和查询参数
 * - 请求体处理
 */

import { FastifyInstance } from 'fastify';

interface Item {
  id: number;
  name: string;
  createdAt: string;
}

// 简单的内存存储（仅用于示例）
const items: Item[] = [];
let nextId = 1;

export default async function exampleRoutes(app: FastifyInstance) {
  // 根路径
  app.get('/', async () => {
    return {
      message: 'Welcome to Fastify API',
      endpoints: {
        health: '/health',
        ping: '/ping',
        items: '/api/items'
      }
    };
  });

  // 获取所有项目
  app.get('/api/items', async (request) => {
    const { limit = '10' } = request.query as { limit?: string };
    return {
      total: items.length,
      items: items.slice(0, parseInt(limit))
    };
  });

  // 获取单个项目
  app.get<{ Params: { id: string } }>('/api/items/:id', async (request, reply) => {
    const id = parseInt(request.params.id);
    const item = items.find(i => i.id === id);

    if (!item) {
      reply.code(404);
      return { error: 'Item not found' };
    }

    return item;
  });

  // 创建项目
  app.post<{ Body: { name: string } }>('/api/items', async (request, reply) => {
    const { name } = request.body;

    if (!name || name.trim() === '') {
      reply.code(400);
      return { error: 'Name is required' };
    }

    const item: Item = {
      id: nextId++,
      name: name.trim(),
      createdAt: new Date().toISOString()
    };

    items.push(item);
    reply.code(201);
    return item;
  });

  // 更新项目
  app.put<{ Params: { id: string }; Body: { name: string } }>(
    '/api/items/:id',
    async (request, reply) => {
      const id = parseInt(request.params.id);
      const { name } = request.body;
      const index = items.findIndex(i => i.id === id);

      if (index === -1) {
        reply.code(404);
        return { error: 'Item not found' };
      }

      if (!name || name.trim() === '') {
        reply.code(400);
        return { error: 'Name is required' };
      }

      items[index].name = name.trim();
      return items[index];
    }
  );

  // 删除项目
  app.delete<{ Params: { id: string } }>('/api/items/:id', async (request, reply) => {
    const id = parseInt(request.params.id);
    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
      reply.code(404);
      return { error: 'Item not found' };
    }

    items.splice(index, 1);
    reply.code(204);
    return;
  });
}
