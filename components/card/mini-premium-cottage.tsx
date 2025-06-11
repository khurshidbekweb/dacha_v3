import { MapPin, Users, DoorOpen, Star, Heart, Crown } from "lucide-react";
import { useLikeStore } from "@/store/like-card";
import { premiumCottage } from "@/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CardSwiperMini } from "../swiper/mini-swiper-card";
import Link from "next/link";
interface premiumCottageProps {
    dacha: premiumCottage
}


export function MiniPremiumDacha({ dacha }: premiumCottageProps) {
    const likedCards = useLikeStore(state => state.likedCards);
    const toggleLike = useLikeStore(state => state.toggleLike);
    const isLiked = likedCards.includes(dacha.cottage.id);
    const handleLikeClick = (id: string) => {
        toggleLike(id);
    };
    const dachaOnly = dacha.cottage
    return (
        <div className="max-w-[200px] md:w-[320px] overflow-hidden transition-shadow p-0 relative " key={dacha.id}>
            <Link href={`/view/${dacha.id}`} className="flex flex-col w-full">
                <div className="w-full pointer-events-none">
                    <CardSwiperMini dacha={dacha.cottage} />
                </div>

                <div className="p-1">
                    <div className="">
                        <h3 className="font-semibold text-[17px] md:text-lg line-clamp-1">{dachaOnly.name}</h3>
                        <div className="flex items-center text-[13px] md:text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4  mr-1" />
                            <span className="line-clamp-1">{dachaOnly.region.name.slice(0, 13)}., {dachaOnly.place.name}</span>
                        </div>
                    </div>

                    <div className="pt-1">
                        <div className="flex gap-4 text-sm mb-3 text-[13px] md:text-sm">
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1 text-gray-600" />
                                <span>8 kishilik</span>
                            </div>
                            <div className="flex items-center">
                                <DoorOpen className="w-4 h-4 mr-1 text-gray-600" />
                                <span>4 xonalik</span>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center text-sm text-gray-600">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            <span>0</span>
                            <span className="mx-1">●</span>
                            <span>0 Sharhlar</span>
                        </div>
                    </div>
                    <p className="text-lg font-semibold text-primary">{dachaOnly.price.toLocaleString()} so`m</p>
                </div>
            </Link>

            <Button onClick={() => handleLikeClick(dachaOnly.id)} variant='link' className='absolute  top-3 right-1'>
                <span className='overflow-hidden bg-[#ffffff75] p-[6px] rounded-full' ><Heart className={cn('overflow-hidden text-black/50', isLiked && 'transition-colors fill-amber-400 text-yellow-500 ')} size={35} /></span>
            </Button>
            <div className="absolute top-3 left-1 flex md:gap-x-2 items-center rounded-full p-1 text-yellow-500 bg-[#ffffff76]">
                <Crown size={17} />
                <p className="text-[14px] md:text-[18px]">Premium</p>
            </div>
        </div>
    );
}