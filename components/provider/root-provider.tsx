'use client'
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './theme-provider';
import { ChildProps } from '@/types';
import '../../i18n'

const RootLayoutClient = ({ children }: ChildProps) => {
    const queryClient = new QueryClient();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (!safeLocalStorage.getItem("language")) safeLocalStorage.setItem("language", "uz");
    }, []);

    if (!isClient) {
        return children;
    }

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </>
    );
};

export default RootLayoutClient;