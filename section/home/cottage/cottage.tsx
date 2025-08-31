'use client'

import { DachaCard } from '@/components/card/dacha-card';
import { DachaCardMini } from '@/components/card/mini-card';
import { SkeletonCard } from '@/components/loading/skeleton-card';
import { ALL_DATA } from '@/query/query-fn';
import { newCottage } from '@/types';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Cottage = () => {
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = ALL_DATA.useCottages(12);
    const { t } = useTranslation()


    return (
        <div className='mx-auto max-w-[1540px] px-2 md:px-5 xl:px-14'>
            <h2 className='text-3xl font-semibold'>{t('all_announcements')} </h2>

            {/* Desktop grid */}
            <div className="hidden md:grid mt-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-3 justify-items-center md:justify-between items-center mx-auto">
                {isLoading || data?.pages[0]?.data?.length ? (
                    <>
                        {data?.pages.map((page) =>
                            [...(page?.data || [])] // massiv nusxasini olish
                                .reverse() // endi xavfsiz ishlaydi
                                .map((cottage: newCottage) => (
                                    <DachaCard dacha={cottage} key={cottage.id} />
                                ))
                        )}
                    </>
                ) : <>
                    <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
                </>
                }
            </div>

            {/* Mobile grid */}
            <div className="grid grid-cols-2 md:hidden gap-2 mt-5">
                {isLoading || data?.pages[0]?.data?.length ? (
                    <>
                        {data?.pages.map((page) =>
                            page.data.slice(4).map((dacha: newCottage) => (
                                <DachaCardMini dacha={dacha} key={dacha.id} />
                            ))
                        )}</>
                ) : (
                    <>
                        <SkeletonCard /> <SkeletonCard />
                    </>
                )}
            </div>

            {/* Ko‘proq ko‘rish tugmachasi */}
            {hasNextPage && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-6 py-2 mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isFetchingNextPage ? t('loading') : t('see_more')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cottage;
