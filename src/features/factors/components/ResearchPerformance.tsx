'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FactorSummary } from '@/features/factors/services/types';
import {
  formatNumber,
  formatPercent,
  formatValue,
} from '@/features/factors/utils/factorFormatters';

type ResearchPerformanceProps = {
  summary: FactorSummary;
};

/**
 * 简单柱状图组件
 */
function SimpleBarChart({
  data,
}: {
  data: { label: string; value: number | null; color?: string }[];
}) {
  const validValues = data
    .map(d => d.value ?? 0)
    .filter(v => v !== 0);
  const maxValue = validValues.length > 0 ? Math.max(...validValues.map(Math.abs)) : 1;

  const colors = [
    'bg-purple-500',
    'bg-indigo-500',
    'bg-blue-500',
    'bg-cyan-500',
    'bg-teal-500',
  ];

  return (
    <div className="flex items-end justify-around gap-2 h-40 pt-4">
      {data.map((item, index) => {
        const height = maxValue > 0 ? (Math.abs(item.value || 0) / maxValue) * 100 : 0;
        const isNegative = (item.value || 0) < 0;

        return (
          <div key={item.label} className="flex flex-col items-center flex-1">
            <div className="text-xs text-muted-foreground mb-1">
              {item.value !== null ? item.value.toFixed(4) : '—'}
            </div>
            <div
              className={`w-full rounded-t ${isNegative ? 'bg-red-400' : item.color || colors[index % colors.length]} transition-all`}
              style={{ height: `${Math.max(height, 2)}%` }}
            />
            <div className="text-xs font-medium mt-1">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * 指标卡片组件
 */
function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}

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
 * 研究表现 Tab 内容
 */
export function ResearchPerformance({ summary }: ResearchPerformanceProps) {
  return (
    <div className="space-y-8">
      {/* 基础信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">基础信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <InfoItem label="因子名称" value={formatValue(summary.factor_name)} />
            <InfoItem label="因子表达式" value={
              <code className="text-xs bg-muted px-2 py-1 rounded block overflow-x-auto">
                {formatValue(summary.factor_expr)}
              </code>
            } />
            <InfoItem label="所属分类" value={formatValue(summary.category)} />
            <InfoItem label="因子族" value={formatValue(summary.family)} />
            <InfoItem label="方向" value={formatValue(summary.direction)} />
            <InfoItem label="中性化" value={summary.neutralization_enabled ? '启用' : '禁用'} />
            {summary.neutralization_enabled && (
              <InfoItem label="中性化模式" value={formatValue(summary.neutralization_mode)} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* 样本与覆盖 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">样本与覆盖</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard label="样本数量" value={formatNumber(summary.sample_count, 0)} />
            <MetricCard label="交易日数" value={formatNumber(summary.date_count, 0)} />
            <MetricCard label="有效交易日占比" value={formatPercent(summary.valid_day_ratio)} />
          </div>
        </CardContent>
      </Card>

      {/* 有效性指标 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">有效性指标</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="平均 IC" value={formatNumber(summary.ic_mean, 4)} />
            <MetricCard label="IC 标准差" value={formatNumber(summary.ic_std, 4)} />
            <MetricCard label="IC IR" value={formatNumber(summary.icir, 3)} />
            <MetricCard label="IC 正比率" value={formatPercent(summary.ic_positive_ratio)} />
            <MetricCard label="平均 Rank IC" value={formatNumber(summary.rank_ic_mean, 4)} />
            <MetricCard label="Rank IC 标准差" value={formatNumber(summary.rank_ic_std, 4)} />
            <MetricCard label="Rank IC IR" value={formatNumber(summary.rank_icir, 3)} />
            <MetricCard label="Rank IC 正比率" value={formatPercent(summary.rank_ic_positive_ratio)} />
          </div>

          {/* 单调性得分 */}
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground mb-2">单调性得分</div>
            <div className="text-2xl font-bold">
              {summary.monotonic_score !== null ? summary.monotonic_score.toFixed(3) : '—'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分组收益 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">分组收益</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleBarChart
            data={[
              { label: 'G1', value: summary.G1 },
              { label: 'G2', value: summary.G2 },
              { label: 'G3', value: summary.G3 },
              { label: 'G4', value: summary.G4 },
              { label: 'G5', value: summary.G5 },
            ]}
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-3 pt-4 border-t">
            <MetricCard label="组间 spread" value={formatNumber(summary.group_spread, 4)} />
            <MetricCard label="多空收益" value={formatNumber(summary.long_short_mean, 4)} />
            <MetricCard label="多头平均" value={formatNumber(summary.long_average_mean, 4)} />
          </div>
        </CardContent>
      </Card>

      {/* 综合得分 */}
      {summary.score !== null && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">综合评分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`text-5xl font-bold ${
                summary.score >= 0.7 ? 'text-green-600' : summary.score >= 0.5 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {summary.score.toFixed(3)}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {summary.score >= 0.7 ? '优秀' : summary.score >= 0.5 ? '良好' : '待改进'}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
