import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.dachaol.uz",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "mc.yandex.ru",
                port: "",
                pathname: "/**",
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;