import Navbar from '@/app/(root)/_components/navbar';
import React from 'react';
import { Banner } from './banner/banner';

export const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="mt-20">
                <Banner />
            </div>
        </div>
    );
};

