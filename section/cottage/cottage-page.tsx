'use client'
import Navbar from '@/app/(root)/_components/navbar';
import BreadCrumbs from '@/components/share/bredcrambs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { newCottage } from "@/types";
import { ALL_DATA } from '@/query/query-fn';
import { DachaCardMini } from '@/components/card/mini-card';
import { DachaCard } from '@/components/card/dacha-card';
import Filter from './filter';
import { SkeletonCard } from '@/components/loading/skeleton-card';

export interface filterCottage {
    minPrice: number,
    maxPrice: number,
    placeId: string,
    comforts: string[],
    familyOnly: boolean,
}

const CottagePage = () => {
    const { t } = useTranslation();
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = ALL_DATA.useCottages(12);

    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '', title: t('home') }]} page={t('announcements')} />
            <div className="mt-5 max-w-[1540px] mx-auto md:px-10 xl:px-16 mb-24 md:mb-0">
                <h3 className='text-xl md:text-2xl'>{t('all_announcements')}</h3>
                <div className="w-full mt-5 flex items-start gap-x-5">
                    <div className="w-[380px] border-r p-2 px-4 hidden md:block sticky top-8">
                        <Filter />
                    </div>
                    <div className="w-full ">
                        <div className="hidden md:grid mt-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-3 justify-items-center md:justify-between items-center mx-auto">
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
                </div>
            </div>
        </>
    );
};

export default CottagePage;