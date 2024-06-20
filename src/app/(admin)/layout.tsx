"use client"
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="w-full bg-gray-100 flex flex-col justify-between min-h-screen">
            <Navbar/>
            <div className="w-full container mx-auto py-5 grow">
              {children}
            </div>
            <div className="w-full bg-white py-2 px-5 flex l text-sm font-light text-gray-700">
              Copyright
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
