import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { newCottage, postCottage } from '@/types';
import { Pen, X } from 'lucide-react';
import React, { useState } from 'react';
import CottageEditImg from './image-edit';
import InfoEdit from './info-edit';
import PriceMapEdit from './price-map';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cottageUtils } from '@/utils/cottage.utils';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/query/query-key';
import { useTranslation } from 'react-i18next';

interface bootomSheet {
    cottage: newCottage
}

const CottageEdit = ({ cottage }: bootomSheet) => {
    const { t } = useTranslation()
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
        quiteHours: '',
        images: ['']
    })




    const queryClient = useQueryClient()

    const editDacha = useMutation({
        mutationFn: cottageUtils.patchCottageText,
        onSuccess: () => {
            toast.success('Muaffaqiyatli')
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] })
            setOpen(false)
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const dachEdit = () => {
        const comfortsId: string[] = cottage.comforts && cottage.comforts.map(el => el.id)
        editDacha.mutate({
            comforts: comfortsId,
            contactPhone: cottage.contactPhone,
            cottageStatus: cottage.cottageStatus,
            cottageType: ['c4c301b1-4719-499e-bde2-2c36715fae9e'],
            description: cottage.description,
            doubleBedCount: cottage.doubleBedCount,
            familyOnly: cottage.familyOnly,
            maxGuests: cottage.maxGuests,
            name: cottage.name,
            id: cottage.id,
            noAlcohol: cottage.noAlcohol,
            noLoudMusic: cottage.noLoudMusic,
            noParty: cottage.noParty,
            noPets: cottage.noPets,
            noSmoking: cottage.noSmoking,
            numberOfRooms: cottage.numberOfRooms,
            placeId: cottage.place.id,
            price: cottage.price,
            priceWeekend: cottage.priceWeekend,
            regionId: cottage.region.id,
            singleBedCount: cottage.singleBedCount,
            entranceTime: cottage.entranceTime,
            exitTime: cottage.exitTime,
            lattitude: String(cottage.latitude),
            longitude: String(cottage.longitude),
        })
    }


    return (
        <Drawer onOpenChange={setOpen} open={open}>
            <DrawerTrigger className='absolute top-3 right-5 shadow-lg backdrop-blur-xs backdrop-grayscale flex items-center gap-x-1 p-1 px-2 rounded-lg text-white bg-green-400 dark:bg-amber-500'><Pen size={15} />{t('edit')}</DrawerTrigger>
            <DrawerContent aria-describedby={undefined} className='!h-[100vh]'>
                <DrawerTitle className='w-[50px] border flex items-center p-2 text-center ml-3 justify-center cursor-pointer rounded-lg' onClick={() => setOpen(false)}>
                    <X className='w-5 h-5 font-bold block' size={35} />
                </DrawerTitle>
                <div className=" overflow-y-auto">
                    <CottageEditImg id={cottage.id} images={cottage?.images} />
                    <InfoEdit cottage={editcottage} setCottage={setEditCottage} />
                    <PriceMapEdit cottage={editcottage} setCottage={setEditCottage} />
                    <Button onClick={dachEdit} className='w-full my-3'>{t('edit')}</Button>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CottageEdit;