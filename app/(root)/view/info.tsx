import { cottage } from '@/types';
import React from 'react';


interface PropsView {
    cottage: cottage[],
    paramsId: string,
    suitableCottage: cottage[]
}

const Info = ({ cottage, paramsId, suitableCottage }: PropsView) => {
    console.log(cottage, paramsId, suitableCottage);

    return (
        <div>

        </div>
    );
};

export default Info;