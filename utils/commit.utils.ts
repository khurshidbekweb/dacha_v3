import custimAxios from "@/config/axios.config"
import { safeLocalStorage } from "./safeLocalstorge"


interface ratingData {
    content: string,
    cottageId: string,
    userId: string
}
interface ratingDataEdit {
    content: string,
    id: string
}


export const commitUtils = {
    postComment: async ({ cottageId, content, userId }: ratingData) => {
        const { data } = await custimAxios.post('comment', {
            cottageId, content, userId
        }, {
            headers: {
                Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
            },
        })
        return data
    },
    petchComment: async ({ content, id }: ratingDataEdit) => {
        const { data } = await custimAxios.post(`comment/${id}`, {
            content
        })
        return data
    }
}