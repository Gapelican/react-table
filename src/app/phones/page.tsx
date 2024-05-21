import { newColumns } from "./new-columns"
import { DataTable } from "../../components/data-table/data-table"
import { api } from "@/data/api"

type Phone = {
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



async function getPhones(): Promise<Phone[]> {
  try {
    const response = await api("/phones", {
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch phones");
    }

    const phones = await response.json();
    return phones;
  } catch (error) {
    console.error("Error fetching phones:", error);
    throw error; // Re-throw para que o erro seja tratado no componente
  }
}

export default async function DemoPage() {
  const data = await getPhones()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={newColumns} data={data} />
    </div>
  )
}