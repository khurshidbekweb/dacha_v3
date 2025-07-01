import MainView from '@/section/view/main-view';
import { newCottage } from '@/types';
import React from 'react';


interface PropsView {
    cottage: newCottage
}

const Info = ({ cottage }: PropsView) => {
    return <MainView cottage={cottage} />;
};

export default Info;