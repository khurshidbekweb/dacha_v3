import { IMG_BASE_URL } from '@/constants';
import { cottage } from '@/types';
import { Images } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface imageProps {
    images: cottage,
    onOpenSheet: () => void
}

const ImageDachaDes = ({ images, onOpenSheet }: imageProps) => {
    const mainImageCard = images.images && images?.images.filter(dacha => dacha.isMainImage == true)
    console.log(mainImageCard);

    return (
        <div className='hidden md:flex justify-between rounded-4xl overflow-hidden gap-2 mt-10 h-[450px] relative'>
            <div className="relative w-[40%] h-full flex-shrink-0" onClick={onOpenSheet}>
                <Image
                    src={`${IMG_BASE_URL}${mainImageCard[0]?.image}`}
                    alt={images.name}
                    fill
                    sizes='(max-width: 450px) 420px'
                    priority
                    className='object-cover'
                />
            </div>

            <div className="grid grid-cols-2 gap-2 flex-1">
                {images?.images?.slice(0, 4).map(img => (
                    <div className="relative w-full h-full" key={img.id} onClick={onOpenSheet}>
                        <Image
                            src={`${IMG_BASE_URL}${img.image}`}
                            alt={images.name}
                            fill
                            sizes='(max-width: 250px) 220px'
                            priority
                            className='object-cover'
                        />
                    </div>
                ))}
            </div>
            <div className="absolute flex gap-x-2 right-3 bottom-3 bg-secondary p-2 rounded-xl px-3" onClick={onOpenSheet}>
                <Images />
                Barcha {images.images.length} ta rasmni ko`rish
            </div>
        </div>
    );
};

export default ImageDachaDes;
