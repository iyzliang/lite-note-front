/**
 * 文章标签
 */
export interface ArticleTag {
  /**
   * 标签ID
   */
  id: string;
  /**
   * 标签名称
   */
  name: string;
}

/**
 * 文章列表项
 */
export interface ArticleListItem {
  id: string;
  /**
   * 文章标题
   */
  title: string;
  /**
   * 文章描述
   */
  description: string | null;
  /**
   * 文章封面图片URL
   */
  coverImageUrl: string | null;
  /**
   * 文章阅读时间（分钟）
   */
  readingTimeMinutes: number | null;
  /**
   * 发布时间
   */
  publishedAt?: string;
  /**
   * 是否为热门文章
   */
  isFeatured: boolean;
  /**
   * 文章标签
   */
  tags: ArticleTag[];
}

/**
 * 文章详情
 */
export interface ArticleDetail {
  id: string;
  /**
   * 文章标题
   */
  title: string;
  /**
   * 文章描述
   */
  description: string | null;
  /**
   * 文章内容 Markdown 格式
   */
  content: string;
  /**
   * 文章封面图片URL
   */
  coverImageUrl: string | null;
  /**
   * 作者ID
   */
  authorId: string;
  /**
   * 作者名称
   */
  authorName: string;
  /**
   * 作者头像URL
   */
  authorAvatar: string | null;
  /**
   * 文章阅读量
   */
  viewCount: number;
  /**
   * 文章点赞量
   */
  likeCount: number;
  /**
   * 文章阅读时间（分钟）
   */
  readingTimeMinutes: number | null;
  /**
   * 发布时间
   */
  publishedAt?: string;
  /**
   * 是否为热门文章
   */
  isFeatured: boolean;
  /**
   * 文章标签
   */
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
