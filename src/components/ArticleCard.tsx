import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArticleListItem } from '@/types';
import { gsap } from 'gsap';

interface ArticleCardProps {
  article: ArticleListItem;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const itemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    gsap.from(itemRef.current, {
      opacity: 0,
      y: 50,
    });
    gsap.to(itemRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, [article]);
  return (
    <Link
      className="card flex h-full cursor-pointer flex-col"
      href={`/article/${article.id}`}
      ref={itemRef}
    >
      <div className="bg-secondary-100 mb-4 aspect-video w-full overflow-hidden rounded-lg">
        {article.coverImageUrl ? (
          <img
            src={article.coverImageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="bg-secondary-200 flex h-full w-full items-center justify-center">
            <img src="/placeholder.png" alt="默认图片" className="w-[40%]" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="hover:text-primary-600 mb-2 line-clamp-2 transition-colors">
          {article.title}
        </h3>

        {/* 描述 */}
        <p className="text-secondary-600 mb-4 line-clamp-3 text-sm">
          {article.description}
        </p>

        {/* 标签 */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag.id} className="badge badge-primary">
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* 底部信息 */}
        <div className="text-secondary-500 border-secondary-100 flex items-center justify-start border-t pt-4 text-xs">
          <time dateTime={article.publishedAt}>{article.publishedAt}</time>
        </div>
      </div>
    </Link>
  );
}
