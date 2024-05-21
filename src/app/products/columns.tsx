'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Product } from "./type-product"
import { Switch } from "@/components/ui/switch"


export const columnsProduct: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "discountPercentage",
    header: "Desconto",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  }, 
]


