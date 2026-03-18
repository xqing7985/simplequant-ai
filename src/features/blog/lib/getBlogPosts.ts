import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { cache } from 'react';

import type { BlogPost, BlogPostFrontmatter } from '@/features/blog/types/blog';

const blogDirectory = path.join(process.cwd(), 'content/blog');

/**
 * 获取指定语言的所有博客文章
 */
export const getBlogPosts = cache(async (locale: string): Promise<BlogPost[]> => {
  const localeDir = path.join(blogDirectory, locale);

  // 如果目录不存在，返回空数组
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir);
  const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

  const posts: BlogPost[] = [];

  for (const file of mdxFiles) {
    const filePath = path.join(localeDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    const frontmatter = data as BlogPostFrontmatter;

    // 只返回已发布的文章
    if (frontmatter.isPublished) {
      posts.push({
        slug: frontmatter.slug,
        title: frontmatter.title,
        description: frontmatter.description,
        publishedAt: frontmatter.publishedAt,
        tags: frontmatter.tags,
        coverImage: frontmatter.coverImage,
        locale,
        isPublished: frontmatter.isPublished,
        // 分类字段
        category: frontmatter.category,
        // 研报相关字段
        contentType: frontmatter.contentType,
        pdfUrl: frontmatter.pdfUrl,
        reportSource: frontmatter.reportSource,
        reportAuthor: frontmatter.reportAuthor,
        reportDate: frontmatter.reportDate,
      });
    }
  }

  // 按发布时间倒序排序
  return posts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
});

/**
 * 获取指定 slug 的博客文章详情
 */
export const getBlogPostBySlug = cache(async (
  slug: string,
  locale: string,
): Promise<BlogPost | null> => {
  const localeDir = path.join(blogDirectory, locale);
  const filePath = path.join(localeDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);

  const frontmatter = data as BlogPostFrontmatter;

  if (!frontmatter.isPublished) {
    return null;
  }

  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    description: frontmatter.description,
    publishedAt: frontmatter.publishedAt,
    tags: frontmatter.tags,
    coverImage: frontmatter.coverImage,
    locale,
    isPublished: frontmatter.isPublished,
    content: body,
    // 分类字段
    category: frontmatter.category,
    // 研报相关字段
    contentType: frontmatter.contentType,
    pdfUrl: frontmatter.pdfUrl,
    reportSource: frontmatter.reportSource,
    reportAuthor: frontmatter.reportAuthor,
    reportDate: frontmatter.reportDate,
  };
});

/**
 * 获取所有可用的 slug（用于 generateStaticParams）
 */
export async function getAllBlogSlugs(locale: string): Promise<string[]> {
  const posts = await getBlogPosts(locale);
  return posts.map(post => post.slug);
}
