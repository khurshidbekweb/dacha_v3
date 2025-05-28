'use client'

import React from 'react';
import { ResortsSwiper } from './swiper';
import { ALL_DATA } from '@/query/query-fn';

const Resorts = () => {
    const { data: places } = ALL_DATA.usePlace()
    return (
        <div className='mx-auto px-2 md:px-5 xl:px-14'>
            <h2 className='text-3xl font-semibold'>Dam olish maskanlari </h2>
            <div className="mt-4 overflow-hidden">
                <ResortsSwiper places={places!} />
            </div>
        </div>
    );
};

export default Resorts;