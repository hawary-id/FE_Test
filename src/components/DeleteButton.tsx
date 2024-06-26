'use client';

import { useRouter } from 'next/navigation';
import { IoTrashOutline } from 'react-icons/io5';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useState } from 'react';

interface IDeleteButtonProps {
    url: string;
}

export default function DeleteButton({url}: IDeleteButtonProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const onDelete = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            console.log("Data deleted successfully");
            // Close the dialog after successful deletion
            setIsOpen(false);
            router.refresh(); // This will trigger a full page reload
          } else {
            const errorData = await response.json();
            console.error("Failed to delete data:", errorData);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };

   return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
      <Button size="icon" variant="destructive"><IoTrashOutline className="text-lg"/></Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Apakah kamu yakin ingin menghapus data ini?</DialogTitle>
        <DialogDescription>
          Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data secara permanen dari server.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Batal
          </Button>
        </DialogClose>
        <Button variant="destructive" onClick={onDelete}>Ya, Hapus</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
   );
}