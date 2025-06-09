import axios from "axios"

interface uploadImage {
    destination: string,
    file: File
}

export const uploadImage = {
    uploadImage: async ({ destination, file }: uploadImage) => {
        const formData = new FormData()
        formData.append('destination', destination)
        formData.append('file', file)
        const { data } = await axios.post('https://test-api.dachaol.uz/api/v1/uploads/add', formData)
        return data
    }
}