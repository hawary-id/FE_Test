"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roadFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Unit {
    id: string;
    unit: string;
    status: string;
}

export default function CreatePage() {
    const router = useRouter();
    const [units, setUnits] = useState<Unit[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.replace('/signin');
                }
                const response = await fetch('http://localhost:8004/api/unit', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.ok) {
                    const responseData = await response.json();
                    const fetchedRoads: Unit[] = responseData.data;
                    setUnits(fetchedRoads);
                } else {
                    console.error('Failed to fetch roads');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };
    
        fetchData();
    }, []);

    const form = useForm<z.infer<typeof roadFormSchema>>({
        resolver: zodResolver(roadFormSchema),
    })

    const onSubmit = async (val: z.infer<typeof roadFormSchema>) => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/signin');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('unit_id', val.unit_id);
            formData.append('ruas_name', val.ruas_name);
            formData.append('long', val.long);
            formData.append('km_awal', val.km_awal);
            formData.append('km_akhir', val.km_akhir);
            formData.append('status', val.status);
            formData.append('photo', val.photo);
            formData.append('file', val.file);

            const response = await fetch('http://localhost:8004/api/ruas', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                console.log('Data submitted successfully');
                router.push('/master-data');
            } else {
                const errorData = await response.json();
                console.error('Failed to submit data:', errorData);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
 
    const handleCancelClick = () => {
        router.push('/master-data');
    };

    return (
        <div className="w-full flex justify-center">
            <Card className="w-full md:w-1/2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardHeader>
                            <CardTitle>Tambah Data Ruas Baru</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-5 w-full md:w-1/2">
                                <FormField
                                    control={form.control}
                                    name="unit_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pilih Unit</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Unit" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {units.map((item,i) => (
                                                        <SelectItem value={item.id.toString()} key={i}>{item.unit}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="ruas_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Ruas</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama Ruas" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                            </div>
                            
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="long"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Panjang Ruas</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Panjang Ruas" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                            </div>

                            <div className="flex gap-5 mb-5">
                                <div className="w-1/2">
                                    <FormField
                                        control={form.control}
                                        name="km_awal"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>KM Awal</FormLabel>
                                            <FormControl>
                                                <Input  placeholder="KM Awal" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                </div>
                                <div className="w-1/2">
                                    <FormField
                                        control={form.control}
                                        name="km_akhir"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>KM Akhir</FormLabel>
                                            <FormControl>
                                                <Input  placeholder="KM Akhir" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                </div>
                            </div>
                            <div className="mb-5 w-full md:w-1/2    ">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Status" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                <SelectItem value="0">Non Aktif</SelectItem>
                                                <SelectItem value="1">Aktif</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                           <div className="flex gap-5">
                                <div className="w-1/2">
                                    <FormField
                                        control={form.control}
                                        name="photo"
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <FormItem>
                                            <FormLabel>Photo</FormLabel>
                                            <FormControl>
                                            <Input
                                                type="file"
                                                placeholder="Photo"
                                                onChange={(e) => onChange(e.target.files?.[0])}
                                                onBlur={onBlur}
                                                ref={ref} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <FormField
                                        control={form.control}
                                        name="file"
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <FormItem>
                                            <FormLabel>Photo</FormLabel>
                                            <FormControl>
                                            <Input
                                                type="file"
                                                placeholder="Dokumen"
                                                onChange={(e) => onChange(e.target.files?.[0])}
                                                onBlur={onBlur}
                                                ref={ref} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                           </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3">
                            <Button variant="outline" type="button" onClick={handleCancelClick}>
                                Batal
                            </Button>
                            <Button type="submit">Simpan</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
  
   );
}