import { useQuery } from '@tanstack/react-query'

import { api, QUERY_KEYS } from '@/api/api'
import { ENV } from '@/lib/env'
import {
  WeatherResponseSchema,
  ForecastResponseSchema,
  type WeatherResponse,
  type ForecastItem,
  type ForecastResponse,
} from '@/lib/schemas/weather.schema'

const routes = {
  weather: '/weather',
  forecast: '/forecast',
} as const

export const fetchWeather = async (
  searchCity: string,
): Promise<WeatherResponse> => {
  const { data } = await api.get<WeatherResponse>(routes.weather, {
    params: {
      q: searchCity.trim(),
      appid: ENV.API_KEY,
      units: 'metric',
      lang: 'ua',
    },
  })

  return WeatherResponseSchema.parse(data)
}

export const fetchForecast = async (
  searchCity: string,
): Promise<ForecastResponse> => {
  const { data } = await api.get<ForecastResponse>(routes.forecast, {
    params: {
      q: searchCity.trim(),
      appid: ENV.API_KEY,
      units: 'metric',
      lang: 'ua',
    },
  })

  return ForecastResponseSchema.parse(data)
}

const DEFAULT_CITY = 'Kiev'

export const useWeather = (searchCity: string) => {
  const city = searchCity || DEFAULT_CITY

  return useQuery({
    queryKey: [QUERY_KEYS.weather, city],
    queryFn: async () => {
      const data = await fetchWeather(city)

      return {
        dt: data.dt,
        main: data.main,
        weather: data.weather,
        wind: data.wind,
        visibility: data.visibility,
        clouds: data.clouds,
        dt_txt: new Date(data.dt * 1000).toISOString(),
        pop: 0,
        sys: { pod: 'd' },
      } satisfies ForecastItem
    },
  })
}

export const useForecast = (searchCity: string) => {
  const city = searchCity || DEFAULT_CITY

  return useQuery({
    queryKey: [QUERY_KEYS.forecast, city],
    queryFn: async () => await fetchForecast(city),
  })
}
