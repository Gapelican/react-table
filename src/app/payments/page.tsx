import { columns } from "./columns"
import { DataTable } from "./data-table"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  enabled?: boolean
}


async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "326eh52a",
      amount: 300,
      status: "success",
      email: "zemaia@example.com",
      enabled: true,
    },
    {
      id: "p2pe352f",
      amount: 500,
      status: "failed",
      email: "yalin@example.com",
      enabled: true,
    },
    {
      id: "p581d52b",
      amount: 200,
      status: "pending",
      email: "asd@example.com",
      enabled: false,
    },
    {
      id: "128e452x",
      amount: 120,
      status: "pending",
      email: "mhh@example.com",
      enabled: false,
    },
    {
      id: "523tdb2f",
      amount: 100,
      status: "pending",
      email: "teste@example.com",
      enabled: true,
    },
  ]
}

export default async function DemoPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const data = await getData()


  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}