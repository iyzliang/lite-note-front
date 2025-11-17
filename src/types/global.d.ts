/**
 * 分页参数
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * 分页响应
 */
export interface PaginationResponse<T> {
  result: T[];
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

/**
 * API 响应基础类型
 */
export interface ApiResponse<T = any> {
  data?: T;
  code: string;
  message: string;
  time: string;
}

/**
 * 组件基础 Props
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}