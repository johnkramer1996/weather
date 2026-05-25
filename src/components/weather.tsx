import { weatherIcons } from '@/lib/icons'
import type { ForecastItem } from '@/lib/schemas/weather.schema'
import {
  getHumidity,
  getIconUrl,
  getPressure,
  getSpeed,
  getVisibility,
} from '@/lib/utils'

interface WeatherProps {
  weather: ForecastItem
}

const Weather = ({ weather }: WeatherProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-h3'>Поточна погода</h3>
      <div className='rounded-lg bg-white p-4 text-black shadow-lg'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <div className='grid grid-cols-1 gap-2 text-center sm:grid-cols-2 sm:items-center sm:text-left'>
            <div className='flex gap-1 md:gap-4'>
              <img
                src={getIconUrl(weather.weather[0].icon)}
                alt={weather.weather[0].description}
                className='size-20'
              />
              <div className='flex flex-col gap-1'>
                <div className='text-5xl font-bold'>
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className=''>
                  {weather.weather[0].description.charAt(0).toUpperCase() +
                    weather.weather[0].description.slice(1)}
                </div>
              </div>
            </div>
            <ul className='flex flex-col gap-2'>
              {[
                {
                  label: 'Відчувається як:',
                  value: `${Math.round(weather.main.feels_like)}°`,
                },
                {
                  label: 'Мінімум / Максимум:',
                  value: `${Math.round(weather.main.temp_min)}° / ${Math.round(weather.main.temp_max)}°`,
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className='flex items-center justify-between gap-2 md:justify-start'
                >
                  <div className='text-left text-sm'>{item.label}</div>
                  <div className='shrink-0 text-right font-semibold'>
                    {item.value}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
            {(
              [
                {
                  id: 'humidity',
                  label: 'Вологість',
                  value: getHumidity(weather.main.humidity),
                },
                {
                  id: 'speed',
                  label: 'Вітер',
                  value: getSpeed(weather.wind.speed),
                },
                {
                  id: 'pressure',
                  label: 'Тиск',
                  value: getPressure(weather.main.pressure),
                },
                {
                  id: 'visibility',
                  label: 'Видимість',
                  value: getVisibility(weather.visibility),
                },
              ] as const
            ).map((item, i) => {
              const Icon = weatherIcons[item.id] ?? weatherIcons['humidity']

              return (
                <div
                  key={i}
                  className='flex flex-col items-center gap-0.5 rounded-lg bg-gray-50 p-3 text-center'
                >
                  <Icon className='size-6 text-primary' />
                  <div className='text-sm'>{item.label}</div>
                  <div className='font-semibold'>{item.value}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Weather }
