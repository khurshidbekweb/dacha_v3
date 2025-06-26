'use client'

import React from 'react';
import { ResortsSwiper } from './swiper';
import { ALL_DATA } from '@/query/query-fn';
import { useTranslation } from 'react-i18next';

const Resorts = () => {
    const { t } = useTranslation()
    const { data: places } = ALL_DATA.usePlace()
    return (
        <div className='mx-auto max-w-[1540px] md:px-1 '>
            <h2 className='text-3xl md:px-5 xl:px-14  font-semibold px-2 '>{t('recreation_places')} </h2>
            <div className="mt-4 outline-hidden md:pl-1 xl:pl-0 xl:px-5">
                <ResortsSwiper places={places!} />
            </div>
        </div>
    );
};

export default Resorts;
