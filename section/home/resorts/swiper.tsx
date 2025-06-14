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
import Link from "next/link"

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
                    <CarouselItem key={place.id} className="basis-1/4 md:basis-1/5 lg:basis-1/7">
                        <Link href={`/place/${place.id}`} className="w-[90px] h-[89px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[145px] rounded-full relative block">
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                    sizes="(max-width: 80px) 80px, 90px"
                                    fill
                                    priority
                                    src={`${IMG_BASE_URL}${place.image}`}
                                    alt={place.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="absolute bg-[var(--background)] bottom-[-2px] text-[14px] w-full overflow-hidden text-center pb-[5px] font-semibold md:pb-3 md:text-xl md:font-bold line-clamp-1">
                                {place.name}
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1 md:left-0" />
            <CarouselNext className="absolute right-1 md:right-0" />
        </Carousel>
    )
}
