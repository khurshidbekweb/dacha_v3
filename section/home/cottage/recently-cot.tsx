'use client'

import { DachaCard } from '@/components/card/dacha-card';
import { MobileSwiper } from '@/components/swiper/mobile-swiper';
import { ALL_DATA } from '@/query/query-fn';
import React from 'react';

const RecentlyCot = () => {
    const { data: cottages } = ALL_DATA.useCottage()
    const recentleCottage = cottages?.filter(dacha => dacha.cottageType[0].id === 'c4c301b1-4719-499e-bde2-2c36715fae9e').slice(0, 8)
    return (
        <div className='mx-auto max-w-[1540px] px-2 md:px-5 xl:px-14'>
            <h2 className='text-3xl font-semibold'>Yaqinda qo`yilgan e`lonlar </h2>
            <div className="hidden md:grid mt-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3 xl:gap-4 justify-items-center md:justify-between items-center mx-auto">
                {recentleCottage?.length && recentleCottage?.map(dacha => (
                    <DachaCard dacha={dacha} key={dacha.id} />
                ))}
            </div>
            <div className="mt-3 justify-items-center md:justify-between items-center mx-auto">
                <MobileSwiper cottages={recentleCottage!} />
            </div>
        </div>
    );
};

export default RecentlyCot;