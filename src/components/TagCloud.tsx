'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SimpleTag } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface TagCloudProps {
  tags: SimpleTag[];
  selectedTagId?: string;
  onTagClick?: (tagId: string) => void;
}

const TagCloud: React.FC<TagCloudProps> = ({
  tags,
  selectedTagId,
  onTagClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || tags.length === 0) return;

    const ctx = gsap.context(() => {
      // 容器动画
      gsap.from(containerRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      });

      // 标签动画
      tagsRef.current.forEach((tag, index) => {
        if (tag) {
          gsap.from(tag, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            delay: index * 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [tags]);

  // 处理标签点击
  const handleTagClick = (tagId: string) => {
    onTagClick?.(tagId);
  };

  return (
    <div
      ref={containerRef}
      className="fade-in-right glass sticky top-24 rounded-2xl p-6 shadow-md"
    >
      <h2 className="text-secondary-900 dark:text-secondary-50 mb-4 text-lg font-bold">
        热门标签
      </h2>

      {tags.length === 0 ? (
        <p className="text-secondary-600 dark:text-secondary-400 text-sm">
          暂无标签
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {/* 全部按钮 */}
          <button
            onClick={() => handleTagClick('')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              !selectedTagId
                ? 'from-primary-500 to-accent-500 bg-gradient-to-r text-white shadow-lg'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
            }`}
            aria-label="显示全部文章"
          >
            全部
          </button>

          {/* 标签列表 */}
          {tags.map((tag, index) => (
            <button
              key={tag.id}
              ref={(el) => {
                tagsRef.current[index] = el;
              }}
              onClick={() => handleTagClick(tag.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                selectedTagId === tag.id
                  ? 'from-primary-500 to-accent-500 bg-gradient-to-r text-white shadow-lg'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
              }`}
              aria-label={`筛选 ${tag.name} 标签`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagCloud;
