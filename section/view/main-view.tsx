'use client'

import React from 'react';
import { cottage } from '@/types';
import Navbar from '@/app/(root)/_components/navbar';
import DachaImages from './image/images';
import BreadCrumbs from '@/components/share/bredcrambs';
import { useTranslation } from 'react-i18next';
import HeadInfo from './info/head-info';
import MainInfo from './info/main-info';


interface dachaView {
    cottage: cottage,
    suitableCottage: cottage[]
}

const MainView = ({ cottage, suitableCottage }: dachaView) => {
    const { t } = useTranslation()
    console.log(suitableCottage);

    return (
        <>
            <div className="w-full hidden md:block">
                <Navbar />
                <BreadCrumbs data={[{ title: t('home'), slug: '' }, { title: t('announcement'), slug: 'cottage' }]} page={cottage.name} />
            </div>
            <div className='max-w-[1540px] mx-auto md:px-10 xl:px-32'>
                <HeadInfo cottage={cottage} />
                <DachaImages cottage={cottage} />
                <MainInfo cottage={cottage} />
            </div>
        </>
    );
};

export default MainView;