/**
 * Health Check Routes
 *
 * 健康检查接口，用于：
 * - 服务存活性检查
 * - 服务就绪性检查
 */

import { FastifyInstance } from 'fastify';

export default async function healthRoutes(app: FastifyInstance) {
  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  });

  app.get('/ping', async () => {
    return { message: 'pong' };
  });
}
