import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { BlogPost } from '@/features/blog/types/blog';

type BlogArticleProps = {
  post: BlogPost;
  content: React.ReactNode;
};

export const BlogArticle = ({ post, content }: BlogArticleProps) => {
  const t = useTranslations('Blog');

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <Link
          href="/blog"
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

      <div className="prose prose-lg max-w-none dark:prose-invert">
        {content}
      </div>

      <footer className="mt-12 border-t border-border pt-8">
        <Link
          href="/blog"
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
