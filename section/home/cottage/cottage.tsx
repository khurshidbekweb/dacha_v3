'use client'

import { DachaCard } from '@/components/card/dacha-card';
import { DachaCardMini } from '@/components/card/mini-card';
import { SkeletonCard } from '@/components/loading/skeleton-card';
import { ALL_DATA } from '@/query/query-fn';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Cottage = () => {
    const { data: cottages, isLoading } = ALL_DATA.useCottage()
    const { t } = useTranslation()
    const allCottages = cottages?.data?.filter(dacha => dacha.cottageType[0].id === 'c4c301b1-4719-499e-bde2-2c36715fae9e').slice(8)
    const allCottagesMini = cottages?.data?.filter(dacha => dacha.cottageType[0].id === 'c4c301b1-4719-499e-bde2-2c36715fae9e')
    console.log(cottages);

    return (
        <div className='mx-auto max-w-[1540px] px-2 md:px-5 xl:px-14'>
            <h2 className='text-3xl font-semibold'>{t('all_announcements')} </h2>
            <div className="hidden md:grid mt-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-3 justify-items-center md:justify-between items-center mx-auto">
                {isLoading || !cottages?.data?.length ? <>
                    <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
                </> : allCottages?.map(dacha => (
                    <DachaCard dacha={dacha} key={dacha.id} />
                ))}
            </div>
            {/* <div className="mt-3 md:hidden justify-items-center md:justify-between items-center mx-auto">
                <MobileSwiper cottages={allCottages!} />
            </div> */}
            <div className="grid grid-cols-2 md:hidden gap-2 mt-5">
                {isLoading || !cottages?.data?.length ? <>
                    <SkeletonCard /> <SkeletonCard />
                </> : allCottagesMini?.slice(4).map(dacha => (
                    <DachaCardMini dacha={dacha} key={dacha.id} />
                ))}
            </div>
        </div>
    );
};

export default Cottage;