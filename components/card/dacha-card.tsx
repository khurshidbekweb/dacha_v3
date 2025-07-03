import { MapPin, Users, DoorOpen, Star, Heart } from "lucide-react";
import { CardSwiper } from "@/components/swiper/swiper-card";
import { useLikeStore } from "@/store/like-card";
import { newCottage } from "@/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface DachaProps {
    dacha: newCottage
}

export function DachaCard({ dacha }: DachaProps) {
    const { t } = useTranslation()
    const likedCards = useLikeStore(state => state.likedCards);
    const toggleLike = useLikeStore(state => state.toggleLike);
    const isLiked = likedCards.includes(dacha.id);
    const handleLikeClick = (id: string) => {
        toggleLike(id);
    }

    return (
        <div className="w-[350px]  md:max-w-[320px] overflow-hidden transition-shadow p-1 relative " key={dacha.id}>
            <Link href={`/view/${dacha.id}`} className="w-full flex flex-col">
                <div className="w-full pointer-events-none">
                    <CardSwiper dacha={dacha} />
                </div>

                <div className="card-content p-2">
                    <div className="p-2" id="swip-card">
                        <h3 className="font-medium text-lg line-clamp-1">{dacha.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{dacha.region.name}., {dacha.place.name}</span>
                        </div>
                    </div>

                    <div className="p-2 pt-0">
                        <div className="flex gap-4 text-sm mb-3">
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1 text-gray-600" />
                                <span>8 {t('guest_capacity')}</span>
                            </div>
                            <div className="flex items-center">
                                <DoorOpen className="w-4 h-4 mr-1 text-gray-600" />
                                <span>4 {t('room_count')}</span>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center text-sm text-gray-600">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            <span>{dacha?.rating}</span>
                            <span className="mx-1">●</span>
                            <span className="underline">{dacha.comments.length} {t('reviews')}</span>
                        </div>
                    </div>

                    <div className="p-2 pt-0">
                        {dacha.cottageType[0].id === 'c4c301b1-4719-499e-bde2-2c36715fae9e' ?
                            <p className="text-lg font-semibold text-primary">{dacha.price.toLocaleString()} so`m</p>
                            :
                            <p className="w-full py-2 text-xl font-semibold text-center bg-primary text-white dark:bg-amber-500 rounded-lg">{dacha.cottageType[0].name}</p>}
                    </div>
                </div>
            </Link>

            <Button onClick={() => handleLikeClick(dacha.id)} variant='link' className='absolute  top-2 right-0'>
                <span className='overflow-hidden bg-[#ffffff75] p-[6px] rounded-full' ><Heart className={cn('overflow-hidden text-black/50', isLiked && 'transition-colors fill-amber-400 text-yellow-500 ')} size={35} /></span>
            </Button>
        </div>
    );
}