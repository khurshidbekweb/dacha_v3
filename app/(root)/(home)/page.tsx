'use client'
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation()
    return (
        <div className='p-3'>
            {t('welcome')}
        </div>
    );
};

export default Home;