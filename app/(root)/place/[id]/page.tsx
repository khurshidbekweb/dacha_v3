
import React from 'react';
import ByPlace from '@/app/(root)/place/by-props';
import { Metadata } from 'next';



export const metadata: Metadata = {
    title: "Place | DachaOL",
    description: "Reginter in this page",
};



const PlaceByCottage = ({
    params,
}: { params: { id: string } }) => {

    return <ByPlace paramsId={params.id} />
};

export default PlaceByCottage;