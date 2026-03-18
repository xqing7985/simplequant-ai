/**
 * 博客内容类型
 * article - 普通文章（默认）
 * report - 研报分享
 */
export type BlogContentType = 'article' | 'report';

/**
 * 博客分类 - 6 个主要分类
 * quant-intro - 量化入门
 * programming-tools - 编程与工具
 * data-engineering - 数据与工程
 * factors-strategies - 因子与策略
 * case-studies - 实战案例
 * research-reports - 研究与研报
 */
export type BlogCategory =
  | 'quant-intro'
  | 'programming-tools'
  | 'data-engineering'
  | 'factors-strategies'
  | 'case-studies'
  | 'research-reports';

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
  // 分类字段（可选）
  category?: BlogCategory;
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
  // 分类字段（可选）
  category?: BlogCategory;
  // 研报相关字段（可选）
  contentType?: BlogContentType;
  pdfUrl?: string;
  reportSource?: string;
  reportAuthor?: string;
  reportDate?: string;
};
