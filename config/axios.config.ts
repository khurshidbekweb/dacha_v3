import axios from "axios";
import { authUtils } from "../utils/auth.utils";
import { BASE_URL_SERVER } from "@/constants";

const custimAxios = axios.create({
  baseURL: BASE_URL_SERVER,
  timeout: 30000,
});

custimAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err?.response?.status === 406) {
      try {
        await authUtils.refreshAuth();
        window.location.reload();
      } catch (refreshErr) {
        console.error("Auth refresh failed:", refreshErr);
      }
    } else if (err?.response?.status === 455) {
      localStorage.clear()
      window.location.reload()
    }
    return Promise.reject(err);
  }
);


export default custimAxios;
