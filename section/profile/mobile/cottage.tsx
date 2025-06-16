'use client'

import Navbar from '@/app/(root)/_components/navbar';
import { SkeletonCard } from '@/components/loading/skeleton-card';
import { UserDachaCard } from '@/components/card/user-card';
import BreadCrumbs from '@/components/share/bredcrambs';
import { ALL_DATA } from '@/query/query-fn';
import { HousePlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const UserDacha = () => {
    const { t } = useTranslation()
    const { data: userCottage, isLoading } = ALL_DATA.useCottageUser();
    console.log(userCottage);

    return (
        <div className='w-full'>
            <Navbar />
            <BreadCrumbs data={[{ slug: '', title: t('home') }, { slug: 'profile', title: t('profile') }]} page={t('my_announcements')} />

            <div className="flex flex-col space-y-3 mt-5">
                <h3 className='text-2xl font-semibold'>{t('my_announcements')}</h3>

                <div className="">
                    {isLoading ? <SkeletonCard /> : userCottage?.length ? userCottage.map(dacha => (
                        <UserDachaCard dacha={dacha} key={dacha.id} />
                    )) : <div className='border w-[370px] mt-4 border-red-400 p-2 rounded-md mb-20 bg-yellow-200 flex flex-col space-y-3'>
                        <p className="text-black">{t('my_annonim')} </p>
                        <div className="flex gap-3 ">
                            <Link className='text-blue-500 underline inline-block' href={'/add-new'}>{t("add_announcements")} </Link><HousePlus className='text-blue-500' size={20} />
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default UserDacha;