'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { FactorDetail } from '@/features/factors/services/types';
import {
  getStatusText,
  getStatusVariant,
  getDirectionText,
} from '@/features/factors/utils/factorFormatters';

type FactorHeaderProps = {
  detail: FactorDetail;
};

export function FactorHeader({ detail }: FactorHeaderProps) {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'zh';
  const { summary } = detail;

  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary.factor_expr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 复制失败时静默处理
    }
  };

  return (
    <div className="space-y-6">
      {/* 返回按钮 */}
      <Link
        href={`/${locale}/factors`}
        className="inline-flex items-center text-sm text-purple-600 hover:text-purple-500"
      >
        <svg className="mr-1 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回因子列表
      </Link>

      {/* 因子名称和标签 */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{summary.factor_name}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary">{summary.category}</Badge>
          <Badge variant="secondary">{summary.family}</Badge>
          <Badge variant="outline">{getDirectionText(summary.direction)}</Badge>
          <Badge variant={getStatusVariant(summary.status)}>{getStatusText(summary.status)}</Badge>
          <Badge variant={getStatusVariant(summary.final_status)}>{getStatusText(summary.final_status)}</Badge>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">综合得分</div>
          <div className={`mt-1 text-2xl font-bold ${
            summary.score !== null && summary.score >= 0.7 ? 'text-green-600'
              : summary.score !== null && summary.score >= 0.5 ? 'text-yellow-600'
              : 'text-muted-foreground'
          }`}>
            {summary.score !== null ? summary.score.toFixed(3) : '—'}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">IC IR</div>
          <div className={`mt-1 text-2xl font-bold ${
            summary.icir !== null && summary.icir >= 1 ? 'text-green-600'
              : summary.icir !== null && summary.icir >= 0.5 ? 'text-yellow-600'
              : 'text-muted-foreground'
          }`}>
            {summary.icir !== null ? summary.icir.toFixed(3) : '—'}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Rank IC IR</div>
          <div className={`mt-1 text-2xl font-bold ${
            summary.rank_icir !== null && summary.rank_icir >= 1 ? 'text-green-600'
              : summary.rank_icir !== null && summary.rank_icir >= 0.5 ? 'text-yellow-600'
              : 'text-muted-foreground'
          }`}>
            {summary.rank_icir !== null ? summary.rank_icir.toFixed(3) : '—'}
          </div>
        </div>
      </div>

      {/* 因子表达式 */}
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between border-b p-4">
          <div className="font-medium">因子表达式</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-8"
            >
              {copied ? <Check className="mr-1 size-4" /> : <Copy className="mr-1 size-4" />}
              {copied ? '已复制' : '复制'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8"
            >
              {isExpanded ? '收起' : '展开'}
            </Button>
          </div>
        </div>
        <div className={`p-4 ${isExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
          <code className={`block whitespace-pre-wrap break-all text-sm ${isExpanded ? '' : 'line-clamp-3'}`}>
            {summary.factor_expr}
          </code>
        </div>
      </div>
    </div>
  );
}
