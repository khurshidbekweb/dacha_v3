'use client'

import { DachaCard } from "@/components/card/dacha-card";
import { DachaCardMini } from "@/components/card/mini-card";
import { SkeletonCard } from "@/components/loading/skeleton-card";
import { ALL_DATA } from "@/query/query-fn";
import Navbar from "../_components/navbar";
import BreadCrumbs from "@/components/share/bredcrambs";
import { useTranslation } from "react-i18next";

interface placeProps {
    paramsId: string
}

export default function ByPlace({ paramsId }: placeProps) {
    const { data: cottages, isLoading } = ALL_DATA.useCottageByPlace(paramsId)
    const { t, i18n } = useTranslation()
    const placeName = cottages?.length && cottages[0]?.place?.name || ''
    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '', title: t('home') }, { slug: 'cottage', title: t('place') }]} page={placeName} />
            <div className='mx-auto max-w-[1540px] px-2 md:px-5 xl:px-14'>
                <h2 className='text-2xl md:text-3xl mt-5 font-semibold'>
                    {i18n.language === 'uz'
                        ? <><span className="text-amber-400">{placeName}</span>{t('ads_located_in')}</>
                        : <>{t('ads_located_in')} <span className="text-amber-400">{placeName}</span></>
                    }
                </h2>
                <div className="hidden md:grid mt-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-3 justify-items-center md:justify-between items-center mx-auto">
                    {isLoading || !cottages?.length ? <>
                        <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
                    </> : cottages?.map(dacha => (
                        <DachaCard dacha={dacha} key={dacha.id} />
                    ))}
                </div>
                {/* <div className="mt-3 md:hidden justify-items-center md:justify-between items-center mx-auto">
                            <MobileSwiper cottages={allCottages!} />
                        </div> */}
                <div className="grid grid-cols-2 md:hidden gap-2 mt-5">
                    {isLoading || !cottages?.length ? <>
                        <SkeletonCard /> <SkeletonCard />
                    </> : cottages?.map(dacha => (
                        <DachaCardMini dacha={dacha} key={dacha.id} />
                    ))}
                </div>
            </div>
        </>
    );
};
