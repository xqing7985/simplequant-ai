import { Download } from 'lucide-react';

import type { Dataset } from '@/data/datasets';

export const DatasetCard = ({ dataset }: { dataset: Dataset }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-lg">
      <div className="mb-3 flex flex-wrap gap-2">
        {dataset.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mb-2 text-lg font-bold">{dataset.title}</h3>

      <p className="mb-4 flex-1 text-sm text-muted-foreground">{dataset.description}</p>

      <div className="mt-auto flex items-center justify-between">
        <time className="text-xs text-muted-foreground">
          更新于
          {' '}
          {dataset.updatedAt}
        </time>

        <a
          href={dataset.downloadUrl}
          download
          className="inline-flex items-center gap-1.5 rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-purple-700"
        >
          <Download className="size-4" />
          下载
        </a>
      </div>
    </div>
  );
};
