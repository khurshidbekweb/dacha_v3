import custimAxios from "@/config/axios.config"
import { safeLocalStorage } from "./safeLocalstorge"

interface uploadImage {
    destination: string,
    file: File
}

export const uploadImage = {
    uploadImage: async ({ destination, file }: uploadImage) => {
        const formData = new FormData()
        formData.append('destination', destination)
        formData.append('file', file)
        const { data } = await custimAxios.post('uploads/add', formData,
            {
                headers: {
                    Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
                },
            }
        )
        return data
    }
}