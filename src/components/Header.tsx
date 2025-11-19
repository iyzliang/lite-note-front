'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { Search, X, Feather } from 'lucide-react';
import Link from 'next/link';
import { useSearchKeyword } from '@/contexts/ThemeContext';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { setSearchKeyword } = useSearchKeyword();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(searchQuery);
  };

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchKeyword('');
    }
  }, [isSearchOpen]);

  return (
    <header className="border-secondary-200 dark:border-secondary-800 dark:bg-secondary-900/80 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="from-primary-500 to-accent-500 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
              <span className="text-lg font-bold text-white">
                <Feather />
              </span>
            </div>
            <span className="gradient-text text-xl font-bold">LiteNote</span>
          </Link>

          {/* <div className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
            >
              首页
            </a>
            <a
              href="/articles"
              className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
            >
              项目
            </a>
            <a
              href="/about"
              className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
            >
              关于
            </a>
          </div> */}

          <div className="flex items-center gap-4">
            <div className="relative">
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearch}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索文章..."
                    className="bg-secondary-100 focus:ring-primary-500 dark:bg-secondary-800 w-48 rounded-lg border-0 px-4 py-2 text-sm transition-all outline-none focus:w-64 focus:ring-2 lg:w-64"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800 rounded-lg p-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800 rounded-lg p-2"
                  aria-label="搜索"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light');
              }}
              className="text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800 rounded-lg p-2 transition-colors"
              aria-label="切换主题"
            >
              {theme === 'light' && (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
              {theme === 'dark' && (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800 rounded-lg p-2 transition-colors md:hidden"
              aria-label="菜单"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-secondary-200 dark:border-secondary-800 border-t py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="/"
                className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </a>
              <a
                href="/articles"
                className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                项目
              </a>
              <a
                href="/about"
                className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                关于
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
