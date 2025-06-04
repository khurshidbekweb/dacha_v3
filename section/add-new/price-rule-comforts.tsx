'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { postCottage } from '@/types';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TimePicker } from './time-picer';
import Cleave from 'cleave.js/react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}


interface ruleData {
    id: number,
    name: 'noSmoking' | 'noAlcohol' | 'noPets' | 'familyOnly' | 'noLoudMusic' | 'noParty',
    title: string
}
interface priceDacha {
    id: number,
    name: 'price' | 'priceWeekend',
    title: string
}

const PriceRuleComforts = ({ cottage, setCottage }: infoProps) => {
    const { control } = useFormContext();
    const [data, setDate] = useState<Date | undefined>(undefined)
    console.log(data);
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
    const price: priceDacha[] = [
        {
            id: 1,
            name: 'price',
            title: 'Bir kunlik narx'
        },
        {
            id: 2,
            name: 'priceWeekend',
            title: 'Dam olish kunlari'
        }]

    return (
        <div className="flex flex-col space-y-5">
            <div className='px-2 flex flex-col space-y-3'>
                <h2 className='text-xl md:text-2xl font-semibold'>Narxlar</h2>
                {price.map(el => (
                    <FormField
                        key={el.id}
                        control={control}
                        name={el.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{el.title}</FormLabel>
                                <FormControl>
                                    <div className="relative w-full h-[40px] overflow-hidden rounded-lg">
                                        <Cleave
                                            options={{
                                                numeral: true,
                                                numeralThousandsGroupStyle: 'thousand',
                                            }}
                                            name="price"
                                            placeholder='Bir kunlik narx'
                                            className="bg-transparent dark:bg-input/30 h-[40px] border w-full rounded-md px-4 py-2"
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const numeric = String(inputValue);
                                                field.onChange(inputValue === '' ? 0 : numeric);
                                                setCottage({ ...cottage, [el.name]: Number(numeric) })
                                            }}
                                        />
                                        <span className='absolute p-2 px-4 bg-gray-600 text-white rounded-end top-0 right-0'> SUM</span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </div>
            <div className='px-2 flex flex-col space-y-3'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center'> Vaqt</h2>
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex flex-col border w-full border-dashed rounded-lg p-2">
                        <h4 className='text-[15px] font-semibold'>Kirish</h4>
                        <TimePicker date={data} setDate={setDate} />
                    </div>
                    <div className="flex flex-col border w-full border-dashed rounded-lg p-2">
                        <h4 className='text-[15px] font-semibold'>Chiqish</h4>
                        <TimePicker date={data} setDate={setDate} />
                    </div>
                </div>
            </div>
            <div className='px-2 flex flex-col space-y-3'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center'> Qoidalar</h2>
                <div className="grid grid-cols-2 gap-y-3">
                    {dataRule.map((rule) => (
                        <FormField
                            key={Math.random()}
                            control={control}
                            name={rule.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[15px] font-medium'>{rule.title}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => {
                                                const booleanValue = value === 'true';
                                                field.onChange(booleanValue);
                                                setCottage({ ...cottage, [rule.name]: booleanValue });
                                            }}
                                            value={field.value ? 'true' : 'false'} // form holatini aks ettiradi
                                            className="flex"
                                        >
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value="true" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Ha</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value="false" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Yo‘q</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PriceRuleComforts;