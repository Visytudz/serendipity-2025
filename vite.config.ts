import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // 本地开发代理：将 /api/notify 转发到钉钉
        proxy: {
          '/api/notify': {
            target: 'https://oapi.dingtalk.com/robot/send?access_token=90c0ca9d5aeb7ecf76029a737fe270adb70e6aefa3d1ab32c290f6d0d46d3702',
            changeOrigin: true,
            ignorePath: true, // 不要在目标 URL 后面追加 /api/notify
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
