'use client'

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TariffUtils } from "@/utils/tariff.utilis";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/constants";
import { useTranslation } from "react-i18next";
import { OrderUtils } from "@/utils/order.utils";
import { QUERY_KEYS } from "@/query/query-key";
import { toast } from "sonner";
import { paymiUtils } from "@/utils/paymi.utils";
import { useRouter } from "next/navigation";
import { Crown } from "lucide-react";

interface Service {
    id: string;
    name: string;
    images: string[];
    serviceCode: string;
}

interface Tariff {
    id: string;
    type: string;
    price: number;
    days: number;
    description: string;
    service_id: string;
    service: Service;
}

interface TariffDrawerProps {
    dachaId: string;
}

const TariffDrawer: React.FC<TariffDrawerProps> = ({ dachaId }) => {
    // serviceCode bo'yicha ajratish
    const { data: tariffData } = useQuery<Tariff[]>({
        queryKey: ['tariff_gets'],
        queryFn: TariffUtils.getTariff
    })
    console.log(tariffData, dachaId);
    const { t } = useTranslation()
    const topTariffs = tariffData?.filter(t => t.service.serviceCode === 'top') || [];
    const recommendedTariffs = tariffData?.filter(t => t.service.serviceCode === 'recommended') || [];
    const queryClient = useQueryClient()
    const backUrl = process.env.NEXT_PUBLIC_PAYME_URL
    const route = useRouter()
    const paymeIntegration = useMutation({
        mutationFn: paymiUtils.orderPaymi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tariff] });
            toast.success(t('success'));
            setTimeout(() => {
                route.push(data.url)
            }, 200)
        },
        onError: (err) => {
            toast.error('Xatolik mavjud');
            console.error(err);
        },
    })
    const addCottage = useMutation({
        mutationFn: OrderUtils.activeOrder,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tariff] });
            paymeIntegration.mutate({
                orderId: data.id,
                url: backUrl!
            })
        },
        onError: (err) => {
            toast.error('Xatolik mavjud');
            console.error(err);
        },
    });

    const handleActivate = (tariffId: string) => {
        addCottage.mutate({
            cottageId: dachaId,
            tariffId: tariffId
        })
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="absolute top-3 right-3 flex gap-x-2 items-center rounded-full">
                    <Crown size={20} />
                    Taklif
                </Button>
            </DrawerTrigger>

            <DrawerContent className="w-full p-4 h-[120vh] md:h-auto ">
                <DialogTitle className="text-xl font-semibold mb-4">Tariflar</DialogTitle>
                <DialogDescription className="absolute top-8 right-5">
                    <DrawerClose asChild>
                        <Button variant="outline">Yopish</Button>
                    </DrawerClose>
                </DialogDescription>

                <Tabs defaultValue="top" className="w-full min-h-[80vh] md:min-h-auto overflow-y-scroll scroll-none">
                    <TabsList className="grid w-full grid-cols-2 h-12">
                        <TabsTrigger value="top" className="text-sm md:text-xl ">Banner uchun</TabsTrigger>
                        <TabsTrigger value="recommended" className="text-sm md:text-xl ">Tavsiya etilgan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="top" className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                        {topTariffs?.length > 0 ? (
                            topTariffs?.map(tariff => (
                                <Card key={tariff.id} className="hover:shadow-lg transition-shadow flex flex-col justify-between">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            {tariff.type.split("\n")[0]}
                                        </CardTitle>
                                        <CardDescription>
                                            {tariff.type.split("\n")[1]}
                                            <div className="text-3xl font-bold mb-4 text-black dark:text-white">
                                                {formatNumber(Number(tariff.price))} {t('currency')}
                                            </div>
                                            <ul className="space-y-2 mb-6 list-disc text-black dark:text-white">
                                                {tariff.description?.split("\n").map((line, index) => (
                                                    <li className="flex line-clamp-1  items-start" key={index}>
                                                        {line}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button className="w-full" onClick={() => handleActivate(tariff.id)} >
                                            Sinab ko`rish
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <p className="text-gray-500">Banner tariflar mavjud emas</p>
                        )}
                    </TabsContent>

                    <TabsContent value="recommended" className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {recommendedTariffs?.length > 0 ? (
                            recommendedTariffs?.map(tariff => (
                                <Card key={tariff.id} className="hover:shadow-lg transition-shadow flex flex-col justify-between">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            {tariff.type.split("\n")[0]}
                                        </CardTitle>
                                        <CardDescription>
                                            {tariff.type.split("\n")[1]}
                                            <div className="text-3xl font-bold mb-4 text-black dark:text-white">
                                                {formatNumber(Number(tariff.price))} {t('currency')}
                                            </div>
                                            <ul className="space-y-2 mb-6 list-disc text-black dark:text-white">
                                                {tariff.description?.split("\n").map((line, index) => (
                                                    <li title={line} className="flex !line-clamp-1 items-start" key={index}>
                                                        {line}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button className="w-full" onClick={() => handleActivate(tariff.id)}>
                                            Sinab ko`rish
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <p className="text-gray-500">Tavsiya etilgan tariflar mavjud emas</p>
                        )}
                    </TabsContent>
                </Tabs>
            </DrawerContent>
        </Drawer>
    );
};

export default TariffDrawer;
