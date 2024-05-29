

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/data/api'
import { DataTable } from '@/components/data-table/data-table'
import { newColumns } from './new-columns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Phone = {
  id: string;
  name: string;
  status: boolean;
  number_phone: string;
  contact_page: string;
  description: string;
  phone_category: {
    id: string;
    name: string;
    description: string;
  };
};

const fetchPhones = async () => {
  const response = await api('/phones');
  if (!response.ok) {
    throw new Error('Failed to fetch phones');
  }
  return response.json();
};


export default async function DemoPage() {
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['phones'], 
  //   queryFn: fetchPhones
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading data: {error.message}</div>;
  // }

  const data = await fetchPhones();
  console.log(data)
  
  return (
    <div className="container mx-auto py-10">
      <Link className={cn("rounded bg-blue-500 py-1 px-2 text-white")}  href="/phones/form/new">Create new phone</Link>
      <DataTable columns={newColumns} data={data} />
    </div>
  );
}