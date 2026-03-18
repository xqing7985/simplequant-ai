import { Download } from 'lucide-react';
import { notFound } from 'next/navigation';

import { datasets } from '@/data/datasets';
import { Section } from '@/features/landing/Section';

export async function generateMetadata(props: {
  params: { locale: string; slug: string };
}) {
  const { slug } = props.params;
  const dataset = datasets.find(d => d.slug === slug);

  if (!dataset) {
    return {
      title: '数据集不存在',
    };
  }

  return {
    title: dataset.title,
    description: dataset.description,
  };
}

export async function generateStaticParams() {
  return datasets
    .filter(d => d.hasDetailPage)
    .map(dataset => ({ slug: dataset.slug }));
}

const DatasetDetailPage = async (props: {
  params: { locale: string; slug: string };
}) => {
  const { slug } = props.params;
  const dataset = datasets.find(d => d.slug === slug);

  if (!dataset || !dataset.hasDetailPage) {
    notFound();
  }

  return (
    <Section className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* 返回按钮 */}
        <a
          href="/data"
          className="mb-6 inline-flex items-center text-sm text-purple-600 hover:text-purple-500"
        >
          <svg className="mr-1 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回数据列表
        </a>

        {/* 标题和标签 */}
        <div className="mb-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {dataset.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {dataset.title}
          </h1>

          <p className="text-lg text-muted-foreground">{dataset.description}</p>
        </div>

        {/* 下载按钮 */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">下载数据包</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                点击按钮即可下载，zip 格式，包含完整数据文件
              </p>
            </div>
            <a
              href={dataset.downloadUrl}
              download
              className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700"
            >
              <Download className="size-5" />
              下载 ZIP
            </a>
          </div>
        </div>

        {/* 数据更新日期 */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">数据更新日期</h3>
          <div className="space-y-3 text-sm">
            {dataset.latestTradeDate && (
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground">最新交易日：</span>
                <span>{dataset.latestTradeDate}</span>
              </div>
            )}
            {dataset.calendarFile && (
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground">日历文件：</span>
                <span>{dataset.calendarFile}</span>
              </div>
            )}
            {dataset.tradingDaysCount && (
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground">交易日数量：</span>
                <span>
                  {dataset.tradingDaysCount.toLocaleString()}
                  {' '}
                  天
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 数据时间范围 */}
        {dataset.dateRange && (
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">数据时间范围</h3>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">起始日期：</span>
                <span className="ml-2">{dataset.dateRange.start}</span>
              </div>
              <span className="text-muted-foreground">→</span>
              <div>
                <span className="font-medium text-muted-foreground">结束日期：</span>
                <span className="ml-2">{dataset.dateRange.end}</span>
              </div>
            </div>
          </div>
        )}

        {/* 覆盖市场 */}
        {dataset.marketCoverage && (
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">覆盖市场</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 text-left font-medium text-muted-foreground">市场</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">股票数量</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2">上海 (sh)</td>
                  <td className="py-2 text-right">{dataset.marketCoverage.sh.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">深圳 (sz)</td>
                  <td className="py-2 text-right">{dataset.marketCoverage.sz.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">北京 (bj)</td>
                  <td className="py-2 text-right">{dataset.marketCoverage.bj.toLocaleString()}</td>
                </tr>
                <tr className="font-medium">
                  <td className="py-2">合计</td>
                  <td className="py-2 text-right">{dataset.marketCoverage.total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 特征字段 */}
        {dataset.features && (
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">特征字段</h3>
            <div className="space-y-6">
              {dataset.features.map((featureGroup, groupIndex) => (
                <div key={groupIndex}>
                  <h4 className="mb-3 text-sm font-medium text-purple-600">
                    {featureGroup.group}
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {featureGroup.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm"
                      >
                        <code className="font-mono text-xs font-bold text-purple-700">
                          {item.name}
                        </code>
                        <span className="text-muted-foreground">{item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Qlib 使用示例 */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Qlib 使用示例</h3>
          <div className="rounded-lg bg-muted p-4">
            <pre className="overflow-x-auto text-sm">
              <code className="language-python">
                {`import qlib

# 初始化 Qlib
qlib.init(provider_uri='./qlib_data')

# 加载数据
from qlib.data import D

# 获取股票列表
instruments = D.instruments('csi300')
print(f"成分股数量：{len(instruments)}")

# 获取行情数据
df = D.features(
    instruments=['SH600000'],
    fields=['$open', '$close', '$volume'],
    start_time='2020-01-01',
    end_time='2026-03-13'
)
print(df.head())`}
              </code>
            </pre>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            更多使用方法请参考
            {' '}
            <a href="https://qlib.readthedocs.io/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Qlib 官方文档</a>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default DatasetDetailPage;
