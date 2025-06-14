'use client'

import { DachaCard } from '@/components/card/dacha-card';
import { DachaCardMini } from '@/components/card/mini-card';
import { SkeletonCard } from '@/components/loading/skeleton-card';
import { ALL_DATA } from '@/query/query-fn';
import { useLikeStore } from '@/store/like-card';
import { cottage } from '@/types';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LikeCard = () => {
    const { data: cottages, isLoading } = ALL_DATA.useCottage()
    const { likedCards } = useLikeStore()
    const likeCottage = cottages?.filter(dacha => likedCards.includes(dacha.id)) || []
    const { t } = useTranslation()

    return (
        <>
            {likeCottage.length > 0 ? (
                <>
                    <div className="hidden w-full mt-3 md:grid md:grid-cols-4 md:gap-4">
                        {likeCottage.map((dacha: cottage) => (
                            <DachaCard key={dacha.id} dacha={dacha} />
                        ))}
                    </div>
                    <div className="md:hidden w-full mt-3 grid grid-cols-2 gap-2 px-1">
                        {likeCottage.map((dacha: cottage) => (
                            <DachaCardMini key={dacha.id} dacha={dacha} />
                        ))}
                    </div>
                </>
            ) : isLoading ? <div className=' grid grid-cols-2 gap-2 px-2 mt-5'>
                <SkeletonCard />
                <SkeletonCard />
            </div> : (
                <div className='h-[40vh]'>
                    <p className="border w-[360px] mt-4 border-red-400 p-2 rounded-md text-black bg-yellow-200">
                        {t('none_fovatite_cottage')} <Link className='text-blue-500 underline' href={'/cottage'}>{t('add')}</Link>
                    </p>
                </div>
            )}
        </>
    );
};

export default LikeCard;