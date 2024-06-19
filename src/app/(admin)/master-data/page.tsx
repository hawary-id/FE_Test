"use client";
import { DataTable } from '@/components/Datatable';
import Title from '@/components/Title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { columns } from './column';
 
interface Road {
    id: number;
    unit_id: number;
    ruas_name: string;
    long: number;
    km_awal: string;
    km_akhir: string;
    photo_url: string;
    doc_url: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export default function MasterPage() {
    const router = useRouter();
    const [roads, setRoads] = useState<Road[]>([]);
    const [filterData, setFilterData] = useState<string>(''); 


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.replace('/signin');
                }
                const response = await fetch('http://localhost:8004/api/ruas?per_page=5&page=1', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.ok) {
                    const responseData = await response.json();
                    const fetchedRoads: Road[] = responseData.data;
                    setRoads(fetchedRoads);
                } else {
                    console.error('Failed to fetch roads');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };
    
        fetchData();
    }, []);

    const navCreateData = () => router.push('/master-data/create');
    

    const handleFilter = (value: string) => {
        setFilterData(value);
    };

    // const filteredData = roadsData.filter(row =>
    //     row.ruas_name.toLocaleLowerCase().includes(filterData.toLocaleLowerCase())
    // )
   return (
       <div>
            <div className="flex justify-between items-center mb-5">
                <Title>Master Data Ruas</Title>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Input type="search" placeholder="Search..." onChange={(e) => handleFilter(e.target.value)}/>
                        {filterData==='' && (
                            <FiSearch className='text-xl text-gray-400 absolute top-[10px] right-[10px] hover:text-primary cursor-pointer'/>
                        )}
                    </div>
                    <Button onClick={navCreateData}>
                        <FiPlus className='text-xl'/>Tambah
                    </Button>
                </div>
            </div>

            <div className="w-full">
                <DataTable columns={columns} data={roads} />
            </div>
       </div>
   );
}