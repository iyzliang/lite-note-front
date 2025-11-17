/**
 * 文章标签
 */
export interface ArticleTag {
  id: string;
  name: string;
}

/**
 * 文章列表项
 */
export interface ArticleListItem {
  id: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  readingTimeMinutes: number | null;
  publishedAt: string | null;
  isFeatured: boolean;
  tags: ArticleTag[];
}

/**
 * 文章详情
 */
export interface ArticleDetail {
  id: string;
  title: string;
  description: string | null;
  content: string;
  coverImageUrl: string | null;
  authorId: string;
  authorName: string;
  authorAvatar: string | null;
  viewCount: number;
  likeCount: number;
  readingTimeMinutes: number | null;
  publishedAt: string | null;
  isFeatured: boolean;
  tags: ArticleTag[];
}

/**
 * 获取文章列表参数
 */
export interface GetArticlesParams {
  page?: number;
  limit?: number;
  keyword?: string;
  tagId?: string;
}