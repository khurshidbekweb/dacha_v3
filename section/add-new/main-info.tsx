'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { postCottage } from '@/types';
import Cleave from 'cleave.js/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}

const MainInfo = ({ cottage, setCottage }: infoProps) => {
    const { control } = useFormContext();
    return (
        <div className='px-2 flex flex-col space-y-2'>
            <div className="flex flex-col space-y-3">
                <h3 className='text-xl md:text-2xl font-semibold'>Asosiy ma`lumotlar</h3>
                <FormField
                    control={control}
                    name="cottageName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dacha nomi</FormLabel>
                            <FormControl>
                                <Input placeholder="Cottage Name" {...field} />
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
                            <FormLabel>Xonalar soni</FormLabel>
                            <FormControl>
                                <Input type='tel' value={field.value === 0 ? '' : Number(field.value)} placeholder="Xonalar soni"
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numeric = Number(inputValue);
                                        field.onChange(inputValue === '' ? 0 : (isNaN(numeric) ? 0 : numeric));
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
                            <FormLabel>1 o`rinli yotoqlar soni</FormLabel>
                            <FormControl>
                                <Input placeholder="1 o`rinli yotoqlar soni" type='tel' value={field.value === 0 ? '' : field.value}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numeric = Number(inputValue);
                                        field.onChange(inputValue === '' ? 0 : (isNaN(numeric) ? 0 : numeric));
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
                            <FormLabel>2 o`rinli yotoqlar soni</FormLabel>
                            <FormControl>
                                <Input placeholder="2 o`rinli yotoqlar soni" type='tel' value={field.value === 0 ? '' : field.value}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numeric = Number(inputValue);
                                        field.onChange(inputValue === '' ? 0 : (isNaN(numeric) ? 0 : numeric));
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <h3 className='text-xl md:text-2xl font-semibold'>Bog`lanish</h3>
                <FormField
                    control={control}
                    name="contactPhone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefon raqam</FormLabel>
                            <FormControl>
                                <Cleave
                                    options={{
                                        prefix: "+998",
                                        delimiter: " ",
                                        blocks: [4, 2, 3, 2, 2],
                                        numericOnly: true,
                                    }}
                                    placeholder="Phone number"
                                    className="w-full p-2 border bg-transparent dark:bg-input/30 text-[15px] md:text-xl  rounded-md"
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
                            <FormLabel>Dacha haqida qisqacha tavsif</FormLabel>
                            <FormControl>
                                <Textarea className='w-full h-[100px] md:h-[150px]' placeholder="Dacha haqida tavsif" {...field} />
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