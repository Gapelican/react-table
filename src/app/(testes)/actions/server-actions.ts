'use server';

import { z } from 'zod';
import { api } from '@/data/api';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  is_active: z.boolean(),
  value: z.string().min(1, 'Value is required'),
  published_at: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export async function handleSubmit(
  formData: FormData, 
  id?: string) 
  {
  console.log(id)

  const parsedData = formSchema.parse(formData);

  if (id) {
    await api(`/fiscal-units/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(parsedData),
    });

    revalidateTag('fiscal-units');
    redirect("/fiscal-units");
  }

  try {
    const response = await api('/fiscal-units', {
      method: 'POST',
      body: JSON.stringify(parsedData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit');
    }

    revalidateTag('fiscal-units');

    redirect("/fiscal-units");
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export async function handleSwitchChangeAction(id: number, isActive: boolean) {

  console.log(id, isActive)

  try {
    const res = await api(`/Todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: isActive }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res) {
      console.log('Falha ao atualizar o status do fiscal');
    }

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }

  revalidateTag('fiscal-units');
}