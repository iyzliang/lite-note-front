/**
 * 简单标签
 */
export interface SimpleTag {
  id: string;
  name: string;
}

/**
 * 热门标签参数
 */
export interface GetTagsParams {
  limit?: number;
  isPopular?: boolean;
}
