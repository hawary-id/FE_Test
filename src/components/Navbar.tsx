'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaRegCircleUser } from "react-icons/fa6";
import { VscSettings } from 'react-icons/vsc';
import NavigationLink from './NavigationLink';
import { Button } from './ui/button';
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
interface INavbarProps {}

export default function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace('/signin');
  };
  
  return (
    <nav className="shadow-md bg-white py-2 sticky top-0 z-50">
      <div className="w-full items-center flex justify-between container mx-auto ">
        <div className="flex items-center gap-6">
          <img src="/logo-jm.png" className="h-10" alt="jasamarga-logo"/>
          <NavigationLink label="Dashboard" url="/"/>
          <NavigationLink label="Master Data" url="/master-data"/>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className='active:bg-transparent focus-visible:outline-none focus-visible:ring-0 hover:bg-transparent hover:text-primary'>
              <FaRegCircleUser className='h-8 w-8 cursor-pointer'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className='active:bg-transparent focus-visible:outline-none focus-visible:ring-0 group hover:bg-transparent hover:text-primary'>
              <VscSettings className='h-8 w-8 cursor-pointer border-2 border-gray-500 rounded-md p-1 group-hover:border-primary'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer'>Setting</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
   );
}