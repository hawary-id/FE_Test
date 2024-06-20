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
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; // Ensure id is treated as a string
  const [units, setUnits] = useState<Unit[]>([]);
  const [ruasData, setRuasData] = useState<z.infer<typeof roadFormSchema> | null>(null);

  const form = useForm<z.infer<typeof roadFormSchema>>({
    resolver: zodResolver(roadFormSchema),
    defaultValues: {},
  });

      useEffect(() => {
          const fetchData = async () => {
              try {
                  const token = localStorage.getItem("token");
                  if (!token) {
                      router.replace("/signin");
                      return;
                  }

                  const unitResponse = await fetch("http://localhost:8004/api/unit", {
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                  });

                  const ruasResponse = await fetch(
                      `http://localhost:8004/api/ruas/${id}`,
                      {
                          headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                          },
                      }
                  );

                  if (unitResponse.ok) {
                      const unitData = await unitResponse.json();
                      setUnits(unitData.data);
                  }

                  if (ruasResponse.ok) {
                      const ruasData = await ruasResponse.json();
                      setRuasData(ruasData.data);

                      // Update form values directly
                      form.reset({
                          unit_id: ruasData.data.unit_id.toString(),
                          ruas_name: ruasData.data.ruas_name,
                          long: ruasData.data.long.toString(),
                          km_awal: ruasData.data.km_awal,
                          km_akhir: ruasData.data.km_akhir,
                          status: ruasData.data.status.toString(),
                      });
                  }
              } catch (error) {
                  console.error("An error occurred:", error);
              }
          };

          fetchData();
      }, [id, form]);
    
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
          formData.append('long', parseInt(val.long, 10).toString());
          formData.append('km_awal', val.km_awal);
          formData.append('km_akhir', val.km_akhir);
          formData.append('status', val.status)
          // Hanya append foto baru jika ada
          if (val.photo) {
            formData.append('photo', val.photo);
          }
          // Hanya append file baru jika ada
          if (val.file) {
            formData.append('file', val.file);
          }
          const response = await fetch(`http://localhost:8004/api/ruas/${id}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
      
          if (response.ok) {
            console.log('Data updated successfully');
            router.push('/master-data');
          } else {
            const errorData = await response.json();
            console.error('Failed to update data:', errorData);
          }
        } catch (error) {
          console.error('An error occurred:', error);
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