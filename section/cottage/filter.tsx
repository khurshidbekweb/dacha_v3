'use client'

import React, { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Slider } from '@/components/ui/slider';
import { ReusableToggleGroup } from '@/components/share/toggle-item';
import { ToggleGroupItem } from '@/components/ui/toggle-group';
import { ALL_DATA } from '@/query/query-fn';
import Image from 'next/image';
import { IMG_BASE_URL } from '@/constants';
import { ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Filter = () => {
    const [selected, setSelected] = useState<string[]>([])
    const { data: comforts } = ALL_DATA?.useComforts()

    const { data: placeData } = ALL_DATA.usePlace()

    return (
        <div className='w-full'>
            <h4 className='text-xl font-bold flex gap-x-3 items-center'>Filter <ListFilter /></h4>
            <Accordion
                type="single"
                collapsible
                className="w-[350px]"
                defaultValue="item-1"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger>Narx bo`yicha</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance w-full">
                        <div className="w-full flex flex-col items-center  gap-6 p-4">
                            <div className="flex justify-between text-sm w-full">
                                <span>500 ming so`m</span>
                                <span>10 mln so`m</span>
                            </div>

                            <Slider
                                defaultValue={[5]}
                                min={500}
                                max={12000}
                                step={1}
                                className="w-full"
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Qulaylik bo`yicha</AccordionTrigger>
                    <AccordionContent className="text-balance p-2 w-full">
                        <ReusableToggleGroup value={selected} onValueChange={setSelected} className='grid grid-cols-3 gap-2'>
                            {comforts?.slice(0, 9)?.map(com => (
                                <ToggleGroupItem key={com.id} value={com.id} className='p-2 border rounded-sm' aria-label="Toggle bold">
                                    <Image width={30} height={50} src={`${IMG_BASE_URL}${com.image}`} alt='Comfort images' />
                                    <span className='line-clamp-1 text-[12px]'>{com.name}</span>
                                </ToggleGroupItem>
                            ))}
                        </ReusableToggleGroup>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Maskan bo`yicha</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance w-full">
                        <ReusableToggleGroup value={selected} onValueChange={setSelected} className='grid grid-cols-3 gap-2'>
                            {placeData?.slice(0, 9)?.map(com => (
                                <ToggleGroupItem key={com.id} value={com.id} className='p-2 border rounded-sm' aria-label="Toggle bold">
                                    <span className='line-clamp-1 text-[14px]'>{com.name}</span>
                                </ToggleGroupItem>
                            ))}
                        </ReusableToggleGroup>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


            <Button className='w-full  mt-10'>Qidiruv </Button>
        </div>
    );
};

export default Filter;