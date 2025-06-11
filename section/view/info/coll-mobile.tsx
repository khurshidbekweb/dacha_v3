import { cottage } from '@/types';
import { PhoneCall } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface callProps {
    cottage: cottage
}

const CallMobile = ({ cottage }: callProps) => {
    const { t } = useTranslation()
    return (
        <div className='fixed w-full bottom-0 p-1 bg-secondary flex justify-between items-center md:hidden'>
            <div className='flex flex-col'>
                <p className='text-[14px]'>Bir kunlik narx: <span>{cottage.price.toLocaleString()}</span> {t('currency')}</p>
                <p className='text-[14px]'>Dam olish kunlari: <span>{cottage.priceWeekend.toLocaleString()} {t('currency')}</span></p>
            </div>
            <Link href={`tel:${cottage.user.phone}`} className="flex gap-x-2 items-center bg-primary dark:bg-amber-500 py-1 px-2 rounded-lg text-white"><PhoneCall size={15} /> Bog`lanish</Link>
        </div>
    );
};

export default CallMobile;