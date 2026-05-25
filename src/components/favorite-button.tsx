import { useSearchParams } from 'react-router-dom'
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { CiHeart } from 'react-icons/ci'
import { RxCross2 } from 'react-icons/rx'

import { useFavoriteStore, type FavoriteCity } from '@/store/favorite.store'

const FavoriteButton = () => {
  const [, setSearchParams] = useSearchParams()
  const { list: favorites, removeFromFavorite } = useFavoriteStore()

  const handleFavoriteCityClick = (favorite: FavoriteCity) => {
    setSearchParams({ searchCity: favorite.city })
  }

  return (
    <Popover>
      <PopoverButton className='button relative w-10 px-1 text-2xl data-active:bg-primary-light'>
        <CiHeart />
        {favorites.length > 0 && (
          <span className='absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-white text-xs text-black shadow-sm'>
            {favorites.length}
          </span>
        )}
      </PopoverButton>
      <PopoverBackdrop className='fixed inset-0 bg-primary/5 backdrop-blur-xs' />
      <PopoverPanel
        anchor={{ to: 'bottom end', gap: '4px' }}
        className='flex flex-col rounded-sm border border-primary bg-white/5 p-2 shadow-sm'
      >
        {({ close }) =>
          favorites.length === 0 ? (
            <div className='rounded-lg bg-white p-2'>Порожньо</div>
          ) : (
            <ul className='flex flex-col gap-2'>
              {favorites.map((favorite) => (
                <li
                  key={favorite.id}
                  className='flex items-center justify-between gap-2 rounded-lg bg-gray-100 p-1 text-black transition-colors hover:bg-gray-200'
                >
                  <button
                    onClick={() => {
                      close()
                      handleFavoriteCityClick(favorite)
                    }}
                    className='grow cursor-pointer p-1 text-left text-black hover:text-primary'
                  >
                    {favorite.fullName}
                  </button>
                  <button
                    onClick={() =>
                      removeFromFavorite(favorite.city, favorite.country)
                    }
                    className='cursor-pointer p-1 text-xl leading-none text-red-500 hover:text-red-700'
                    title='Видалити з обраного'
                  >
                    <RxCross2 />
                  </button>
                </li>
              ))}
            </ul>
          )
        }
      </PopoverPanel>
    </Popover>
  )
}

export { FavoriteButton }
