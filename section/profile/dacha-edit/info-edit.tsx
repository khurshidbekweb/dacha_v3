'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { postCottage } from '@/types';
import Cleave from 'cleave.js/react';
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
                <Label htmlFor="name">Dacha nomi</Label>
                <Input
                    id='name'
                    defaultValue={cottage.cottageName}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setCottage({ ...cottage, cottageName: inputValue })
                    }} />
            </div>
            <div className='flex flex-col space-y-2'>
                <Label htmlFor="maxGuests">Mehmonlar soni</Label>
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
                <Label htmlFor="singlebad">1 o`rinli yotoqlar soni</Label>
                <Input
                    id='singlebad'
                    type='tel'
                    defaultValue={cottage.singleBedCount}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setCottage({ ...cottage, singleBedCount: Number(inputValue) })
                    }} />
            </div>
            <div className='flex flex-col space-y-2'>
                <Label htmlFor="doublelebad">2 o`rinli yotoqlar soni</Label>
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
                <h3 className='text-xl md:text-3xl font-semibold '>Bog`lanish</h3>
                <Label htmlFor="doublelebad">Hozirgi raqam:
                    <p className='text-green-500 dark:text-amber-400'> +998{cottage?.contactPhone}</p>

                </Label>
                <span onClick={() => setPhoneNumber((value) => !value)} className='flex items-center gap-x-1.5 border text-center justify-center p-1 rounded-lg'>Raqamni almashtirish <RefreshCcw size={20} /></span>

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
        </div>
    );
};

export default InfoEdit;