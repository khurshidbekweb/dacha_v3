import custimAxios from "@/config/axios.config"
import { safeLocalStorage } from "./safeLocalstorge"


interface ratingData {
    rating: number,
    cottageId: string,
    userId: string
}
interface ratingDataEdit {
    rating: number,
    id: string
}


export const ratingUtils = {
    postRating: async ({ cottageId, rating, userId }: ratingData) => {
        const { data } = await custimAxios.post('rating', {
            cottageId, rating, userId
        }, {
            headers: {
                Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
            },
        })
        return data
    },
    petchRating: async ({ rating, id }: ratingDataEdit) => {
        const { data } = await custimAxios.post(`rating/${id}`, {
            rating
        }, {
            headers: {
                Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
            },
        })
        return data
    }
}