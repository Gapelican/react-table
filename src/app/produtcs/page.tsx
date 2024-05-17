import Table from "./table";

function App() {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      email: ''
    },
  ];
 
  const columns = [
     {
      id: 'id',
      header: 'Id',
      accessorKey: 'id',
      cell: (ctx) => ctx.getValue(),
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: (ctx) => ctx.getValue(),
    },
    {
      id: 'email',
      header: 'Email',
      cell: (ctx) => {
        const { email } = ctx.row.original;
 
        return <span className='font-bold'>{email}</span>
      },
    },
  ];
 
  return <Table data={data} columns={columns} />
}