'use client';

import React, { useEffect, useState } from 'react';

const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // 初始化

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="bg-secondary-200 dark:bg-secondary-800 fixed top-0 right-0 left-0 z-50 h-1">
      <div
        className="from-primary-500 to-accent-500 h-full bg-gradient-to-r transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
