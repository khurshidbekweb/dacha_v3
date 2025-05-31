import React from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
} from "@/components/ui/drawer"
import { ChevronLeft } from 'lucide-react';
import { cottage } from '@/types';
import { IMG_BASE_URL } from '@/constants';
import Image from 'next/image';

interface bootomSheet {
    isOpen: boolean,
    onClose: () => void
    cottage: cottage
}

const AllImage = ({ isOpen, onClose, cottage }: bootomSheet) => {
    return (
        <Drawer onOpenChange={(isOpen) => !isOpen && onClose()} open={isOpen}>
            <DrawerContent className='!h-[100vh]'>
                <DrawerTitle className='w-[50px] border flex items-center p-2 text-center ml-3 justify-center cursor-pointer rounded-lg' onClick={onClose}><ChevronLeft className='w-5 h-5 font-bold block' size={35} /></DrawerTitle>

                <div className="grid grid-cols-2 gap-1 md:gap-2 px-1 md:px-5 overflow-y-auto mt-1">
                    {cottage.images?.length && cottage.images.map((img, index) => {
                        const isFull = index % 3 === 0;
                        return (
                            <div
                                key={img.id}
                                className={`${isFull ? 'col-span-2 aspect-[16/9] ' : 'col-span-1 aspect-square h-[120px] md:h-[400px]'} relative w-full`}
                            >
                                <Image
                                    src={`${IMG_BASE_URL}${img.image}`}
                                    alt={cottage.name}
                                    fill
                                    className="object-cover rounded-[2px] md:rounded-lg"
                                    sizes='(max-width: 800px) 450px 400px'
                                />
                            </div>
                        );
                    })}
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default AllImage;