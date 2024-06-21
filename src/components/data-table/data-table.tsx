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
import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Switch } from "../ui/switch"
import { api } from "@/data/api"
import { useDebouncedCallback } from "use-debounce"
import { DataTablePagination } from "./data-table-pagination"
import { handleSwitchChangeAction } from "@/app/(testes)/actions/server-actions"
import { useSearchParams } from "next/navigation"
import Link from "next/link"


interface WithId {
  id: number;
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPagination, setIsLoadingPagination] = useState(false);

  const searchParams = useSearchParams()
  
  useEffect(() => {
    if (searchParams.size > 0) {
      console.log('fetching data...')
      const page = searchParams.get('page') || '1'
      const limit = searchParams.get('limit') || '5'
      
      const fetchData = async () => {
        setIsLoadingPagination(true);
        try {
          const response = await api(`/comments?_page=${page}&_limit=${limit}`, {
            next: { tags : ['fiscal-units'] }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch fiscal units');
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));

          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingPagination(false);
        }
      };

      fetchData();
    }
  }, [searchParams]);


  const deleteRow = async (rowId: number) => {
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

  const handleSwitchChange = (id: number, isActive: boolean) => {
    setData((oldData) =>
      oldData.map((row) =>
        row.id === id ? { ...row, is_active: isActive } : row
      )
    );
    setIsLoading(true);
    debouncedHandleSwitchChange(id, isActive);
  };

  const debouncedHandleSwitchChange = useDebouncedCallback(
    async (id: number, isActive: boolean) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      handleSwitchChangeAction(id, isActive);

      setIsLoading(false);
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
      isLoading,
    },
  });


  // if (isLoadingPagination) {
  //   console.log('Loading...')
  //   return <div className="rounded-md border text-3xl">LOADING NA TABELA...</div>;
  // }

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
          {isLoadingPagination ? <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">Loading...</TableCell></TableRow> : table.getRowModel().rows?.length ? (
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

      <div className="flex items-center gap-2 px-2">
        <Link href={searchParams.get('page') ? `?page=${Number(searchParams.get('page')) - 1 || 1}` : '?page=1'}>
          Anterior
        </Link>
        <span> | </span>
        <Link href={searchParams.get('page') ? `?page=${Number(searchParams.get('page')) + 1 || 1}` : '?page=2'}>
          Proximo
        </Link>
      </div>
    </div>
    
  )
}