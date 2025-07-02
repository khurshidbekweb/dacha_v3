'use client'

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './mode-toggle';
import MobileMenu from './mobile-menu';
import { usePathname } from 'next/navigation';
import { IMG_BASE_URL, navLink } from '@/constants';
import { useTranslation } from 'react-i18next';
import ChangeLanguage from './change-language';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { user } from '@/types';
import Image from 'next/image';

const Navbar = () => {
    const pathname = usePathname()
    const { t } = useTranslation()
    const user: user = JSON.parse(safeLocalStorage.getItem('user')!)
    return (
        <div className='mx-auto max-w-[1540px] px-2 md:px-5 xl:px-14 z-50 '>
            <div className="flex justify-between items-center h-[60px]">
                <Link href={'/'} className="font-bold text-4xl">
                    DachaOL
                </Link>
                <div className="w-[40%] md:flex justify-between items-center hidden gap-x-5">
                    {navLink.map((el: { id: number, name: string, path: string }) => (
                        <Link className={`hover:bg-[#44bd32] dark:hover:bg-[#F0A500] hover:text-white px-2 p-1 text-[18px] rounded-md transition-colors ${pathname == el.path ? 'bg-color px-2 p-1 rounded-md text-white' : ''}`} key={el.id} href={el.path}>
                            {t(`${el.name}`)}
                        </Link>
                    ))}
                </div>
                <div className='gap-x-3 hidden md:flex items-center'>
                    <ChangeLanguage />
                    <ModeToggle />
                    {user && <Link href={'/profile'} className='border w-[40px] h-[40px] rounded-full flex items-center justify-center overflow-hidden'>
                        {user.image ? <Image width={50} height={50} priority src={`${IMG_BASE_URL}${user.image}`} alt={user.name || 'user image'} /> : user.name?.slice(0, 2)}
                    </Link>}
                </div>
                <div className="flex md:hidden gap-x-3 items-center">
                    <ChangeLanguage />
                    <MobileMenu />
                </div>
            </div>
            <Separator className='w-full' />
        </div>
    );
};

export default Navbar;