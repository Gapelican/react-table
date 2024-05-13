'use client'

import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table"
import Link from "next/link"


export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
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

const TableCell = ({data, url}: TableCellInfo) => {
  console.log(url);
  
  return (
    <Link href={url as string}>
      <div className="h-10 px-2 text-left align-middle font-medium text-muted-foreground bg-red-600">{data.id}</div>
    </Link>
  )
}

const columnHelper = createColumnHelper<Payment>()
export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => <TableCell data={info.row.original} url={`/payments/${info.row.original.id}`} />,
  })
] 

