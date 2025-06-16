'use client'

import { DachaCard } from '@/components/card/dacha-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ALL_DATA } from '@/query/query-fn';
import { cottage, order, user } from '@/types';
import { HousePlus } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';



type activeView = 'cottage' | 'myservice' | 'service' | 'settings'

interface userProps {
    user: user
}

const DesktopInfo = ({ user }: userProps) => {
    const [active, setActive] = useState<activeView>('cottage')
    const { t } = useTranslation()
    const { data: userCottage } = ALL_DATA.useCottageUser();
    const orders = user?.orders
    return (
        <div className='w-full hidden md:block mt-10'>
            <ul className="flex items-center gap-x-7 border-b py-2">
                <li onClick={() => setActive('cottage')} className={cn('cursor-pointer p-1 px-2', active == 'cottage' && 'text-green-500 text-xl')}>{t("my_announcements")}</li>
                <li onClick={() => setActive('myservice')} className={cn('cursor-pointer p-1 px-2', active == 'myservice' && 'text-green-500 text-xl')}>{t("my_tariff")}</li>
                <li onClick={() => setActive('service')} className={cn('cursor-pointer p-1 px-2', active == 'service' && 'text-green-500 text-xl')}>{t('services')}</li>
                <li onClick={() => setActive('settings')} className={cn('cursor-pointer p-1 px-2', active == 'settings' && 'text-green-500 text-xl')}>{t('settings')}</li>
            </ul>
            {active === 'cottage' &&
                <div>
                    <h2 className='text-xl md:text-2xl font-createRound mt-10'>Mening dachalarim</h2>
                    <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                        {userCottage?.length ? userCottage.map((dacha: cottage) => (
                            <DachaCard key={dacha.id} dacha={dacha} />
                        )) :
                            <div className='border w-[370px] mt-4 border-red-400 p-2 rounded-md mb-20 bg-yellow-200 flex flex-col space-y-3'>
                                <p className="text-black">{t('my_annonim')} </p>
                                <div className="flex gap-3 ">
                                    <Link className='text-blue-500 underline inline-block' href={'/add-new'}>{t("add_announcements")} </Link><HousePlus className='text-blue-500' size={20} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
            {active === 'myservice' &&
                <div>
                    <h2 className='text-xl md:text-2xl font-createRound mt-10'>{t('foydalangan_service')}</h2>
                    {orders?.length ? <Table className='min-w-[540px] md:min-w-[720px] overflow-x-scroll'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Nomi</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders && orders.map((order: order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.cottage.name}</TableCell>
                                    <TableCell> <p className={`${order.status == 'active' ? 'bg-green-400' : 'bg-red-400'} text-white  rounded-md p-2 text-center text-ellipsis capitalize`}>{order.status}</p> </TableCell>
                                    <TableCell>
                                        <p className='text-[14px] font-workSans'>Days: {order.tariff.days} kun</p>
                                        <p className='text-[14px] font-workSans'>Price: {order.tariff.price} so`m</p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className='text-[14px] font-workSans text-green-500'>Boshlanish: {order.createdAt.slice(0, 10)}</p>
                                        <p className='text-[14px] font-workSans text-red-500'>Tugash: {order.expireAt.slice(0, 10)}</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> : <div className="flex mt-2 flex-col items-center justify-center md:flex-row md:items-start flex-wrap md:justify-start gap-4">
                        {/* {services && services.map((ser: services) => (
                            <ServiceCard key={ser.id} {...ser} />
                        ))
                        } */}
                    </div>}
                </div>
            }
            {
                active == 'service' &&
                <div className="">
                    Service
                </div>
            }
            {
                active == 'settings' &&
                <div className="">
                    Settings
                </div>
            }
        </div>
    );
};

export default DesktopInfo;