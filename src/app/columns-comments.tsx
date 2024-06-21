'use client'

import { ColumnDef } from "@tanstack/react-table";

export type Comments = {
  postId: number,
  id: number
  name: string
  email: string
  body: string
};

export const columnsComments: ColumnDef<Comments>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "body",
    header: "Body",
  },

]