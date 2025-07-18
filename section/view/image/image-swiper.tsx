import React, { useEffect } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { X } from 'lucide-react';
import { newCottage } from '@/types';
import { IMG_BASE_URL } from '@/constants';
import Image from 'next/image';

interface bottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    cottage: newCottage;
    imageIndex: number;
}

const ImageSwiper = ({ cottage, isOpen, onClose, imageIndex }: bottomSheetProps) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    const imageList = Array.isArray(cottage?.images) ? cottage.images : [];

    useEffect(() => {
        if (!api) return;

        const timeout = setTimeout(() => {
            api.scrollTo(imageIndex);
        }, 100);

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });

        return () => clearTimeout(timeout);
    }, [api, imageIndex]);

    return (
        <Drawer onOpenChange={(open) => !open && onClose()} open={isOpen}>
            <DrawerContent className='!h-[100vh]'>
                <DrawerTitle
                    className='w-[50px] border flex items-center py-3 text-center ml-3 justify-center cursor-pointer rounded-full'
                    onClick={onClose}
                >
                    <X strokeWidth={2.25} className='w-5 h-5 font-bold block' size={35} />
                </DrawerTitle>

                <Carousel setApi={setApi} className="w-full p-0 relative mt-10">
                    <CarouselContent>
                        {imageList.map((img) => (
                            img?.image && (
                                <CarouselItem key={img.id}>
                                    <div className="relative w-full md:w-[65%] h-[450px] md:h-[620px] mx-auto">
                                        <Image
                                            src={`${IMG_BASE_URL}${img.image}`}
                                            alt={cottage.name}
                                            className="object-contain"
                                            fill
                                            sizes="(max-width: 450px) 100vw"
                                            priority
                                        />
                                    </div>
                                </CarouselItem>
                            )
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="absolute left-1" />
                    <CarouselNext className="absolute right-1" />

                    <div className="absolute right-1 text-white bottom-0 text-center text-[14px]">
                        {current}/{count}
                    </div>
                </Carousel>
            </DrawerContent>
        </Drawer>
    );
};

export default ImageSwiper;
