'use client'

import { DachaCard } from '@/components/card/dacha-card';
import { ALL_DATA } from '@/query/query-fn';
import React from 'react';

const Cottage = () => {
    const { data: cottages } = ALL_DATA.useCottage()
    return (
        <div className='mx-auto max-w-[1540px] px-2 md:px-5 xl:px-14'>
            <h2 className='text-3xl font-semibold'>Barcha e`lonlar </h2>
            <div className="grid mt-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3 xl:gap-4 justify-items-center md:justify-between items-center mx-auto">
                {cottages?.length && cottages.filter(dacha => dacha.cottageType[0].id === 'c4c301b1-4719-499e-bde2-2c36715fae9e').slice(8).map(dacha => (
                    <DachaCard dacha={dacha} key={dacha.id} />
                ))}
            </div>
        </div>
    );
};

export default Cottage;