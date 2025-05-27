import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: 'uz',
    locales: ['uz', 'ru', 'en'],
    localeDetection: true
  }
};

export default nextConfig;