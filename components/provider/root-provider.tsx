import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './theme-provider';
import { ChildProps } from '@/types';

const RootLayout = ({ children }: ChildProps) => {
    const queryClient = new QueryClient();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);  // Klientda ekanligimizni belgilaymiz
        if (!safeLocalStorage.getItem("language")) safeLocalStorage.setItem("language", "uz");
    }, []);

    if (!isClient) {
        return null; // serverda bo'lgan paytda hech narsa render qilmaydi
    }
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </div>
    );
};

export default RootLayout;