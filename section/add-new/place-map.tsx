'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { place, postCottage } from '@/types';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/query/query-key';
import { placeUtils } from '@/utils/place.utils';
import { ALL_DATA } from '@/query/query-fn';
interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}


const PlaceMap = ({ cottage, setCottage }: infoProps) => {
    const { control } = useFormContext();
    const [regionId, setRegionId] = useState('')
    const { data: regions } = ALL_DATA.useRegion()
    const { data: places } = useQuery<place[]>({
        queryKey: [QUERY_KEYS.place_by_id],
        queryFn: () => placeUtils.getPlaceById(regionId),
        enabled: !!regionId
    })

    return (
        <div className='px-2 flex flex-col space-y-3'>
            <h2 className='text-xl md:text-2xl font-semibold'>Manzil</h2>
            <FormField
                control={control}
                name="description"
                render={() => (
                    <FormItem>
                        <FormLabel>Viloyatni tanlang</FormLabel>
                        <FormControl>
                            <Select onValueChange={(value) => {
                                setCottage({ ...cottage, regionId: value })
                                setRegionId(value)
                            }}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Viloyatni tanlang" />
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
                name="description"
                render={() => (
                    <FormItem>
                        <FormLabel>Joylashuvni tanlang</FormLabel>
                        <FormControl>
                            <Select disabled={!regionId} onValueChange={(value) => setCottage({ ...cottage, placeId: value })}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Joylashuvni tanlang" />
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
        </div>
    );
};

export default PlaceMap;