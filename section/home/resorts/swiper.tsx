import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { place } from "@/types"
import Image from "next/image"
import { IMG_BASE_URL } from "@/constants"

interface placeProps {
    places: place[]
}

export function ResortsSwiper({ places }: placeProps) {

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {places?.length && places.map((place) => (
                    <CarouselItem key={place.id} className="basis-1/3 md:basis-1/4 lg:basis-1/6 ">
                        <div className="w-[115px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[200px] xl:h-[195px] rounded-full overflow-hidden relative">
                            <div className="relative w-full h-full">
                                <Image
                                    sizes="(max-width: 80px) 80px, 90px"
                                    fill
                                    priority
                                    src={`${IMG_BASE_URL}${place.image}`}
                                    alt={place.name}
                                    className="object-cover"
                                />

                            </div>
                            <div className="absolute bg-black/80 text-white bottom-0 w-full overflow-hidden text-center pb-[9px] font-semibold md:pb-5 md:text-2xl md:font-bold line-clamp-1">
                                {place.name}
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1" />
            <CarouselNext className="absolute right-1" />
        </Carousel>
    )
}
