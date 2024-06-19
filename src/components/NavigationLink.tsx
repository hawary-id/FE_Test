'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface INavigationLinkProps {
    label: string;
    url: string;
}

export default function NavigationLink({label,url}:INavigationLinkProps) {
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const regex = new RegExp(`^${url}(\/.*)?$`);
        setIsActive(regex.test(pathname));
    }, [pathname, url]);
   return (
    <Link href={url} className={`transition-all ease-in-out ${isActive ? 'text-primary font-semibold border-b border-primary' : 'text-gray-500 hover:text-primary hover:border-primary hover:border-b'}`}>{label}</Link>
   );
}