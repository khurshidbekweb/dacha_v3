import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './theme-provider';
import { ChildProps } from '@/types';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

const RootLayout = ({ children }: ChildProps) => {
    const queryClient = new QueryClient();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const currentLang = safeLocalStorage.getItem("language") || "uz";
        i18n.changeLanguage(currentLang);
    }, []);

    if (!isClient) {
        return null;
    }
    
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <I18nextProvider i18n={i18n}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </I18nextProvider>
            </QueryClientProvider>
        </div>
    );
};

export default RootLayout;