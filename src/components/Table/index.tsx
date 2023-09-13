import { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ListProps } from "./types";

const Table = ({ data, columns, filtering }: ListProps) => {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const getRowClassName = (index: number) => {
    return index % 2 === 0 ? "bg-neutralColors-color300" : "bg-white";
  };

  const {
    getHeaderGroups,
    getRowModel,
    setPageIndex,
    getPageCount,
    previousPage,
    nextPage,
    getCanPreviousPage,
    getCanNextPage,
    getState,
    setPageSize,
  } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: filtering,
    },
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

  const noRows = getRowModel().rows.length === 0;

  return (
    <div className="m-4 border-solid  border-2 border-neutralColors-color500 rounded-lg ">
      <table>
        <tbody>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="2xl:w-72 laptop:w-60 desktop:w-80 w-56  border-solid border-customColors-gray500 border-b-2 uppercase p-4 text-xs ">
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
          {getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                row.id === selectedRowId
                  ? "bg-customColors-blue500"
                  : getRowClassName(index)
              }`}>
              {row.getVisibleCells().map((cell) => (
                <th
                  key={cell.id}
                  className="h-20 flex-col border-solid border-customColors-gray500 border-1">
                  <div className="mt-5 inline  text-xs ">
                    {cell.column.id === "name" && (
                      <input
                        className=" absolute -ml-24 cursor-pointer"
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

      {noRows && (
        <div className="text-center py-2 text-customColors-red600">
          Böyle bir ülke yok
        </div>
      )}

      {!noRows && (
        <div className="flex gap-2 mt-4">
          <button
            className="border-solid border-2 border-customColors-blue300 bg-customColors-blue600 p-1 text-customColors-blue100 disabled:opacity-50"
            onClick={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}>
            {"<<"}
          </button>
          <button
            className="border-solid border-2 border-customColors-blue300 bg-customColors-purple600 p-1 text-customColors-blue100 disabled:opacity-50"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}>
            Previous Page
          </button>
          <button
            className="border-solid border-2 border-customColors-blue300 bg-customColors-purple600 p-1 text-customColors-blue100 disabled:opacity-50"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}>
            Next Page
          </button>
          <button
            className="border-solid border-2 border-customColors-blue300 bg-customColors-blue600 p-1 text-customColors-blue100 disabled:opacity-50"
            onClick={() => setPageIndex(getPageCount() - 1)}
            disabled={!getCanNextPage()}>
            {">>"}
          </button>
          <input
            className="border-solid border-2 border-neutralColors-color500 focus:outline-none focus:border-customColors-blue500"
            type="number"
            defaultValue={getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
          />
          <p className="text-xl mt-1">
            Page <strong>{getState().pagination.pageIndex + 1}</strong> of{" "}
            <strong>{getPageCount()}</strong>
          </p>
          <select
            className="text-xl"
            value={getState().pagination.pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option value={pageSize} key={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Table;
