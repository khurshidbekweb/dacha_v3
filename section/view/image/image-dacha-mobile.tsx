"use client"

import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { cottage } from "@/types"
import Image from "next/image"
import { IMG_BASE_URL } from "@/constants"

interface imageProps {
    images: cottage
}

export function ImageDacha({ images }: imageProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className="mx-auto w-full overflow-hidden md:hidden">
            <Carousel setApi={setApi} className="w-full p-0 relative border">
                <CarouselContent>
                    {images.images?.length && images?.images?.map((img) => (
                        <CarouselItem key={img.id}>
                            <div className="relative w-full h-[260px]">
                                <Image
                                    src={`${IMG_BASE_URL}${img.image}`}
                                    alt={images.name}
                                    className="object-cover"
                                    fill
                                    sizes="(max-widht: 450px) 420px 300px"
                                    priority
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-1" />
                <CarouselNext className="absolute right-1" />
                <div className="absolute right-1 text-white bottom-0 text-center text-[14px]">
                    {current}/{count}
                </div>
            </Carousel>

        </div>
    )
}
