'use client'

import ChangeLanguage from '@/app/(root)/_components/change-language';
import { ModeToggle } from '@/app/(root)/_components/mode-toggle';
import Navbar from '@/app/(root)/_components/navbar';
import BreadCrumbs from '@/components/share/bredcrambs';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Settings = () => {
    const { t } = useTranslation()
    const route = useRouter()
    const logOut = () => {
        safeLocalStorage.removeItem('accessToken')
        window.location.reload()

    }
    useEffect(() => {
        route.push('/')
    }, [route])
    return (
        <div className='w-full'>
            <Navbar />
            <BreadCrumbs data={[{ slug: '', title: t('home') }, { slug: 'profile', title: t('profile') }]} page={t('settings')} />
            <div className="flex flex-col space-y-3 mt-5 px-2">
                <h2 className='text-2xl font-semibold'>{t('settings')}</h2>
                <div className="flex items-center gap-x-5">
                    <p>Rejimni o`zgartirish:</p>
                    <ModeToggle />
                </div>
                <div className="flex items-center gap-x-5">
                    <p>Tilni o`zgartirish:</p>
                    <ChangeLanguage />
                </div>
                <div onClick={logOut} className="flex items-center cursor-pointer justify-center text-white gap-x-2 border bg-red-500 text-center p-1 rounded-lg w-[150px] mt-16">
                    Chiqish <LogOut />
                </div>
            </div>

        </div>
    );
};

export default Settings;