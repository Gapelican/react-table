"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Switch } from "../ui/switch"
import { api } from "@/data/api"
import { useDebouncedCallback } from "use-debounce"
import { DataTablePagination } from "./pagination"


interface WithId {
  id: string;
}

interface DataTableProps<T extends WithId> {
  columns: ColumnDef<T>[]
  data: T[]
  meta?: {
    deleteRow: (rowId: string) => void
  }
}

export function DataTable<T extends WithId>({
  columns,
  data: defaultData,
}: DataTableProps<T>) {
  const [data, setData] = useState(() => [...defaultData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  console.log(data)

  const deleteRow = async (rowId: string) => {
    const res = await api(`/fiscal-units/${rowId}`, {
      method: 'DELETE',
    });
    if (!res) {
      console.log('Failed to delete fiscal unit');
    } else {
      setData((oldData) =>
        oldData.filter((row) => row.id !== rowId)
      );
    }
  }

  const handleSwitchChange = (id: string, isActive: boolean) => {
    setData((oldData) =>
      oldData.map((row) =>
        row.id === id ? { ...row, is_active: isActive } : row
      )
    );
    debouncedHandleSwitchChange(id, isActive);
  };

  const debouncedHandleSwitchChange = useDebouncedCallback(
    async (id: string, isActive: boolean) => {
      // Faz a solicitação ao servidor
      const res = await api(`/fiscal-units/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: isActive }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Se a solicitação falhar, reverte a mudança
      if (!res) {
        console.log('Failed to update fiscal status');
        setData((oldData) =>
          oldData.map((row) =>
            row.id === id ? { ...row, is_active: !isActive } : row
          )
        );
      }
    },
    300
  );
  
  

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    meta: {
      deleteRow,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <Button
                    className={cn(
                      header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                      'pl-0'
                    )}
                    variant="ghost"
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === 'asc'
                          ? 'Sort ascending'
                          : header.column.getNextSortingOrder() === 'desc'
                            ? 'Sort descending'
                            : 'Clear sort'
                        : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽'
                    }[header.column.getIsSorted() as string] || null}
                  </Button>
                </TableHead>
              ))}
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
                  <TableCell key={cell.id}>
                    {cell.column.columnDef.header !== "Status" ? (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    ) : (
                      <Switch
                        checked={cell.getValue() as boolean}
                        onCheckedChange={(value) => handleSwitchChange(row.original.id, value)}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
    
  )
}
