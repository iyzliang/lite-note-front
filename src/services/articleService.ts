import type {
  PaginationResponse,
  ArticleListItem,
  GetArticlesParams,
  ArticleDetail
} from '@/types';
import apiClient from './api';

export const articleService = {
  /**
   * 获取文章列表
   */
  getArticles: async (params: GetArticlesParams) => {
    return await apiClient.get<PaginationResponse<ArticleListItem>>(
      '/front/articles',
      { params }
    );
  },

  /**
   * 获取文章详情
   */
  getArticleDetail: async (id: string) => {
    return await apiClient.get<ArticleDetail>(`/front/articles/${id}`);
  },

  /**
   * 点赞文章
   */
  likeArticle: async (id: string) => {
    return await apiClient.post(`/front/articles/${id}/like`);
  },

  /**
   * 取消点赞
   */
  unlikeArticle: async (id: string) => {
    return await apiClient.post(`/front/articles/${id}/unlike`);
  },
};
