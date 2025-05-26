import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

interface LoginAuthParams {
    smsCode: string;
    userId: string;
}

interface SmsAuthParams {
    phone: string;
    languageCode: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export const authUtils = {
    loginAuth: async ({ smsCode, userId }: LoginAuthParams) => {
        const { data } = await custimAxios.post<AuthResponse>("/auth/login", {
            smsCode,
            userAgent: window.navigator.userAgent,
            userId,
        });

        safeLocalStorage.setItem("accessToken", data?.accessToken);
        safeLocalStorage.setItem("refreshToken", data?.refreshToken);
        safeLocalStorage.setItem("user", JSON.stringify(data?.user));

        // rewrite axios token
        custimAxios.defaults.headers.common["Authorization"] = `Bearer ${data?.accessToken}`;

        return data;
    },

    smsAuth: async ({ phone, languageCode }: SmsAuthParams) => {
        const { data } = await custimAxios.post("/auth/login/sms", {
            phone,
            languageCode,
        });

        return data;
    },

    refreshAuth: async () => {
        const { data } = await custimAxios.post<AuthResponse>(
            "/auth/refresh",
            {
                userAgent: window.navigator.userAgent,
            },
            {
                headers: {
                    refreshToken: safeLocalStorage.getItem("refreshToken"),
                },
            }
        );

        safeLocalStorage.setItem("accessToken", data?.accessToken);
        safeLocalStorage.setItem("refreshToken", data?.refreshToken);

        // rewrite axios token
        custimAxios.defaults.headers.common["Authorization"] = `Bearer ${safeLocalStorage.getItem("accessToken")}`;

        return data;
    },
};
