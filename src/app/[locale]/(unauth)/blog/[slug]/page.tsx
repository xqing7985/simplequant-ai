import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { BlogArticle } from '@/features/blog/components/BlogArticle';
import { getBlogPostBySlug } from '@/features/blog/lib/getBlogPosts';

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

  return <BlogArticle post={post} content={<MDXRemote source={post.content} />} />;
};

export default BlogPostPage;
