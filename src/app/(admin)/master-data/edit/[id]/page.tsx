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
import { useToast } from "@/components/ui/use-toast";
import { roadFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Unit {
    id: string;
    unit: string;
    status: string;
}

export default function EditPage() {
    const {toast} = useToast();
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [units, setUnits] = useState<Unit[]>([]);
    const [ruasData, setRuasData] = useState<z.infer<typeof roadFormSchema> | null>(null);  
    const form = useForm<z.infer<typeof roadFormSchema>>({
        resolver: zodResolver(roadFormSchema),
        defaultValues: {}
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              router.replace('/signin');
              return;
            }
    
            // Ambil Data Units dan Ruas secara paralel
            const [unitResponse, ruasResponse] = await Promise.all([
              fetch(`http://localhost:8004/api/unit`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }),
              fetch(`http://localhost:8004/api/ruas/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }),
            ]);
    
            if (unitResponse.ok) {
              const unitData = await unitResponse.json();
              setUnits(unitData.data);
            }
    
            if (ruasResponse.ok) {
              const ruasData = await ruasResponse.json();

              const formattedRuasData = {
                unit_id: ruasData.data.unit_id.toString(),
                ruas_name: ruasData.data.ruas_name,
                status: ruasData.data.status.toString(),
                long: ruasData.data.long.toString(),
                km_awal: ruasData.data.km_awal,
                km_akhir: ruasData.data.km_akhir,
                photo: ruasData.data.photo,
              };

              setRuasData((prevRuasData:any) => ({
                ...prevRuasData,
                id: ruasData.data.id.toStr,
                unit_id: ruasData.data.unit_id.toString(),
                ruas_name: ruasData.data.ruas_name,
                long: ruasData.data.long,
                km_awal: ruasData.data.km_awal,
                km_akhir: ruasData.data.km_akhir,
                status: ruasData.data.status.toString(),
                photo: ruasData.data.photo,
              }));
              form.reset(formattedRuasData);
            } 
          } catch (error) {
            console.error("An error occurred:", error);
          } 
        };
    
        fetchData();
      }, [id]);
    
      const onSubmit = async (data: any) => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/signin");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append("unit_id", data.unit_id);
            formData.append("ruas_name", data.ruas_name);
            formData.append("long", data.long); 
            formData.append("km_awal", data.km_awal);
            formData.append("km_akhir", data.km_akhir);
            formData.append("status", data.status);
    
            if (data.photo) formData.append("photo", data.photo[0]); 
            if (data.file) formData.append("file", data.file[0]);
    
            const response = await fetch(`http://localhost:8004/api/ruas/${id}`, {
                method: "PUT", // Use PUT for updating
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Data updated successfully",
                });
                // Slight delay to ensure toast is displayed before navigating
                setTimeout(() => router.push("/master-data"), 500); 
            } else {
                const errorData = await response.json();
                console.error("Failed to update data:", errorData);
    
                // Enhanced Error Handling
                if (errorData.message && Array.isArray(errorData.message)) {
                    errorData.message.forEach((errorMessage:any) => {
                        const fieldMatch = errorMessage.match(
                            /The (.+) field is required\./
                        );
                        if (fieldMatch) {
                            const fieldName = fieldMatch[1]
                                .toLowerCase()
                                .replace(" ", "_");
                            form.setError(fieldName, {
                                type: "manual",
                                message: errorMessage,
                            });
                        } else {
                            toast({
                                title: "Error",
                                description: errorMessage, // Display the specific message
                                variant: "destructive",
                            });
                        }
                    });
                } else {
                    // Generic error message if the format is unexpected
                    toast({
                        title: "Error",
                        description:
                            "Failed to update data. Please check the form and try again.",
                        variant: "destructive",
                    });
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            });
        }
    };
 
    const handleCancelClick = () => {
        router.push('/master-data');
    };

    return (
        <div className="w-full flex justify-center">
            <Card className="w-full md:w-1/2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardHeader>
                            <CardTitle>Edit Data Ruas</CardTitle>
                            {/* <CardDescription>Card Description</CardDescription> */}
                        </CardHeader>
                        <CardContent>
                            <div className="mb-5 w-full md:w-1/2">
                            <FormField
                                control={form.control}
                                name="unit_id"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Pilih Unit</FormLabel>
                                    <Select 
                                        key={ruasData?.unit_id}
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Unit" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        {units.map((item, i) => (
                                            <SelectItem value={item.id.toString()} key={i}>
                                            {item.unit}
                                            </SelectItem>
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
                            <div className="mb-5 w-full md:w-1/2">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        key={ruasData?.status}
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
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
                                            <FormLabel>Dokumen</FormLabel>
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