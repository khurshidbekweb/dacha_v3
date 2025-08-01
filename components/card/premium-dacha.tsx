import { MapPin, Users, DoorOpen, Star, Heart, Crown, Eye, Phone, MoveUpRight } from "lucide-react";
import { CardSwiper } from "@/components/swiper/swiper-card";
import { useLikeStore } from "@/store/like-card";
import { premiumCottage } from "@/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";
interface premiumCottageProps {
    dacha: premiumCottage
}


export function PremiumDachaCard({ dacha }: premiumCottageProps) {
    const { t } = useTranslation()
    const likedCards = useLikeStore(state => state.likedCards);
    const toggleLike = useLikeStore(state => state.toggleLike);
    const isLiked = likedCards.includes(dacha.cottage.id);
    const handleLikeClick = (id: string) => {
        toggleLike(id);

    };
    const view = dacha?.cottage?.events?.filter(event => event.eventType === 'view')


    return (
        <div className="w-[360px] md:w-[320px] overflow-hidden transition-shadow p-1 relative" key={dacha.id}>
            <Link href={`/view/${dacha.cottage.id}`} className="w-full flex flex-col" >
                <div className="w-full pointer-events-none">
                    <CardSwiper dacha={dacha.cottage} />
                </div>

                <div className="card-content">
                    <div className="p-2">
                        <h3 className="font-medium text-lg">{dacha.cottage.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{dacha.cottage.region.name.slice(0, 12)}., {dacha.cottage.place.name}</span>
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

                        <div className="flex justify-between items-end">
                            <div className="flex items-center text-sm text-gray-600">
                                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                <span>{dacha?.cottage?.rating}</span>
                                <span className="mx-1">●</span>
                                <span className="underline">{dacha.cottage.comments.length} {t('reviews')}</span>
                            </div>
                            <div className="flex items-center gap-x-5">
                                <span className="flex items-center gap-x-1 text-[14px]"><Eye size={16} /> {view.length}</span>
                                <span className="flex items-center gap-x-1 text-[14px]"><Phone size={15} /> 30</span>
                            </div>
                        </div>

                    </div>
                    <div className="p-2 pt-0 flex justify-between items-center">
                        <p className="text-lg font-semibold text-primary">{dacha.cottage.price.toLocaleString()} so`m</p>
                        <Button className="p-2 rounded-lg bg-primary">{t('more')} <MoveUpRight /></Button>
                    </div>
                </div>
            </Link>

            <Button onClick={() => handleLikeClick(dacha.id)} variant='link' className='absolute top-3 right-1'>
                <span className='overflow-hidden bg-[#ffffff75] p-[6px] rounded-full' ><Heart className={cn('overflow-hidden text-black/50', isLiked && 'transition-colors fill-amber-400 text-yellow-500 ')} size={35} /></span>
            </Button>
            <div className="absolute top-3 left-3 flex gap-x-2 items-center rounded-full p-1 text-yellow-500 bg-[#ffffff76]">
                <Crown size={20} />
                <p>Premium</p>
            </div>
        </div>
    );
}