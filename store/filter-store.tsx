import { create } from "zustand";

type Permissions = {
    familyOnly: boolean;
    noSmoking: boolean;
    noPets: boolean;
    noParty: boolean;
    noLoudMusic: boolean;
    noAlcohol: boolean;
};

interface FilterState {
    comfortIds: string[];
    placeIds: string[];
    permissions: Permissions;
    price: {
        min: number;
        max: number;
    };

    // 🔥 Dynamic refetch (CottagePage -> Filter aloqa uchun)
    refetch?: () => void;
}

interface FilterActions {
    // Comfort
    setComfortIds: (ids: string[]) => void;
    addComfortId: (id: string) => void;
    removeComfortId: (id: string) => void;

    // Place
    setPlaceIds: (ids: string[]) => void;
    addPlaceId: (id: string) => void;
    removePlaceId: (id: string) => void;

    // Permissions
    setPermission: (key: keyof Permissions, value: boolean) => void;

    // Price
    setPriceRange: (min: number, max: number) => void;

    // Refetch controller
    setRefetch: (fn: () => void) => void;

    // Reset
    resetFilters: () => void;
}

// 🎯 Default filter holati
const defaultFilters: Omit<FilterState, "refetch"> = {
    comfortIds: [],
    placeIds: [],
    permissions: {
        familyOnly: false,
        noSmoking: false,
        noPets: false,
        noParty: false,
        noLoudMusic: false,
        noAlcohol: false,
    },
    price: {
        min: 500_000,
        max: 15_000_000,
    },
};

// 🧠 Yaxshi struktura va qat’iy tip bilan store
export const useFilterStore = create<FilterState & FilterActions>((set, get) => ({
    ...defaultFilters,

    // ✅ Comfort
    setComfortIds: (ids) => set({ comfortIds: ids }),
    addComfortId: (id) =>
        set((state) =>
            state.comfortIds.includes(id)
                ? state
                : { comfortIds: [...state.comfortIds, id] }
        ),
    removeComfortId: (id) =>
        set((state) => ({
            comfortIds: state.comfortIds.filter((cId) => cId !== id),
        })),

    // ✅ Place
    setPlaceIds: (ids) => set({ placeIds: ids }),
    addPlaceId: (id) =>
        set((state) =>
            state.placeIds.includes(id)
                ? state
                : { placeIds: [...state.placeIds, id] }
        ),
    removePlaceId: (id) =>
        set((state) => ({
            placeIds: state.placeIds.filter((pId) => pId !== id),
        })),

    // ✅ Permission
    setPermission: (key, value) =>
        set((state) => ({
            permissions: {
                ...state.permissions,
                [key]: value,
            },
        })),

    // ✅ Price
    setPriceRange: (min, max) =>
        set(() => ({
            price: { min, max },
        })),

    // ✅ Refetch
    setRefetch: (fn) => set({ refetch: fn }),

    // ✅ Reset all filters
    resetFilters: () =>
        set(() => ({
            ...defaultFilters,
            refetch: get().refetch, // refetch’ni saqlab qolamiz
        })),
}));
