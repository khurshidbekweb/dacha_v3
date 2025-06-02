import FovaritePage from '@/section/fovarite/fovarite-page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Fovarite | DachaOL",
    description: "Reginter in this page",
};

const Fovarite = () => {
    return <FovaritePage />
};

export default Fovarite;