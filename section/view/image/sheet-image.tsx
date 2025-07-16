import React, { useState } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
} from "@/components/ui/drawer";
import { ChevronLeft } from 'lucide-react';
import { newCottage } from '@/types';
import { IMG_BASE_URL } from '@/constants';
import Image from 'next/image';
import ImageSwiper from './image-swiper';

interface bootomSheet {
    isOpen: boolean;
    onClose: () => void;
    cottage: newCottage;
}

const AllImage = ({ isOpen, onClose, cottage }: bootomSheet) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index: number) => {
        setActiveIndex(index);
        setOpen(true);
    };

    const imageList = Array.isArray(cottage?.images) ? cottage.images : [];

    return (
        <>
            <Drawer onOpenChange={(isOpen) => !isOpen && onClose()} open={isOpen}>
                <DrawerContent className='!h-[100vh]'>
                    <DrawerTitle
                        className='w-[50px] border flex items-center p-2 text-center ml-3 justify-center cursor-pointer rounded-lg'
                        onClick={onClose}
                    >
                        <ChevronLeft className='w-5 h-5 font-bold block' size={35} />
                    </DrawerTitle>

                    <div className="grid grid-cols-2 gap-1 md:gap-2 px-1 md:px-5 overflow-y-auto mt-1">
                        {imageList.map((img, index) => {
                            if (!img?.image) return null;

                            const isFull = index % 3 === 0;

                            return (
                                <div
                                    key={img.id}
                                    className={`${isFull ? 'col-span-2 aspect-[16/9]' : 'col-span-1 aspect-square h-[120px] md:h-[400px]'} relative w-full`}
                                    onClick={() => handleClick(index)}
                                >
                                    <Image
                                        src={`${IMG_BASE_URL}${img.image}`}
                                        alt={cottage.name || 'Dacha rasm'}
                                        fill
                                        className="object-cover rounded-[2px] md:rounded-lg"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                </div>
                            );
                        })}
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Fallback bo'lishi uchun faqat image bor bo‘lsa render qilinadi */}
            {imageList.length > 0 && (
                <ImageSwiper
                    cottage={cottage}
                    imageIndex={activeIndex}
                    isOpen={open}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

export default AllImage;
