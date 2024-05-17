'use client'

import { ColumnDef } from "@tanstack/react-table"
import { columns } from "./components/columns"

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
  ...columns<Phones>(),
  {
    accessorKey: "id",
    header: "ID", 
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
    cell: () => {
      return (
        <div className="flex gap-2">
          <button
            className="rounded bg-blue-500 py-1 px-2 text-white"
          >
            Edit
          </button>
          <button
            className="rounded bg-red-500 py-1 px-2 text-white"
          >
            Delete
          </button>
        </div>
      )
    }
  }


]