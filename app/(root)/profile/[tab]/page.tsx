'use client'

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import UserDacha from '../../../../section/profile/mobile/cottage';
import UserTariff from '../../../../section/profile/mobile/tariffs';
import UserService from '../../../../section/profile/mobile/service-user';
import { Settings } from 'lucide-react';

type TabKey = 'cottage' | 'tariffs' | 'services' | 'settings';

interface TabsProps {
    active: TabKey;
    onChange: (tab: TabKey) => void;
}

const MobileProfile = () => {
    const params = useParams();
    const section = params?.tab as string; // 🟢 <-- MUHIM O‘ZGARISH
    const router = useRouter();

    const isValidTabKey = (value: string): value is TabKey => {
        return ['cottage', 'tariffs', 'services', 'settings'].includes(value);
    }

    const activeSection: TabKey = isValidTabKey(section) ? section : 'cottage';

    const renderSection = () => {
        switch (activeSection) {
            case 'cottage': return <UserDacha />;
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
        { key: "cottage", label: "Dachalar" },
        { key: "tariffs", label: "Tariflar" },
        { key: "services", label: "Xizmatlar" },
        { key: "settings", label: "Sozlamalar" },
    ];
    return (
        <div className="flex flex-col">
            {tabs.map(tab => (
                <div
                    onClick={() => onChange(tab.key)}
                    className={`p-2 ${active === tab.key ? "font-bold border-b-2 border-blue-500" : ""}`}
                    key={tab.key}>
                    {tab.label}
                </div>
            ))}
        </div>
    );
};
