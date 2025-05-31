import React from 'react';
import { cottage } from '@/types';
import { ImageDacha } from './image/image-dacha-mobile';


interface dachaView {
    cottage: cottage,
    suitableCottage: cottage[]
}

const MainView = ({ cottage, suitableCottage }: dachaView) => {
    console.log(suitableCottage);

    return (
        <div>
            <ImageDacha images={cottage} />
        </div>
    );
};

export default MainView;