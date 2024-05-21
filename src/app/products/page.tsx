import { DataTable } from "@/components/data-table/data-table"
import { Product } from "./type-product"
import { ColumnDef } from "@tanstack/react-table"
// import { columnsProduct } from "./columns"



async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?skip=0&limit=10", {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }
  return res.json()
}

const columnsProduct: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Título",
  }
]


export default async function DemoPage() {
  const dataApi = await getProducts()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columnsProduct} data={dataApi.products} />
    </div>
  )
}