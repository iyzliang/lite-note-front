'use client';

import { useEffect } from 'react';
import { articleService } from '@/services/articleService';

interface ArticleViewTrackerProps {
  articleId: string;
}

const ArticleViewTracker = ({ articleId }: ArticleViewTrackerProps) => {
  useEffect(() => {
    let accumulatedDuration = 0;
    let visibleStart: number | null =
      typeof document !== 'undefined' && document.visibilityState === 'visible'
        ? Date.now()
        : null;

    const pauseTimer = () => {
      if (visibleStart !== null) {
        accumulatedDuration += Date.now() - visibleStart;
        visibleStart = null;
      }
    };

    const resumeTimer = () => {
      if (visibleStart === null) {
        visibleStart =
          typeof document !== 'undefined' &&
          document.visibilityState === 'visible'
            ? Date.now()
            : null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        pauseTimer();
      } else {
        resumeTimer();
      }
    };

    const reportDuration = () => {
      pauseTimer();
      const durationSeconds = Math.round(accumulatedDuration / 1000);

      if (durationSeconds > 0) {
        void articleService
          .postViewLog(articleId, durationSeconds)
          .catch((error) => {
            console.error('文章浏览时长上报失败', error);
          });
        accumulatedDuration = 0;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', reportDuration);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', reportDuration);
      reportDuration();
    };
  }, [articleId]);

  return null;
};

export default ArticleViewTracker;
