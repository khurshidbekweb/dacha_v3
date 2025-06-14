import custimAxios from '@/config/axios.config'
import { safeLocalStorage } from './safeLocalstorge'

type FilterType = {
    type?: string
    place?: string
    price?: string
}

type PostCottagePayload = {
    name: string;
    description: string;
    images: string[];
    regionId: string;
    placeId: string;
    price: number | '';
    priceWeekend: number | '';
    cottageType: string[]; // Bu sizning misolingizda ["c4c301b1-4719-499e-bde2-2c36715fae9e"]
    comforts: string[];
    latitude: string;
    contactPhone: string,
    longitude: string;
    doubleBedCount: number | '';
    entranceTime: string;
    exitTime: string;
    maxGuests: number | '';
    numberOfRooms: number | '';
    singleBedCount: number | '';
    familyOnly: boolean | '';
    noAlcohol: boolean | '';
    noLoudMusic: boolean | '';
    noParty: boolean | '';
    noPets: boolean | '';
    noSmoking: boolean | '';
    quiteHours: string;
    mainImage: string
}

type AddCottageImagePayload = {
    cottageId: string
    image: File
    isMainImage: boolean
}

type OrderActivePrePayload = {
    cottageId: string
    expireDays: number
    priority: string
    serviceCode: string
}

type AddEventPayload = {
    cottageId: string
    event: string
}

type PatchCottageTextPayload = {
    id: string
    comforts: string[]
    cottageStatus: string
    cottageType: string[]
    description: string
    name: string
    price: string
    priceWeekend: string
    rating: number
    status: string
    lattitude: string
    longitude: string
    placeId: string
    regionId: string
    isTop: boolean
}

type PatchCottageImagePayload = {
    id: string
    image: File
}

type FilterValue = string | number | boolean | ReadonlyArray<string | number | boolean> | null | undefined;

