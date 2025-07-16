import { IMG_BASE_URL } from '@/constants';
import { newCottage } from '@/types';
import { Images } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface imageProps {
    images: newCottage;
    onOpenSheet: () => void;
}

const ImageDachaDes = ({ images, onOpenSheet }: imageProps) => {
    const { t } = useTranslation();

    // ✅ Xavfsiz tekshiruv
    const mainImageCard = Array.isArray(images?.images)
        ? images.images.find((dacha) => dacha.isMainImage)
        : null;

    const slicedImages = Array.isArray(images?.images)
        ? images.images.slice(0, 4)
        : [];

    return (
        <div className='hidden md:flex justify-between rounded-4xl overflow-hidden gap-2 mt-4 h-[450px] relative'>
            <div className="relative w-[40%] h-full flex-shrink-0" onClick={onOpenSheet}>
                {mainImageCard?.image && (
                    <Image
                        src={`${IMG_BASE_URL}${mainImageCard.image}`}
                        alt={images.name}
                        fill
                        sizes='(max-width: 450px) 420px'
                        priority
                        className='object-cover'
                    />
                )}
            </div>

            <div className="grid grid-cols-2 gap-2 flex-1">
                {slicedImages.map((img) => (
                    <div className="relative w-full h-full" key={img.id} onClick={onOpenSheet}>
                        {img.image && (
                            <Image
                                src={`${IMG_BASE_URL}${img.image}`}
                                alt={images.name}
                                fill
                                sizes='(max-width: 250px) 220px'
                                priority
                                className='object-cover'
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="absolute flex gap-x-2 right-3 bottom-3 bg-secondary p-2 rounded-xl px-3" onClick={onOpenSheet}>
                <Images />
                {t('view_all_images')}
            </div>
        </div>
    );
};

export default ImageDachaDes;
