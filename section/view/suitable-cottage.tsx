import { DachaCard } from '@/components/card/dacha-card';
import { DachaCardMini } from '@/components/card/mini-card';
import { cottage } from '@/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface suitableCottage {
    cottages: cottage[]
}

const SuitableCottage = ({ cottages }: suitableCottage) => {
    const { t } = useTranslation()
    return (
        <div className='mt-5 md:mt-10'>
            <h2 className='text-2xl md:text-3xl font-semibold'>{t('oxshash_elonlar')} </h2>
            <div className="hidden md:grid mt-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3 xl:gap-4 justify-items-center md:justify-between items-center mx-auto">
                {cottages?.length && cottages?.map(dacha => (
                    <DachaCard dacha={dacha} key={dacha.id} />
                ))}
            </div>
            <div className="grid grid-cols-2 md:hidden gap-2 px-1">
                {cottages?.length && cottages?.map(dacha => (
                    <DachaCardMini dacha={dacha} key={dacha.id} />
                ))}
            </div>
        </div>
    );
};

export default SuitableCottage;