export const cottageUtils = {
    getCottage: async () => {
        const { data } = await custimAxios.get('/cottage', {
            headers: {
                'accept-language': safeLocalStorage.getItem('language'),
            },
        })
        return data
    },
    getCottageByPlace: async (placeId: string) => {
        const { data } = await custimAxios.get(`/cottage/place/${placeId}`, {
            headers: {
                'accept-language': safeLocalStorage.getItem('language'),
            },
        })
        return data
    },
    getCottageTop: async () => {
        const { data } = await custimAxios.get('/cottage/top', {
            headers: {
                'accept-language': safeLocalStorage.getItem('language'),
            },
        })
        return data
    },
    getCottageType: async (type: string) => {
        const { data } = await custimAxios.get(`/cottage/cottage-type/${type}`, {
            headers: {
                'accept-language': safeLocalStorage.getItem('language'),
            },
        })
        return data
    },
    getCottageUser: async () => {
        const { data } = await custimAxios.get('cottage/user', {
            headers: {
                'accept-language': safeLocalStorage.getItem('language'),
                Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
            },
        })
        return data
    },
    getCottageUserId: async (userId: string) => {
        const { data } = await custimAxios.get(`cottage/user/${userId}`, {
            headers: {
                'accept-language': safeLocalStorage.getItem('language'),
            },
        })
        return data
    },
    getCottageFilter: async ({ type, place, price }: FilterType) => {
        const queryStr: string[] = []

        if (type) {
            queryStr.push(`type=${type}`)
        }
        if (place) {
            queryStr.push(`place=${place}`)
        }
        if (price) {
            queryStr.push(`price=${price}`)
        }

        const { data } = await custimAxios.get(
            `/cottage/filter/?${queryStr.join('&')}`,
            {
                ...(type && { type }),
                ...(place && { place }),
                ...(price && { price }),

                headers: {
                    'accept-language': safeLocalStorage.getItem('language'),
                },
            }
        )
        return data
    },
    getCottageTariffTop: async (id: string) => {
        const { data } = await custimAxios.get(`cottage/suitable/${id}`, {
            headers: {
                'accept-language': safeLocalStorage.getItem('language'),
            },
        })
        return data
    },
    getCottageRecommended: async () => {
        const { data } = await custimAxios.get('cottage/recommended', {
            headers: {
                'accept-language': safeLocalStorage.getItem('language'),
            },
        })
        return data
    },
    getSuitableCottage: async (id: string) => {
        const { data } = await custimAxios.get(`cottage/suitable/${id}`, {
            headers: {
                'accept-language': safeLocalStorage.getItem('language'),
            },
        })
        return data
    },
    getSearchCottage: async (search: string) => {
        const { data } = await custimAxios.get(
            `cottage/search?name=${search}`,
            {
                headers: {
                    'accept-language': safeLocalStorage.getItem('language'),
                },
            }
        )
        return data
    },
    getFilter: async (filter: Record<string, FilterValue>) => {
        const queryParams = new URLSearchParams()

        Object.entries(filter).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
                value.forEach(item => {
                    if (typeof item === 'string') {
                        queryParams.append(key, item)
                    } else if (typeof item === 'object' && item.id) {
                        queryParams.append(key, item.id)
                    }
                })
            } else if (typeof value === 'string' && value.trim() !== '') {
                queryParams.append(key, value)
            }
        })

        const { data } = await custimAxios.get(
            `cottage/filter/?${queryParams.toString()}`,
            {
                headers: {
                    'accept-language': safeLocalStorage.getItem('language'),
                },
            }
        )

        return data
    },

    getCottageById: async (id: string) => {
        const { data } = await custimAxios.get(`cottage/single/${id}`,
            {
                headers: {
                    'accept-language': safeLocalStorage.getItem('language'),
                },
            }
        )
        return data
    },

    postCottage: async ({
        comforts,
        cottageType,
        description,
        mainImage,
        images,
        name,
        placeId,
        price,
        priceWeekend,
        regionId,
        latitude,
        longitude,
        contactPhone,
        doubleBedCount,
        entranceTime,
        exitTime,
        familyOnly,
        maxGuests,
        noAlcohol,
        noLoudMusic,
        noParty,
        noPets,
        noSmoking,
        numberOfRooms,
        quiteHours,
        singleBedCount
    }: PostCottagePayload) => {

        const { data } = await custimAxios.post('cottage/add', {
            comforts,
            cottageType,
            description,
            mainImage,
            images,
            name,
            placeId,
            price,
            priceWeekend,
            regionId,
            latitude,
            longitude,
            contactPhone,
            doubleBedCount,
            entranceTime,
            exitTime,
            familyOnly,
            maxGuests,
            noAlcohol,
            noLoudMusic,
            noParty,
            noPets,
            noSmoking,
            numberOfRooms,
            quiteHours,
            singleBedCount
        }, {
            headers: {
                Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
            },
        })
        return data
    },
    addCottageImage: async ({
        cottageId,
        image,
        isMainImage,
    }: AddCottageImagePayload) => {
        const formData = new FormData()
        formData.append('cottageId', cottageId)
        formData.append('image', image)
        formData.append('isMainImage', String(isMainImage))
        const { data } = await custimAxios.post('cottage/image/add', formData, {
            headers: {
                Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
            },
        })
        return data
    },
    orderActivePre: async ({
        cottageId,
        expireDays,
        priority,
        serviceCode,
    }: OrderActivePrePayload) => {
        const { data } = await custimAxios.post(
            `cottage/add/premium/${cottageId}`,
            {
                expireDays,
                priority,
                serviceCode,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }
        )
        return data
    },
    addEvent: async ({ cottageId, event }: AddEventPayload) => {
        const { data } = await custimAxios.post('cottage/add/event', {
            cottageId,
            event,
        })
        return data
    },
    patchCottageText: async ({
        id,
        comforts,
        cottageStatus,
        cottageType,
        description,
        name,
        price,
        priceWeekend,
        rating,
        status,
        lattitude,
        longitude,
        placeId,
        regionId,
        isTop,
    }: PatchCottageTextPayload) => {
        const { data } = await custimAxios.patch(
            `/cottage/edit/${id}`,
            {
                comforts,
                cottageStatus,
                cottageType,
                description,
                name,
                price,
                priceWeekend,
                status,
                lattitude,
                longitude,
                isTop,
                placeId,
                regionId,
                rating,
            },
            {
                headers: {
                    Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
                },
            }
        )
        return data
    },

    patchCottageImage: async ({ id, image }: PatchCottageImagePayload) => {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('status', 'active')

        const { data } = await custimAxios.patch(
            `/cottage/image/edit/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
                },
            }
        )
        return data
    },
    deleteCottageAll: async (id: string) => {
        const { data } = await custimAxios.delete(`/cottage/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
            },
        })
        return data
    },
    deleteCottageImage: async (id: string) => {
        const { data } = await custimAxios.delete(`/cottage/image/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${safeLocalStorage.getItem('accessToken')}`,
            },
        })
        return data
    },
}
