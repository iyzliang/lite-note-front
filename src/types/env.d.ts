/**
 * 环境变量类型定义
 */
declare namespace NodeJS {
  interface ProcessEnv {
    // 服务器配置
    PORT: string;
    HOSTNAME: string;
    // API 配置
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_API_TIMEOUT: string;
    // 站点配置
    NEXT_PUBLIC_SITE_NAME: string;
    NEXT_PUBLIC_SITE_DESCRIPTION: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
