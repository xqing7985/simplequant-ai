import { getTranslations } from 'next-intl/server';

import { BlogList } from '@/features/blog/components/BlogList';
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
      <BlogList posts={posts} />
    </Section>
  );
};

export default BlogPage;
