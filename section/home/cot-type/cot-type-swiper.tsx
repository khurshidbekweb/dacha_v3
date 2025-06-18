import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cottageType } from "@/types"
import Image from "next/image"
import { IMG_BASE_URL } from "@/constants"
import Link from "next/link"

interface placeProps {
    cottageType: cottageType[]
}

export function CottageTypeSwiper({ cottageType }: placeProps) {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {cottageType?.length && cottageType.map((place) => (
                    <CarouselItem key={place.id} className="basis-1/2.5 md:basis-1/3.5 lg:basis-1/4">
                        <Link href={`/cottage-type/${place.id}`} className="w-[170px] h-[80px] md:w-[220px] block md:h-[110px] xl:w-[350px] xl:h-[145px] relative rounded-lg overflow-hidden">
                            <Image
                                sizes="(max-width: 250px) 1500px, 190px"
                                fill
                                priority
                                src={`${IMG_BASE_URL}${place.image}`}
                                alt={place.name}
                                className="object-cover"
                            />
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1 md:left-0" />
            <CarouselNext className="absolute right-1 md:right-0" />
        </Carousel>
    )
}
