import { getTranslations } from 'next-intl/server';

import { BlogCard } from '@/features/blog/components/BlogCard';
import { getBlogPosts } from '@/features/blog/lib/getBlogPosts';
import { Section } from '@/features/landing/Section';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Blog',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const BlogPage = async (props: { params: { locale: string } }) => {
  const { locale } = props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Blog',
  });

  const posts = await getBlogPosts(locale);

  return (
    <Section
      title={t('page_title')}
      description={t('page_description')}
      className="min-h-screen"
    >
      {posts.length > 0
        ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )
        : (
            <div className="py-12 text-center text-muted-foreground">
              <p>暂无文章</p>
              <p className="mt-2 text-sm">Coming soon...</p>
            </div>
          )}
    </Section>
  );
};

export default BlogPage;
