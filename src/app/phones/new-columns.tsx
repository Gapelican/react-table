'use client'

import { api } from "@/data/api"
import { ColumnDef } from "@tanstack/react-table"

type Phones = {
  id: string
  name: string
  status: boolean
  number_phone: string
  contact_page: string
  description: string
  phone_category: {
    id: string
    name: string
    description: string
  }
}

export const newColumns: ColumnDef<Phones>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "number_phone",
    header: "Number Phone",
  },
  {
    accessorKey: "contact_page",
    header: "Contact Page",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "phone_category.name",
    header: "Phone Category",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({row, table}) => {
      return (
        <div className="flex gap-2">
          <button
            className="rounded bg-blue-500 py-1 px-2 text-white"
          >
            Edit
          </button>
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