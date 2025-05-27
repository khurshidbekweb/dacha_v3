'use client'

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './mode-toggle';
import MobileMenu from './mobile-menu';
import { usePathname } from 'next/navigation';
import { navLink } from '@/constants';

const Navbar = () => {
    const pathname = usePathname()
    return (
        <div className='mx-auto px-2 md:px-10 xl:px-14 fixed w-screen z-50 top-0 backdrop-blur-md'>
            <div className="flex justify-between items-center h-[60px]">
                <Link href={'/'} className="text-xl font-bold">
                    DachaOL
                </Link>
                <div className="nav w-[40%] md:flex justify-between items-center hidden">
                    {navLink.map((el: { id: number, name: string, path: string }) => (
                        <Link className={`hover:bg-[#44bd32] dark:hover:bg-[#F0A500] hover:text-white px-2 p-1 rounded-md transition-colors ${pathname == el.path ? 'bg-color px-2 p-1 rounded-md text-white' : ''}`} key={el.id} href={el.path}>
                            {el.name}
                        </Link>
                    ))}
                    <ModeToggle />
                </div>
                <div className="flex md:hidden items-center gap-x-3">
                    <ModeToggle />
                    <MobileMenu />
                </div>
            </div>
            <Separator className='w-full' />
        </div>
    );
};

export default Navbar;