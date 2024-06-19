"use client"
import ChartBar from '@/components/ChartBar';
import ChartPie from '@/components/ChartPie';
import { DataTable } from '@/components/Datatable';
import Title from '@/components/Title';
import { Card } from '@/components/ui/card';
import { roads } from '@/constants';
import { useRouter } from 'next/navigation';
import { columns } from './column';


export default function DashboardPage() {
  const token = localStorage.getItem('token');
  const router = useRouter();
  
  if (!token) {
    router.replace('/signin');
  }

   return (
       <div>
           <Title className="mb-5">Dashboard</Title>
            <div className="flex gap-5 mb-8">
                <Card className='w-3/4 p-6'>
                    <ChartBar/>
                </Card>
                <Card className='w-1/4 p-6'>
                    <ChartPie/>
                </Card>
            </div>
            <div className="w-full">
                <DataTable columns={columns} data={roads} />
            </div>
       </div>
   );
}