import React from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
} from "@/components/ui/drawer"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeft } from 'lucide-react';
import { cottage } from '@/types';
import { IMG_BASE_URL } from '@/constants';
import Image from 'next/image';

interface bootomSheet {
    isOpen: boolean,
    onClose: () => void
    cottage: cottage
    imageIndex: string
}
const ImageSwiper = ({ cottage, isOpen, onClose, imageIndex }: bootomSheet) => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    console.log(imageIndex);


    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Drawer onOpenChange={(isOpen) => !isOpen && onClose()} open={isOpen}>
            <DrawerContent className='!h-[100vh]'>
                <DrawerTitle className='w-[50px] border flex items-center p-2 text-center ml-3 justify-center cursor-pointer rounded-lg' onClick={onClose}><ChevronLeft className='w-5 h-5 font-bold block' size={35} /></DrawerTitle>
                <Carousel setApi={setApi} className="w-full p-0 relative border">
                    <CarouselContent>
                        {cottage?.images?.length && cottage?.images?.map((img) => (
                            <CarouselItem key={img.id}>
                                <div className="relative w-full h-[260px]">
                                    <Image
                                        src={`${IMG_BASE_URL}${img.image}`}
                                        alt={cottage.name}
                                        className="object-cover"
                                        fill
                                        sizes="(max-widht: 450px) 420px 300px"
                                        priority
                                    />
                                </div>
                            </CarouselItem>
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