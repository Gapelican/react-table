'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/data/api'
import { DataTable } from '@/components/data-table/data-table'
import { newColumns } from './new-columns'

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


export default function DemoPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['phones'], 
    queryFn: fetchPhones
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={newColumns} data={data} />
    </div>
  );
}