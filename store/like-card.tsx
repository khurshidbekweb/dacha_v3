// src/store/likeStore.ts
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';


interface LikeStoreState {
    likedCards: string[];
    toggleLike: (cardId: string) => void;
}

// Create a custom storage to comply with PersistStorage interface
const customStorage: PersistStorage<LikeStoreState> = {
    getItem: (name) => {
        const item = safeLocalStorage.getItem(name);
        return Promise.resolve(item ? JSON.parse(item) : null); // or just return item if you don't need to parse
    },
    setItem: (name, value) => {
        return Promise.resolve(safeLocalStorage.setItem(name, JSON.stringify(value)));
    },
    removeItem: (name) => {
        return Promise.resolve(safeLocalStorage.removeItem(name));
    },
};

// Creating Zustand store with persist
export const useLikeStore = create(
    persist<LikeStoreState>(
        (set) => ({
            likedCards: [],
            toggleLike: (cardId) =>
                set((state) => {
                    if (state.likedCards.includes(cardId)) {
                        return { likedCards: state.likedCards.filter(id => id !== cardId) };
                    } else {
                        return { likedCards: [...state.likedCards, cardId] };
                    }
                }),
        }),
        {
            name: 'likes',
            storage: customStorage,
        }
    )
);
