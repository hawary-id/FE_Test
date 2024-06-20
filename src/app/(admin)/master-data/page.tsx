"use client";
import { DataTable } from "@/components/Datatable";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { columns } from "./column";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

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

export default function MasterPage() {
  const router = useRouter();
  const [roads, setRoads] = useState<Road[]>([]);
  const [filterData, setFilterData] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

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

  const navCreateData = () => router.push("/master-data/create");

  const handleFilter = (value: string) => {
    setFilterData(value);
  };

  const filteredData = roads.filter((row) =>
    row.ruas_name.toLocaleLowerCase().includes(filterData.toLocaleLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <Title>Master Data Ruas</Title>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              onChange={(e) => handleFilter(e.target.value)}
            />
            {filterData === "" && (
              <FiSearch className="text-xl text-gray-400 absolute top-[10px] right-[10px] hover:text-primary cursor-pointer" />
            )}
          </div>
          <Button onClick={navCreateData}>
            <FiPlus className="text-xl" />
            Tambah
          </Button>
        </div>
      </div>

      <div className="w-full">
        <DataTable columns={columns} data={filteredData} />
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-3 bg-white rounded overflow-hidden">
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
  );
}
