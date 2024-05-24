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
import { table } from "console"


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

type TableMeta<T> = {
  deleteRow?: (rowId: string) => void;
};

export function DataTable<T extends WithId>({
  columns,
  data: defaultData,
}: DataTableProps<T>) {
  const [data, setData] = useState(() => [...defaultData]);
  const [sorting, setSorting] = React.useState<SortingState>([])
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
      deleteRow: (rowId: string) => {
        const res = api(`/phones/${rowId}`, {
          method: 'DELETE',
        });
        if (!res) {
          console.log('Failed to delete phone');
        } else {
          setData((oldData) =>
            oldData.filter((row) => row.id !== rowId)
          );
        }
      },
    } as TableMeta<T>,
  })

  const handleToggleColumn = (value: boolean, id: string) => {
    console.log(value, id)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} 
                  >
                    <Button 
                     className={
                      cn(
                        header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                        'pl-0'
                      )
                      }
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
                )
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
                {
                row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.columnDef.header !== "Status" ? (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      ): (
                        <Switch checked={cell.getValue() as boolean}
                        onCheckedChange={(value) => handleToggleColumn(value, row.original.id)}/>
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
