import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { newCottage, postCottage } from '@/types';
import { Pen, X } from 'lucide-react';
import React, { useState } from 'react';
import CottageEditImg from './image-edit';
import InfoEdit from './info-edit';
import PriceMapEdit from './price-map';

interface bootomSheet {
    cottage: newCottage
}

const CottageEdit = ({ cottage }: bootomSheet) => {
    const [open, setOpen] = useState(false)
    const comforts = cottage.comforts.map((com) => com.id)

    const [editcottage, setEditCottage] = useState<postCottage>({
        cottageName: cottage.name,
        description: cottage.description,
        regionId: cottage.region.id,
        placeId: cottage.place.id,
        price: cottage.price,
        contactPhone: cottage?.contactPhone,
        priceWeekend: cottage.priceWeekend,
        cottageType: [cottage.cottageType[0].id],
        comforts: comforts,
        latitude: cottage?.latitude,
        longitude: cottage?.longitude,
        doubleBedCount: cottage?.doubleBedCount,
        entranceTime: cottage?.entranceTime,
        exitTime: cottage?.exitTime,
        maxGuests: cottage?.maxGuests,
        numberOfRooms: cottage?.numberOfRooms,
        singleBedCount: cottage?.singleBedCount,
        familyOnly: cottage?.familyOnly,
        noAlcohol: cottage?.noAlcohol,
        noLoudMusic: cottage?.noLoudMusic,
        noParty: cottage?.noParty,
        noPets: cottage?.noPets,
        noSmoking: cottage?.noSmoking,
        quiteHours: ''
    })

    return (
        <Drawer onOpenChange={setOpen} open={open}>
            <DrawerTrigger className='absolute top-3 right-5 shadow-lg backdrop-blur-xs backdrop-grayscale flex items-center gap-x-1 p-1 px-2 rounded-lg text-white bg-green-400 dark:bg-amber-500'><Pen size={15} /> Tahrirlash</DrawerTrigger>
            <DrawerContent aria-describedby={undefined} className='!h-[100vh]'>
                <DrawerTitle className='w-[50px] border flex items-center p-2 text-center ml-3 justify-center cursor-pointer rounded-lg' onClick={() => setOpen(false)}>
                    <X className='w-5 h-5 font-bold block' size={35} />
                </DrawerTitle>
                <div className=" overflow-y-auto">
                    <CottageEditImg id={cottage.id} images={cottage?.images} />
                    <InfoEdit cottage={editcottage} setCottage={setEditCottage} />
                    <PriceMapEdit cottage={editcottage} setCottage={setEditCottage} />
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CottageEdit;