import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import type { EquipmentItemDTO } from '../../../shared/services/dto/dashboard';

export function useEquipmentColumns(data: EquipmentItemDTO[]) {
  const total = useMemo(() =>
    data?.reduce((acc, curr) => acc + curr.count, 0) || 0,
    [data]
  );

  const columns = useMemo(() => {
    const helper = createColumnHelper<EquipmentItemDTO>();

    return [
      helper.accessor('type', {
        header: 'Equipment Type',
        cell: (info) => (
          <span className="font-semibold text-white/90">
            {info.getValue()}
          </span>
        ),
      }),
      helper.accessor('count', {
        header: 'Count',
        cell: (info) => info.getValue(),
      }),
      helper.display({
        id: 'percentage',
        header: 'Share',
        cell: (info) => {
          const count = info.row.original.count;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;

          return (
            <div className="flex items-center gap-3">
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden min-w-[60px] max-w-[150px]">
                <div
                  className="h-full bg-theme-primary rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-white/60 w-8">{pct}%</span>
            </div>
          );
        },
      }),
    ];
  }, [total]);

  return columns;
}
