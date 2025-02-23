import { ReactNode, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Spinner } from "../Spinner/Index";
import { SvgIcon } from "../SvgIcon/Index";
import { TableShimmer } from "../Ui/Shimmer/Table";

import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import toast from "react-hot-toast";
import "./main.css";
import { useUpdateEffect } from "react-use";

type AppTableType = {
  columns?: any;
  data?: any[];
  total?: any;
  loading?: boolean;
  noResult?: string | ReactNode;
  manual?: boolean;
  className?: string;
  pageSize?: number;
  onPaginate?: (e) => void;
  children?: any;
  childrenPosition?: "TOP" | "BOTTOM";
};
export const AppTable = ({
  columns = [],
  data = [],
  total = 0,
  loading = false,
  noResult = "لا يوجد نتائج ..",
  onPaginate,
  manual = true,
  className = "",
  pageSize = 10,
  childrenPosition = "BOTTOM",
  children,
}: AppTableType) => {
  // Set or get query params
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>(() => {
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    return {
      pageIndex: page ? Number(page) - 1 : 0,
      pageSize: limit ? Number(limit) : pageSize,
    };
  });

  useUpdateEffect(() => {
    const defaultPage = () => {
      setPagination({
        pageIndex: 0,
        pageSize: 10,
      });
    };
    defaultPage();
  }, [params?.project_type]);

  // Initiate table instance
  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    columnResizeMode: "onChange", //change column resize mode to "onChange"
    getCoreRowModel: getCoreRowModel(),
    ...(!manual && { getPaginationRowModel: getPaginationRowModel() }),
    ...(manual && { rowCount: total }),
    manualPagination: manual,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  // On watch pagination
  useEffect(() => {
    // Set query params
    setSearchParams((prevState) => {
      const currentState = prevState;
      currentState.set("page", String(pagination?.pageIndex + 1));
      currentState.set("limit", String(pagination?.pageSize));
      return currentState;
    });

    // On paginate CTA
    onPaginate?.({
      page: pagination?.pageIndex + 1,
      limit: pagination?.pageSize,
    });
  }, [pagination]);

  // If not data and loading true in the first load
  if (loading && !data?.length) {
    return <TableShimmer className={className} />;
  }
  return (
    <div className={`appTable ${className}`}>
      {childrenPosition == "TOP" && children}

      <div className="appTable-main">
        <div className="!min-w-[800px] appTable-content ">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {loading && (
            <div className={`appTable-loading`}>
              <Spinner
                size="sm"
                className="border-gray-200/50 border-b-blue-450"
              />
            </div>
          )}

          {!data?.length ? (
            <p className="text-red-400 py-3 px-4 bg-red-100/20 text-center border border-red-100/20">
              {noResult}
            </p>
          ) : null}
        </div>
      </div>
      {childrenPosition == "BOTTOM" && children}
      <div className="appTable-pagination">
        <div className="flex flex-wrap items-center gap-2">
          <div className="appTable-pagination-controls">
            <button
              type="button"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <SvgIcon
                name="chevron-right-double"
                className="fill-current w-5 h-5"
              />
            </button>
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <SvgIcon name="chevron-right" className="fill-current w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <SvgIcon name="chevron-left" className="fill-current w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <SvgIcon
                name="chevron-left-double"
                className="fill-current w-5 h-5"
              />
            </button>
          </div>

          <input
            type="number"
            min="1"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              if (page > Math.ceil(total)) {
                toast.error("لا توجد بيانات إضافية");
              } else table.setPageIndex(page);
            }}
            className="appTable-pagination-input"
          />
        </div>
      </div>
    </div>
  );
};
