import { api } from '@/data/api'
import { DataTable } from '@/components/data-table/data-table'
import { columns } from './columns'
import Link from 'next/link'
import { cn } from '@/lib/utils'


const fetchFiscalUnit = async () => {
  const response = await api('/fiscal-units', {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch fiscal units');
  }
  return response.json();
};


export default async function DemoPage() {
  const data = await fetchFiscalUnit();
  
  return (
    <div className="container mx-auto py-10">
      <Link 
        className={cn("rounded bg-blue-500 py-1 px-2 text-white")} 
        href="/fiscal-units/form/new">
          Create new fiscal unit
      </Link>
      <DataTable columns={columns} data={data} />
    </div>
  );
}