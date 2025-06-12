'use client'
import Navbar from '@/app/(root)/_components/navbar';
import BreadCrumbs from '@/components/share/bredcrambs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cottageUtils } from "@/utils/cottage.utils";
import { useQuery } from "@tanstack/react-query";
import { comfort, cottage, cottageType, place, region } from "@/types";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ALL_DATA } from '@/query/query-fn';
import { IMG_BASE_URL } from '@/constants';
import { DachaCardMini } from '@/components/card/mini-card';
import { Slider } from '@/components/ui/slider';
import { DachaCard } from '@/components/card/dacha-card';

const CottagePage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState(12000);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedPlace, setSelectedPlace] = useState("");
    const [selectedComforts, setSelectedComforts] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const cottages = ALL_DATA.useCottage()?.data;
    const cottageTypes = ALL_DATA.useCottageType()?.data;
    const regions = ALL_DATA.useRegion()?.data;
    const places = ALL_DATA.usePlaceById(selectedRegion)?.data;
    const { data: comforts } = ALL_DATA.useComforts()
    const cottageType = ['c23f5e39-c51e-4135-9c45-9142924b008f', 'c4c301b1-4719-499e-bde2-2c36715fae9e', '3e54eff7-8a26-443b-a302-066cbe8a05ff']
    const cottageTypeSelectChart = cottageTypes?.filter((el: cottageType) => cottageType.includes(el.id))
    const [moreInfo, setMoreInfo] = useState(5)
    const isAllShown = moreInfo >= (comforts?.length ?? 0)
    const [filter, setFilter] = useState({
        minPrice: 500000,
        maxPrice: value,
        placeId: "",
        regionId: "",
        comforts: "",
        cottageTypes: "",
    });

    useEffect(() => {
        setFilter({
            minPrice: 500000,
            maxPrice: value,
            placeId: selectedPlace || "",
            regionId: selectedRegion || "",
            comforts: selectedComforts.toString(),
            cottageTypes: selectedTypes.toString(),
        });
    }, [value, selectedRegion, selectedPlace, selectedComforts, selectedTypes]);

    const { data: filteredCottages, isLoading } = useQuery({
        queryKey: ["cottage-filter", filter],
        queryFn: () => cottageUtils.getFilter(filter),
        enabled: !!(selectedRegion || selectedPlace || selectedComforts.length || selectedTypes.length || value),
    });

    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '/', title: t('home') }]} page={t('announcements')} />
            <div className="mt-5 max-w-[1540px] mx-auto md:px-10 xl:px-16 mb-24 md:mb-0">
                <h3 className='text-xl md:text-2xl'>{t('all_announcements')}</h3>
                <div className="w-full mt-5 flex items-start gap-x-5">
                    <div className="filter hidden md:block ml-0 w-[250px] mx-auto shadow-lg">
                        <h1 className="text-[22px] font-createRound">{t('filtr')}</h1>
                        <div className="w-[250px] flex flex-col items-center gap-6 p-4">
                            <div className="flex justify-between text-sm w-[250px]">
                                <span>500 ming sum</span>
                                <span>{value.toString().slice(0, 2)} mln sum</span>
                            </div>
                            <Slider
                                defaultValue={[value]}
                                min={500}
                                max={12000}
                                step={1}
                                onValueChange={(val) => setValue(val[0])}
                                className="w-[250px]"
                            />
                        </div>
                        <Select onValueChange={setSelectedRegion}>
                            <SelectTrigger className='w-full bg-white dark:bg-[#161f309c]'>
                                <SelectValue placeholder="Select Region" />
                            </SelectTrigger>
                            <SelectContent>
                                {regions?.map((e: region) => (
                                    <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select disabled={!selectedRegion} onValueChange={setSelectedPlace}>
                            <SelectTrigger className="w-full mt-3 bg-white dark:bg-[#161f309c]">
                                <SelectValue placeholder="Select Place" />
                            </SelectTrigger>
                            <SelectContent>
                                {places?.map((e: place) => (
                                    <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Separator className="my-2" />
                        <div>
                            <p className="py-2 font-medium">{t('dacha_type')}</p>
                            {cottageTypeSelectChart?.map((e: cottageType) => (
                                <label key={e.id} className="flex items-center gap-2">
                                    <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" value={e.id} onChange={(ev) => {
                                        setSelectedTypes(prev => ev.target.checked ? [...prev, e.id] : prev.filter(id => id !== e.id));
                                    }} />
                                    <p>{e.name}</p>
                                </label>
                            ))}
                            <Separator className="my-2" />
                            <p className="py-1 font-medium">{t('camforts')}</p>
                            <div className="flex flex-col space-y-1">
                                {comforts?.slice(0, moreInfo)?.map((e: comfort) => (
                                    <label key={e.id} className="flex items-center gap-2">
                                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" value={e.id} onChange={(ev) => {
                                            setSelectedComforts(prev => ev.target.checked ? [...prev, e.id] : prev.filter(id => id !== e.id));
                                        }} />
                                        <Image className="bg-white rounded-sm" width={20} height={20} src={`${IMG_BASE_URL}${e.image}`} alt={e.name} />
                                        <p className="line-clamp-1">{e.name}</p>
                                    </label>
                                ))}
                                {!isAllShown && (
                                    <button className="flex gap-x-1 justify-center items-center" onClick={() => setMoreInfo((comforts?.length ?? 0))}>Ko`proq ko`rish <ChevronDown /></button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 px-1">
                        {isLoading ? (
                            'Loading'
                        ) : (filteredCottages || cottages)?.length === 0 ? <>
                            <p className="col-span-full text-center text-red-500">Ma’lumot topilmadi</p>
                        </> : (
                            (filteredCottages || cottages)
                                ?.filter(
                                    (dacha: cottage) =>
                                        dacha.cottageType[0].id !== "678811f1-d67c-42fa-a78c-f1d980df3397"
                                )
                                ?.map((dacha: cottage) => (
                                    <>
                                        <div className="w-full hidden md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4">
                                            <DachaCard key={dacha.id} dacha={dacha} />
                                        </div>
                                        <div className="w-full grid grid-cols-2 md:hidden">
                                            <DachaCardMini key={dacha.id} dacha={dacha} />
                                        </div>
                                    </>
                                ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CottagePage;