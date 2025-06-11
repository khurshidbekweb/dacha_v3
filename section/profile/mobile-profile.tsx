'use client'

import React from 'react';
import UserDacha from '../../app/(root)/profile/cottage';
import UserTariff from '../../app/(root)/profile/user-tariff';
import Settings from '../../app/(root)/profile/settings';
import UserService from '../../app/(root)/profile/service-user';
import { useParams, useRouter } from 'next/navigation';
type TabKey = 'dacha' | 'tariffs' | 'services' | 'settings';

interface TabsProps {
    active: TabKey;
    onChange: (tab: TabKey) => void;
}

const MobileProfile = () => {
    const params = useParams();
    const router = useRouter();
    const section = params?.section as string;

    const isValidTabKey = (value: string): value is TabKey => {
        return ['dacha', 'tariffs', 'services', 'settings'].includes(value);
    }

    const activeSection: TabKey = isValidTabKey(section) ? section : 'dacha';


    const renderSection = () => {
        switch (section) {
            case 'dacha': return <UserDacha />;
            case 'tariffs': return <UserTariff />;
            case 'services': return <UserService />;
            case 'settings': return <Settings />;
            default: return <UserDacha />;
        }
    }
    return (
        <div className='w-full px-1 flex flex-col space-y-2 md:hidden'>
            <Tabs active={activeSection} onChange={(tab) => router.push(`/profile/${tab}`)} />
            {renderSection()}
        </div>
    );
};

export default MobileProfile;

const Tabs = ({ active, onChange }: TabsProps) => {
    const tabs: { key: TabKey; label: string }[] = [
        { key: "dacha", label: "Dachalar" },
        { key: "tariffs", label: "Tariflar" },
        { key: "services", label: "Xizmatlar" },
        { key: "settings", label: "Sozlamalar" },
    ];
    return (
        <div className="flex overflow-x-auto">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    className={`p-2 ${active === tab.key ? "font-bold border-b-2 border-blue-500" : ""}`}
                    onClick={() => onChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};