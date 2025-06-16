import { MapPin, Users, DoorOpen, Star, } from "lucide-react";
import { CardSwiper } from "@/components/swiper/swiper-card";
import { cottage } from "@/types";
import Link from "next/link";
import CottageEdit from "@/section/profile/dacha-edit";

interface DachaProps {
    dacha: cottage
}

export function UserDachaCard({ dacha }: DachaProps) {


    return (
        <div className="max-w-[350px]  md:max-w-[320px] overflow-hidden transition-shadow p-1 relative " key={dacha.id}>
            <div className="">
                <Link href={`/view/${dacha.id}`} className="w-full pointer-events-none">
                    <CardSwiper dacha={dacha} />
                </Link>

                <div className="card-content p-2 relative">
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

                    <div className="p-2 pt-0">
                        {dacha.cottageType[0].id === 'c4c301b1-4719-499e-bde2-2c36715fae9e' ?
                            <p className="text-lg font-semibold text-primary">{dacha.price.toLocaleString()} so`m</p>
                            :
                            <p className="w-full py-2 text-xl font-semibold text-center bg-primary text-white dark:bg-amber-500 rounded-lg">{dacha.cottageType[0].name}</p>}
                    </div>
                </div>
                <CottageEdit cottage={dacha} />
            </div>

        </div>
    );
}