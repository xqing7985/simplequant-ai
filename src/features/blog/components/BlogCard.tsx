import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { BlogPost } from '@/features/blog/types/blog';

type BlogCardProps = {
  post: BlogPost;
};

export const BlogCard = ({ post }: BlogCardProps) => {
  const t = useTranslations('Blog');

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      {post.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img
            src={post.coverImage}
            alt={post.title}
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap gap-2">
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

        <h2 className="text-xl font-bold tracking-tight group-hover:text-purple-600">
          {post.title}
        </h2>

        <p className="line-clamp-2 text-muted-foreground">{post.description}</p>

        <div className="mt-auto flex items-center justify-between">
          <time
            className="text-sm text-muted-foreground"
            dateTime={post.publishedAt}
          >
            {t('published_on')}
            {' '}
            {post.publishedAt}
          </time>

          <Link
            href={`/${post.locale}/blog/${post.slug}`}
            className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500"
          >
            {t('read_more')}
            <svg
              className="ml-1 size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};
