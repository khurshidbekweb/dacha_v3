'use client'
import { Badge } from '@/components/ui/badge';
import { useLikeStore } from '@/store/like-card';
import { Heart, Home, Plus, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const MobileNov = () => {
    const pathname = usePathname()
    const likeNumber = useLikeStore(state => state.likedCards)
    return (
        <div className='w-full fixed bottom-0 left-0 flex md:hidden justify-between items-center bg-secondary pt-3 pb-5  px-3 rounded-t-3xl'>
            <Link href={'/'} className={`flex flex-col items-center justify-center ${pathname === '/' ? 'text-[#008F8C]' : ''}`}>
                <Home size={30} />
                <p className={`text-[11px] ${pathname === '/' ? 'block' : 'hidden'}`}>Home</p>
            </Link>
            <Link href={'/fovarite'} className={`flex flex-col items-center justify-center relative ${pathname === '/fovarite' ? 'text-[#008F8C]' : ''}`}>
                <Heart size={30} />
                <p className={`text-[11px] ${pathname === '/fovarite' ? 'block' : 'hidden'}`}>Fovarite</p>
                {likeNumber?.length ? <Badge className='absolute -top-2 text-sm text-white -right-2 px-[6px] py-0 bg-red-400 '>{likeNumber?.length}</Badge> : ''}
            </Link>
            <Link href={'/add-new'} className={`flex flex-col items-center justify-center  ${pathname === '/add-new' ? 'text-[#008F8C]' : ''}`}>
                <Plus size={30} />
                <p className={`text-[11px] ${pathname === '/add-new' ? 'block' : 'hidden'}`}>Add New</p>
            </Link>
            <Link href={'/profile'} className={`flex flex-col items-center justify-center ${pathname === '/profile' ? 'text-[#008F8C]' : ''}`}>
                <UserRound size={30} />
                <p className={`text-[11px] ${pathname === '/profile' ? 'block' : 'hidden'}`}>Profile</p>
            </Link>
        </div>
    );
};

export default MobileNov;