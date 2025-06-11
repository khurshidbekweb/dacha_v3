'use client'

import { useParams } from 'next/navigation';
import React from 'react';
import { SkeletonCard } from '@/components/card/skeleton-card';
import BreadCrumbs from '@/components/share/bredcrambs';
import { ALL_DATA } from '@/query/query-fn';
import { TopBannerService } from '@/section/services/tarif-intro';
import Navbar from '../../_components/navbar';

const Tariff = () => {
    const { id } = useParams()
    const { isLoading, data: tariffs, } = ALL_DATA.useTarifId(id);
    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '', title: 'Home' }, { slug: 'services', title: 'Services' }]} page="Tarif" />
            <div className='max-w-[1540px] mx-auto px-2 md:px-5 xl:px-14'>
                <div className="flex flex-col items-start justify ">
                    <h2 className='text-xl md:text-2xl font-createRound'>Tariff</h2>
                </div>
                {isLoading ? <SkeletonCard /> : <TopBannerService tarif={tariffs!} />}
            </div>
        </>
    );
};

export default Tariff;