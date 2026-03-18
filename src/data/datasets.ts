export type Dataset = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  updatedAt: string;
  downloadUrl: string;
  // 详情页可选字段
  hasDetailPage?: boolean;
  latestTradeDate?: string;
  calendarFile?: string;
  tradingDaysCount?: number;
  dateRange?: {
    start: string;
    end: string;
  };
  marketCoverage?: {
    sh: number;
    sz: number;
    bj: number;
    total: number;
  };
  features?: {
    group: string;
    items: { name: string; description: string }[];
  }[];
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
  {
    slug: 'qlib-a-share-20260313',
    title: 'A 股 Qlib 全量数据',
    description: '覆盖 A 股全市场的 Qlib 格式日线数据，包含 5700+ 股票、2020 年至今历史行情和每日指标。',
    tags: ['A 股', 'Qlib', '日线', '全量'],
    updatedAt: '2026-03-13',
    downloadUrl: '/downloads/qlib-a-share-20260313.zip',
    hasDetailPage: true,
    latestTradeDate: '2026-03-13',
    calendarFile: 'calendars/day.txt',
    tradingDaysCount: 1500,
    dateRange: {
      start: '2020-01-02',
      end: '2026-03-13',
    },
    marketCoverage: {
      sh: 2390,
      sz: 3008,
      bj: 302,
      total: 5700,
    },
    features: [
      {
        group: '基础行情字段',
        items: [
          { name: 'open', description: '开盘价' },
          { name: 'high', description: '最高价' },
          { name: 'low', description: '最低价' },
          { name: 'close', description: '收盘价' },
          { name: 'pre_close', description: '前收盘价' },
          { name: 'change', description: '涨跌额' },
          { name: 'pct_chg', description: '涨跌幅 (%)' },
          { name: 'volume', description: '成交量' },
          { name: 'amount', description: '成交额' },
          { name: 'factor', description: '复权因子' },
        ],
      },
      {
        group: '状态标记',
        items: [
          { name: 'is_suspended', description: '是否停牌' },
          { name: 'is_st', description: '是否 ST' },
        ],
      },
      {
        group: '每日指标 (daily_basic)',
        items: [
          { name: 'turnover_rate', description: '换手率 (%)' },
          { name: 'turnover_rate_f', description: '换手率 (自由股本)' },
          { name: 'volume_ratio', description: '量比' },
          { name: 'pe', description: '市盈率 (静)' },
          { name: 'pe_ttm', description: '市盈率 (TTM)' },
          { name: 'pb', description: '市净率' },
          { name: 'ps', description: '市销率' },
          { name: 'ps_ttm', description: '市销率 (TTM)' },
          { name: 'dv_ratio', description: '股息率' },
          { name: 'dv_ttm', description: '股息率 (TTM)' },
          { name: 'total_share', description: '总股本' },
          { name: 'float_share', description: '流通股本' },
          { name: 'free_share', description: '自由流通股本' },
          { name: 'total_mv', description: '总市值' },
          { name: 'circ_mv', description: '流通市值' },
        ],
      },
    ],
  },
];
