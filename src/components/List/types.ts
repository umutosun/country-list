import { ColumnDef } from "@tanstack/react-table";
export interface ListProps {
  data: any[];
  columns: ColumnDef<any>[];
  rowSelection?: any;
  setRowSelection?: (rowSelection: any) => void;
}
