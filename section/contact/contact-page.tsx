'use client'

import { Mail, Phone, Send } from 'lucide-react';
import React from 'react';
import ContactForm from './form-page';
import { useTranslation } from 'react-i18next';
import BreadCrumbs from '@/components/share/bredcrambs';
import Navbar from '@/app/(root)/_components/navbar';

const ContactPage = () => {
    const { t } = useTranslation()
    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '', title: t('home') }]} page={`${t('contact')}`} />
            <h2 className='text-2xl md:text-3xl font-semibold pl-2 md:pl-16 mt-5 '>{t('contact_to_me')}</h2>
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6 max-w-[1540px] mx-auto md:px-10 xl:px-16 mb-24 md:mb-0 px-2'>
                <div className='flex flex-col'>
                    <h1 className='text-xl md:text-2xl font-creteRound'>{t('dachaOl_info')}</h1>
                    <p className='mt-2 text-muted-foreground w-full xl:w-[70%]'>
                        {t('contacy_description')}
                    </p>

                    <div className='mt-12 flex items-center gap-3'>
                        <Mail className='w-4 h-4' />
                        <p className='text-sm'>info@dachaol.uz</p>
                    </div>
                    <div className='flex items-center gap-3 mt-2'>
                        <Phone className='w-4 h-4' />
                        <p className='text-sm'>+998 70 044 44 00</p>
                    </div>
                    <div className='flex items-center gap-3 mt-2'>
                        <Send className='w-4 h-4' />
                        <p className='text-sm'>Telegram</p>
                    </div>
                </div>

                <div>
                    <h1 className='text-4xl font-creteRound mb-2'>{t('contact')}</h1>
                    <div className='flex flex-col space-y-3'>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;