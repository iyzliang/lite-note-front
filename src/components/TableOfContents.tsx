'use client';

import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 解析 markdown 中的标题
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));

    const parsedHeadings = matches.map((match, index) => ({
      id: `heading-${index}`,
      text: match[2] || '',
      level: match[1]?.length || 1,
    }))!;

    setHeadings(parsedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    const headingElements = document.querySelectorAll('h1, h2, h3');
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="dark:bg-secondary-900 sticky top-24 rounded-2xl bg-white p-6 shadow-md">
      <h3 className="text-secondary-900 dark:text-secondary-50 mb-4 text-lg font-bold">
        目录
      </h3>
      <nav>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`hover:text-primary-600 dark:hover:text-primary-400 text-left transition-colors ${
                  activeId === heading.id
                    ? 'text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-secondary-600 dark:text-secondary-400'
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;
