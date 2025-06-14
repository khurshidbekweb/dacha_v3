import { placeUtils } from '@/utils/place.utils';
import { Metadata } from 'next';
import React from 'react';
import ByPlace from '@/app/(root)/place/by-props';



export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata> {
    const place = await placeUtils.getPlaceById(params.id);
    return {
        title: place?.name || 'Dacha ko‘rish',
        description: place?.description || 'Dacha haqida ma’lumot',
        openGraph: {
            title: place?.name || 'DachaOL',
            description: place?.description,
        },
    };
}


const PlaceByCottage = ({
    params,
}: { params: { id: string } }) => {

    return <ByPlace paramsId={params.id} />
};

export default PlaceByCottage;