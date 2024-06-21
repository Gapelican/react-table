'use client'

import { api } from "@/data/api"
import { ColumnDef } from "@tanstack/react-table"
import { FiscalUnit } from "./type"
import Link from "next/link"

export const columns: ColumnDef<FiscalUnit>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "is_active",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "value",
    header: "Valor",
  },
  {
    accessorKey: "published_at",
    header: "Data de publicação",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({row, table}) => {
      // @ts-ignore
      return (
        <div className="flex gap-2">
          
          <Link
            // @ts-ignore
            href={table.options.meta?.isLoading ? '#' : `/fiscal-units/form/${row.original.id}`}
            className="rounded bg-blue-500 py-1 px-2 text-white"
          >
            Edit
          </Link>
          <button
            className="rounded bg-red-500 py-1 px-2 text-white"
            onClick={() => {
              const res = api(`/phones/${row.original.id}`, {
                method: 'DELETE',
              })
              if(!res) {
                console.log('deu ruim')
              }
              // @ts-ignore
              table.options.meta?.deleteRow(row.original.id)
            }}
          >
            Delete
          </button>
        </div>
      )
    }
  }

]