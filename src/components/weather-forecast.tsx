import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { FiCalendar, FiClock } from 'react-icons/fi'

import { useForecast, useWeather } from '@/api/weather.api'
import { useFavoriteStore } from '@/store/favorite.store'
import {
  cn,
  formatDate,
  formatTime,
  getDailyForecast,
  groupForecastByDay,
} from '@/lib/utils'
import { Loading } from '@/components/ui/loading'
import { Weather } from './weather'
import { ForecastCard } from './forecast-card'
import { Header } from './header'

const WeatherForecast = () => {
  const [searchParams] = useSearchParams()
  const { addToFavorite, removeFromFavorite } = useFavoriteStore()
  const cityFromUrl = searchParams.get('searchCity')
  const cityToLoad = cityFromUrl ?? ''

  const {
    data: weather,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useWeather(cityToLoad)
  const {
    data: {
      list: forecast = [],
      city: { name: cityName, country: cityCountry } = {},
    } = {},
    isLoading: isForecastLoading,
    error: forecastError,
  } = useForecast(cityToLoad)
  const isLoading = isWeatherLoading || isForecastLoading
  const error = weatherError || forecastError

  const dailyForecast = useMemo(() => {
    const groupedForecast = groupForecastByDay(forecast)
    return getDailyForecast(groupedForecast)
  }, [forecast])

  const cityId = `${cityName}-${cityCountry}`.toLowerCase()
  const isFavorite = Boolean(
    useFavoriteStore((state) => state.list.find((p) => p.id === cityId)),
  )

  const handleFavoriteClick = () => {
    if (!(cityName && cityCountry)) {
      return
    }
    isFavorite
      ? removeFromFavorite(cityName, cityCountry)
      : addToFavorite(cityName, cityCountry)
  }

  return (
    <>
      <Header isLoading={isLoading} error={error} city={cityToLoad} />
      {isLoading && (
        <Loading>
          <p>Завантаження прогнозу...</p>
        </Loading>
      )}
      {!isLoading && weather && (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-0'>
            <div className='flex items-center gap-2'>
              <h2 className='text-2xl font-bold'>
                {cityName}, {cityCountry}
              </h2>
              <button
                onClick={handleFavoriteClick}
                className={cn(
                  'cursor-pointer text-2xl text-white shadow-primary transition-colors hover:text-white data-active:text-white data-active:hover:text-white/90',
                )}
                data-active={isFavorite}
                title={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}
              >
                {isFavorite ? <GoHeartFill /> : <GoHeart />}
              </button>
            </div>
            <p className='text-sm'>{formatDate(weather.dt)}</p>
          </div>
          <Weather weather={weather} />
          <TabGroup className='flex flex-col gap-2'>
            <TabList className='tab-list'>
              <Tab className='tab-item'>
                <FiClock />
                <span>На 24 години</span>
              </Tab>
              <Tab className='tab-item'>
                <FiCalendar />
                <span>На 5 днів</span>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel className='flex flex-col gap-2'>
                <h3 className='text-h3'>Почасовий прогноз на 24 години</h3>
                <div className='grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8'>
                  {forecast.slice(0, 8).map((hour) => {
                    const dayName = formatTime(hour.dt_txt)

                    return (
                      <ForecastCard
                        key={dayName}
                        forecast={hour}
                        maxTemp={hour.main.temp}
                        maxFeelsLike={hour.main.feels_like}
                        dayName={dayName}
                      />
                    )
                  })}
                </div>
              </TabPanel>
              <TabPanel className='flex flex-col gap-2'>
                <h3 className='text-h3'>Прогноз на 5 днів</h3>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5'>
                  {dailyForecast.slice(1, 6).map((day) => {
                    return (
                      <ForecastCard
                        key={day.date}
                        forecast={day.middayItem}
                        dayName={day.dayName}
                        date={day.date}
                        maxTemp={day.maxTemp}
                        minTemp={day.minTemp}
                        maxFeelsLike={day.maxFeelsLike}
                        minFeelsLike={day.minFeelsLike}
                      />
                    )
                  })}
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      )}
    </>
  )
}

export { WeatherForecast }
