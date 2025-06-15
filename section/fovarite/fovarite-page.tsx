'use client'

import MobileNov from '@/app/(root)/_components/mobile-nov';
import Navbar from '@/app/(root)/_components/navbar';
import BreadCrumbs from '@/components/share/bredcrambs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LikeCard from './like-card';

const FovaritePage = () => {
    const { t } = useTranslation()
    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '', title: t('home') }]} page={t('fovarite')} />
            <div className='max-w-[1540px] mx-auto md:px-10 xl:px-16 mb-24 md:mb-0'>
                <h2 className='text-2xl font-semibold mt-5' >{t('fovarite')}</h2>
                <LikeCard />
            </div>
            <MobileNov />
        </>
    );
};

export default FovaritePage;