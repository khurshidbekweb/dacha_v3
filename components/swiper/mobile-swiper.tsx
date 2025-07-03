import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { newCottage } from "@/types"
import { DachaCard } from "@/components/card/dacha-card"

interface swiperProps {
    cottages: newCottage[]
}

export function MobileSwiper({ cottages }: swiperProps) {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
            key={`outer-carousel`}
        >
            <CarouselContent
            >
                {cottages?.length && cottages.map((data) => (
                    <CarouselItem key={data.id} className="basis-1/1.2 md:basis-1/3.5 lg:basis-1/4 ">
                        <DachaCard dacha={data} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1 md:left-0" />
            <CarouselNext className="absolute right-1 md:right-0" />
        </Carousel>
    )
}
