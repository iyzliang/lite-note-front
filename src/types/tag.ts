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
export interface GetPopularTagsParams {
  limit: number;
}

/**
 * 标签响应
 */
export type TagListResponse = SimpleTag[];
