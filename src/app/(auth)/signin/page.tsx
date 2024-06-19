"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { signInFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export default function SignInPage() {
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
    })

    const router = useRouter();
    
    const onSubmit = async (val: z.infer<typeof signInFormSchema>) => {
    
        try {
            const response = await fetch('http://localhost:8004/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(val)
            });
    
            if (response.ok) {
                const data = await response.json();
                
                // Simpan token ke localStorage
                localStorage.setItem('token', data.access_token);
                console.log('Token saved to localStorage:', data.access_token);

                // Redirect ke halaman setelah login berhasil
                router.push('/');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                // Handle login failure, show error message, etc.
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle network or other errors
        }
    };
   return (
       <div className='flex items-center'>
            <div className="w-full md:w-1/2 bg-white h-screen py-5 md:py-10 px-5 md:px-44 flex flex-col justify-center">
                <h1 className="text-2xl font-bold mb-3 text-center text-primary">Login Account</h1>
                <p className="text-gray-500 mb-12 text-center font-light text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum optio cum velit corrupti, ea a necessitatibus ullam unde quae fuga ad natus officiis debitis quis veritatis sed fugiat vero consectetur.</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="mb-5">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                        <div className="mb-5">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                        <Button className='w-full rounded-full' type="submit">Sign In</Button>
                    </form>
                </Form>

            </div>
            <div className="hidden md:block w-1/2 bg-signin h-screen bg-cover bg-center">
               
            </div>
       </div>
   );
}