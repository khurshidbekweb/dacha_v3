import Navbar from '@/app/(root)/_components/navbar';
import BreadCrumbs from '@/components/share/bredcrambs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ServiceCard from './service-card';
import Login from '@/app/(root)/login/page';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { services } from '@/types';
import { ALL_DATA } from '@/query/query-fn';

const ServicesPage = () => {
    const { data: services } = ALL_DATA.useServices();
    const { t } = useTranslation()
    const accessAToken = safeLocalStorage.getItem('accessToken')
    if (!accessAToken) {
        return <Login />
    }
    return (

        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '/', title: t('home') }]} page={t('add_announcements')} />
            <div className='max-w-[1540px] mx-auto md:px-10 xl:px-16 mb-24 md:mb-0'>
                {services && services.map((ser: services) => (
                    <ServiceCard key={ser.id} {...ser} />
                ))}
            </div>
        </>
    );
};

export default ServicesPage;