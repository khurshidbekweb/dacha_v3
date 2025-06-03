import { postCottage } from '@/types';
import React from 'react';
interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}


const MainInfo = ({ cottage, setCottage }: infoProps) => {
    return (
        <div>

        </div>
    );
};

export default MainInfo;