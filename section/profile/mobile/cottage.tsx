import Navbar from '@/app/(root)/_components/navbar';
import BreadCrumbs from '@/components/share/bredcrambs';
import React from 'react';
import { useTranslation } from 'react-i18next';

const UserDacha = () => {
    const { t } = useTranslation()
    return (
        <div className='w-full'>
            <Navbar />
            <BreadCrumbs data={[{ slug: '/', title: t('home') }]} page={t('my_announcements')} />

            <div className="flex flex-col space-y-3 mt-5">
                <h3 className='text-2xl font-semibold'>{t('my_announcements')}</h3>
            </div>
        </div>
    );
};

export default UserDacha;