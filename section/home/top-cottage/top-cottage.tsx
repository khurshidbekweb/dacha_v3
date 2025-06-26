'use client'
import { MiniPremiumDacha } from '@/components/card/mini-premium-cottage';
import { PremiumDachaCard } from '@/components/card/prmium-dacha';
import { ALL_DATA } from '@/query/query-fn';
import React from 'react';
import { useTranslation } from 'react-i18next';

const TopCottage = () => {
    const { t } = useTranslation()
    const { data: cottages } = ALL_DATA.useCottageRecommended()
    return (
        <div className='mx-auto max-w-[1540px] px-2 md:px-5 xl:px-14'>
            <h2 className='text-3xl font-semibold'>{t('top_ads')} </h2>
            <div className="hidden md:grid mt-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3 xl:gap-4 justify-items-center md:justify-between items-center mx-auto">
                {cottages?.length && cottages.map(cottage => (
                    <PremiumDachaCard dacha={cottage} key={cottage.id} />
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2 md:hidden mt-5">
                {cottages?.length && cottages.map(cottage => (
                    <MiniPremiumDacha dacha={cottage} key={cottage.id} />
                ))}
            </div>
        </div>
    );
};

export default TopCottage;