import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { cottageUtils } from "../utils/cottage.utils";
import { languageUtils } from "../utils/language.utils";
import { placeUtils } from "../utils/place.utils";
import { regionUtils } from "../utils/region.utils";
import { comfortUtils } from "../utils/comfort.utils";
import { cottageTypeUtils } from "../utils/cottage-type.utils";
import { userUtils } from "../utils/user.utils";
import { notificationUtils } from "../utils/notification.utilis";
import { ServiceUtils } from "../utils/service.utils";
import { TariffUtils } from "../utils/tariff.utilis";
import { OrderUtils } from "../utils/order.utils";
import { safeLocalStorage } from "@/utils/safeLocalstorge";
import { QUERY_KEYS } from "./query-key";
import { comfort, cottage, cottageTop, cottageType, language, order, place, premiumCottage, region, services, tariff, user } from "@/types";

// Type definitions (misol uchun, o'zingizning real typelar bilan to'ldiring)

export const ALL_DATA = {
    useCottage: (): UseQueryResult<cottage[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.cottages],
            queryFn: cottageUtils.getCottage,
        }),
    useCottageTop: (): UseQueryResult<cottageTop[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.cottageTop],
            queryFn: cottageUtils.getCottageTop,
        }),
    useCottageByPlace: (placeId: string): UseQueryResult<cottage[]> & { data?: cottage[] } => {
        const cottages = useQuery({
            queryKey: [QUERY_KEYS.cottages_by_place],
            queryFn: () => cottageUtils.getCottageByPlace(placeId),
            enabled: !!placeId
        });

        const likedCottages: string[] = JSON.parse(safeLocalStorage.getItem("liked") || "[]");
        if (cottages.data?.length) {
            const data = cottages.data.map((e: cottage) => ({
                ...e,
                isLiked: likedCottages.includes(e.id),
            }));
            return { ...cottages, data };
        }
        return cottages;
    },
    useCottageFilter: ({ type, place, price }: { type?: string; place?: string; price?: string }): UseQueryResult<cottage[]> & { data?: cottage[] } => {
        const filters = useQuery({
            queryKey: [QUERY_KEYS.cottage_by_filter, type, place, price],
            queryFn: () => cottageUtils.getCottageFilter({ type, place, price }),
        });

        const likedCottages: string[] = JSON.parse(safeLocalStorage.getItem("liked") || "[]");
        if (filters.data?.length) {
            const data = filters.data.map((e: cottage) => ({
                ...e,
                isLiked: likedCottages.includes(e.id),
            }));
            return { ...filters, data };
        }
        return filters;
    },
    useCottageByType: (type: string): UseQueryResult<cottage[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.cottageType_by_Id],
            queryFn: () => cottageUtils.getCottageType(type),
        }),

    useCottageUser: (): UseQueryResult<cottage[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.cottages],
            queryFn: cottageUtils.getCottageUser,
        }),

    useCottageAllUserId: (userId: string): UseQueryResult<cottage[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.cottageUserAllId],
            queryFn: () => cottageUtils.getCottageUserId(userId),
        }),

    useSearchCottage: (search: string): UseQueryResult<cottage[]> =>
        useQuery({
            queryKey: ["search_cottage", search],
            queryFn: () => cottageUtils.getSearchCottage(search),
            enabled: !!search,
        }),

    useSuitableCottage: (id: string): UseQueryResult<cottage[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.cottage_suitable_id, id],
            queryFn: () => cottageUtils.getSuitableCottage(id),
            enabled: !!id
        }),

    useCottageTariffTop: (id: string): UseQueryResult<cottage[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.cottage_by_isTop, id],
            queryFn: () => cottageUtils.getCottageTariffTop(id),
        }),

    useCottageBySingle: (id: string) => useQuery({
        queryKey: [QUERY_KEYS.cottage_by_id],
        queryFn: () => cottageUtils.getCottageById(id),
        enabled: !id
    }),

    useCottageRecommended: (): UseQueryResult<premiumCottage[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.cottage_by_recommended],
            queryFn: cottageUtils.getCottageRecommended,
        }),

    useLanguage: (): UseQueryResult<language[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.languages],
            queryFn: languageUtils.getLanguage,
        }),

    usePlace: (): UseQueryResult<place[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.places],
            queryFn: placeUtils.getPlace,
        }),

    useRegion: (): UseQueryResult<region[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.regions],
            queryFn: regionUtils.getRegion,
        }),

    useComforts: (): UseQueryResult<comfort[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.comforts],
            queryFn: comfortUtils.getComfort,
        }),

    useCottageType: (): UseQueryResult<cottageType[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.cottageType],
            queryFn: cottageTypeUtils.getCottageType,
        }),

    useUsers: (): UseQueryResult<user[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.users],
            queryFn: userUtils.getUsers,
        }),

    useSingleUser: (): UseQueryResult<user> =>
        useQuery({
            queryKey: [QUERY_KEYS.users],
            queryFn: userUtils.getSingleUser,
        }),

    useCottageUserById: (userID: string): UseQueryResult<cottage[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.userCottageUser],
            queryFn: () => userUtils.getCottageUserById(userID),
        }),

    useNotificationUser: (userId: string): UseQueryResult<Notification[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.notification, userId],
            queryFn: () => notificationUtils.getUserNotification(userId),
        }),

    useAllNotification: (): UseQueryResult<Notification[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.all_notification],
            queryFn: notificationUtils.getNotification,
        }),

    useServices: (): UseQueryResult<services[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.services],
            queryFn: ServiceUtils.getService,
        }),

    useTariff: (): UseQueryResult<tariff[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.tariff],
            queryFn: TariffUtils.getTariff,
        }),

    useTarifId: (tarifId: string): UseQueryResult<services> =>
        useQuery({
            queryKey: [QUERY_KEYS.servicesId, tarifId],
            queryFn: () => ServiceUtils.getServiceId(tarifId),
            enabled: !!tarifId
        }),

    useOrder: (): UseQueryResult<order[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.order],
            queryFn: OrderUtils.getOrder,
        }),

    usePlaceById: (id: string): UseQueryResult<place[]> =>
        useQuery({
            queryKey: [QUERY_KEYS.place_by_id, id],
            queryFn: () => placeUtils.getPlaceById(id),
            enabled: !!id,
        }),
};
