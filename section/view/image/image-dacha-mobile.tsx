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
import { newCottage } from "@/types"
import Image from "next/image"
import { IMG_BASE_URL } from "@/constants"

interface imageProps {
    images: newCottage,
    onOpenSheet: () => void
}

export function ImageDacha({ images, onOpenSheet }: imageProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(images?.images?.length)

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
                            <div className="relative w-full h-[260px]" onClick={onOpenSheet}>
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
                <div className="absolute right-2 text-white bottom-1 text-center text-[16px]">
                    {current}/{count}
                </div>
            </Carousel>

        </div>
    )
}
