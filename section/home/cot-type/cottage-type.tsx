'use client'
import { ALL_DATA } from '@/query/query-fn';
import React from 'react';
import { CottageTypeSwiper } from './cot-type-swiper';

const CottageType = () => {
    const { data: cottageType } = ALL_DATA.useCottageType();
    const typeAll = cottageType?.filter(type => type.id !== 'c4c301b1-4719-499e-bde2-2c36715fae9e')

    return (
        <div className='mx-auto max-w-[1540px] md:px-1 xl:px-5'>
            {/* <h2 className='text-3xl font-semibold px-2 '>Aaaaa </h2> */}
            <CottageTypeSwiper cottageType={typeAll!} />
        </div>
    );
};

export default CottageType;