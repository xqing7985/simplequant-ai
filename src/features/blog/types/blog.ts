/**
 * 博客内容类型
 * article - 普通文章（默认）
 * report - 研报分享
 */
export type BlogContentType = 'article' | 'report';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  coverImage?: string;
  locale: string;
  isPublished: boolean;
  content?: string;
  // 研报相关字段（可选）
  contentType?: BlogContentType;
  pdfUrl?: string;
  reportSource?: string;
  reportAuthor?: string;
  reportDate?: string;
};

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  tags: string[];
  coverImage?: string;
  isPublished: boolean;
  // 研报相关字段（可选）
  contentType?: BlogContentType;
  pdfUrl?: string;
  reportSource?: string;
  reportAuthor?: string;
  reportDate?: string;
};
