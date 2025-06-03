import { postCottage } from '@/types';
import React from 'react';

interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}


const PriceRuleComforts = ({ cottage, setCottage }: infoProps) => {
    return (
        <div>
            Price
            rule
            comforts
        </div>
    );
};

export default PriceRuleComforts;