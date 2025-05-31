import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { IMG_BASE_URL } from '@/constants';
import { cottage } from '@/types';
import { BadgePercent, BedDouble, BedSingle, Clock, DoorOpen, Dot, House, LogIn, MapPin, PhoneOutgoing, Star, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
            <div className="md:flex justify-between items-start w-full mt-10 hidden relative gap-3">
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
                        <div className="grid grid-cols-3 gap-2 mt-5">
                            {cottage.comforts.map(comfort => (
                                <span className="flex gap-x-2 items-center" key={comfort.id}>
                                    <Image width={30} height={30} src={`${IMG_BASE_URL}${comfort.image}`} alt={cottage.name} />
                                    {comfort.name}
                                </span>
                            ))}
                        </div>
                        <Separator className='mt-10' />
                    </div>
                    <div className="rule flex flex-col space-y-2 mt-5">
                        <h3 className='text-3xl font-mediu'>Qoidalar</h3>
                        <div className="border p-3 rounded-lg mt-3">
                            <div className="flex items-center justify-between border-b py-2">
                                <LogIn size={28} strokeWidth={1.75} />
                                <p className='text-xl font-normal'>10:00/19:00</p>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b">
                                <LogIn size={28} strokeWidth={1.75} />
                                <p className='text-xl font-normal'>10:00/19:00</p>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b">
                                <LogIn size={28} strokeWidth={1.75} />
                                <p className='text-xl font-normal'>10:00/19:00</p>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b">
                                <LogIn size={28} strokeWidth={1.75} />
                                <p className='text-xl font-normal'>10:00/19:00</p>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b">
                                <LogIn size={28} strokeWidth={1.75} />
                                <p className='text-xl font-normal'>10:00/19:00</p>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <LogIn size={28} strokeWidth={1.75} />
                                <p className='text-xl font-normal'>10:00/19:00</p>
                            </div>
                        </div>
                    </div>
                    <div className="review mt-5 flex flex-col space-y-2">
                        <h3 className='text-3xl font-mediu'>Mehmonlar sharhlari</h3>
                        <div className="flex flex-col space-y-3">
                            <div className="flex flex-col space-y-2">
                                <div className="user flex gap-x-2 items-center">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shad5cn.png" />
                                        <AvatarFallback>AL</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <p>Alojon</p>
                                        <span className='flex'><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /></span>
                                    </div>
                                </div>
                                <p className='text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure laudantium ea neque eius molestias ab quae minima dolores aliquid inventore minus debitis consequuntur beatae, pariatur distinctio sint excepturi quos fuga?</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div className="user flex gap-x-2 items-center">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <p>Abbos</p>
                                        <span className='flex'><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /><Star className="w-3 h-3 mr-1" /></span>
                                    </div>
                                </div>
                                <p className='text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure laudantium ea neque eius molestias ab quae minima dolores aliquid inventore minus debitis consequuntur beatae, pariatur distinctio sint excepturi quos fuga?</p>
                            </div>
                        </div>
                    </div>
                    <Separator className='mt-10' />
                </div>
                <div className="sticky w-full flex-1 border p-2 top-10 rounded-lg">
                    <h3 className='text-xl font-mediu'>Dacha egasi bilan bog`lanish</h3>
                    <Separator className='mt-5' />
                    <div className="flex flex-col items-start justify-start py-5">
                        <h2 className='text-xl font-semibold mt-2'>Ma`lumotlar</h2>
                        <div className="flex justify-between items-center w-full mt-5">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><House size={18} /> Dacha nomi: </p>
                            <p className='text-[17px] font-medium line-clamp-1'>{cottage.name}</p>
                        </div>
                        <div className="flex justify-between items-center w-full mt-3">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><Clock size={17} /> Kirish vaqti: </p>
                            <p className='line-clamp-1 flex gap-x-1 text-[18px] font-medium'>10:00/19:00</p>
                        </div>
                        <div className="flex justify-between items-center w-full mt-3">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><Clock size={17} /> Chiqish vaqti: </p>
                            <p className='line-clamp-1 flex gap-x-1 text-[18px] font-medium'>09:00/17:00</p>
                        </div>
                        <div className="flex justify-between items-center w-full mt-3">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><MapPin size={17} /> Joylashuv: </p>
                            <p className='line-clamp-1 flex gap-x-1 text-[17px] font-medium'>{cottage.region.name.slice(0, 12)},{cottage.place.name}</p>
                        </div>
                        <div className="flex justify-between items-center w-full mt-3">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><BadgePercent size={17} /> Narxi: </p>
                            <p className='line-clamp-1 flex gap-x-1 text-[18px] font-medium'>{cottage.price.toLocaleString()} sum</p>
                        </div>
                        <div className="flex justify-between items-center w-full mt-3">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><BadgePercent size={17} /> Dam olish kunlari: </p>
                            <p className='line-clamp-1 flex gap-x-1 text-[18px] font-medium'>{cottage.priceWeekend.toLocaleString()} sum</p>
                        </div>

                        <Link className='w-full bg-secondary p-2 rounded-full flex items-center justify-center mt-7 gap-x-3 text-center' href={`tel:+998971082004`}><PhoneOutgoing size={20} /> Qo`ng`iroq qilish </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainInfo;