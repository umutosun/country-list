import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ListProps } from "./types";

const List = ({ data, columns, setRowSelection }: ListProps) => {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const [filtering, setFiltering] = useState<string>();

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  const handleCheckboxChange = (countryName: string, rowId: string) => {
    if (selectedCountry === countryName) {
      setSelectedCountry(null);
      setSelectedRowId(null);
    } else {
      setSelectedCountry(countryName);
      setSelectedRowId(rowId);
    }
  };

  return (
    <div className="m-2 border-solid  border-2 border-customColors-gray500 rounded-lg">
      <div className="flex m-2">
        <input
          type="text"
          value={filtering}
          placeholder="Search countries..."
          onChange={(e) => setFiltering(e.target.value)}
          className="border-solid w-72 border-2 border-customColors-gray500 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-customColors-blue500"
        />
      </div>

      <table>
        <tbody>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="w-72 border-solid border-customColors-gray500 border-b-2 uppercase p-4 text-sm">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={
                row.id === selectedRowId ? "bg-customColors-green200" : ""
              }>
              {row.getVisibleCells().map((cell) => (
                <th key={cell.id} className="h-20  flex-col">
                  <p className="mt-5 text-sm">
                    {cell.column.id === "name" && (
                      <input
                        className="-ml-8"
                        type="checkbox"
                        checked={cell.row.original.name === selectedCountry}
                        onChange={() =>
                          handleCheckboxChange(
                            cell.row.original.name,
                            cell.row.id
                          )
                        }
                      />
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </p>
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
