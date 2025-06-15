import ContactPage from '@/section/contact/contact-page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Contact | DachaOL",
    description: "Reginter in this page",
};


const Contact = () => {
    return <ContactPage />
};

export default Contact;