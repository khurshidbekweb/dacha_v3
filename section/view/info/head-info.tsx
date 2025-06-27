'use client'

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLikeStore } from '@/store/like-card';
import { newCottage } from '@/types';
import { Dot, Heart, MapPin, MapPinned, MoveLeft, Share2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';


interface headINfo {
    cottage: newCottage
}

const HeadInfo = ({ cottage }: headINfo) => {
    const { t } = useTranslation()
    const likedCards = useLikeStore(state => state.likedCards);
    const toggleLike = useLikeStore(state => state.toggleLike);
    const isLiked = likedCards.includes(cottage.id);
    const handleLikeClick = (id: string) => {
        toggleLike(id);
    }

    const route = useRouter()

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 300) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Component unmount bo‘lganda listenerni olib tashlash
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const copyLinkText = () => {
        navigator.clipboard.writeText(`https://dachaol.uz/view/${cottage.id}`)
        toast.success('Copy link')
    }

    return (
        <>
            <div className='w-full md:flex justify-between items-center mt-10 hidden'>
                <div className="flex flex-col space-y-2 items-start justify-start">
                    <h2 className='text-3xl font-semibold'>{cottage.name}</h2>
                    <p className='text-xl font-medium flex gap-x-1 items-center'><MapPin size={24} strokeWidth={1.75} /> {cottage.region.name}, {cottage.place.name}</p>
                </div>
                <div className="flex flex-col space-y-2 items-start justify-start">
                    <div className="flex gap-x-3 items-center justify-between">
                        <Button onClick={copyLinkText} variant='outline'> <Share2 size={28} strokeWidth={1.75} /></Button>
                        <Button variant='outline'> <MapPinned size={28} strokeWidth={1.75} /> </Button>
                        <Button onClick={() => handleLikeClick(cottage.id)} variant='outline'> <Heart className={cn('overflow-hidden', isLiked && 'transition-colors fill-amber-400 text-yellow-500 ')} size={35} strokeWidth={1.75} /></Button>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <p>3.5</p>
                        <Dot size={28} strokeWidth={1.75} />
                        <span className='text-sm underline'>0 {t('reviews')}</span>
                    </div>
                </div>
            </div>
            <div className={`w-full flex justify-between items-center md:hidden fixed z-2  px-1 ${isScrolled ? 'bg-secondary -mt-1 py-2 transition-all' : "mt-[6px]"}`}>
                <Button onClick={() => route.back()} className='rounded-full p-2 py-5 shadow-lg' variant='outline'><MoveLeft size={28} strokeWidth={1.75} /> </Button>
                <div className="flex gap-x-3 items-center justify-between">
                    <Button className='rounded-full py-5 shadow-lg' onClick={copyLinkText} variant='outline'> <Share2 size={28} strokeWidth={1.75} /></Button>
                    <Button className='rounded-full py-5 shadow-lg' onClick={() => handleLikeClick(cottage.id)} variant='outline'> <Heart className={cn('overflow-hidden', isLiked && 'transition-colors fill-amber-400 text-yellow-500 ')} size={35} strokeWidth={1.75} /></Button>
                </div>
            </div>
        </>
    );
};

export default HeadInfo;