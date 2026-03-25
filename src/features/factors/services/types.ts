/**
 * 因子模块类型定义
 */

/**
 * 因子列表项 (来自 master_summary.csv)
 */
export interface FactorListItem {
  factor_name: string;
  category: string;
  family: string;
  direction: string;
  score: number | null;
  status: string;
  final_status: string;
  duplicate_with_library: boolean;
}

/**
 * 因子详情 (两张表 join 后的完整数据)
 */
export interface FactorDetail {
  summary: FactorSummary;   // 来自 master_summary.csv
  dedup: FactorDedup | null; // 来自 dedup_result.csv (可能为空)
}

/**
 * 主表数据结构 - 因子摘要和研究表现
 */
export interface FactorSummary {
  // 基础信息
  factor_name: string;
  factor_expr: string;
  category: string;
  family: string;
  direction: string;
  score: number | null;
  status: string;
  final_status: string;

  // 中性化设置
  neutralization_enabled: boolean;
  neutralization_mode: string;
  factor_used_col: string;

  // 样本与覆盖
  sample_count: number | null;
  date_count: number | null;
  valid_day_ratio: number | null;

  // 有效性指标
  ic_mean: number | null;
  ic_std: number | null;
  icir: number | null;
  rank_ic_mean: number | null;
  rank_ic_std: number | null;
  rank_icir: number | null;
  ic_positive_ratio: number | null;
  rank_ic_positive_ratio: number | null;
  monotonic_score: number | null;

  // 分组收益
  group_spread: number | null;
  long_short_mean: number | null;
  long_average_mean: number | null;
  G1: number | null;
  G2: number | null;
  G3: number | null;
  G4: number | null;
  G5: number | null;
  LONG_SHORT: number | null;
}

/**
 * 去重表数据结构
 */
export interface FactorDedup {
  hit_factor: string | null;
  pair_corr: number | null;
  overlap_samples: number | null;
  duplicate_with_library: boolean;
  max_corr_with_library: number | null;
  max_corr_factor_in_library: string | null;
  max_corr_overlap_with_library: number | null;
  drop_reason: string | null;
  final_status: string;
}

/**
 * CSV 原始行类型
 */
export type CSVRow = Record<string, string>;
