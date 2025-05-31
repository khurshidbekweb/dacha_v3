import { image } from '@/types';
import React from 'react';
interface imgesprops {
    images: image[]
}


const ImageDacha = ({ images }: imgesprops) => {
    console.log(images);

    return (
        <div>
            Image
        </div>
    );
};

export default ImageDacha;