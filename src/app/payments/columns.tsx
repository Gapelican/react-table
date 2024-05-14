'use client'

import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table"
import Link from "next/link"


export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  enabled?: boolean
}



interface TableCellInfo {
  data: {
    email?: string;
    id?: string;
    amount?: number;
    status?: "pending" | "processing" | "success" | "failed";
    
  };
  url?: string;
}



export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "enabled",
    header: "Enabled",
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]