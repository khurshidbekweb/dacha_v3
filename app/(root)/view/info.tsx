'use client';

import React from 'react';
import { ALL_DATA } from '@/query/query-fn';
import MainView from '@/section/view/main-view';

interface PropsView {
    paramsId: string;
}

const Info = ({ paramsId }: PropsView) => {
    const { data: cottage, isLoading, isError } = ALL_DATA.useCottageById(paramsId);


    if (isLoading) return <div>Yuklanmoqda...</div>;
    if (isError || !cottage?.data) return <div>Xatolik yuz berdi</div>;

    return cottage.data && <MainView cottage={cottage.data} />;
};

export default Info;
