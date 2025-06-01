import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

interface EditUserParams {
  id: string;
  name: string;
  image: File | null;
}

export const userUtils = {
  getUsers: async () => {
    const { data } = await custimAxios.get("user/all");
    return data;
  },

  getSingleUser: async () => {
    if (!safeLocalStorage.getItem("accessToken")) return null;

    const { data } = await custimAxios.get("/user/me", {
      headers: {
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      },
    });
    safeLocalStorage.setItem("user", JSON.stringify(data));
    return data;
  },

  getCottageUserById: async (userId: string) => {
    const { data } = await custimAxios.get(`/user/single/user/by/${userId}`);
    return data;
  },

  getUserDevice: async (userId: string) => {
    const { data } = await custimAxios.get(`user/user-device/${userId}`);
    return data;
  },

  editUser: async ({ id, name, image }: EditUserParams) => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    const { data } = await custimAxios.patch(`user/edit/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
};
