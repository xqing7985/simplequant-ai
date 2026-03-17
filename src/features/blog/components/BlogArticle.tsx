import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import type { BlogPost } from '@/features/blog/types/blog';

type BlogArticleProps = {
  post: BlogPost;
  content: React.ReactNode;
};

export const BlogArticle = ({ post, content }: BlogArticleProps) => {
  const t = useTranslations('Blog');
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'zh';

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <Link
          href={`/${locale}/blog`}
          className="mb-6 inline-flex items-center text-sm text-purple-600 hover:text-purple-500"
        >
          <svg
            className="mr-1 size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t('back_to_list')}
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          {/* 研报类型标识 */}
          {post.contentType === 'report' && (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {t('report_badge')}
            </span>
          )}
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <p className="mb-4 text-lg text-muted-foreground">{post.description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {t('published_on')}
            {' '}
            {post.publishedAt}
          </time>
        </div>
      </header>

      {post.coverImage && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="size-full object-cover"
          />
        </div>
      )}

      {/* 研报信息区块 */}
      {post.contentType === 'report' && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">研报信息</h3>
          <div className="grid gap-3 text-sm">
            {post.reportSource && (
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground">
                  {t('report_source')}
                  ：
                </span>
                <span>{post.reportSource}</span>
              </div>
            )}
            {post.reportAuthor && (
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground">
                  {t('report_author')}
                  ：
                </span>
                <span>{post.reportAuthor}</span>
              </div>
            )}
            {post.reportDate && (
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground">
                  {t('report_date')}
                  ：
                </span>
                <span>{post.reportDate}</span>
              </div>
            )}
            {post.pdfUrl && (
              <div className="mt-4 flex gap-3">
                <a
                  href={post.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                >
                  <svg
                    className="mr-2 size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {t('view_pdf')}
                </a>
                <a
                  href={post.pdfUrl}
                  download
                  className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500"
                >
                  <svg
                    className="mr-2 size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {t('download_pdf')}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="prose prose-lg max-w-none dark:prose-invert">
        {content}
      </div>

      {/* PDF 预览区域 */}
      {post.contentType === 'report' && post.pdfUrl && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">PDF 预览</h3>
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              src={post.pdfUrl}
              className="h-[600px] w-full"
              title="PDF Preview"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            如果预览无法显示，请点击上方的"查看 PDF"按钮在新窗口中打开。
          </p>
        </div>
      )}

      <footer className="mt-12 border-t border-border pt-8">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-sm text-purple-600 hover:text-purple-500"
        >
          <svg
            className="mr-1 size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t('back_to_list')}
        </Link>
      </footer>
    </article>
  );
};
