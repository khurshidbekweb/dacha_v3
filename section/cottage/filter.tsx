'use client'

import React from 'react';

import { Slider } from '@/components/ui/slider';
import { ReusableToggleGroup } from '@/components/share/toggle-item';
import { ToggleGroupItem } from '@/components/ui/toggle-group';
import { ALL_DATA } from '@/query/query-fn';
import Image from 'next/image';
import { IMG_BASE_URL } from '@/constants';
import { ListFilter, Users, Cigarette, Dog, Music, PartyPopper, Wine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFilterStore } from '@/store/filter-store';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Filter = () => {
    const { data: comforts } = ALL_DATA?.useComforts()
    const { data: placeData } = ALL_DATA.usePlace()

    // Zustand store'dan kerakli state va action'larni olish
    const {
        comfortIds,
        placeIds,
        price,
        permissions,
        refetch,
        addComfortId,
        removeComfortId,
        addPlaceId,
        removePlaceId,
        setPriceRange,
        setPermission,
        resetFilters
    } = useFilterStore();


    // Comfort toggle handler
    const handleComfortChange = (values: string[]) => {
        const added = values.find(v => !comfortIds.includes(v));
        const removed = comfortIds.find(v => !values.includes(v));

        if (added) addComfortId(added);
        if (removed) removeComfortId(removed);
    };

    // Place toggle handler
    const handlePlaceChange = (values: string[]) => {
        const added = values.find(v => !placeIds.includes(v));
        const removed = placeIds.find(v => !values.includes(v));

        if (added) addPlaceId(added);
        if (removed) removePlaceId(removed);
    };
    const handlePriceChange = (value: number[]) => {
        const minPrice = 500000;
        const selectedPrice = value[0] * 1000;
        setPriceRange(minPrice, selectedPrice);
    };

    // Formatlangan narxni ko'rsatish
    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `${(price / 1000000).toFixed(1)} mln`;
        }
        return `${(price / 1000).toFixed(0)} ming`;
    };

    // Ruhsatlar ro'yxati
    const permissionsList = [
        {
            key: 'familyOnly' as const,
            label: 'Faqat oilalar uchun',
            icon: Users,
            description: 'Faqat oilaviy mehmonlar'
        },
        {
            key: 'noSmoking' as const,
            label: 'Chekishga ruhsat',
            icon: Cigarette,
            description: 'Tamaki mahsulotlar'
        },
        {
            key: 'noPets' as const,
            label: 'Hayvonlar bilan',
            icon: Dog,
            description: 'Uy hayvonlari'
        },
        {
            key: 'noParty' as const,
            label: 'Ziyofat qilish',
            icon: PartyPopper,
            description: 'Partiyalar o\'tkazish'
        },
        {
            key: 'noLoudMusic' as const,
            label: 'Baland musiqa',
            icon: Music,
            description: 'Shovqin '
        },
        {
            key: 'noAlcohol' as const,
            label: 'Alkogol bilan',
            icon: Wine,
            description: 'Spirtli ichimliklar'
        }
    ];

    return (
        <div className='w-[300px] flex flex-col space-y-4'>
            <h4 className='text-xl md:text-2xl flex items-center gap-x-2'>
                Filter <ListFilter size={18} />
            </h4>

            {/* Price Filter */}
            <div>
                <h2 className='mb-2 font-semibold'>Narx bo`yicha</h2>
                <div className="flex flex-col gap-4 text-balance w-full">
                    <div className="w-full flex flex-col items-center gap-6 p-4 rounded-lg">
                        <div className="flex justify-between text-sm w-full">
                            <span>{formatPrice(price.min)} so`m</span>
                            <span className='font-semibold text-blue-600'>
                                {formatPrice(price.max)} so`m
                            </span>
                        </div>

                        <Slider
                            value={[price.max / 1000]}
                            onValueChange={handlePriceChange}
                            min={500}
                            max={15000}
                            step={100}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Comfort Filter */}
            <div>
                <h2 className='mb-2 font-semibold'>Qulaylik bo`yicha</h2>
                <div className="text-balance p-2 w-full">
                    <ReusableToggleGroup
                        value={comfortIds}
                        onValueChange={handleComfortChange}
                        className='grid grid-cols-3 gap-2'
                    >
                        {comforts?.map(com => (
                            <ToggleGroupItem
                                key={com.id}
                                value={com.id}
                                className='p-2 border rounded-sm'
                                aria-label={`Toggle ${com.name}`}
                            >
                                <Image
                                    width={20}
                                    height={20}
                                    src={`${IMG_BASE_URL}${com.image}`}
                                    alt={com.name}
                                />
                                <span className='line-clamp-1 text-[12px]'>{com.name}</span>
                            </ToggleGroupItem>
                        ))}
                    </ReusableToggleGroup>
                </div>
            </div>

            {/* Place Filter */}
            <div>
                <h2 className='mb-2 font-semibold'>Joylashuv bo`yicha</h2>
                <div className="flex flex-col gap-4 text-balance w-full">
                    <ReusableToggleGroup
                        value={placeIds}
                        onValueChange={handlePlaceChange}
                        className='grid grid-cols-3 gap-2'
                    >
                        {placeData?.map(place => (
                            <ToggleGroupItem
                                key={place.id}
                                value={place.id}
                                className='p-2 border rounded-sm'
                                aria-label={`Toggle ${place.name}`}
                            >
                                <span className='line-clamp-1 text-[14px]'>{place.name}</span>
                            </ToggleGroupItem>
                        ))}
                    </ReusableToggleGroup>
                </div>
            </div>

            {/* Permissions/Restrictions Filter */}
            <div>
                <h2 className='font-semibold'>Qoidalar va Ruxsatlar</h2>
                <div className="space-y-2 rounded-lg px-3">
                    {permissionsList.map(({ key, label, icon: Icon, description }) => (
                        <div
                            key={key}
                            className="flex items-center justify-between p-2 rounded transition-colors"
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <Icon
                                    size={18}
                                    className={permissions[key] ? 'text-blue-600' : 'text-gray-400'}
                                />
                                <div className="flex-1">
                                    <Label
                                        htmlFor={key}
                                        className={`text-sm font-medium cursor-pointer block `}
                                    >
                                        {label}
                                    </Label>
                                    <p className="text-xs text-gray-500">{description}</p>
                                </div>
                            </div>
                            <Switch
                                id={key}
                                checked={permissions[key]}
                                onCheckedChange={(checked) => setPermission(key, checked)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-2 mt-6'>
                <Button
                    variant="outline"
                    onClick={resetFilters}
                    className='flex-1'
                >
                    Tozalash
                </Button>
                <Button className='flex-1'
                    onClick={() => {
                        if (refetch) refetch();
                    }}
                >
                    Qidiruv
                </Button>
            </div>
        </div>
    );
};

export default Filter;