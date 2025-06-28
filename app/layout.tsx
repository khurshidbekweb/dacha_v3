import type { Metadata } from "next";
import { Geist, Geist_Mono, } from "next/font/google";
import "./globals.css";
import { ChildProps } from "@/types";
import RootLayoutClient from "@/components/provider/root-provider";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import { InAppBrowserWarning } from "@/components/share/isTelegram";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DachaOL",
  description: "Dacha Ol — bu Toshkent va O‘zbekiston bo‘ylab dacha sotib olish, sotish va ijaraga berish uchun qulay platforma. Siz uchun mos va arzon dacha e’lonlarini toping, dam olish yoki yashash uchun ideal joyni tanlang.",
  keywords: [
    "dacha",
    "dacha sotib olish",
    "dacha ijarasi",
    "Toshkent dacha",
    "O‘zbekistonda dacha",
    "arzon dacha",
    "sotiladigan dacha",
    "dam olish uchun dacha",
    "hovli uy",
    "dacha e’lonlari",
    "dacha Ol",
    "dacha topish",
    "дача",
    "купить дачу",
    "аренда дачи",
    "дачи Ташкент",
    "дачи в Узбекистане",
    "дача недорого",
    "продажа дач",
    "дача с участком",
    "загородный дом",
    "снять дачу",
    "лучшие дачи",
    "Dacha Ol"
  ],
  authors: [{ name: 'Khurshidbek Nuriddinov', url: 'https://khurshid-dev.uz' }],
  creator: 'Khurshidbek Nuriddinov',
  openGraph: {
    title: 'Khurshidbek Nuriddinov | Frontend Developer',
    description: 'Experienced React/Next.js developer. See my projects, skills, and contact details.',
    url: 'https://dachaol.uz/',
    siteName: 'Dacha OL',
    images: [
      {
        url: 'https://i.ibb.co/Z6FXdLg5/Dacha-OL-uz.png', // Shaxsiy preview rasmingiz bo‘lsa shuni qo‘ying
        width: 1200,
        height: 630,
        alt: 'Dachalar',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khurshidbek Nuriddinov | Frontend Developer',
    description: 'Portfolio of Khurshidbek – React & Next.js Developer.',
    images: ['https://i.ibb.co/Z6FXdLg5/Dacha-OL-uz.png'],
    creator: '@NuriddinovKhurshidbek',
  },
  metadataBase: new URL('https://dachaol.uz/'),
};

export default function RootLayout({ children }: ChildProps) {


  return (
    <html lang='en' suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(102649558, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
              });
            `
          }}
        />
      </head>
      <body cz-shortcut-listen="true"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootLayoutClient>
          <NextTopLoader showSpinner={false} />
          {children}
          <Toaster position="top-center" />
          <InAppBrowserWarning />
        </RootLayoutClient>
        <noscript>
          <div>
            <Image src="https://mc.yandex.ru/watch/102649558"
              style={{ position: 'absolute', left: '-9999px' }}
              alt="yandex metirka"
              width={250}
              height={150}
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}

