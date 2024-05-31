'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { handleSubmit, FormData } from '@/app/actions/server-actions';
import { api } from '@/data/api';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  is_active: z.boolean(),
  value: z.string().min(1, 'Value is required'),
  published_at: z.string().optional(),
});

function getId(params: { id?: string | string[] }): string | false {
  if (!params.id) {
    return false;
  }

  if (Array.isArray(params.id)) {
    return params.id[0] !== 'new' ? params.id[0] : false;
  }

  return params.id !== 'new' ? params.id : false;
}

export default function MyForm() {
  const params = useParams();
  const id = getId(params);
  const [isChecked, setChecked] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      is_active: false,
      value: '',
      published_at: '',
    },
  });

  const fetchData = async () => {
    if (id) {
      const res = await api(`/fiscal-units/${id}`);
      const data = await res.json();
      form.reset({
        name: data.name,
        is_active: data.is_active,
        value: data.value,
        published_at: data.published_at,
      });
      setChecked(data.is_active);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  
  const onSubmit = async (values: FormData) => {

    try {
      if (id) {
        await handleSubmit(values, id);
      } else {
        await handleSubmit(values);
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Link className="rounded bg-blue-500 py-1 px-2 text-white" href="/fiscal-units">Back</Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Switch checked={isChecked} onCheckedChange={(checked) => {
                    setChecked(checked);
                    field.onChange(checked);
                  }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="published_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published At</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
