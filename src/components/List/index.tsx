import { useEffect, useMemo, useState } from "react";
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
  const selectedRow = () => {
    if (getRowModel().rows.length >= 10) {
      const tenthRow = getRowModel().rows[9];
      setSelectedCountry(tenthRow.original.name);
      setSelectedRowId(tenthRow.id);
    } else if (getRowModel().rows.length > 0) {
      const lastRow = getRowModel().rows[getRowModel().rows.length - 1];
      setSelectedCountry(lastRow.original.name);
      setSelectedRowId(lastRow.id);
    }
  };
  useEffect(() => {
    selectedRow();
  }, [filtering]);

  return (
    <div className="m-2 p-2 ">
      <input
        type="text"
        value={filtering}
        placeholder="Search countries..."
        onChange={(e) => setFiltering(e.target.value)}
        className="border-solid w-72 border-2 border-customColors-gray500 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-customColors-blue500 ml-0 mt-2 mb-1"
      />

      <table>
        <tbody>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="w-56 border-solid border-customColors-gray500 border-2 uppercase p-4 text-xs bg-customColors-blue500">
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
                <th
                  key={cell.id}
                  className="h-20 flex-col border-solid border-customColors-gray500 border-2">
                  <div className="mt-5 inline ml-16 text-xs ">
                    {cell.column.id === "name" && (
                      <input
                        className="absolute -ml-32 mt-6"
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
                    <div className="">
                      {cell.column.id === "name" ? (
                        <span>
                          {cell.row.original.name.length > 20
                            ? cell.row.original.name.substring(0, 20)
                            : cell.row.original.name}
                        </span>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </div>
                  </div>
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
