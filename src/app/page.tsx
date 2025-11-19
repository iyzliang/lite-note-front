'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArticleCard from '@/components/ArticleCard';
import TagCloud from '@/components/TagCloud';
import Footer from '@/components/Footer';
import { articleService } from '@/services/articleService';
import { tagService } from '@/services/tagService';
import { useSearchKeyword } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import type { ArticleListItem, SimpleTag } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [tags, setTags] = useState<SimpleTag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { searchKeyword } = useSearchKeyword();

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // 加载文章
  const loadArticles = async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const { data } = await articleService.getArticles({
        page: currentPage,
        limit: 10,
        tagId: selectedTagId || undefined,
        keyword: searchKeyword || undefined,
      });

      if (reset) {
        setArticles(data.result);
        setPage(1);
      } else {
        setArticles((prev) => [...prev, ...data.result]);
      }

      setHasMore(data.page < data.totalPage);
      setPage(currentPage + 1);
    } catch (error) {
      console.error('加载文章失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 加载标签
  const loadTags = async () => {
    try {
      const { data } = await tagService.getAllTags({
        limit: 20,
        isPopular: true,
      });
      console.log('--->tags', data);
      setTags(data);
    } catch (error) {
      console.error('加载标签失败:', error);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    loadArticles(true);
  }, [selectedTagId, searchKeyword]);

  // Hero 区域动画
  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !subtitleRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      }).from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleTagClick = (tagId: string) => {
    setSelectedTagId(tagId);
  };

  const handleLoadMore = () => {
    loadArticles();
  };

  return (
    <>
      <Header />
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="bg-primary-200/30 dark:bg-primary-900/20 absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-accent-200/30 dark:bg-accent-900/20 absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-3xl" />
        </div>

        <div className="container-custom text-center">
          <h1
            ref={titleRef}
            className="mb-6 text-5xl leading-tight font-bold md:text-6xl lg:text-7xl"
          >
            <span className="gradient-text">探索知识</span>
            <br />
            <span className="text-secondary-900 dark:text-secondary-50">
              分享智慧
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-secondary-600 dark:text-secondary-400 mx-auto text-lg md:text-xl"
          >
            在这里，记录技术成长的每一步，分享生活中的美好瞬间
          </p>
        </div>
      </section>

      <main className="container-custom pb-20">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-9">
            {loading && articles.length === 0 ? (
              // 骨架屏 - 3列布局
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-secondary-200 dark:bg-secondary-800 h-96 animate-pulse rounded-2xl"
                  />
                ))}
              </div>
            ) : articles.length === 0 ? (
              // 空状态
              <div className="glass rounded-2xl p-12 text-center">
                <p className="text-secondary-600 dark:text-secondary-400">
                  暂无文章
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                {/* 加载更多按钮 */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="btn btn-primary btn-lg disabled:opacity-50"
                    >
                      {loading ? '加载中...' : '加载更多'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <aside className="lg:col-span-3">
            <TagCloud
              tags={tags}
              selectedTagId={selectedTagId}
              onTagClick={handleTagClick}
            />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
