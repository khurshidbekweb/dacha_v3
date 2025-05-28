import * as React from "react"
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from "./corusel-main"

import './css/embla.css'

export function Banner() {
    const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    return (
        <div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
    )
}
