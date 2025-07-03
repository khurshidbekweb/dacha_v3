'use client'

import { ALL_DATA } from '@/query/query-fn';
import MainView from '@/section/view/main-view';
import React from 'react';


interface PropsView {
    paramsId: string
}

const Info = ({ paramsId }: PropsView) => {

    const { data: cottage, isLoading, isError } = ALL_DATA.useCottageById(paramsId)
    if (isLoading) return <div>Yuklanmoqda...</div>;
    if (isError || !cottage) return <div>Xatolik yuz berdi</div>;
    console.log(cottage);

    return (
        <MainView cottage={cottage?.data} />
    );
};

export default Info;