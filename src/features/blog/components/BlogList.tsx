'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { BlogCategory, BlogPost } from '@/features/blog/types/blog';

import { BlogCard } from './BlogCard';

type BlogListProps = {
  posts: BlogPost[];
};

// 分类 slug 到翻译键的映射（连字符转下划线）
const CATEGORY_KEY_MAP: Record<BlogCategory | 'all', string> = {
  'all': 'all',
  'quant-intro': 'quant_intro',
  'programming-tools': 'programming_tools',
  'data-engineering': 'data_engineering',
  'factors-strategies': 'factors_strategies',
  'case-studies': 'case_studies',
  'research-reports': 'research_reports',
};

const CATEGORIES: (BlogCategory | 'all')[] = [
  'all',
  'quant-intro',
  'programming-tools',
  'data-engineering',
  'factors-strategies',
  'case-studies',
  'research-reports',
];

export const BlogList = ({ posts }: BlogListProps) => {
  const t = useTranslations('Blog');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');

  // 分类标签映射函数
  const getCategoryLabel = (category: BlogCategory | 'all') => {
    if (category === 'all') {
      return t('all_categories');
    }
    const key = CATEGORY_KEY_MAP[category];
    return t(`categories.${key}`);
  };

  // 分类描述映射
  const getCategoryDescription = (category: BlogCategory | 'all') => {
    if (category === 'all') {
      return t('page_description');
    }
    const key = CATEGORY_KEY_MAP[category];
    return t(`category_descriptions.${key}`);
  };

  // 按分类过滤文章
  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="flex flex-col gap-6">
      {/* 分类导航 */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-muted text-muted-foreground hover:bg-purple-100 hover:text-purple-700'
            }`}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>

      {/* 分类描述 */}
      <p className="text-sm text-muted-foreground">
        {getCategoryDescription(selectedCategory)}
      </p>

      {/* 文章列表 */}
      {filteredPosts.length > 0
        ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )
        : (
            <div className="py-12 text-center text-muted-foreground">
              <p>该分类下暂无文章</p>
              <p className="mt-2 text-sm">敬请期待后续更新</p>
            </div>
          )}
    </div>
  );
};
