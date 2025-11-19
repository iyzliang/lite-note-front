'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Eye, Heart, User } from 'lucide-react';
import type { ArticleDetail } from '@/types';

interface ArticleMetaProps {
  article: ArticleDetail;
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ article }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '未知日期';
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mb-8 space-y-6">
      {/* 作者信息 */}
      <div className="flex items-center gap-4">
        <div className="bg-secondary-200 dark:bg-secondary-800 relative h-12 w-12 overflow-hidden rounded-full">
          {article.authorAvatar ? (
            <Image
              src={article.authorAvatar}
              alt={article.authorName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="text-secondary-400 h-6 w-6" />
            </div>
          )}
        </div>
        <div>
          <div className="text-secondary-900 dark:text-secondary-50 font-medium">
            {article.authorName}
          </div>
          <div className="text-secondary-600 dark:text-secondary-400 text-sm">
            发布于 {formatDate(article.publishedAt)}
          </div>
        </div>
      </div>

      {/* 文章统计 */}
      <div className="text-secondary-600 dark:text-secondary-400 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        {article.readingTimeMinutes && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{article.readingTimeMinutes} 分钟阅读</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Eye className="h-4 w-4" />
          <span>{article.viewCount.toLocaleString()} 次浏览</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Heart className="h-4 w-4" />
          <span>{article.likeCount.toLocaleString()} 个赞</span>
        </div>
      </div>

      {/* 标签 */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 rounded-full px-3 py-1 text-sm font-medium"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleMeta;
