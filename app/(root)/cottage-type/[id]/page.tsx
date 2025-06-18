import { Metadata } from 'next';
import React from 'react';
import TypeCottage from '../type-cottage';

export const metadata: Metadata = {
    title: "Place | DachaOL",
    description: "Reginter in this page",
};



const CottageType = ({
    params,
}: { params: { id: string } }) => {
    return <TypeCottage paramsId={params.id} />
};

export default CottageType;