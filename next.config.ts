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
        ],
    },
};

export default nextConfig;