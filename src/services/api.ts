import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import type { ApiResponse } from '@/types';
import toast from 'react-hot-toast';

// API 基础 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000');

// 创建 axios 实例
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============ 请求拦截器 ============
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// ============ 响应拦截器 ============
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    // 直接返回数据
    return response.data.data;
  },
  (error: AxiosError) => {
    // 统一错误处理
    if (error.response) {
      const data = error.response.data as ApiResponse<any>;
      const { message } = data;
      toast.error(message || '接口离家出走了，请稍后再试。');
    } else if (error.request) {
      toast.error('接口离家出走了，请稍后再试。');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
