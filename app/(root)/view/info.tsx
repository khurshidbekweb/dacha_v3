import MainView from '@/section/view/main-view';
import { cottage } from '@/types';
import React from 'react';


interface PropsView {
    cottage: cottage,
    paramsId: string,
}

const Info = ({ cottage }: PropsView) => {
    
    return <MainView cottage={cottage}  />;
};

export default Info;