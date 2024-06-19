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
import { useAuth } from "@/contexts/AuthContext";
import { roadFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
  
export default function ShowPage() {
    const { token } = useAuth();
    const router = useRouter();

    if (!token) {
        router.replace('/signin');
        return null;
    }
    
    const form = useForm<z.infer<typeof roadFormSchema>>({
        resolver: zodResolver(roadFormSchema),
    })

    const onSubmit = (val: z.infer<typeof roadFormSchema>) => {
        console.log(val);
    }

    const handleCancelClick = () => {
        router.push('/master-data');
    };

    return (
        <div className="w-full flex justify-center">
            <Card className="w-1/2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardHeader>
                            <CardTitle>Lihat Data Ruas</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-5 w-1/2">
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
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                            <div className="mb-5 w-1/2">
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
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Photo</FormLabel>
                                            <FormControl>
                                                <Input type="file" placeholder="Photo" {...field} />
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
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Dokumen</FormLabel>
                                            <FormControl>
                                                <Input type="file" placeholder="Dokumen" {...field} />
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