"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { BsPencilFill } from "react-icons/bs"
import { FaDownload } from "react-icons/fa6"
import { IoEye, IoTrashOutline } from "react-icons/io5"
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md"

export type Road = {
  id: string
  ruas: string
  lokasi: string
  foto: string
  dokumen: string
  unit: string
  status: boolean
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
    accessorKey: "ruas",
    header: "Ruas",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ruas")}</div>
    ),
  },
  {
    accessorKey: "lokasi",
    header: "Lokasi",
    cell: ({ row }) => (
      <div className="">{row.getValue("lokasi")}</div>
    ),
  },
  {
    accessorKey: "foto",
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
              {row.getValue('foto') ? (
                <img src={row.getValue('foto')} alt="" className="w-full"/>
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
    accessorKey: "dokumen",
    header: "Dokumen",
    cell: ({ row }) => (
      <Button className="bg-gray-500 hover:bg-gray-600"><FaDownload className="mr-2 text-xl" />Download</Button>
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
      <div className="">{row.getValue('status') ? 'Aktif':'Tidak Aktif'}</div>
    ),
  },
]
