import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import ReadingProgress from '@/components/ReadingProgress';
import ArticleMeta from '@/components/ArticleMeta';
import TableOfContents from '@/components/TableOfContents';
import { articleService } from '@/services/articleService';
import { notFound } from 'next/navigation';

// 导入代码高亮样式
import 'highlight.js/styles/github-dark.css';
import ArticleActions from '@/components/ArticleActions';

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  let article;
  try {
    const res = await articleService.getArticleDetail(id);
    article = res.data;
  } catch (error) {
    // 请求失败，跳转到not-found页面
    notFound();
  }

  // 如果接口返回了空数据，也跳转
  if (!article) {
    notFound();
  }

  // 为标题添加 ID
  let headingIndex = 0;
  const addHeadingIds = (content: string) => {
    return content.replace(/^(#{1,3})\s+(.+)$/gm, (match, hashes, text) => {
      const id = `heading-${headingIndex++}`;
      return `${hashes} <span id="${id}">${text}</span>`;
    });
  };

  const contentWithIds = addHeadingIds(article.content);

  return (
    <>
      <ReadingProgress />
      <ArticleActions
        articleId={article.id}
        initialLikeCount={article.likeCount}
      />
      <article className="container-custom py-12">
        <div className="mx-auto max-w-4xl">
          {/* 封面图 */}
          {article.coverImageUrl && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={article.coverImageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* 文章标题 */}
          <h1 className="text-secondary-900 dark:text-secondary-50 mb-4 text-4xl font-bold md:text-5xl">
            {article.title}
          </h1>

          {/* 文章描述 */}
          {article.description && (
            <p className="text-secondary-600 dark:text-secondary-400 mb-8 text-xl">
              {article.description}
            </p>
          )}

          {/* 文章元信息 */}
          <ArticleMeta article={article} />

          {/* 分隔线 */}
          <hr className="border-secondary-200 dark:border-secondary-800 my-8" />

          {/* 主内容区域 */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* 文章内容 */}
            <div className="lg:col-span-3">
              <div className="markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    img: ({ node, ...props }) => (
                      <Image
                        {...props}
                        src={(props.src as string) || ''}
                        alt={props.alt || ''}
                        width={800}
                        height={600}
                        className="rounded-lg"
                      />
                    ),
                  }}
                >
                  {contentWithIds}
                </ReactMarkdown>
              </div>
            </div>

            {/* 目录 */}
            <div className="hidden lg:col-span-1 lg:block">
              <TableOfContents content={article.content} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

// 生成元数据
export async function generateMetadata({ params }: ArticlePageProps) {
  const { id } = await params;

  try {
    const { data: article } = await articleService.getArticleDetail(id);

    return {
      title: article.title,
      description: article.description || `阅读 ${article.authorName} 的文章`,
      openGraph: {
        title: article.title,
        description: article.description || undefined,
        images: article.coverImageUrl ? [article.coverImageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: '文章未找到',
    };
  }
}
