'use client'

import { useParams } from 'next/navigation';
import React from 'react';
import { SkeletonCard } from '@/components/loading/skeleton-card';
import BreadCrumbs from '@/components/share/bredcrambs';
import { ALL_DATA } from '@/query/query-fn';
import { TopBannerService } from '@/section/services/tarif-intro';
import Navbar from '../../_components/navbar';
import { useTranslation } from 'react-i18next';

const Tariff = () => {
    const { id } = useParams()
    const { t } = useTranslation()
    const { isLoading, data: tariffs, } = ALL_DATA.useTarifId(id);
    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '', title: 'Home' }, { slug: 'services', title: 'Services' }]} page="Tarif" />
            <div className='max-w-[1540px] mx-auto px-2 md:px-5 xl:px-14'>
                <div className="flex flex-col items-start justify ">
                    <h2 className='text-2xl md:text-3xl font-createRound mt-5 font-semibold'>{t('tariffs')}</h2>
                </div>
                {isLoading ? <SkeletonCard /> : <TopBannerService tarif={tariffs!} />}
            </div>
        </>
    );
};

export default Tariff;