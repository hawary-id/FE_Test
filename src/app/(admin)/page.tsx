"use client"
import ChartBar from '@/components/ChartBar';
import ChartPie from '@/components/ChartPie';
import { DataTable } from '@/components/Datatable';
import Title from '@/components/Title';
import { Card } from '@/components/ui/card';
import { roads } from '@/constants';
import { useRouter } from 'next/navigation';
import { columns } from './column';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface UnitData {
    id: number;
    unit: string;
    ruas: { id: number }[];
}

interface ChartDataItem {
    name: string;
    unit: number;
}

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

interface PaginatedResponse {
    current_page: number;
    data: Road[];
    last_page: number;
    total: number;
  }

export default function DashboardPage() {
  const router = useRouter();
  const [unitData, setUnitData] = useState<ChartDataItem[]>([]);
  const [roads, setRoads] = useState<Road[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.replace('/signin');
          return;
        }

        const response = await fetch('http://localhost:8004/api/unit', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
            const responseData: { data: UnitData[] } = await response.json(); // Ubah tipe data

            const dataForChart: ChartDataItem[] = responseData.data.map(item => ({ // Akses properti data
                name: item.unit,
                unit: item.ruas?.length || 0,
            }));
            setUnitData(dataForChart);

        } else {
          console.error('Gagal mengambil data unit');

        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    fetchData();
  }, [router]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/signin");
          return;
        }
        const response = await fetch(
          `http://localhost:8004/api/ruas?per_page=${perPage}&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData: PaginatedResponse = await response.json();
          setRoads(responseData.data);
          setTotalPages(responseData.last_page);
        } else {
          console.error("Failed to fetch roads");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [currentPage, perPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


   return (
       <div>
           <Title className="mb-3">Dashboard</Title>
            <div className="flex flex-col md:flex-row gap-5 mb-8">
                <Card className='w-full md:w-3/4 p-6'>
                    <ChartBar data={unitData}/>
                </Card>
                <Card className='w-full md:w-1/4 p-6'>
                    <ChartPie data={unitData}/>
                </Card>
            </div>
            <div className="w-full">
                <DataTable columns={columns} data={roads} />
                {/* Pagination Controls */}
                <div className="flex justify-end mt-3 bg-white rounded shadow overflow-hidden">
                    <select
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="px-2 text-sm text-gray-600"
                    >
                    {[5, 10, 20, 50].map((size) => (
                        <option key={size} value={size}>
                        Show {size}
                        </option>
                    ))}
                    </select>
                    <Button size="icon" variant="ghost" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <IoChevronBack/>
                    </Button>
                    <span className="flex items-center text-gray-600 text-sm px-3">
                    Page {currentPage} of {totalPages}
                    </span>
                    <Button size="icon" variant="ghost" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <IoChevronForward/>
                    </Button>
                </div>
            </div>
       </div>
   );
}