import CottagePage from '@/section/cottage/cottage-page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Dacha | DachaOL",
    description: "Reginter in this page",
};

const Cottage = () => {
    return <CottagePage />
};

export default Cottage;