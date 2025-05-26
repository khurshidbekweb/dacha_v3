import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

interface ActiveOrderParams {
    cottageId: string;
    tariffId: string;
}

interface EditOrderParams {
    orderId: string;
    orderStatus: string;
    status: string;
}

export const OrderUtils = {
    getOrder: async () => {
        const { data } = await custimAxios.get("order/all/for/user", {
            headers: {
                "accept-language": safeLocalStorage.getItem("language"),
                Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
            },
        });
        return data;
    },

    activeOrder: async ({ cottageId, tariffId }: ActiveOrderParams) => {
        const { data } = await custimAxios.post(
            "order/add",
            {
                tariffId,
                cottageId,
            },
            {
                headers: {
                    Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
                },
            }
        );
        return data;
    },

    editOrder: async ({ orderId, orderStatus, status }: EditOrderParams) => {
        const { data } = await custimAxios.patch(
            `order/update/${orderId}`,
            {
                orderId,
                status,
                orderStatus,
            },
            {
                headers: {
                    "accept-language": safeLocalStorage.getItem("language"),
                    Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
                },
            }
        );
        return data;
    },
};
