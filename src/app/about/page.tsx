'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Header from '@/components/Header';

export default function About() {
  const avatarRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // 动画效果 - 头像
    gsap.from(avatarRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: 'power3.out',
    });

    // 动画效果 - 标题
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });

    // 动画效果 - 内容
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.6,
      stagger: 0.2, // 子元素依次动画
    });
  }, []);

  return (
    <>
      <Header />
      <div id="about" className="page">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div
              ref={contentRef}
              className="mb-8 flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-y-0 md:space-x-8"
            >
              <img
                ref={avatarRef}
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
                alt="Avatar"
                className="h-32 w-32 rounded-full shadow-lg"
              />
              <div className="flex-1 text-center md:text-left">
                <h2
                  ref={titleRef}
                  className="mb-2 text-3xl font-bold text-gray-900"
                >
                  张三
                </h2>
                <p className="mb-4 text-xl text-gray-600">
                  全栈工程师 | 开源爱好者
                </p>
                <div className="flex justify-center space-x-4 md:justify-start">
                  {/* Social links */}
                  <a
                    href="#"
                    className="text-gray-600 transition hover:text-blue-600"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  {/* Add more icons here */}
                </div>
              </div>
            </div>

            <div ref={contentRef} className="space-y-6 text-gray-700">
              <div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  👋 你好
                </h3>
                <p className="leading-relaxed">
                  我是一名充满热情的全栈工程师，专注于 Web
                  开发和用户体验设计。我相信技术可以改变世界，
                  并致力于创造优雅、高效的解决方案。
                </p>
              </div>

              {/* 技术栈 */}
              <div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  💻 技术栈
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700">
                    JavaScript
                  </span>
                  <span className="rounded-full bg-green-100 px-4 py-2 font-medium text-green-700">
                    Vue.js
                  </span>
                  <span className="rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700">
                    React
                  </span>
                  {/* Add more skills */}
                </div>
              </div>

              {/* 兴趣爱好 */}
              <div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  🎯 兴趣爱好
                </h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>开源项目贡献</li>
                  <li>技术写作与分享</li>
                  <li>UI/UX 设计</li>
                  <li>阅读与摄影</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
