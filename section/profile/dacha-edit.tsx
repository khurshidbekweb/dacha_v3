import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { cottage } from '@/types';
import { Pen, X } from 'lucide-react';
import React, { useState } from 'react';

interface bootomSheet {
    cottage: cottage
}

const CottageEdit = ({ cottage }: bootomSheet) => {
    const [open, setOpen] = useState(false)
    console.log(cottage);

    return (
        <Drawer onOpenChange={setOpen} open={open}>
            <DrawerTrigger className='absolute top-3 right-5 shadow-lg backdrop-blur-xs backdrop-grayscale flex items-center gap-x-1 p-1 px-2 rounded-lg text-white bg-green-400 dark:bg-amber-500'><Pen size={15} /> Tahrirlash</DrawerTrigger>
            <DrawerContent className='!h-[100vh]'>
                <DrawerTitle className='w-[50px] border flex items-center p-2 text-center ml-3 justify-center cursor-pointer rounded-lg' onClick={() => setOpen(false)}>
                    <X className='w-5 h-5 font-bold block' size={35} />
                </DrawerTitle>

                <div className="grid grid-cols-2 gap-1 md:gap-2 px-1 md:px-5 overflow-y-auto mt-1">

                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CottageEdit;