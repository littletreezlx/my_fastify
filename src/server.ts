/**
 * Server Entry Point
 *
 * 应用启动入口，负责：
 * - 加载环境变量
 * - 创建应用实例
 * - 启动 HTTP 服务器
 */

import dotenv from 'dotenv';
import { buildApp } from './app';

// 加载环境变量
dotenv.config();

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

async function start() {
  const app = buildApp();

  try {
    await app.listen({ port: PORT, host: HOST });
    console.log(`\n🚀 Server is running on http://${HOST}:${PORT}\n`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
