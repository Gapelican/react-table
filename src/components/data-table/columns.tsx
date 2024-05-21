'use client'

import { Switch } from "@/components/ui/switch"
import { ColumnDef } from "@tanstack/react-table"

// type ColumnDataType = {
//   status: boolean
//   id: string

// }

// export const columns = <T extends ColumnDataType>(): ColumnDef<T>[] => [
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: (info) => {
//       return (
//         <Switch checked={!!info.row.original.status} onCheckedChange={() => {
//           AtualizarStatus(info.row.original.id, !info.row.original.status)
//         }} />
//       )
//     },
//   },
// ]

// function AtualizarStatus(id: string, status: boolean) {
//   console.log(id, status)
// }

type InfosColumns = {
  object: <T>() => T
  id: string | number
  status: boolean
}


export const defaultColumns = <T extends InfosColumns>(): ColumnDef<T>[] => [
  {
    id: "status",
    header: "Status",
    cell: (info) => {
      return (
        <Switch checked={info.row.original.status} />
      );
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <button
            className="rounded bg-blue-500 py-1 px-2 text-white"
          >
            Edit
            {row.original.id}
          </button>
          <button
            className="rounded bg-red-500 py-1 px-2 text-white"
          >
            Delete
          </button>
        </div>
      );
    }
  }
];