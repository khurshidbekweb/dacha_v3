import Navbar from '@/app/(root)/_components/navbar';
import React from 'react';
import { Banner } from './banner/banner';
import Resorts from './resorts/resorts';
import TopCottage from './top-cottage/top-cottage';
import CottageType from './cot-type/cottage-type';
import RecentlyCot from './cottage/recently-cot';
import Cottage from './cottage/cottage';
import MobileNov from '@/app/(root)/_components/mobile-nov';

export const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="mt-5 md:mt-20 ">
                <Banner />
            </div>
            <div className='mt-5 md:mt-16'>
                <Resorts />
            </div>
            <div className='mt-5 md:mt-16'>
                <TopCottage />
            </div>
            <div className='mt-5 md:mt-16'>
                <CottageType />
            </div>
            <div className='mt-5 md:mt-16'>
                <RecentlyCot />
            </div>
            <div className='mt-5 mb-16 md:mt-16'>
                <Cottage />
            </div>
            <MobileNov />
        </div>
    );
};

