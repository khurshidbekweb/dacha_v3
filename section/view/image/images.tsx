import React from 'react';
import { ImageDacha } from './image-dacha-mobile';
import ImageDachaDes from './image-dacha-des';
import { cottage } from '@/types';
import AllImage from './sheet-image';

interface imageProps {
    cottage: cottage
}

const DachaImages = ({ cottage }: imageProps) => {
    return (
        <div>
            <ImageDacha images={cottage} />
            <ImageDachaDes images={cottage} />
            <AllImage />
        </div>
    );
};

export default DachaImages;