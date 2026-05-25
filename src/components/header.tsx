import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { FaSpinner } from 'react-icons/fa'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FavoriteButton } from '@/components/favorite-button'
import { Notification } from '@/components/ui/notification'
import { Logo } from '@/components/logo'

interface HeaderProps {
  isLoading: boolean
  error: Error | null
  city: string
}

const formSchema = z.object({
  city: z.string().optional(),
  // .min(1, 'Введіть назву міста')
})

const Header = ({ isLoading, error, city }: HeaderProps) => {
  const [, setSearchParams] = useSearchParams()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      city,
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSearchParams({ searchCity: values.city ?? '' })
  }

  useEffect(() => {
    setValue('city', city)
  }, [city, setValue])

  const errorText = errors.city
    ? errors.city.message
    : error
      ? error.name === 'AxiosError'
        ? 'Місто не знайдено'
        : error.message
      : ''

  return (
    <div className='flex gap-6 max-sm:flex-col'>
      <Logo className='' />
      <div className='flex grow flex-col gap-2'>
        <form onSubmit={handleSubmit(onSubmit)} className='grow'>
          <div className='flex gap-2'>
            <input
              type='text'
              placeholder='Введіть назву міста (наприклад, Київ)'
              className='input'
              disabled={isLoading}
              {...register('city')}
            />
            <button
              type='submit'
              disabled={isLoading}
              className='button w-10 px-1 text-xl'
            >
              {isLoading ? (
                <FaSpinner className='animate-spin' />
              ) : (
                <CiSearch />
              )}
            </button>
            <FavoriteButton />
          </div>
        </form>
        {errorText && <Notification type='error'>{errorText}</Notification>}
      </div>
    </div>
  )
}

export { Header }
