/**
 * Fastify Application Factory
 *
 * 核心应用配置，负责：
 * - 创建 Fastify 实例
 * - 注册插件（CORS等）
 * - 注册路由
 */

import Fastify from 'fastify';
import cors from '@fastify/cors';
import healthRoutes from './routes/health';
import exampleRoutes from './routes/example';

export function buildApp() {
  const app = Fastify({
    logger: process.env.NODE_ENV === 'production' ? true : {
      level: process.env.LOG_LEVEL || 'info'
    }
  });

  // 注册 CORS
  app.register(cors, {
    origin: true, // 开发环境允许所有源，生产环境需要配置具体域名
  });

  // 注册路由
  app.register(healthRoutes);
  app.register(exampleRoutes);

  return app;
}
