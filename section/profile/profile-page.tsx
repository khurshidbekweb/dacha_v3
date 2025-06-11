'use client'

import MobileNov from '@/app/(root)/_components/mobile-nov';
import { IMG_BASE_URL } from '@/constants';
import { ALL_DATA } from '@/query/query-fn';
import { QUERY_KEYS } from '@/query/query-key';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { userUtils } from '@/utils/user.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import userAvatar from '@/public/image/user-avater.png'
import { RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/app/(root)/_components/navbar';
import DesktopInfo from './desktop-info';
import BreadCrumbs from '@/components/share/bredcrambs';
import MobileProfile from './mobile-profile';


const ProfilePage = () => {
    const { t } = useTranslation()
    const userData = ALL_DATA.useSingleUser();
    const user = JSON.parse(safeLocalStorage.getItem("user")!);
    const userImg = userData?.data?.image || null;
    const [name, setName] = useState(user?.name)
    const [changeData, setChangeData] = useState(true)
    const queryClinet = useQueryClient()
    const { data: services } = ALL_DATA.useServices();

    console.log(services);

    const userEdit = useMutation({
        mutationFn: userUtils.editUser,
        onSuccess: async () => {
            queryClinet.invalidateQueries({ queryKey: [QUERY_KEYS.users] })
            toast.success('Success');
            localStorage.setItem("user", JSON.stringify(userData?.data));
        },
        onError: (err) => {
            console.log(err, 'aaaa');
        }
    });

    const handleUser = () => {
        userEdit.mutate({
            id: user?.id,
            name: name,
            image: userImg,
        });
    };

    const handleIsMianImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (!e.target.files) return;

        userEdit.mutate({
            id: user?.id,
            image: e.target.files[0],
            name: name ? name : ''
        });
    };
    return (
        <>
            <Navbar />
            <BreadCrumbs data={[{ slug: '/', title: t('home') }]} page={t('profile')} />
            <div className='mt-10 max-w-[1540px] mx-auto md:px-10 xl:px-16 mb-24 md:mb-0'>
                <div className="md:w-[50%] md:justify-center flex flex-col space-y-3 items-center md:flex-row gap-2 md:gap-x-14 md:items-start">
                    <div className="!w-[120px] !h-[120px] relative flex items-center justify-center">
                        <Image
                            className={"!w-[130px] flex justify-center items-center h-[120px] relative border border-separate rounded-full overflow-hidden"}
                            src={userImg ? `${IMG_BASE_URL}${userImg}` : userAvatar}
                            alt="useImg"
                            sizes="120px"
                            width={120}
                            height={120}
                        />
                        <label className="absolute right-0 bottom-0 rounded-full z-20 p-[2px] cursor-pointer">
                            <input
                                onChange={(e) => handleIsMianImage(e)}
                                type="file"
                                accept="image/*"
                                name="userImage"
                                className="w-1 h-1 opacity-0 absolute curson-pointer"
                            />
                            <RefreshCw />
                        </label>
                    </div>
                    <div className="p-1 w-full md:flex-1 space-y-3">
                        <Input type='text' onChange={(e) => {
                            setName(e.target.value)
                            setChangeData(false)
                        }}
                            placeholder={`${t('form_name')}`} className='' defaultValue={user?.name ? user.name : ""} />
                        <Input type='tel' placeholder='Phone' className='' defaultValue={"+998" + user?.phone} disabled />
                        <Button disabled={changeData} onClick={handleUser} type='button' className='flex items-start w-[150px] hover:bg-green-700 bg-green-600 text-white'>{t('save')}</Button>
                    </div>
                </div>
                <DesktopInfo user={user} />
                <MobileProfile />
            </div>
            <MobileNov />
        </>
    );
};

export default ProfilePage;