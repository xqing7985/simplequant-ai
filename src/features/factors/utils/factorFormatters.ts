/**
 * 因子数据格式化工具
 * 负责空值处理、数值格式化、状态文本映射等
 */

/**
 * 通用值格式化
 * @param value 要格式化的值
 * @param fallback 空值时的默认显示
 */
export const formatValue = (value: unknown, fallback = '—'): string => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }
  return String(value);
};

/**
 * 数字格式化
 * @param value 要格式化的数字
 * @param decimals 小数位数
 */
export const formatNumber = (value: number | null, decimals = 2): string => {
  if (value === null || Number.isNaN(value)) {
    return '—';
  }
  return value.toFixed(decimals);
};

/**
 * 百分比格式化
 * @param value 要格式化的数字 (0-1 之间的小数)
 */
export const formatPercent = (value: number | null): string => {
  if (value === null || Number.isNaN(value)) {
    return '—';
  }
  return `${(value * 100).toFixed(2)}%`;
};

/**
 * 百分比格式化 (输入已经是百分比值)
 * @param value 要格式化的数字 (已经是百分比数值)
 */
export const formatPercentValue = (value: number | null, decimals = 2): string => {
  if (value === null || Number.isNaN(value)) {
    return '—';
  }
  return `${value.toFixed(decimals)}%`;
};

/**
 * 相关系数格式化 (-1 到 1 之间)
 * @param value 相关系数值
 */
export const formatCorrelation = (value: number | null): string => {
  if (value === null || Number.isNaN(value)) {
    return '—';
  }
  return value.toFixed(4);
};

/**
 * 状态文本映射
 */
export const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    // 通用状态
    active: '生效中',
    inactive: '已停用',
    pending: '待审核',
    archived: '已归档',

    // 去重相关状态
    kept: '已保留',
    dropped: '已丢弃',
    merged: '已合并',
    reviewing: '审核中',

    // 因子状态
    valid: '有效',
    invalid: '无效',
    warning: '警告',
  };
  return statusMap[status] || status;
};

/**
 * 因子方向文本映射
 */
export const getDirectionText = (direction: string): string => {
  const directionMap: Record<string, string> = {
    long: '做多',
    short: '做空',
    neutral: '中性',
    positive: '正向',
    negative: '负向',
  };
  return directionMap[direction] || direction;
};

/**
 * 获取状态的 Badge 变体
 */
export const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  const destructiveStatuses = ['dropped', 'invalid', 'inactive', 'archived'];
  const secondaryStatuses = ['pending', 'reviewing', 'warning'];
  const defaultStatuses = ['kept', 'active', 'valid'];

  if (destructiveStatuses.includes(status.toLowerCase())) {
    return 'destructive';
  }
  if (secondaryStatuses.includes(status.toLowerCase())) {
    return 'secondary';
  }
  if (defaultStatuses.includes(status.toLowerCase())) {
    return 'default';
  }
  return 'outline';
};

/**
 * 中性化模式文本映射
 */
export const getNeutralizationModeText = (mode: string): string => {
  const modeMap: Record<string, string> = {
    none: '无',
    industry: '行业中性',
    market_cap: '市值中性',
    style: '风格中性',
    full: '完全中性',
  };
  return modeMap[mode] || mode;
};

/**
 * 截断长文本
 */
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};
