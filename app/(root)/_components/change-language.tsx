'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { language } from "@/types";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { safeLocalStorage } from '@/utils/safeLocalstorge'
import { useTranslation } from "react-i18next";
import { ALL_DATA } from "@/query/query-fn";
import { IMG_BASE_URL } from "@/constants";
import useLanguageStore from "@/store/language-store";
import uzb from '@/public/image/uzb.png'

const ChangeLanguage = () => {
    const { i18n } = useTranslation()
    const languages: language[] = ALL_DATA?.useLanguage()?.data || []
    const activeLang = languages && languages?.find((lang: language) => lang.code == safeLocalStorage.getItem('language'))

    const { setLanguage } = useLanguageStore()
    const queryClient = useQueryClient();

    const toggleLanguage = (code: string) => {
        safeLocalStorage.setItem("language", code);
        setLanguage(code);
        i18n.changeLanguage(code)
        queryClient.invalidateQueries({ type: "all" });
    };

    return (
        <div className="block">
            <DropdownMenu>
                <DropdownMenuTrigger type="button" className="outline-none flex items-center justify-center">
                    <div className="relative w-[33px] h-[28px] md:w-[38px] md:h-[35px] ">
                        <Image
                            sizes="(max-width: 48px) 30px, 40px"
                            src={activeLang?.image ? `${IMG_BASE_URL}${activeLang?.image}` : uzb}
                            alt="language"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {
                        languages && languages.map((lang: language) => (
                            <DropdownMenuItem key={lang.id}>
                                <Button className="flex items-center gap-2 p-0" onClick={() => toggleLanguage(lang.code)} variant={'ghost'} type="button">
                                    <Image src={`${IMG_BASE_URL}${lang.image}`} alt={lang.title} width={35} height={40} />
                                    <p>{lang?.title}</p>
                                </Button>
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ChangeLanguage;