'use client'

import MobileNov from '@/app/(root)/_components/mobile-nov';
import Navbar from '@/app/(root)/_components/navbar';
import BreadCrumbs from '@/components/share/bredcrambs';
import React, { useEffect, useState } from 'react';
import FileUpload from './file-upload';
import MainInfo from './main-info';
import PlaceMap from './place-map';
import PriceRuleComforts from './price-rule-comforts';
import { postCottage } from '@/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from 'react-hook-form';
import { CottageFormValues, cottageSchema } from '@/constants';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { cottageUtils } from '@/utils/cottage.utils';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { safeLocalStorage } from '@/utils/safeLocalstorge';

const AddNewPage = () => {
    const [cottage, setCottage] = useState<postCottage>({
        cottageName: '',
        description: '',
        images: [],
        regionId: '',
        placeId: '',
        price: 0,
        contactPhone: '',
        priceWeekend: 0,
        cottageType: ["c4c301b1-4719-499e-bde2-2c36715fae9e"],
        comforts: [],
        latitude: 0,
        longitude: 0,
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
    const token = safeLocalStorage.getItem('accessToken')


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
            doubleBedCount: 0,
            contactPhone: '',
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
            quiteHours: '',
            latitude: 0,
            longitude: 0,
        },
    });

    const [submitCheck, setSubmitCheck] = useState(false)

    const route = useRouter()

    useEffect(() => {
        if (!token) {
            route.push('/login')
        }
    }, [token, route])

    const addNewCottage = useMutation({
        mutationFn: cottageUtils.postCottage,
        onSuccess: () => {
            toast.success(`${t('successfully_added')}`)
            setCottage({
                cottageName: '',
                description: '',
                images: [],
                regionId: '',
                placeId: '',
                price: 0,
                contactPhone: '',
                priceWeekend: 0,
                cottageType: ["c4c301b1-4719-499e-bde2-2c36715fae9e"],
                comforts: [],
                latitude: 0,
                longitude: 0,
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
            route.push('/profile')
            setSubmitCheck(false)
        },
        onError: (err) => {
            console.log(err);
        }
    })


    const onSubmit = () => {
        setSubmitCheck(true)
        addNewCottage.mutate({
            comforts: cottage.comforts,
            cottageType: cottage.cottageType,
            description: cottage.description,
            images: cottage.images,
            latitude: cottage.latitude,
            longitude: cottage.longitude,
            mainImage: cottage?.images[cottage?.images?.length - 1],
            name: cottage.cottageName,
            placeId: cottage.placeId,
            price: cottage.price,
            priceWeekend: cottage.priceWeekend,
            regionId: cottage.regionId,
            contactPhone: cottage.contactPhone.replaceAll(" ", "").slice(3),
            doubleBedCount: cottage.doubleBedCount,
            entranceTime: cottage.entranceTime,
            exitTime: cottage.exitTime,
            familyOnly: cottage.familyOnly,
            maxGuests: cottage.maxGuests,
            noAlcohol: cottage.noAlcohol,
            noLoudMusic: cottage.noLoudMusic,
            noParty: cottage.noParty,
            noPets: cottage.noPets,
            noSmoking: cottage.noSmoking,
            numberOfRooms: cottage.numberOfRooms,
            quiteHours: cottage.quiteHours,
            singleBedCount: cottage.singleBedCount
        })

    };
    const { t } = useTranslation()


    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '', title: t('home') }]} page={t('add_announcements')} />
            <div className='max-w-[1540px] mx-auto md:px-10 xl:px-16 mb-24 md:mb-0'>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="space-y-4 md:space-y-0 flex flex-col md:flex-row justify-between">
                            <div className='w-full flex flex-col space-y-4 md:space-y-0'>
                                <FileUpload cottage={cottage} setCottage={setCottage} />
                                <MainInfo cottage={cottage} setCottage={setCottage} />
                            </div>
                            <div className="w-full flex flex-col space-y-4 md:space-y-0">
                                <PlaceMap cottage={cottage} setCottage={setCottage} />
                                <PriceRuleComforts cottage={cottage} setCottage={setCottage} />
                            </div>
                        </div>
                        <Button disabled={submitCheck} className='w-full md:w-[450px] mx-auto block my-10' type='submit'>{t('add_announcements')}</Button>
                    </form>
                </FormProvider>
            </div>
            <MobileNov />
        </>
    );
};

export default AddNewPage;