import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { BlogArticle } from '@/features/blog/components/BlogArticle';
import { getBlogPostBySlug } from '@/features/blog/lib/getBlogPosts';

// MDX remote options with remark/rehype plugins for table, math, and code highlighting support
const mdxRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [
      (await import('remark-gfm')).default,
      (await import('remark-math')).default,
    ],
    rehypePlugins: [
      (await import('rehype-katex')).default,
      (await import('rehype-highlight')).default,
    ],
  },
};

export async function generateMetadata(props: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = props.params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(props: {
  params: { locale: string };
}) {
  const { locale } = props.params;
  const { getAllBlogSlugs } = await import('@/features/blog/lib/getBlogPosts');
  const slugs = await getAllBlogSlugs(locale);

  return slugs.map(slug => ({ slug }));
}

const BlogPostPage = async (props: {
  params: { locale: string; slug: string };
}) => {
  const { locale, slug } = props.params;

  const post = await getBlogPostBySlug(slug, locale);

  if (!post || !post.content) {
    notFound();
  }

  return <BlogArticle post={post} content={<MDXRemote source={post.content} options={mdxRemoteOptions} />} />;
};

export default BlogPostPage;
