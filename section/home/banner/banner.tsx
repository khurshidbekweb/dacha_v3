'use client'
import * as React from "react"
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from "./corusel-main"

import './css/embla.css'
import { ALL_DATA } from "@/query/query-fn"

export function Banner() {
    const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
    const cottageTop = ALL_DATA.useCottageTop()?.data || [];
    return (
        <div>
            <EmblaCarousel slides={cottageTop} options={OPTIONS} />
        </div>
    )
}
