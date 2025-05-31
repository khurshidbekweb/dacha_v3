import React from 'react';
import { cottage } from '@/types';
import Navbar from '@/app/(root)/_components/navbar';
import DachaImages from './image/images';


interface dachaView {
    cottage: cottage,
    suitableCottage: cottage[]
}

const MainView = ({ cottage, suitableCottage }: dachaView) => {
    console.log(suitableCottage);

    return (
        <>
            <Navbar />
            <div className='max-w-[1540px] mx-auto md:px-10 xl:px-32'>
                <DachaImages cottage={cottage} />
            </div>
        </>
    );
};

export default MainView;