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

  const deleteRow = async (rowId: string) => {
    const res = await api(`/phones/${rowId}`, {
      method: 'DELETE',
    });
    if (!res) {
      console.log('Failed to delete phone');
    } else {
      setData((oldData) =>
        oldData.filter((row) => row.id !== rowId)
      );
    }
  }

  const debouncedHandleSwitchChange = useDebouncedCallback(
    async (id: string, status: boolean) => {
      // Atualiza a UI de forma otimista
      setData((oldData) =>
        oldData.map((row) =>
          row.id === id ? { ...row, status } : row
        )
      );

      // Faz a solicitação ao servidor
      const res = await api(`/phones/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Se a solicitação falhar, reverte a mudança
      if (!res) {
        console.log('Failed to update phone status');
        setData((oldData) =>
          oldData.map((row) =>
            row.id === id ? { ...row, status: !status } : row
          )
        );
      }
    },
    500 // 300 ms de debounce delay
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
                        onCheckedChange={(value) => debouncedHandleSwitchChange(row.original.id, value)}
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
    </div>
  )
}
