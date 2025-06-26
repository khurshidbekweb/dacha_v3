'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { postCottage } from '@/types';
import Cleave from 'cleave.js/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}

const MainInfo = ({ cottage, setCottage }: infoProps) => {
    const { control } = useFormContext();
    const { t } = useTranslation()
    return (
        <div className='px-2 flex flex-col space-y-2'>
            <div className="flex flex-col space-y-3">
                <h3 className='text-xl md:text-2xl font-semibold'>{t('main_info')}</h3>
                <FormField
                    control={control}
                    name="cottageName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('cottage_name')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('cottage_name')} {...field}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        field.onChange(inputValue);
                                        setCottage({ ...cottage, cottageName: inputValue })
                                    }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="maxGuests"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('count_of_guests')}</FormLabel>
                            <FormControl>
                                <Input value={field.value === 0 ? '' : Number(field.value)} type='tel' placeholder={t('count_of_guests')}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numeric = Number(inputValue);
                                        field.onChange(inputValue === '' ? 0 : (isNaN(numeric) ? 0 : numeric));
                                        setCottage({ ...cottage, maxGuests: numeric })
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="numberOfRooms"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('count_rooms')}</FormLabel>
                            <FormControl>
                                <Input type='tel' value={field.value === 0 ? '' : Number(field.value)} placeholder={t('count_rooms')}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numeric = Number(inputValue);
                                        field.onChange(inputValue === '' ? 0 : (isNaN(numeric) ? 0 : numeric));
                                        setCottage({ ...cottage, numberOfRooms: numeric })
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="singleBedCount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('single_bed')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('single_bed')} type='tel' value={field.value === 0 ? '' : field.value}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numeric = Number(inputValue);
                                        field.onChange(inputValue === '' ? 0 : (isNaN(numeric) ? 0 : numeric));
                                        setCottage({ ...cottage, singleBedCount: numeric })
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="doubleBedCount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('double_bed')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('double_bed')} type='tel' value={field.value === 0 ? '' : field.value}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numeric = Number(inputValue);
                                        field.onChange(inputValue === '' ? 0 : (isNaN(numeric) ? 0 : numeric));
                                        setCottage({ ...cottage, doubleBedCount: numeric })
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <h3 className='text-xl md:text-2xl font-semibold'>{t('contact')}</h3>
                <FormField
                    control={control}
                    name="contactPhone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('contact_phone')}</FormLabel>
                            <FormControl>
                                <Cleave
                                    options={{
                                        prefix: "+998",
                                        delimiter: " ",
                                        blocks: [4, 2, 3, 2, 2],
                                        numericOnly: true,
                                    }}
                                    placeholder={t('contact_phone')}
                                    className="w-full p-2 border bg-transparent dark:bg-input/30 text-[15px] md:text-xl rounded-md"
                                    name="phonenumber"
                                    inputMode="numeric"
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numeric = String(inputValue);
                                        field.onChange(inputValue === '' ? 0 : numeric);
                                        setCottage({ ...cottage, contactPhone: e.target.value.replace(/\D/g, "") })
                                    }}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('desk_cottage')}</FormLabel>
                            <FormControl>
                                <Textarea className='w-full h-[100px] md:h-[150px]' placeholder={t('desk_cottage')} {...field} onChange={(e) => {
                                    const inputValue = e.target.value;
                                    field.onChange(inputValue);
                                    setCottage({ ...cottage, description: inputValue })
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default MainInfo;