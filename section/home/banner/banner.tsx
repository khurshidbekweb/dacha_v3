'use client'
import * as React from "react"
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from "./corusel-main"

import './css/embla.css'
import { ALL_DATA } from "@/query/query-fn"
import { SkeletonCardBanner } from "@/components/card/banner-skeleton"

export function Banner() {
    const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
    const { data: cottageTop, isLoading } = ALL_DATA.useCottageTop() || [];
    return (
        <div className="mx-auto">
            {isLoading || !cottageTop?.length ? <>
                <SkeletonCardBanner />
            </> :
                <EmblaCarousel slides={cottageTop} options={OPTIONS} />
            }
        </div>
    )
}
