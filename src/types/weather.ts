import type { ForecastItem } from '@/lib/schemas/weather.schema'

export interface DailyForecast {
  middayItem: ForecastItem
  items: ForecastItem[]
  date: string
  dayName: string
  minTemp: number
  maxTemp: number
  minFeelsLike: number
  maxFeelsLike: number
  avgHumidity: number
  avgWindSpeed: number
  avgPressuare: number
  avgVisibility: number
}
