'use client'

import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import UserDacha from '../../../../section/profile/mobile/cottage';
import UserTariff from '../../../../section/profile/mobile/tariffs';
import { ChevronRight, Settings } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Servives from '../../services/page';

type TabKey = 'cottage' | 'tariffs' | 'services' | 'settings';



const MobileProfile = () => {
    const params = useParams();
    const section = params?.tab as string; // 🟢 <-- MUHIM O‘ZGARISH
    const pathname = usePathname();
    const isValidTabKey = (value: string): value is TabKey => {
        return ['cottage', 'tariffs', 'services', 'settings'].includes(value);
    }

    const activeSection: TabKey = isValidTabKey(section) ? section : 'cottage';

    const renderSection = () => {
        switch (activeSection) {
            case 'cottage': return <UserDacha />;
            case 'tariffs': return <UserTariff />;
            case 'services': return <Servives />;
            case 'settings': return <Settings />;
            default: return <UserDacha />;
        }
    }
    return (
        <div className='w-full max-w-[1540px] px-1 flex flex-col space-y-2 md:hidden'>
            {pathname === '/profile' && <Tabs />}
            {pathname === '/profile' ? '' : renderSection()}
        </div>
    );
};

export default MobileProfile;

const Tabs = () => {
    const { t } = useTranslation()
    const tabs: { key: TabKey; label: string }[] = [
        { key: "cottage", label: t("my_announcements") },
        { key: "tariffs", label: t("my_tariff") },
        { key: "services", label: t('services') },
        { key: "settings", label: t('settings') },
    ];
    return (
        <div className="flex flex-col space-y-2.5 mt-5">
            {tabs.map(tab => (
                <Link
                    href={`/profile/${tab.key}`}
                    className='text-xl border-b py-2 flex justify-between items-center'
                    key={tab.key}>
                    {tab.label}
                    <ChevronRight />
                </Link>
            ))}
        </div>
    );
};
