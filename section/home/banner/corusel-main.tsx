'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import {
    EmblaCarouselType,
    EmblaEventType,
    EmblaOptionsType
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './corusel-arrow'
import { DotButton, useDotButton } from './corusel-dot'
import Image from 'next/image'
import './css/embla.css'
import { ArrowRightIcon, MapPinIcon } from 'lucide-react'
import { cottageTop } from '@/types'
import { IMG_BASE_URL } from '@/constants'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

const TWEEN_FACTOR_BASE = 0.2

type PropType = {
    slides: cottageTop[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const { t } = useTranslation()
    const autoplay = Autoplay({ delay: 4000, stopOnInteraction: false })

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, ...options },
        [autoplay]
    )

    const tweenFactor = useRef(0)
    const tweenNodes = useRef<HTMLElement[]>([])

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector('.embla__parallax__layer') as HTMLElement
        })
    }, [])

    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
    }, [])

    const tweenParallax = useCallback(
        (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
            const engine = emblaApi.internalEngine()
            const scrollProgress = emblaApi.scrollProgress()
            const slidesInView = emblaApi.slidesInView()
            const isScrollEvent = eventName === 'scroll'

            emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                let diffToTarget = scrollSnap - scrollProgress
                const slidesInSnap = engine.slideRegistry[snapIndex]

                slidesInSnap.forEach((slideIndex) => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex)) return

                    if (engine.options.loop) {
                        engine.slideLooper.loopPoints.forEach((loopItem) => {
                            const target = loopItem.target()

                            if (slideIndex === loopItem.index && target !== 0) {
                                const sign = Math.sign(target)

                                if (sign === -1) {
                                    diffToTarget = scrollSnap - (1 + scrollProgress)
                                }
                                if (sign === 1) {
                                    diffToTarget = scrollSnap + (1 - scrollProgress)
                                }
                            }
                        })
                    }

                    const translate = diffToTarget * (-1 * tweenFactor.current) * 100
                    const tweenNode = tweenNodes.current[slideIndex]
                    tweenNode.style.transform = `translateX(${translate}%)`
                })
            })
        },
        []
    )

    useEffect(() => {
        if (!emblaApi) return

        setTweenNodes(emblaApi)
        setTweenFactor(emblaApi)
        tweenParallax(emblaApi)

        emblaApi
            .on('reInit', setTweenNodes)
            .on('reInit', setTweenFactor)
            .on('reInit', tweenParallax)
            .on('scroll', tweenParallax)
            .on('slideFocus', tweenParallax)
    }, [emblaApi, setTweenFactor, setTweenNodes, tweenParallax])

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides && slides.map((top) => (
                        <div className="embla__slide w-full h-[200px] md:h-[400px]" key={top.id}>
                            <div className="relative group w-full rounded-[20px] h-full overflow-hidden">
                                <div className="overflow-hidden  embla__parallax__layer w-full h-full">
                                    <div className="z-20 info-section hidden md:flex w-[45%] absolute h-full  flex-col justify-center items-center p-6 space-y-3">
                                        <h2 className="text-3xl font-bold text-white">{top.cottage.name}</h2>
                                        <p className="flex items-center text-white/90 text-2xl">
                                            <MapPinIcon className="w-4 h-4 mr-2" />
                                            {top?.cottage?.region.name.slice(0, 12)},
                                            {top?.cottage?.place.name}
                                        </p>
                                        <p className="text-xl font-semibold text-amber-400 flex flex-col">{t('prices')}: {top.cottage.price} {t('currency')}
                                            <span className='text-white text-[12px] text-center'>{t('work_day_price')}</span>
                                        </p>
                                        <Link href={`/view/${top.cottage.id}`} className="details-btn mt-4 w-fit flex items-center bg-amber-500 rounded-xl p-2">
                                            <span>{t('more')}</span>
                                            <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                    <div className="z-20 info-section-mobile flex justify-between md:hidden w-full items-end absolute h-full bottom-0 p-1 px-2">
                                        <h2 className="text-[14px] font-semibold w-[30%] text-start text-white line-clamp-2">{top.cottage.name}</h2>
                                        <div className="flex flex-col justify-end items-start w-[35%]">
                                            <p className="flex items-center text-white/90 line-clamp-1">
                                                <MapPinIcon className="w-4 h-4 mr-2" />
                                                {top?.cottage?.place.name}
                                            </p>
                                            <p className="text-[11px] text-amber-400 line-clamp-1">{t('price')}: {top.cottage.price.toLocaleString()} {t('currency')}</p>
                                        </div>
                                        <Link href={`/view/${top.cottage.id}`} className="details-btn mt-4 w-fit flex items-center bg-green-500 p-1 rounded-lg">
                                            <span className='text-white text-[12px]'>{t('more')}</span>
                                            <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 text-white" />
                                        </Link>
                                    </div>
                                    <div className="absolute right-0 h-full w-full md:w-[65%] z-10">
                                        <Image
                                            className="embla__parallax__img object-cover transition-transform duration-700 group-hover:scale-105"
                                            src={`${IMG_BASE_URL}${top.cottage.images.find((mainIm) => mainIm.isMainImage == true)?.image}`}
                                            alt="Mahsulot rasmi"
                                            fill
                                            quality={100}
                                            sizes="(max-width: 450px) 450px, 250px"
                                            priority
                                        />
                                    </div>
                                    <div className="absolute w-full h-full">
                                        <div className="w-full h-full relative">
                                            <Image
                                                className="embla__parallax__img object-cover transition-transform duration-700 group-hover:scale-105"
                                                src={`${IMG_BASE_URL}${top.cottage.images.find((mainIm) => mainIm.isMainImage == true)?.image}`}
                                                alt="Mahsulot rasmi"
                                                fill
                                                quality={100}
                                                sizes="(max-width: 450px) 450px, 250px"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className=" flex items-center justify-between md:hidden px-2">
                <div className="flex gap-x-1 items-center">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <div className="flex gap-x-1">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`block p-[6px] rounded-full border shadow ${index == selectedIndex ? 'bg-black/55 dark:bg-secondary' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
