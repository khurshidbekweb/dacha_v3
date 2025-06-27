'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { IMG_BASE_URL } from '@/constants';
import { newCottage, user } from '@/types';
import { BadgePercent, BedDouble, BedSingle, Clock, DoorOpen, Dot, House, LogIn, LogOut, MapPin, PartyPopper, PawPrint, PhoneOutgoing, Star, UsersRound, VolumeOff, Wine } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import GoogleMap from './google-map';
import { useTranslation } from 'react-i18next';
import { Rating, RatingButton } from '@/components/ui/reating';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratingUtils } from '@/utils/rating.utils';
import { QUERY_KEYS } from '@/query/query-key';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { commitUtils } from '@/utils/commit.utils';


interface mainInfo {
    cottage: newCottage
}

const MainInfo = ({ cottage }: mainInfo) => {
    const { t } = useTranslation()
    const [rating, setRating] = useState(3)
    const [commitText, setCommitText] = useState('')
    const userInfo: user = JSON.parse(safeLocalStorage.getItem('user')!)
    const queryClient = useQueryClient()

    const postRating = useMutation({
        mutationFn: ratingUtils.postRating,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.commit_key] })
        }
    })
    const postCommit = useMutation({
        mutationFn: commitUtils.postComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.commit_key] })
        }
    })

    const handleCommit = () => {
        postRating.mutate({
            cottageId: cottage.id,
            rating,
            userId: userInfo.id
        })
        postCommit.mutate({
            cottageId: cottage.id,
            content: commitText,
            userId: userInfo.id
        })
    }


    const mapLink =
        cottage?.latitude &&
        cottage?.longitude &&
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyCOoxM7bD8Eg8G0lvGlE_xJOo1D5Yj5odY&q=${cottage?.longitude},${cottage?.latitude}&zoom=13`;
    return (
        <>
            <div className="flex flex-col space-y-2 items-start justify-start px-3 md:hidden">
                <h2 className='text-2xl font-medium'>{cottage.name}</h2>
                <p className='text-[16px] font-normal text-gray-500 flex gap-x-1 items-center'><MapPin size={24} strokeWidth={1.75} /> {cottage.region.name}, {cottage.place.name}</p>
                <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <p>3.5</p>
                    <Dot size={28} strokeWidth={1.75} />
                    <span className='text-[16px] underline'>0 {t('reviews')}</span>
                </div>
                <Separator className='my-2' />
            </div>
            <Separator className='mt-10 md:block hidden' />
            <div className="flex justify-between items-start w-full mt-2 md:mt-10 relative gap-3 px-2 md:px-0">
                <div className="flex flex-col space-y-3 w-full md:w-[70%]">
                    <div className="about-cottage flex flex-col space-y-2">
                        <h3 className='text-2xl md:text-3xl font-mediu'>{t('about_cottage')}</h3>
                        <p className='text-base md:text-lg whitespace-pre-wrap break-words'>{cottage.description}</p>
                        <div className="flex flex-col md:flex-row justify-start items-strart space-y-2 md:space-y-0 md:justify-between md:items-center">
                            <span className='flex gap-x-2 items-center text-[16px] md:text-xl'><UsersRound size={22} strokeWidth={1.75} /> {t('guests')}</span>
                            <span className='flex gap-x-2 items-center md:text-xl'><DoorOpen size={22} strokeWidth={1.75} /> {t('bedrooms')}</span>
                            <span className='flex gap-x-2 items-center md:text-xl'><BedSingle size={22} strokeWidth={1.75} /> {t('beds')}</span>
                            <span className='flex gap-x-2 items-center md:text-xl'><BedDouble size={22} strokeWidth={1.75} /> {t('double_bed')}</span>
                        </div>
                        <Separator className='mt-5 md:mt-10' />
                    </div>
                    <div className="comforts">
                        <h3 className='text-2xl md:text-3xl font-mediu'>{t('comforts')}</h3>
                        <div className="grid grid-cols-3 gap-2 mt-5">
                            {cottage.comforts.map(comfort => (
                                <span className="flex gap-x-2 items-center" key={comfort.id}>
                                    <Image className=' ' width={31} height={30} src={`${IMG_BASE_URL}${comfort.image}`} alt={cottage.name} />
                                    <p className='line-clamp-1 text-[16px] md:text-xl font-normal'>{comfort.name}</p>
                                </span>
                            ))}
                        </div>
                        <Separator className='mt-5 md:mt-10' />
                    </div>
                    <div className="rule flex flex-col space-y-2 mt-5">
                        <h3 className='text-2xl md:text-3xl font-mediu'>{t('rule')}</h3>
                        <div className="border p-2 md:p-3 rounded-lg mt-1 md:mt-3">
                            <div className="flex items-center justify-between border-b py-2">
                                <div className="flex gap-x-3 items-center">
                                    <LogIn size={25} strokeWidth={1.75} />
                                    <p className='text-[18px]  text-2xl'>{t('enter')}</p>
                                </div>
                                <p className='text-[15px] md:text-xl font-normal'>10:00/19:00</p>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b">
                                <div className="flex gap-x-3 items-center">
                                    <LogOut size={25} strokeWidth={1.75} />
                                    <p className='text-[18px]   md:text-2xl'>{t('logout')}</p>
                                </div>
                                <p className='text-[15px] md:text-xl font-normal'>09:00/17:00</p>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b">
                                <div className="flex gap-x-3 items-center">
                                    <Wine size={25} strokeWidth={1.75} />
                                    <p className='text-[18px]  text-2xl'>{t('alcahol')}</p>
                                </div>
                                <p className='text-[15px] md:text-xl font-normal'>{t('inPossible')}</p>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b">
                                <div className="flex gap-x-3 items-center">
                                    <PartyPopper size={25} strokeWidth={1.75} />
                                    <p className='text-[18px]  text-2xl'>{t('party')}</p>
                                </div>
                                <p className='text-[15px] md:text-xl font-normal'>{t('possible')}</p>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b">
                                <div className="flex gap-x-3 items-center">
                                    <PawPrint size={25} strokeWidth={1.75} />
                                    <p className='text-[18px]  text-2xl'>{t('pats')}</p>
                                </div>
                                <p className='text-[15px] md:text-xl font-normal'>{t('inPossible')}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex gap-x-3 items-center">
                                    <VolumeOff size={25} strokeWidth={1.75} />
                                    <p className='text-[18px] text-2xl'>{t('vois')}</p>
                                </div>
                                <p className='text-[15px] md:text-xl font-normal'>{t('clock')} 22:00 {t('to')} 07:00 {t('from')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="review mt-5 flex flex-col space-y-2">
                        <h3 className='text-2xl md:text-3xl font-mediu'>{t('guest_reviews')}</h3>
                        <div className="flex flex-col space-y-3">
                            <div className="">
                                <div className="flex justify-between items-center gap-x-2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shad5cn.png" />
                                        <AvatarFallback>AL</AvatarFallback>
                                    </Avatar>
                                    <input onChange={(text) => setCommitText(text.target.value)} type='text' placeholder='Commit add...' className='w-full border-b outline-none' />
                                </div>
                                <div className="flex justify-between items-center mt-4 gap-4">
                                    <div className="flex">
                                        <Rating defaultValue={rating} onValueChange={(value) => setRating(value)}>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <RatingButton key={index} />
                                            ))}
                                        </Rating>
                                    </div>
                                    <button onClick={handleCommit}>Commit</button>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div className="user flex gap-x-2 items-center">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shad5cn.png" />
                                        <AvatarFallback>AL</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <p>Alijon</p>
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
                <div className="sticky w-full flex-1 border p-2 top-10 bottom-5 rounded-lg hidden md:block">
                    <h3 className='text-xl font-mediu'>{t('contact_cottage_owner')}</h3>
                    <Separator className='mt-5' />
                    <div className="flex flex-col items-start justify-start py-5">
                        <h2 className='text-xl font-semibold mt-2'>{t('cottage_info')}</h2>
                        <div className="flex justify-between items-center w-full mt-5">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><House size={18} /> {t('cottage_name')}: </p>
                            <p className='text-[17px] font-medium line-clamp-1'>{cottage.name}</p>
                        </div>
                        <div className="flex justify-between items-center w-full mt-3">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><Clock size={17} /> {t('check_in_time')}: </p>
                            <p className='line-clamp-1 flex gap-x-1 text-[18px] font-medium'>10:00/19:00</p>
                        </div>
                        <div className="flex justify-between items-center w-full mt-3">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><Clock size={17} /> {t('check_out_time')}: </p>
                            <p className='line-clamp-1 flex gap-x-1 text-[18px] font-medium'>09:00/17:00</p>
                        </div>
                        <div className="flex justify-between items-center w-full mt-3">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><MapPin size={17} /> {t('place')}: </p>
                            <p className='line-clamp-1 flex gap-x-1 text-[17px] font-medium'>{cottage.region.name.slice(0, 12)},{cottage.place.name}</p>
                        </div>
                        <div className="flex justify-between items-center w-full mt-3">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><BadgePercent size={17} /> {t('price')}: </p>
                            <p className='line-clamp-1 flex gap-x-1 text-[18px] font-medium'>{cottage.price.toLocaleString()} {t('currency')} </p>
                        </div>
                        <div className="flex justify-between items-center w-full mt-3">
                            <p className='flex items-center gap-x-1 text-[17px] font-medium'><BadgePercent size={17} /> {t('weekend_days')}: </p>
                            <p className='line-clamp-1 flex gap-x-1 text-[18px] font-medium'>{cottage.priceWeekend.toLocaleString()} {t('currency')} </p>
                        </div>

                        <Link className='w-full bg-[#62cf51e7] dark:bg-[#f0a400dc] text-white p-2 py-3 rounded-full flex items-center hover:bg-[#44bd32] dark:hover:bg-[#F0A500] transition-colors justify-center mt-7 gap-x-3 text-center' href={`tel:${cottage?.contactPhone ? cottage?.contactPhone : cottage?.user?.phone}`}><PhoneOutgoing size={20} /> {t('call_now')} </Link>
                    </div>
                </div>
            </div>
            <GoogleMap link={mapLink as string} />
        </>
    );
};

export default MainInfo;