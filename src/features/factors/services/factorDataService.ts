/**
 * 因子数据服务层
 * 负责 CSV 文件的读取和解析
 */

import fs from 'fs';
import path from 'path';

import type {
  FactorListItem,
  FactorDetail,
  FactorSummary,
  FactorDedup,
  CSVRow,
} from './types';

// CSV 文件基础路径
const CSV_BASE_PATH = path.join(process.cwd(), 'public', 'downloads');

/**
 * 读取并解析 CSV 文件
 */
async function readCSV(filename: string): Promise<CSVRow[]> {
  const filePath = path.join(CSV_BASE_PATH, filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filename}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  return parseCSV(content);
}

/**
 * 简单的 CSV 解析器 (避免引入额外依赖)
 * 处理简单的 CSV 格式，不支持带引号的逗号
 */
function parseCSV(content: string): CSVRow[] {
  const lines = content.trim().split('\n');
  if (lines.length < 2) {
    return [];
  }

  const firstLine = lines[0];
  if (!firstLine) {
    return [];
  }
  const headers = firstLine.split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row: CSVRow = {};
    headers.forEach((header, index) => {
      if (values[index] !== undefined) {
        row[header] = values[index];
      }
    });
    return row;
  });
}

/**
 * 将 CSV 行转换为 FactorListItem
 */
function parseFactorListItem(row: CSVRow): FactorListItem {
  return {
    factor_name: row.factor_name || '',
    category: row.category || '',
    family: row.family || '',
    direction: row.direction || '',
    score: parseNumber(row.score),
    status: row.status || '',
    final_status: row.final_status || '',
    duplicate_with_library: parseBoolean(row.duplicate_with_library),
  };
}

/**
 * 将 CSV 行转换为 FactorSummary
 */
function parseFactorSummary(row: CSVRow): FactorSummary {
  return {
    // 基础信息
    factor_name: row.factor_name || '',
    factor_expr: row.factor_expr || '',
    category: row.category || '',
    family: row.family || '',
    direction: row.direction || '',
    score: parseNumber(row.score),
    status: row.status || '',
    final_status: row.final_status || '',

    // 中性化设置
    neutralization_enabled: parseBoolean(row.neutralization_enabled),
    neutralization_mode: row.neutralization_mode || '',
    factor_used_col: row.factor_used_col || '',

    // 样本与覆盖
    sample_count: parseNumber(row.sample_count),
    date_count: parseNumber(row.date_count),
    valid_day_ratio: parseNumber(row.valid_day_ratio),

    // 有效性指标
    ic_mean: parseNumber(row.ic_mean),
    ic_std: parseNumber(row.ic_std),
    icir: parseNumber(row.icir),
    rank_ic_mean: parseNumber(row.rank_ic_mean),
    rank_ic_std: parseNumber(row.rank_ic_std),
    rank_icir: parseNumber(row.rank_icir),
    ic_positive_ratio: parseNumber(row.ic_positive_ratio),
    rank_ic_positive_ratio: parseNumber(row.rank_ic_positive_ratio),
    monotonic_score: parseNumber(row.monotonic_score),

    // 分组收益
    group_spread: parseNumber(row.group_spread),
    long_short_mean: parseNumber(row.long_short_mean),
    long_average_mean: parseNumber(row.long_average_mean),
    G1: parseNumber(row.G1),
    G2: parseNumber(row.G2),
    G3: parseNumber(row.G3),
    G4: parseNumber(row.G4),
    G5: parseNumber(row.G5),
    LONG_SHORT: parseNumber(row.LONG_SHORT),
  };
}

/**
 * 将 CSV 行转换为 FactorDedup
 */
function parseFactorDedup(row: CSVRow): FactorDedup {
  return {
    hit_factor: row.hit_factor || null,
    pair_corr: parseNumber(row.pair_corr),
    overlap_samples: parseNumber(row.overlap_samples),
    duplicate_with_library: parseBoolean(row.duplicate_with_library),
    max_corr_with_library: parseNumber(row.max_corr_with_library),
    max_corr_factor_in_library: row.max_corr_factor_in_library || null,
    max_corr_overlap_with_library: parseNumber(row.max_corr_overlap_with_library),
    drop_reason: row.drop_reason || null,
    final_status: row.final_status || '',
  };
}

/**
 * 解析数字值
 */
function parseNumber(value: string | undefined): number | null {
  if (value === undefined || value === '' || value === 'null' || value === 'NaN') {
    return null;
  }
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

/**
 * 解析布尔值
 */
function parseBoolean(value: string | undefined): boolean {
  if (value === undefined || value === '' || value === 'null') {
    return false;
  }
  return value.toLowerCase() === 'true' || value === '1';
}

/**
 * 获取因子列表
 */
export async function getFactorList(): Promise<FactorListItem[]> {
  const data = await readCSV('master_summary.csv');
  return data.map(row => parseFactorListItem(row));
}

/**
 * 获取因子详情 (join 两张表)
 */
export async function getFactorDetail(factorName: string): Promise<FactorDetail | null> {
  try {
    const summaryData = await readCSV('master_summary.csv');

    // dedup_result.csv 是可选的
    let dedupData: CSVRow[] = [];
    try {
      dedupData = await readCSV('dedup_result.csv');
    } catch {
      // dedup 文件不存在时继续
    }

    const summary = summaryData.find(row => row.factor_name === factorName);
    if (!summary) return null;

    const dedup = dedupData.find(row => row.factor_name === factorName) || null;

    return {
      summary: parseFactorSummary(summary),
      dedup: dedup ? parseFactorDedup(dedup) : null,
    };
  } catch (error) {
    console.error('Error fetching factor detail:', error);
    return null;
  }
}

/**
 * 安全获取因子列表 (带错误处理)
 */
export async function safeGetFactorList(): Promise<{
  data: FactorListItem[];
  error: string | null;
}> {
  try {
    const data = await getFactorList();
    return { data, error: null };
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * 安全获取因子详情 (带错误处理)
 */
export async function safeGetFactorDetail(factorName: string): Promise<{
  data: FactorDetail | null;
  error: string | null;
}> {
  try {
    const data = await getFactorDetail(factorName);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
