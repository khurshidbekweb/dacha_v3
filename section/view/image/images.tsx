'use client'

import React, { useState } from 'react';
import { ImageDacha } from './image-dacha-mobile';
import ImageDachaDes from './image-dacha-des';
import { cottage } from '@/types';
import AllImage from './sheet-image';

interface imageProps {
    cottage: cottage
}

const DachaImages = ({ cottage }: imageProps) => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <ImageDacha onOpenSheet={() => setOpen(true)} images={cottage} />
            <ImageDachaDes onOpenSheet={() => setOpen(true)} images={cottage} />
            <AllImage isOpen={open} onClose={() => setOpen(false)} cottage={cottage} />
        </div>
    );
};

export default DachaImages;