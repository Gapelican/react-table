'use client'

import { Switch } from "@/components/ui/switch"
import { ColumnDef } from "@tanstack/react-table"

type ColumnDataType = {
  status: boolean
  id: string

}

export const columns = <T extends ColumnDataType>(): ColumnDef<T>[] => [
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      return (
        <Switch checked={!!info.row.original.status} onCheckedChange={() => {
          AtualizarStatus(info.row.original.id, !info.row.original.status)
        }} />
      )
    },
  },
]

function AtualizarStatus(id: string, status: boolean) {
  console.log(id, status)
}