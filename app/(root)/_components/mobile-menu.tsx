'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { navLink } from "@/constants";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react';
import { useTranslation } from "react-i18next";

const MobileMenu = () => {
    const pathname = usePathname()
    const { t } = useTranslation()
    return (
        <Sheet>
            <SheetTrigger className="md:hidden">
                <Menu size={30} />
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
                <SheetHeader className="text-left p-6 border-b">
                    <SheetTitle className="text-2xl font-bold">
                        DachaOL
                    </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col p-4 space-y-2">
                    {navLink.map((link) => {
                        const Icon = link.icon
                        return (
                            <Link
                                key={link.id}
                                href={link.path}
                                className={`hover:bg-[#44bd32] px-4 py-3 dark:hover:bg-[#F0A500] hover:text-white flex items-center gap-x-2 rounded-md transition-colors ${pathname == link.path ? 'bg-color px-2 p-1 rounded-md text-white' : ''}`}
                            >
                                <Icon size={25} />
                                <span className="font-medium">{t(`${link.name}`)}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
                    <SheetDescription className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Your Company
                    </SheetDescription>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;  