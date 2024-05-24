'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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

const deletePhone = async (id: string) => {
  const response = await api(`/phones/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete phone');
  }
  return id;
};

export default function DemoPage() {

  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['phones'], 
    queryFn: fetchPhones
  });


  const mutation = useMutation({
    mutationFn: deletePhone,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Phone[]>(['phones'], (oldData) =>
        oldData?.filter((phone) => phone.id !== deletedId) ?? []
      );
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={newColumns} data={data} />
    </div>
  );
}