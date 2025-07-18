'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { postCottage } from '@/types';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TimePicker } from './time-picer';
import Cleave from 'cleave.js/react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ALL_DATA } from '@/query/query-fn';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation()
    const [entranceTime, setEntranceTime] = useState<Date | undefined>(() => {
        const now = new Date();
        now.setHours(19, 0, 0, 0); // Soat 17:00:00.000
        return now;
    })
    const [exitTime, setExitTime] = useState<Date | undefined>(() => {
        const now = new Date();
        now.setHours(17, 0, 0, 0); // Soat 17:00:00.000
        return now;
    })
    const dataRule: ruleData[] = [
        {
            id: 1,
            name: 'noSmoking',
            title: t('noSmoking')
        },
        {
            id: 2,
            name: 'noAlcohol',
            title: t('noAlcohol')
        },
        {
            id: 3,
            name: 'noPets',
            title: t('noPets')
        },
        {
            id: 4,
            name: 'familyOnly',
            title: t('familyOnly')
        },
        {
            id: 5,
            name: 'noLoudMusic',
            title: t('noLoudMusic')
        },
        {
            id: 6,
            name: 'noParty',
            title: t('noParty')
        },
    ]

    useEffect(() => {
        if (entranceTime && exitTime) {
            setCottage(prev => ({
                ...prev,
                entranceTime: entranceTime ? entranceTime.toISOString() : prev.entranceTime,
                exitTime: exitTime ? exitTime.toISOString() : prev.exitTime
            }));
        }
    }, [entranceTime, exitTime, setCottage])


    const price: priceDacha[] = [
        {
            id: 1,
            name: 'price',
            title: t('once_price')
        },
        {
            id: 2,
            name: 'priceWeekend',
            title: t('weekend_days')
        }]

    const { data: comforts } = ALL_DATA.useComforts()

    return (
        <div className="flex flex-col space-y-5 w-full">
            <div className='px-2 flex flex-col space-y-3'>
                <h2 className='text-xl md:text-2xl font-semibold'>{t('prices')}</h2>
                <div className="w-full flex flex-col md:flex-row justify-between gap-x-2">
                    {price.map(el => (
                        <FormField
                            key={el.id}
                            control={control}
                            name={el.name}
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>{el.title}</FormLabel>
                                    <FormControl className='w-full'>
                                        <div className="relative w-full h-[40px] overflow-hidden rounded-lg">
                                            <Cleave
                                                options={{
                                                    numeral: true,
                                                    numeralThousandsGroupStyle: 'thousand',
                                                }}
                                                name="price"
                                                placeholder={el.title}
                                                className="bg-transparent dark:bg-input/30 h-[40px] border w-full rounded-md px-4 py-2"
                                                onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    const numeric = Number(inputValue.replace(/,/g, ""));
                                                    field.onChange(inputValue === '' ? 0 : numeric);
                                                    setCottage({ ...cottage, [el.name]: Number(numeric) })
                                                }}
                                            />
                                            <span className='absolute p-2 px-4 bg-gray-600 text-white rounded-end top-0 right-0 uppercase'> {t('currency')}</span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
            </div>
            <div className='px-2 flex flex-col space-y-3'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center'> {t('date')}</h2>
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex flex-col border w-full border-dashed rounded-lg p-2">
                        <h4 className='text-[15px] font-semibold'>{t('enter')}</h4>
                        <TimePicker date={entranceTime} setDate={setEntranceTime} />
                    </div>
                    <div className="flex flex-col border w-full border-dashed rounded-lg p-2">
                        <h4 className='text-[15px] font-semibold'>{t('logout')}</h4>
                        <TimePicker date={exitTime} setDate={setExitTime} />
                    </div>
                </div>
            </div>
            <div className='px-2 flex flex-col space-y-3'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center'> {t('rule')}</h2>
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
                                                <FormLabel className="font-normal">{t('yes')}</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value="false" />
                                                </FormControl>
                                                <FormLabel className="font-normal">{t('no')}</FormLabel>
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
            <div className='px-2 flex flex-col space-y-3'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center'> {t('comforts')}</h2>
                <FormField
                    control={control}
                    name="comforts"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 w-full">
                                    {comforts?.length && comforts?.map((comfort) => (
                                        <FormItem
                                            key={comfort.id}
                                            className="flex flex-row items-center comfort.ids-start space-y-0 w-full"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(comfort.id)}
                                                    onCheckedChange={(checked) => {
                                                        const isChecked = checked === true;

                                                        let newValues;
                                                        if (isChecked) {
                                                            newValues = [...(field.value || []), comfort.id];
                                                        } else {
                                                            newValues = (field.value || []).filter(
                                                                (val: string) => val !== comfort.id
                                                            );
                                                        }

                                                        field.onChange(newValues);
                                                        setCottage({ ...cottage, comforts: newValues });
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal line-clamp-1">{comfort.name}</FormLabel>
                                        </FormItem>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default PriceRuleComforts;