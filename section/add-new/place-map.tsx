'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { postCottage } from '@/types';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ALL_DATA } from '@/query/query-fn';
import { DachaMap } from './google-map';
import { useTranslation } from 'react-i18next';
interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}


const PlaceMap = ({ cottage, setCottage }: infoProps) => {
    const { control } = useFormContext();
    const [regionId, setRegionId] = useState('')
    const { data: regions } = ALL_DATA.useRegion()
    const { t } = useTranslation()

    const { data: places } = ALL_DATA.usePlaceById(regionId)

    return (
        <div className='px-2 flex flex-col space-y-3'>
            <h2 className='text-xl md:text-2xl font-semibold'>{t('location')}</h2>
            <FormField
                control={control}
                name="regionId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('select_region')}</FormLabel>
                        <FormControl>
                            <Select onValueChange={(value: string) => {
                                field.onChange(value);
                                setCottage({ ...cottage, regionId: value })
                                setRegionId(value)
                            }}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder={t('select_region')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {regions?.length && regions.map(el => (
                                        <SelectItem key={el.id} value={el.id}>{el.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="placeId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('select_place')}</FormLabel>
                        <FormControl>
                            <Select {...field} disabled={!regionId} onValueChange={(value) => {
                                field.onChange(value);
                                setCottage({ ...cottage, placeId: value })
                            }}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder={t('select_place')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {places?.length && places.map(el => (
                                        <SelectItem key={el.id} value={el.id}>{el.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <DachaMap cottage={cottage} setCottage={setCottage} />
        </div>
    );
};

export default PlaceMap;