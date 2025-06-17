'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_DATA } from '@/query/query-fn';
import { postCottage } from '@/types';
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface editINfoProps {
    cottage: postCottage
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}
interface ruleData {
    id: number,
    name: 'noSmoking' | 'noAlcohol' | 'noPets' | 'familyOnly' | 'noLoudMusic' | 'noParty',
    title: string
}

const PriceMapEdit = ({ cottage, setCottage }: editINfoProps) => {
    const [regionId, setRegionId] = useState('')
    const { data: regions } = ALL_DATA.useRegion()

    const { data: places } = ALL_DATA.usePlaceById(regionId)


    const dataRule: ruleData[] = [
        {
            id: 1,
            name: 'noSmoking',
            title: 'Chekishga ruxsat'
        },
        {
            id: 2,
            name: 'noAlcohol',
            title: 'Alkogol ichimlikariga ruxsat'
        },
        {
            id: 3,
            name: 'noPets',
            title: 'Uy hayvonlariga ruxsat'
        },
        {
            id: 4,
            name: 'familyOnly',
            title: 'Faqat Oilaliylar uchun'
        },
        {
            id: 5,
            name: 'noLoudMusic',
            title: 'Baland musiqaga ruhsat'
        },
        {
            id: 6,
            name: 'noParty',
            title: 'Bazm qilishga ruhsat'
        },
    ]
    return (
        <div className='w-full flex flex-col space-y-3 px-2'>
            <h3 className='text-xl md:text-3xl font-semibold mt-3'>Manzil</h3>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="region">Viloyatni tanlang</Label>
                <Select
                    onValueChange={(value: string) => {
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
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="region">Joylashuvni tanlang</Label>
                <Select disabled={!regionId} onValueChange={(value) => {
                    setCottage({ ...cottage, placeId: value })
                }}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Joylashuvni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                        {places?.length && places.map(el => (
                            <SelectItem key={el.id} value={el.id}>{el.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {/* <DachaMap cottage={cottage} setCottage={setCottage} /> */}
            <div className='flex flex-col space-y-2'>
                <h3 className='text-xl md:text-3xl font-semibold mt-3'>Narxlar (sum)</h3>
                <Label htmlFor="price">1 kunlik narx</Label>
                <Input
                    id='price'
                    type='tel'
                    defaultValue={cottage.price}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setCottage({ ...cottage, price: Number(inputValue) })
                    }} />
            </div>
            <div className='flex flex-col space-y-2'>
                <Label htmlFor="price">Dam olish kunlari</Label>
                <Input
                    id='price'
                    type='tel'
                    defaultValue={cottage.priceWeekend}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setCottage({ ...cottage, priceWeekend: Number(inputValue) })
                    }} />
            </div>
            <div className="grid grid-cols-2 space-y-2 w-full">
                {dataRule.map(rule => (
                    <RadioGroup
                        key={rule.id}
                        onValueChange={(value) => {
                            const booleanValue = value === 'true';
                            setCottage({ ...cottage, [rule.name]: booleanValue });
                        }}
                        value={cottage[rule.name] ? 'true' : 'false'} // form holatini aks ettiradi
                        className="flex flex-col"
                    >
                        <p className='text-[14px]'>{rule.title}</p>
                        <div className="flex items-center gap-x-1 w-full">
                            <RadioGroupItem value="true" />
                            <p className="font-normal">Ha</p>
                            <RadioGroupItem value="false" />
                            <p>Yoq</p>
                        </div>
                    </RadioGroup>
                ))}
            </div>
        </div>
    );
};

export default PriceMapEdit;