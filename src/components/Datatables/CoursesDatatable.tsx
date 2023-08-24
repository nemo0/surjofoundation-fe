"use client";

import { useEffect, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { AUTH_COOKIE_NAME } from "@/lib/config";
import { ArrowUpDown } from "lucide-react";
import { ICourse } from "@/interfaces";

interface DataTableProps<TData, TValue> {
  data: ICourse[];
}

export const Columns: ColumnDef<ICourse>[] = [
  {
    accessorKey: "courseName",
    header: "Course Name",
  },
  {
    accessorKey: "courseDuration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "courseCode",
    header: "Course Code",
  },
];

export function CoursesDatatable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: Columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const router = useRouter();

  useEffect(() => {
    const isUser = () => {
      const token = getCookie(AUTH_COOKIE_NAME);
      if (!token) {
        router.push("/login");
      }
    };

    isUser();
  }, []);

  return (
    <div className="rounded-md border">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Course..."
          value={
            (table.getColumn("courseName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("courseName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <>
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={Columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
