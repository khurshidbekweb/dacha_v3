'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { postCottage } from '@/types';
import Cleave from 'cleave.js/react';
import { t } from 'i18next';
import { RefreshCcw } from 'lucide-react';
import React, { useState } from 'react';

interface editINfoProps {
    cottage: postCottage
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}

const InfoEdit = ({ cottage, setCottage }: editINfoProps) => {
    const [phoneNumber, setPhoneNumber] = useState(false)



    return (
        <div className="w-full flex flex-col space-y-3 px-2">
            <div className='flex flex-col space-y-2'>
                <Label htmlFor="name">{t('cottage_name')}</Label>
                <Input
                    id='name'
                    defaultValue={cottage.cottageName}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setCottage({ ...cottage, cottageName: inputValue })
                    }} />
            </div>
            <div className='flex flex-col space-y-2'>
                <Label htmlFor="maxGuests">{t('number_of_guests')}</Label>
                <Input
                    id='maxGuests'
                    type='tel'
                    defaultValue={cottage.maxGuests}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setCottage({ ...cottage, maxGuests: Number(inputValue) })
                    }} />
            </div>
            <div className='flex flex-col space-y-2'>
                <Label htmlFor="rooms">Xonalar soni</Label>
                <Input
                    id='rooms'
                    type='tel'
                    defaultValue={cottage.numberOfRooms}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setCottage({ ...cottage, numberOfRooms: Number(inputValue) })
                    }} />
            </div>
            <div className='flex flex-col space-y-2'>
                <Label htmlFor="singlebed">{t('single_bed')}</Label>
                <Input
                    id='singlebed'
                    type='tel'
                    defaultValue={cottage.singleBedCount}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setCottage({ ...cottage, singleBedCount: Number(inputValue) })
                    }} />
            </div>
            <div className='flex flex-col space-y-2'>
                <Label htmlFor="doublelebad">{t('double_bed')}</Label>
                <Input
                    id='doublelebad'
                    type='tel'
                    defaultValue={cottage.doubleBedCount}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setCottage({ ...cottage, doubleBedCount: Number(inputValue) })
                    }} />
            </div>
            <div className='flex flex-col space-y-2'>
                <h3 className='text-xl md:text-3xl font-semibold '>{t('contact')}</h3>
                <Label htmlFor="doublelebad">{t('current_number')}:
                    <p className='text-green-500 dark:text-amber-400'> +998{cottage?.contactPhone}</p>

                </Label>
                <span onClick={() => setPhoneNumber((value) => !value)} className='flex items-center gap-x-1.5 border text-center justify-center p-1 rounded-lg'>{t('change_number')} <RefreshCcw size={20} /></span>

                <Cleave
                    options={{
                        prefix: "+998",
                        delimiter: " ",
                        blocks: [4, 2, 3, 2, 2],
                        numericOnly: true,
                    }}
                    placeholder="Phone number"
                    className={` ${phoneNumber ? 'block' : 'hidden'} w-full p-2 border bg-transparent dark:bg-input/30 text-[15px] md:text-xl rounded-md`}
                    name="phonenumber"
                    inputMode="numeric"
                    onChange={(e) => {
                        setCottage({ ...cottage, contactPhone: e.target.value });
                    }}
                    required
                />
            </div>
            <div className='flex flex-col space-y-2'>
                <Label htmlFor="deskription">{t('cottage_description_short')}</Label>
                <Textarea
                    id='deskription'
                    defaultValue={cottage.description}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setCottage({ ...cottage, description: inputValue })
                    }} />
            </div>
        </div>
    );
};

export default InfoEdit;