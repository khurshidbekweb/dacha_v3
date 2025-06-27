'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_DATA } from '@/query/query-fn';
import { postCottage } from '@/types';
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation()
    const [regionId, setRegionId] = useState(cottage.regionId)
    const { data: regions } = ALL_DATA.useRegion()

    const { data: places } = ALL_DATA.usePlaceById(regionId)
    const { data: comforts } = ALL_DATA.useComforts()

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
    const [selectedComfortIds, setSelectedComfortIds] = useState<string[]>(cottage.comforts);

    const handleComfortChange = (id: string, checked: boolean) => {
        let updatedIds: string[];
        if (checked) {
            updatedIds = [...selectedComfortIds, id];
        } else {
            updatedIds = selectedComfortIds.filter((comfortId) => comfortId !== id);
        }

        setSelectedComfortIds(updatedIds);


        // Comfortlarning to‘liq obyektlarini cottage ichiga set qilish
        const selectedComforts = comforts?.length && comforts.filter((c) => updatedIds.includes(c.id)).map(el => el.id)


        setCottage({ ...cottage, comforts: selectedComforts || [] });
    };

    return (
        <div className='w-full flex flex-col space-y-3 px-2'>
            <h3 className='text-xl md:text-3xl font-semibold mt-3'>{t('location')}</h3>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="region">{t('select_region')}</Label>
                <Select
                    value={regionId}
                    onValueChange={(value: string) => {
                        setCottage({ ...cottage, regionId: value })
                        setRegionId(value)
                    }}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={`${t('select_region')}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {regions?.length && regions.map(el => (
                            <SelectItem key={el.id} value={el.id}>{el.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="region">{t('select_place')}</Label>
                <Select value={cottage.placeId} disabled={!regionId} onValueChange={(value) => {
                    setCottage({ ...cottage, placeId: value })
                }}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={`${t('select_place')}`} />
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
                <h3 className='text-xl md:text-3xl font-semibold mt-3'>{t('prices')} (sum)</h3>
                <Label htmlFor="price">{t('once_price')}</Label>
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
                <Label htmlFor="price">{t('weekend_days')}</Label>
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
            <div className="w-full">
                {comforts?.length && comforts.map((comfort) => (
                    <label key={comfort.id} className="flex items-center gap-2">
                        <Checkbox
                            checked={selectedComfortIds.includes(comfort.id)}
                            onCheckedChange={(checked) =>
                                handleComfortChange(comfort.id, !!checked)
                            }
                        />
                        <span>{comfort.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default PriceMapEdit;