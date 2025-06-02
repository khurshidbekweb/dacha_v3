import MobileNov from '@/app/(root)/_components/mobile-nov';
import Navbar from '@/app/(root)/_components/navbar';
import BreadCrumbs from '@/components/share/bredcrambs';
import React from 'react';
import FileUpload from './file-upload';
import MainInfo from './main-info';
import PlaceMap from './place-map';
import PriceRuleComforts from './price-rule-comforts';

const AddNewPage = () => {
    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '/', title: 'Home' }]} page='E`lon qo`shsih' />
            <div className='max-w-[1540px] mx-auto md:px-10 xl:px-32'>
                <FileUpload />
                <PlaceMap />
                <MainInfo />
                <PriceRuleComforts />
            </div>
            <MobileNov />
        </>
    );
};

export default AddNewPage;