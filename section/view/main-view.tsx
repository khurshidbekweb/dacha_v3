import React from 'react';
import ImageDacha from './image-dacha';
import { cottage } from '@/types';


interface dachaView {
    cottage: cottage,
    suitableCottage: cottage[]
}

const MainView = ({ cottage, suitableCottage }: dachaView) => {
    console.log(suitableCottage);

    return (
        <div>
            <ImageDacha images={cottage?.images} />
        </div>
    );
};

export default MainView;