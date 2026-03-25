'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FactorDedup } from '@/features/factors/services/types';
import {
  formatNumber,
  formatCorrelation,
  getStatusText,
  getStatusVariant,
} from '@/features/factors/utils/factorFormatters';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

type DedupResultProps = {
  dedup: FactorDedup | null;
};

/**
 * 信息项组件
 */
function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-2 py-2 border-b last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="col-span-2 font-medium">{value}</span>
    </div>
  );
}

/**
 * 空状态组件
 */
function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border bg-muted p-12 text-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

/**
 * 去重与入库 Tab 内容
 */
export function DedupResult({ dedup }: DedupResultProps) {
  // 没有去重数据
  if (!dedup) {
    return <EmptyState message="该因子尚未进行去重检测" />;
  }

  return (
    <div className="space-y-8">
      {/* 最终状态概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">最终决策</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">最终状态</div>
            <Badge variant={getStatusVariant(dedup.final_status)} className="text-sm">
              {getStatusText(dedup.final_status)}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">库内重复</div>
            <Badge variant={dedup.duplicate_with_library ? 'destructive' : 'outline'}>
              {dedup.duplicate_with_library ? '是' : '否'}
            </Badge>
          </div>

          {dedup.drop_reason && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>丢弃原因</AlertTitle>
              <AlertDescription>{dedup.drop_reason}</AlertDescription>
            </Alert>
          )}

          {dedup.final_status === 'kept' && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">已保留</AlertTitle>
              <AlertDescription className="text-green-700">
                该因子通过去重检测，已被保留到因子库中
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 配对去重结果 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">配对去重结果</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <InfoItem
              label="命中因子"
              value={dedup.hit_factor ? (
                <span className="text-purple-600 font-medium">{dedup.hit_factor}</span>
              ) : (
                <span className="text-muted-foreground">未命中</span>
              )}
            />
            <InfoItem
              label="相关系数"
              value={formatCorrelation(dedup.pair_corr)}
            />
            <InfoItem
              label="重叠样本数"
              value={formatNumber(dedup.overlap_samples, 0)}
            />
          </div>
        </CardContent>
      </Card>

      {/* 与库内因子相似性 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">与库内因子相似性</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <InfoItem
              label="最大相关系数"
              value={formatCorrelation(dedup.max_corr_with_library)}
            />
            <InfoItem
              label="最相似因子"
              value={dedup.max_corr_factor_in_library ? (
                <span className="text-purple-600 font-medium">
                  {dedup.max_corr_factor_in_library}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            />
            <InfoItem
              label="重叠样本比例"
              value={formatNumber(dedup.max_corr_overlap_with_library)}
            />
          </div>
        </CardContent>
      </Card>

      {/* 相似度警示 */}
      {dedup.max_corr_with_library !== null && dedup.max_corr_with_library > 0.9 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>高度相似警示</AlertTitle>
          <AlertDescription>
            该因子与库内因子 <span className="font-medium">{dedup.max_corr_factor_in_library}</span> 的相关系数高达{' '}
            <span className="font-bold">{dedup.max_corr_with_library.toFixed(4)}</span>，
            建议检查是否为重复因子
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
