export type Dataset = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  updatedAt: string;
  downloadUrl: string;
};

export const datasets: Dataset[] = [
  {
    slug: 'a-share-daily',
    title: 'A 股日线样例数据',
    description: '包含开高低收、成交量、成交额等基础行情字段，适用于量化策略回测和市场分析。',
    tags: ['A 股', '日线', '行情'],
    updatedAt: '2026-03',
    downloadUrl: '/downloads/a-share-daily-sample.csv',
  },
  {
    slug: 'daily-basic',
    title: '每日指标样例数据',
    description: '包含市盈率、市净率、总市值、流通市值等每日基本面指标数据。',
    tags: ['基本面', '指标', '日频'],
    updatedAt: '2026-03',
    downloadUrl: '/downloads/daily-basic-sample.csv',
  },
  {
    slug: 'factor-sample',
    title: '因子样例数据',
    description: '包含动量、波动率、流动性等常见因子值，适用于多因子模型研究和测试。',
    tags: ['因子', '多因子', '研究'],
    updatedAt: '2026-03',
    downloadUrl: '/downloads/factor-sample.csv',
  },
];
