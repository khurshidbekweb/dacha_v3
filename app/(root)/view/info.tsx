import MainView from '@/section/view/main-view';
import { cottage } from '@/types';
import React from 'react';


interface PropsView {
    cottage: cottage,
    paramsId: string,
    suitableCottage: cottage[]
}

const Info = ({ cottage, suitableCottage }: PropsView) => {
    return <MainView cottage={cottage} suitableCottage={suitableCottage} />;
};

export default Info;