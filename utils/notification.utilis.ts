import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

interface PatchNotificationParams {
  id: string;
  watchedUserId: string;
  status: string; // agar `status` har doim `string` emas bo‘lsa, `status: string | number` qilishingiz mumkin
}

export const notificationUtils = {
  getNotification: async () => {
    const { data } = await custimAxios.get("/notification/all", {
      headers: {
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },

  getUserNotification: async (id: string) => {
    if (!id) return null;
    const { data } = await custimAxios.get(`/notification/by/${id}`);
    return data; // server `[]` qaytaradi deb o‘ylayman
  },

  patchNatification: async ({
    id,
    watchedUserId,
    status,
  }: PatchNotificationParams) => {
    const { data } = await custimAxios.patch(
      `/notification/update/${id}`,
      {
        watchedUserId,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
        },
      }
    );
    return data;
  },
};
