'use client'
import { useEffect, useState } from "react";

export const InAppBrowserWarning = () => {
    const [isInAppBrowser, setIsInAppBrowser] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent || '';
        if (ua.includes('Telegram') || ua.includes('FBAN') || ua.includes('Instagram')) {
            setIsInAppBrowser(true);
        }
    }, []);

    if (!isInAppBrowser) return null;

    return (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md text-center my-4">
            📱 Ilovamiz to‘liq ishlashi uchun ushbu sahifani <strong>Chrome yoki Safari</strong> orqali oching.
            <br />
            Telegramdagi ochilgan oynani pastga tushiring va <strong>brauzerda ochish</strong>ni tanlang.
        </div>
    );
};