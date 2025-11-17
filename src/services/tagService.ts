import apiClient from './api';
import type { SimpleTag, GetTagsParams } from '@/types/index';

export const tagService = {
  /**
   * 获取所有标签
   */
  getAllTags: async (params: GetTagsParams) => {
    return await apiClient.get<SimpleTag[]>('/front/tags', {
      params,
    });
  },
};
