'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: '导航',
      links: [
        { name: '首页', href: '/' },
        { name: '项目', href: '/projects' },
        { name: 'About', href: '/about' },
      ],
    },
    {
      title: '资源',
      links: [
        { name: 'RSS 订阅', href: '/rss' },
        { name: '掘金', href: 'https://juejin.cn/' },
        { name: '归档', href: '/archive' },
      ],
    },
  ];

  return (
    <footer className="border-secondary-200 to-secondary-50/50 dark:border-secondary-800 dark:to-secondary-900/50 mt-20 border-t bg-gradient-to-b from-transparent">
      <div className="container-custom py-12">
        <div className="text-secondary-600 dark:border-secondary-800 dark:text-secondary-400 flex flex-col items-center justify-between space-y-4 text-sm md:flex-row md:space-y-0">
          <p>© {currentYear} Yzliang. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>by Yzliang</span>
          </p>
        </div>
        {/* <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-secondary-600 dark:text-secondary-400 mt-4 text-sm">
              记录技术，分享生活
              <br />
              为思考者打造的轻量级笔记与博客工具
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-secondary-900 dark:text-secondary-50 mb-4 text-sm font-semibold tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}

        {/* Bottom Bar */}
        {/* <div className="border-secondary-200 text-secondary-600 dark:border-secondary-800 dark:text-secondary-400 mt-12 flex flex-col items-center justify-between space-y-4 border-t pt-8 text-sm md:flex-row md:space-y-0">
          <p>© {currentYear} Yzliang. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>by Yzliang</span>
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
