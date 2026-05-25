import type { DailyForecast } from '@/types/weather'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ForecastItem } from './schemas/weather.schema'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getHumidity = (humidity: number) => `${humidity}%`
export const getSpeed = (speed: number) => `${Math.round(speed)} м/с`
export const getPressure = (speed: number) => `${Math.round(speed)} гПа`
export const getVisibility = (visibility: number) =>
  `${Math.round(visibility / 1000)} км`

export const getIconUrl = (iconCode: string) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`

export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('uk-UA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatTime = (dt_txt: string) => {
  const date = new Date(dt_txt)
  return date.toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const groupForecastByDay = (
  list: ForecastItem[],
): Map<string, ForecastItem[]> => {
  return list.reduce((daysMap, item) => {
    const date = item.dt_txt.split(' ')[0]
    const day = daysMap.get(date) ?? []
    day.push(item)
    daysMap.set(date, day)
    return daysMap
  }, new Map<string, ForecastItem[]>())
}
export const getDailyForecast = (
  daysMap: Map<string, ForecastItem[]>,
): DailyForecast[] => {
  const dailyForecasts: DailyForecast[] = Array.from(daysMap.entries()).map(
    ([date, items]) => {
      const temps = items.map((item) => item.main.temp)
      const feelsLikeTemps = items.map((item) => item.main.feels_like)

      const minTemp = Math.min(...temps)
      const maxTemp = Math.max(...temps)
      const minFeelsLike = Math.min(...feelsLikeTemps)
      const maxFeelsLike = Math.max(...feelsLikeTemps)
      const avgHumidity = Math.round(
        items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length,
      )
      const avgWindSpeed = Math.round(
        items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length,
      )
      const avgPressuare = Math.round(
        items.reduce((sum, item) => sum + item.main.pressure, 0) / items.length,
      )
      const avgVisibility = Math.round(
        items.reduce((sum, item) => sum + item.visibility, 0) / items.length,
      )
      const middayItem =
        items.find((item) => item.dt_txt.includes('12:00')) || items[0]
      const dayName = new Date(date).toLocaleDateString('uk-UA', {
        weekday: 'long',
      })

      return {
        middayItem,
        date,
        dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        items,
        minTemp: Math.round(minTemp),
        maxTemp: Math.round(maxTemp),
        minFeelsLike: Math.round(minFeelsLike),
        maxFeelsLike: Math.round(maxFeelsLike),
        avgHumidity,
        avgWindSpeed,
        avgPressuare,
        avgVisibility,
      }
    },
  )

  return dailyForecasts
}
