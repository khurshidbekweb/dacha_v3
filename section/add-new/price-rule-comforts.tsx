'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { postCottage } from '@/types';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TimePicker } from './time-picer';
import Cleave from 'cleave.js/react';

interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}


const PriceRuleComforts = ({ cottage, setCottage }: infoProps) => {
    const { control } = useFormContext();
    const [data, setDate] = useState<Date | undefined>(undefined)
    console.log(data);

    return (
        <div className="flex flex-col space-y-5">
            <div className='px-2 flex flex-col space-y-3'>
                <h2 className='text-xl md:text-2xl font-semibold'>Narxlar</h2>
                <FormField
                    control={control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bir kunlik narx</FormLabel>
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
                                            setCottage({ ...cottage, price: Number(numeric) })
                                        }}
                                    />
                                    <span className='absolute p-2 px-4 bg-gray-600 text-white rounded-end top-0 right-0'> SUM</span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="priceWeekend"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dam olish kunlari</FormLabel>
                            <FormControl>
                                <div className="relative w-full h-[40px] overflow-hidden rounded-lg">
                                    <Cleave
                                        options={{
                                            numeral: true,
                                            numeralThousandsGroupStyle: 'thousand',
                                        }}
                                        name="price"
                                        placeholder='Dam olish kunlari'
                                        className="bg-transparent dark:bg-input/30 h-[40px] border w-full rounded-md px-4 py-2"
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            const numeric = String(inputValue);
                                            field.onChange(inputValue === '' ? 0 : numeric);
                                            setCottage({ ...cottage, priceWeekend: Number(numeric) })
                                        }}
                                    />
                                    <span className='absolute p-2 px-4 bg-gray-600 text-white rounded-end top-0 right-0'> SUM</span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <div className=""></div>
            </div>
        </div>
    );
};

export default PriceRuleComforts;