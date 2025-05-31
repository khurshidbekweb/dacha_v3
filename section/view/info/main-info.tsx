import { Separator } from '@/components/ui/separator';
import { cottage } from '@/types';
import { BedDouble, BedSingle, DoorOpen, Dot, MapPin, Star, UsersRound } from 'lucide-react';
import React from 'react';


interface mainInfo {
    cottage: cottage
}

const MainInfo = ({ cottage }: mainInfo) => {
    return (
        <>
            <div className="flex flex-col space-y-2 items-start justify-start px-3 md:hidden">
                <h2 className='text-2xl font-medium'>{cottage.name}</h2>
                <p className='text-[16px] font-normal text-gray-500 flex gap-x-1 items-center'><MapPin size={24} strokeWidth={1.75} /> {cottage.region.name}, {cottage.place.name}</p>
                <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <p>3.5</p>
                    <Dot size={28} strokeWidth={1.75} />
                    <span className='text-[16px] underline'>0 Sharhlar</span>
                </div>
                <Separator className='my-2' />
            </div>
            <Separator className='mt-10' />
            <div className="md:flex justify-between items-start w-full mt-10 hidden">
                <div className="flex flex-col space-y-3 w-[70%] ">
                    <div className="about-cottage flex flex-col space-y-2">
                        <h3 className='text-3xl font-mediu'>Dacha haqida</h3>
                        <p>{cottage.description}</p>
                        <div className="flex justify-between items-center">
                            <span className='flex gap-x-2 items-center text-xl'><UsersRound size={28} strokeWidth={1.75} /> Mehmonlar</span>
                            <span className='flex gap-x-2 items-center text-xl'><DoorOpen size={28} strokeWidth={1.75} /> Yotoq xonalar</span>
                            <span className='flex gap-x-2 items-center text-xl'><BedSingle size={28} strokeWidth={1.75} /> Yotoqlar</span>
                            <span className='flex gap-x-2 items-center text-xl'><BedDouble size={28} strokeWidth={1.75} /> 2 o`rinli yotoqlar</span>
                        </div>
                        <Separator className='mt-10' />
                    </div>
                    <div className="comforts">
                        <h3 className='text-3xl font-mediu'>Qulayliklar</h3>
                        <div className="grid grid-cols-3">
                            <div className=""></div>
                        </div>
                    </div>
                </div>
                <div className="sticky w-full flex-1">
                    aaaa
                </div>
            </div>
        </>
    );
};

export default MainInfo;