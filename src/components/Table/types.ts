export interface ListProps {
  data: any[];
  columns: {
    accessorKey: string;
    header: string;
    cell: (info: any) => JSX.Element;
  }[];
  filtering?: string;
}
