'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import type { FactorListItem } from '@/features/factors/services/types';
import {
  formatValue,
  getStatusText,
  getStatusVariant,
  getDirectionText,
} from '@/features/factors/utils/factorFormatters';

/**
 * 因子列表表格列定义
 */
export const getFactorColumns = (): ColumnDef<FactorListItem>[] => [
  {
    accessorKey: 'factor_name',
    header: '因子名称',
    cell: ({ row }) => {
      const params = useParams<{ locale: string }>();
      const locale = params?.locale || 'zh';
      const factorName = row.getValue('factor_name') as string;

      return (
        <Link
          href={`/${locale}/factors/${encodeURIComponent(factorName)}`}
          className="font-medium text-purple-600 hover:underline"
        >
          {factorName}
        </Link>
      );
    },
  },
  {
    accessorKey: 'category',
    header: '分类',
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      return (
        <Badge variant="secondary" className="font-normal">
          {formatValue(category)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'family',
    header: '因子族',
    cell: ({ row }) => {
      const family = row.getValue('family') as string;
      return <span className="text-sm">{formatValue(family)}</span>;
    },
  },
  {
    accessorKey: 'direction',
    header: '方向',
    cell: ({ row }) => {
      const direction = row.getValue('direction') as string;
      return (
        <Badge variant="outline" className="font-normal">
          {getDirectionText(direction)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'score',
    header: '得分',
    cell: ({ row }) => {
      const score = row.getValue('score') as number | null;
      if (score === null) {
        return <span className="text-muted-foreground">—</span>;
      }
      return (
        <span className={`font-medium ${score >= 0.7 ? 'text-green-600' : score >= 0.5 ? 'text-yellow-600' : 'text-red-600'}`}>
          {score.toFixed(3)}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant={getStatusVariant(status)} className="font-normal">
          {getStatusText(status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'final_status',
    header: '最终状态',
    cell: ({ row }) => {
      const finalStatus = row.getValue('final_status') as string;
      return (
        <Badge variant={getStatusVariant(finalStatus)} className="font-normal">
          {getStatusText(finalStatus)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'duplicate_with_library',
    header: '库内重复',
    cell: ({ row }) => {
      const isDuplicate = row.getValue('duplicate_with_library') as boolean;
      return (
        <Badge variant={isDuplicate ? 'destructive' : 'outline'} className="font-normal">
          {isDuplicate ? '是' : '否'}
        </Badge>
      );
    },
  },
];
