'use client'

import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"
import { cottage, } from "@/types"
import { IMG_BASE_URL } from "@/constants"


interface swiperImage {
    dacha: cottage
}

export function CardSwiper({ dacha }: swiperImage) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])
    const handlePointerDown = (e: React.PointerEvent) => {
        e.stopPropagation()
    }

    const windowSize = 5; // 3 yoki 5 nuqta ko'rsatish
    const halfWindow = Math.floor(windowSize / 2);

    // Pagination dots
    const renderDots = () => (
        <div className="flex justify-center mt-2 gap-2 absolute bottom-2 left-1/2 transform -translate-x-1/2">
            {Array.from({ length: count }).map((_, index) => {
                const isVisible =
                    index >= current - halfWindow && index <= current + halfWindow;
                const isActive = index === current;
                return (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`
              transition-all duration-300
              rounded-full
              ${isActive ? 'bg-blue-600 w-3 h-2' : 'bg-gray-400 w-2 h-2 opacity-50'}
              ${isVisible ? 'scale-100' : 'scale-0'}
            `}
                    />
                );
            })}
        </div>
    )

    return (
        <div className="mx-auto">
            <Carousel
                setApi={setApi}
                className="w-full relative border rounded-4xl overflow-hidden"
                id={`inner-carousel-${dacha.id}`}
                key={`inner-carousel-${dacha.id}`}
                onPointerDownCapture={handlePointerDown}
            >
                <CarouselContent className="[&>.embla__viewport]:pointer-events-none [&>.embla__viewport>*>*]:pointer-events-auto">
                    {dacha?.images?.length && dacha?.images.map((img, index) => (
                        <CarouselItem key={index}>
                            <div className="relative w-full h-[250px]">
                                <Image priority src={`${IMG_BASE_URL}${img.image}`} alt={dacha.name} fill sizes="(max-width: 320px) 300px 280px" className="object-cover" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                {renderDots()}
            </Carousel>

        </div>
    )
}
