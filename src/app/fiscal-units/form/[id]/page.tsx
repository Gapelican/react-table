'use client'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/data/api";
import { useEffect } from "react";
import { useParams } from "next/navigation";


export const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  is_active: z.boolean(),
  value: z.string(),
  published_at: z.string(),
});

export default function MyForm() {
  const params = useParams()
  const [isChecked, setChecked] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      is_active: false,
      value: "",
      published_at: "",
    },
  });

  const fetchData = async () => {
    if (params.id) {
      const res = await api(`/fiscal-units/${params.id}`);
      const data = await res.json();

      form.reset({
        id: data.id,
        name: data.name,
        is_active: data.is_active,
        value: data.value,
        published_at: data.published_at,
      });

      setChecked(data.is_active);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id, form]);

  // @ts-ignore
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="container mx-auto py-10">
      <Link className="rounded bg-blue-500 py-1 px-2 text-white" href="/fiscal-units">Back</Link>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Switch checked={isChecked} onCheckedChange={setChecked} />
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
              <FormLabel>Phone Number</FormLabel>
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
              <FormLabel>Contact Page</FormLabel>
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