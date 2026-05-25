import type { ForecastItem } from '@/lib/schemas/weather.schema'
import { weatherIcons } from '@/lib/icons'
import {
  getHumidity,
  getIconUrl,
  getPressure,
  getSpeed,
  getVisibility,
} from '@/lib/utils'

interface ForecastItemProps {
  forecast: ForecastItem
  dayName: string
  date?: string
  maxTemp: number
  minTemp?: number
  maxFeelsLike: number
  minFeelsLike?: number
}

const ForecastCard = ({
  forecast,
  dayName,
  date,
  maxTemp,
  minTemp,
  maxFeelsLike,
  minFeelsLike,
}: ForecastItemProps) => {
  return (
    <div className='rounded-lg bg-white p-3 text-center text-black shadow-lg transition-shadow hover:shadow-xl'>
      {dayName && <h3 className='font-semibold'>{dayName}</h3>}
      {date && <p className='text-sm text-gray-500'>{date}</p>}
      <img
        src={getIconUrl(forecast.weather[0].icon)}
        alt={forecast.weather[0].description}
        className='mx-auto size-12'
      />
      <p className='text-sm'>
        {forecast.weather[0].description.charAt(0).toUpperCase() +
          forecast.weather[0].description.slice(1)}
      </p>
      <div className='flex justify-center gap-2'>
        <span className='text-lg font-bold'>{Math.round(maxTemp)}°</span>
        {minTemp && (
          <span className='text-gray-500'>{Math.round(minTemp)}°</span>
        )}
      </div>

      <div className='mt-1 text-xs text-gray-500'>
        відчувається: {Math.round(maxFeelsLike)}°{' '}
        {minFeelsLike && <>/ {Math.round(minFeelsLike)}°</>}
      </div>
      <ul className='mt-2 flex flex-col gap-1 text-xs text-gray-500'>
        {(
          [
            {
              id: 'humidity',
              label: 'Вологість',
              value: getHumidity(forecast.main.humidity),
            },
            {
              id: 'speed',
              label: 'Вітер',
              value: getSpeed(forecast.wind.speed),
            },
            {
              id: 'pressure',
              label: 'Тиск',
              value: getPressure(forecast.main.pressure),
            },
            {
              id: 'visibility',
              label: 'Видимість',
              value: getVisibility(forecast.visibility),
            },
          ] as const
        ).map((item) => {
          const Icon = weatherIcons[item.id] ?? weatherIcons['humidity']

          return (
            <li key={item.id}>
              <Icon className='inline-block text-primary' /> {item.label}:{' '}
              {item.value}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { ForecastCard }
