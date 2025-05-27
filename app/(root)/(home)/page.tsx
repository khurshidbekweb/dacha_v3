'use client'

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation()
    return (
        <div className='p-3'>
            {t('welcome')}


            <div className="bg-black p-16"></div>

            <Button className='mt-3'>Submit <Check /></Button>

            <div className="bg-white p-16 mt-5"></div>
        </div>
    );
};

export default Home;