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
          <main className="w-full bg-gray-100 min-h-screen">
            <Navbar/>
            <div className="w-full container mx-auto py-10">
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
