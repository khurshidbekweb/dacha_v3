import { newCottage } from '@/types';
import { cottageUtils } from '@/utils/cottage.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PhoneCall } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface callProps {
    cottage: newCottage
}

const CallMobile = ({ cottage }: callProps) => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const actionCottage = useMutation({
        mutationFn: cottageUtils.addEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['call'] })
        }
    })
    const callAdd = () => {
        actionCottage.mutate({
            cottageId: cottage?.id,
            event: 'call'
        })

    }
    return (
        cottage.cottageType[0].id === 'c4c301b1-4719-499e-bde2-2c36715fae9e' && <div className='fixed w-full bottom-0 p-1 bg-secondary flex justify-between items-center md:hidden'>
            <div className='flex flex-col w-full'>
                <p className='text-[14px]'>Bir kunlik narx: <span className='text-[16px] font-semibold text-green-500'>{cottage.price.toLocaleString()}</span> {t('currency')}</p>
                <p className='text-[14px]'>{t('weekend_days')}: <span className='text-[16px] font-semibold text-green-500'>{cottage.priceWeekend.toLocaleString()} </span> {t('currency')}</p>
            </div>
            <Link onClick={callAdd} href={`tel:${cottage.contactPhone ? cottage.contactPhone : cottage.user.phone}`} className="flex gap-x-2 justify-center items-center bg-primary dark:bg-amber-500 py-1 px-2 rounded-lg text-white"><PhoneCall size={15} /> {t('contact')}</Link>
        </div>
    );
};

export default CallMobile;