"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RuasProps {
    id: string;
    ruas_name: string;
    unit_id: string;
    unit: string;
    long: string;
    km_awal: string;
    km_akhir: string;
    status: string;
    photo: string;
}

export default function EditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [ruasData, setRuasData] = useState<RuasProps>();  

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              router.replace('/signin');
              return;
            }
    
            // Ambil Data Units dan Ruas secara paralel
            const [ruasResponse] = await Promise.all([
              fetch(`http://localhost:8004/api/ruas/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }),
            ]);
    
            if (ruasResponse.ok) {
              const ruasData = await ruasResponse.json();

              setRuasData((prevRuasData:any) => ({
                ...prevRuasData,
                id: ruasData.data.id,
                unit_id: ruasData.data.unit_id.toString(),
                unit: ruasData.data.unit.unit,
                ruas_name: ruasData.data.ruas_name,
                long: ruasData.data.long,
                km_awal: ruasData.data.km_awal,
                km_akhir: ruasData.data.km_akhir,
                status: ruasData.data.status.toString(),
                photo: ruasData.data.photo_url,
              }));
            } 
          } catch (error) {
            console.error("An error occurred:", error);
          } 
        };
    
        fetchData();
      }, [id]);
 
    const handleCancelClick = () => {
        router.push('/master-data');
    };

    console.log(ruasData)

    return (
        <div className="w-full flex justify-center">
            <Card className="w-full md:w-1/2">
            <form className="space-y-8">
                        <CardHeader>
                            <CardTitle>Data Ruas : {ruasData?.ruas_name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img src={ruasData?.photo} alt=""  className="w-full mb-5"/>
                            <div className="grid grid-cols-2 w-full mb-5 gap-5">
                                <div className="">
                                    <Label>Nama Ruas</Label>
                                    <Input placeholder="Nama Ruas" readOnly className="w-full bg-gray-100" value={ruasData?.ruas_name ||''} />
                                </div>
                                <div className="">
                                    <Label>Unit Kerja</Label>
                                    <Input placeholder="Unit Kerja" readOnly className="w-full bg-gray-100" value={ruasData?.unit ||''} />
                                </div>                            
                            </div>
                            <div className="grid grid-cols-2 w-full mb-5 gap-5">
                                <div className="">
                                    <Label>Panjang</Label>
                                    <Input placeholder="Panjang" readOnly className="w-full bg-gray-100" value={ruasData?.long ||''} />
                                </div>
                                <div className="">
                                    <Label>Status</Label>
                                    <Input placeholder="Status" readOnly className="w-full bg-gray-100" value={ruasData?.status === '1' ? 'Aktif' : 'Tidak Aktif'} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full mb-5 gap-5">
                                <div className="w-full">
                                    <Label>KM Awal</Label>
                                    <Input placeholder="KM Awal" readOnly className="w-full bg-gray-100" value={ruasData?.km_awal ||''} />
                                </div>
                                <div className="w-full">
                                    <Label>KM Akhir</Label>
                                    <Input placeholder="KM Akhir" readOnly className="w-full bg-gray-100" value={ruasData?.km_akhir ||''} />
                                </div>
                            </div>
                            
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3">
                            <Button variant="outline" type="button" onClick={handleCancelClick}>
                                Tutup
                            </Button>
                        </CardFooter>
                    </form>
            </Card>
        </div>
  
   );
}