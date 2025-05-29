import { MapPin, Users, DoorOpen, Star, Heart, Crown } from "lucide-react";
import { CardSwiper } from "@/section/home/top-cottage/swiper-card";
import { useLikeStore } from "@/store/like-card";
import { premiumCottage } from "@/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
interface premiumCottageProps {
    dacha: premiumCottage
}


export function PremiumDachaCard({ dacha }: premiumCottageProps) {
    const likedCards = useLikeStore(state => state.likedCards);
    const toggleLike = useLikeStore(state => state.toggleLike);
    const isLiked = likedCards.includes(dacha.id);
    const handleLikeClick = (id: string) => {
        toggleLike(id);
    };
    console.log(dacha.cottage.id);

    return (
        <div className="w-[350px] md:w-[320px] overflow-hidden transition-shadow p-0 relative" key={dacha.id}>
            <CardSwiper />

            <div className="p-2">
                <h3 className="font-medium text-lg">Oilaviy Dala Hovli, Xo`jakent</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Toshkent v., Bo`stonlid t., Ho`jakent</span>
                </div>
            </div>

            <div className="p-2 pt-0">
                <div className="flex gap-4 text-sm mb-3">
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-gray-600" />
                        <span>8 kishilik</span>
                    </div>
                    <div className="flex items-center">
                        <DoorOpen className="w-4 h-4 mr-1 text-gray-600" />
                        <span>4 xonalik</span>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>0</span>
                    <span className="mx-1">●</span>
                    <span>0 Sharhlar</span>
                </div>
            </div>

            <div className="p-2 pt-0">
                <p className="text-lg font-semibold text-primary">1 500 000 so`m</p>
            </div>
            <Button onClick={() => handleLikeClick(dacha.id)} variant='link' className='absolute  top-2 right-0'>
                <span className='overflow-hidden bg-[#ffffff75] p-[6px] rounded-full' ><Heart className={cn('overflow-hidden text-black/50', isLiked && 'transition-colors fill-amber-400 text-yellow-500 ')} size={35} /></span>
            </Button>
            <div className="absolute top-2 left-2 flex gap-x-2 items-center rounded-full p-1 text-yellow-500 bg-[#ffffff76]">
                <Crown size={20} />
                <p>Premium</p>
            </div>
        </div>
    );
}