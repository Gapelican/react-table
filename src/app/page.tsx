import { DataTable } from "@/components/data-table/data-table";
import { api } from "@/data/api";
import { columnsComments } from "@/app/columns-comments";


const fetchData = async () => {
  console.log('fetching data server side...')
  const response = await api(`/comments?_page=${1}&_limit=${5}`, {
    next: { tags : ['fiscal-units'] }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch fiscal units');
  }
  return response.json();
};

export default async function Home() {

  const initialData = await fetchData();
  return (
   <div className="container mx-auto py-10">
    <h1>Next.js + Tailwind</h1>
    <DataTable columns={columnsComments} data={initialData} />

    
   </div>
  );
}
