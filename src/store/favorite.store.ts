import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const FAVORITE_KEY = 'fovorite-storage'

export interface FavoriteCity {
  id: string
  city: string
  country: string
  fullName: string
}

interface FaforiteStore {
  list: FavoriteCity[]
  addToFavorite: (city: string, country: string) => void
  removeFromFavorite: (city: string, country: string) => void
  resetFavorite: () => void
}

export const useFavoriteStore = create<FaforiteStore>()(
  persist(
    (set, get) => ({
      list: [],
      addToFavorite: (city: string, country: string) => {
        const { list } = get()

        const id = `${city}-${country}`.toLowerCase()

        if (list.some((p) => p.id === id)) {
          return
        }

        const newFavorite: FavoriteCity = {
          id,
          city: city,
          country: country,
          fullName: `${city}, ${country}`,
        }

        set({ list: [...list, newFavorite] })
      },
      removeFromFavorite: (city: string, country: string) => {
        const { list } = get()

        const id = `${city}-${country}`.toLowerCase()

        set({ list: list.filter((product) => product.id !== id) })
      },
      resetFavorite: () => set({ list: [] }),
    }),
    {
      name: FAVORITE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
