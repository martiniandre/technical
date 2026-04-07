import { DataTable } from '@/shared/components/ui/data-table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card';
import { useEquipmentColumns } from '../hooks/useEquipmentColumns';
import type { EquipmentItemDTO } from '../../../shared/services/dto/dashboard';

interface DataTableSectionProps {
  data: EquipmentItemDTO[];
}

export function DataTableSection({ data }: DataTableSectionProps) {
  const columns = useEquipmentColumns(data);

  return (
    <Card aria-label="Equipment Table" className="border-none shadow-black/10 h-full">
      <CardHeader className="mb-6">
        <CardTitle>Equipment Inventory</CardTitle>
        <CardDescription>Detailed list with thermal status</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <DataTable columns={columns as any} data={data} />
      </CardContent>
    </Card>
  );
}
