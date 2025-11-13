'use client'
import Navbar from '@/app/(root)/_components/navbar';
import BreadCrumbs from '@/components/share/bredcrambs';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { newCottage } from "@/types";
import { ALL_DATA } from '@/query/query-fn';
import { DachaCardMini } from '@/components/card/mini-card';
import { DachaCard } from '@/components/card/dacha-card';
import Filter from './filter';
import { SkeletonCard } from '@/components/loading/skeleton-card';
import { useQuery } from '@tanstack/react-query';
import { cottageUtils } from '@/utils/cottage.utils';
import { useFilterStore } from '@/store/filter-store';

export interface filterCottage {
    minPrice: number,
    maxPrice: number,
    placeId: string,
    comforts: string[],
    familyOnly: boolean,
    noAlcohol: boolean
    noLoudMusic: boolean
    noParty: boolean
    noPets: boolean
    noSmoking: boolean,
    limit: number,
    page: 1
}

const CottagePage = () => {
    const { t } = useTranslation();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = ALL_DATA.useCottages(12);
    const {
        comfortIds,
        placeIds,
        price,
        permissions
    } = useFilterStore();
    const filterSendData: filterCottage = {
        minPrice: price.min,
        maxPrice: price.max,
        comforts: comfortIds,
        familyOnly: permissions.familyOnly,
        noAlcohol: permissions.noAlcohol,
        noLoudMusic: permissions.noLoudMusic,
        noParty: permissions.noParty,
        noPets: permissions.noPets,
        noSmoking: permissions.noSmoking,
        placeId: placeIds[0],
        limit: 30,
        page: 1
    }
    const { setRefetch } = useFilterStore()

    const { data: filterData, refetch, isLoading } = useQuery({
        queryKey: ['filter_data'],
        queryFn: async () => await cottageUtils.getFilter(filterSendData),
        enabled: false
    })
    console.log(filterData, 'filter data');

    useEffect(() => {
        setRefetch(refetch)
    }, [refetch, setRefetch])


    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '', title: t('home') }]} page={t('announcements')} />
            <div className="mt-5 max-w-[1540px] mx-auto md:px-10 xl:px-16 mb-24 md:mb-0">
                <div className="w-full mt-5 flex items-start gap-x-5">
                    <div className="w-[380px] border-r p-2 px-4 hidden md:block sticky top-8">
                        <Filter />
                    </div>
                    <div className="w-full ">
                        <h3 className='text-xl md:text-2xl'>{t('all_announcements')}</h3>
                        <div className="hidden md:grid mt-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-3 justify-items-center md:justify-between items-center mx-auto">
                            {filterData && filterData.data?.length > 0 ? (
                                // Agar filterData mavjud bo‘lsa shu chiqadi
                                filterData.data.map((cottage: newCottage) => (
                                    <DachaCard dacha={cottage} key={cottage.id} />
                                ))
                            ) : isLoading || data?.pages[0]?.data?.length ? (
                                <>
                                    {data?.pages.map((page) =>
                                        [...(page?.data || [])]
                                            .reverse()
                                            .map((cottage: newCottage) => (
                                                <DachaCard dacha={cottage} key={cottage.id} />
                                            ))
                                    )}
                                </>
                            ) : (
                                <>
                                    <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
                                </>
                            )}
                        </div>

                        {/* Mobile grid */}
                        <div className="grid grid-cols-2 md:hidden gap-2 mt-5">
                            {filterData && filterData.data?.length > 0 ? (
                                filterData.data.map((dacha: newCottage) => (
                                    <DachaCardMini dacha={dacha} key={dacha.id} />
                                ))
                            ) : isLoading || data?.pages[0]?.data?.length ? (
                                <>
                                    {data?.pages.map((page) =>
                                        page.data.slice(4).map((dacha: newCottage) => (
                                            <DachaCardMini dacha={dacha} key={dacha.id} />
                                        ))
                                    )}
                                </>
                            ) : (
                                <>
                                    <SkeletonCard /> <SkeletonCard />
                                </>
                            )}
                        </div>

                        {hasNextPage && !filterData?.data?.length && (
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