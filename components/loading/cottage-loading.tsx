'use client';

import React from 'react';
import Lottie from 'lottie-react';
import homeloading from '@/public/image/loading.json'


const CottageLoading = () => {
    return (
        <div className="w-full">
            <div className="w-40 h-40 md:w-64 md:h-64 mx-auto">
                <Lottie animationData={homeloading} loop={true} />
                <h4 className='text-2xl md:text-4xl text-center'>Loading ...</h4>
            </div>
        </div>
    );
};

export default CottageLoading;
