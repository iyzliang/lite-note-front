import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME || 'Blog - 分享技术见解',
    template: '%s | Blog',
  },
  description: '探索编程世界，分享技术见解，记录成长历程',
  keywords: ['博客', '技术', '编程', '前端', '开发'],
  authors: [{ name: 'Blog' }],
  creator: 'Blog',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://yourdomain.com',
    siteName: 'Blog',
    title: 'Blog - 分享技术见解',
    description: '探索编程世界，分享技术见解，记录成长历程',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - 分享技术见解',
    description: '探索编程世界，分享技术见解，记录成长历程',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">{children}</body>
      <Toaster position="top-right" />
    </html>
  );
}
