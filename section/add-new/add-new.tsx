'use client'

import MobileNov from '@/app/(root)/_components/mobile-nov';
import Navbar from '@/app/(root)/_components/navbar';
import BreadCrumbs from '@/components/share/bredcrambs';
import React, { useState } from 'react';
import FileUpload from './file-upload';
import MainInfo from './main-info';
import PlaceMap from './place-map';
import PriceRuleComforts from './price-rule-comforts';
import { postCottage } from '@/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from 'react-hook-form';
import { CottageFormValues, cottageSchema } from '@/constants';
import { Button } from '@/components/ui/button';

const AddNewPage = () => {
    const [cottage, setCottage] = useState<postCottage>({
        cottageName: '',
        description: '',
        images: [],
        regionId: '',
        placeId: '',
        price: 0,
        priceWeekend: 0,
        cottageType: ["c4c301b1-4719-499e-bde2-2c36715fae9e"],
        comforts: [],
        latitude: '',
        longitude: '',
        doubleBedCount: 0,
        entranceTime: '',
        exitTime: '',
        maxGuests: 0,
        numberOfRooms: 0,
        singleBedCount: 0,
        familyOnly: false,
        noAlcohol: false,
        noLoudMusic: false,
        noParty: false,
        noPets: false,
        noSmoking: false,
        quiteHours: ''
    })

    const methods = useForm<CottageFormValues>({
        resolver: zodResolver(cottageSchema),
        defaultValues: {
            cottageName: '',
            description: '',
            images: [],
            regionId: '',
            placeId: '',
            price: 0,
            priceWeekend: 0,
            cottageType: ["c4c301b1-4719-499e-bde2-2c36715fae9e"],
            comforts: [],
            latitude: '',
            longitude: '',
            doubleBedCount: 0,
            entranceTime: '',
            exitTime: '',
            maxGuests: 0,
            numberOfRooms: 0,
            singleBedCount: 0,
            familyOnly: false,
            noAlcohol: false,
            noLoudMusic: false,
            noParty: false,
            noPets: false,
            noSmoking: false,
            quiteHours: ''
        },
    });


    const onSubmit = (data: CottageFormValues) => {
        console.log("Form data:", data);
        console.log(1);

    };
    console.log(cottage);

    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '/', title: 'Home' }]} page='E`lon qo`shsih' />
            <div className='max-w-[1540px] mx-auto md:px-10 xl:px-16'>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                        <FileUpload cottage={cottage} setCottage={setCottage} />
                        <PlaceMap cottage={cottage} setCottage={setCottage} />
                        <MainInfo cottage={cottage} setCottage={setCottage} />
                        <PriceRuleComforts cottage={cottage} setCottage={setCottage} />
                        <Button type='submit'>Submit</Button>
                    </form>
                </FormProvider>
            </div>
            <MobileNov />
        </>
    );
};

export default AddNewPage;