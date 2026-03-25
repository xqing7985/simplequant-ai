'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import type { FactorListItem } from '@/features/factors/services/types';
import { getFactorColumns } from './FactorTableColumns';

type FactorsClientProps = {
  factors: FactorListItem[];
  error?: string | null;
};

export function FactorsClient({ factors, error }: FactorsClientProps) {
  const t = useTranslations('Factors');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    family: 'all',
    final_status: 'all',
  });

  // 获取唯一的分类、因子族、状态选项
  const categories = useMemo(() => {
    const unique = new Set(factors.map(f => f.category).filter(Boolean));
    return Array.from(unique).sort();
  }, [factors]);

  const families = useMemo(() => {
    const unique = new Set(factors.map(f => f.family).filter(Boolean));
    return Array.from(unique).sort();
  }, [factors]);

  const statuses = useMemo(() => {
    const unique = new Set(factors.map(f => f.final_status).filter(Boolean));
    return Array.from(unique).sort();
  }, [factors]);

  // 筛选逻辑
  const filteredFactors = useMemo(() => {
    return factors.filter((factor) => {
      // 搜索过滤
      if (search && !factor.factor_name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      // 分类过滤
      if (filters.category !== 'all' && factor.category !== filters.category) {
        return false;
      }

      // 因子族过滤
      if (filters.family !== 'all' && factor.family !== filters.family) {
        return false;
      }

      // 最终状态过滤
      if (filters.final_status !== 'all' && factor.final_status !== filters.final_status) {
        return false;
      }

      return true;
    });
  }, [factors, search, filters]);

  const columns = getFactorColumns();

  // 错误状态
  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
        <p className="text-destructive">{error}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          请确保 master_summary.csv 文件存在于 public/downloads/ 目录下
        </p>
      </div>
    );
  }

  // 空状态
  if (factors.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <p className="text-lg font-medium">暂无因子数据</p>
        <p className="mt-2 text-sm text-muted-foreground">
          请上传 master_summary.csv 文件到 public/downloads/ 目录
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 筛选区域 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* 搜索框 */}
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder={t('search_placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-4"
          />
        </div>

        {/* 筛选器 */}
        <div className="flex flex-wrap gap-2">
          <Select value={filters.category} onValueChange={(value: string) => setFilters(prev => ({ ...prev, category: value }))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('filter_category')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all_option')}</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.family} onValueChange={(value: string) => setFilters(prev => ({ ...prev, family: value }))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('filter_family')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all_option')}</SelectItem>
              {families.map(family => (
                <SelectItem key={family} value={family}>{family}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.final_status} onValueChange={(value: string) => setFilters(prev => ({ ...prev, final_status: value }))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('filter_status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all_option')}</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 结果计数 */}
      <div className="text-sm text-muted-foreground">
        共 {filteredFactors.length} 个因子
        {filteredFactors.length !== factors.length && ` (筛选自 ${factors.length} 个)`}
      </div>

      {/* 数据表格 */}
      <DataTable columns={columns} data={filteredFactors} />
    </div>
  );
}
