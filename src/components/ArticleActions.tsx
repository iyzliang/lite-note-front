'use client';

import React, { useState } from 'react';
import { Heart, Share2, Link } from 'lucide-react';
import { articleService } from '@/services/articleService';
import toast from 'react-hot-toast';

interface ArticleActionsProps {
  articleId: string;
  initialLikeCount: number;
  initialIsLiked?: boolean;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({
  articleId,
  initialLikeCount,
  initialIsLiked = false,
}) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleLike = async () => {
    if (isLiked) {
      await articleService.unlikeArticle(articleId);
    } else {
      await articleService.likeArticle(articleId);
    }
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('链接已复制到剪贴板');
    } catch (error) {
      console.error('复制链接失败:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (error) {
        console.error('分享失败:', error);
      }
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      toast.success('链接已复制到剪贴板');
    }
  };

  return (
    <div className="dark:bg-secondary-900 sticky right-0 bottom-8 left-0 mx-auto flex w-fit items-center gap-4 rounded-full bg-white px-6 py-3 shadow-lg">
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 transition-colors ${
          isLiked
            ? 'text-accent-500'
            : 'text-secondary-600 hover:text-accent-500 dark:text-secondary-400'
        }`}
      >
        <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
        <span className="text-sm font-medium">{likeCount}</span>
      </button>

      <button
        onClick={handleCopyLink}
        className="text-secondary-600 hover:text-primary-500 dark:text-secondary-400 transition-colors"
      >
        <Link className="h-5 w-5" />
      </button>

      <button
        onClick={handleShare}
        className="text-secondary-600 hover:text-primary-500 dark:text-secondary-400 transition-colors"
      >
        <Share2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ArticleActions;
