"use client"

import DeleteButton from "@/components/DeleteButton"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BsPencilFill } from "react-icons/bs"
import { FaDownload } from "react-icons/fa6"
import { IoEye, IoTrashOutline } from "react-icons/io5"
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md"

export type Road = {
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

export const columns: ColumnDef<Road>[] = [
  
  {
    accessorKey: "number",
    header: "No",
    cell: ({ row }) => (
      <div className="capitalize">{row.index + 1}</div>
    ),
  },  
  
  {
    accessorKey: "ruas_name",
    header: "Ruas",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ruas_name")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: "Lokasi",
    cell: ({ row }) => (
      <div className="">{row.original.km_awal} s/d {row.original.km_akhir}</div>
    ),
  },
  {
    accessorKey: "photo_url",
    header: "Foto",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <span>
            <Button className="bg-gray-500 hover:bg-gray-600">
              <MdOutlinePhotoSizeSelectActual className="mr-2 text-xl"/>Lihat
            </Button>
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Lihat Foto</DialogTitle>
            <DialogDescription>
              {row.getValue('photo_url') ? (
                <img src={row.getValue('photo_url')} alt="" className="w-full"/>
              ):(
                <img src="/illustration-no-photo.png" alt="" className="w-full"/>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  },

  {
    accessorKey: "doc_url",
    header: "Dokumen",
    cell: ({ row }) => (
      <Button className="bg-gray-500 hover:bg-gray-600" asChild>
        <Link href={row.original.doc_url} target="_BLANK"><FaDownload className="mr-2 text-xl"/>Download</Link>
      </Button>
    ),
  },
  {
    accessorKey: "unit_id",
    header: "Unit",
    cell: ({ row }) => (
      <div className="">{row.getValue("unit_id")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="">
        {row.original.status === "1" ? 'Aktif' : 'Tidak Aktif'} 
      </div>
    ),
  },
  
    {
      id: "actions",
      accessorKey: "actions",
      header: "Aksi",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <Button size="icon" className="bg-yellow-500 hover:bg-yellow-600" asChild>
              <Link href={`/master-data/edit/${row.original.id}`}><BsPencilFill className="text-lg"/></Link>
            </Button>
            <Button size="icon" className="bg-emerald-500 hover:bg-emerald-600" asChild>
              <Link href={`/master-data/show/${row.original.id}`}><IoEye className="text-lg"/></Link>
            </Button>
            <DeleteButton url={`http://localhost:8004/api/ruas/${row.original.id}`}/>
          </div>
        )
      },
  },
]
