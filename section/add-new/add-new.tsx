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

    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '/', title: 'Home' }]} page='E`lon qo`shsih' />
            <div className='max-w-[1540px] mx-auto md:px-10 xl:px-16'>
                <FileUpload cottage={cottage} setCottage={setCottage} />
                <PlaceMap />
                <MainInfo />
                <PriceRuleComforts />
            </div>
            <MobileNov />
        </>
    );
};

export default AddNewPage;