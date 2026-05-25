import { z } from 'zod'

const CoordSchema = z.object({
  lon: z.number(),
  lat: z.number(),
})

const WeatherItemSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
})

const MainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  sea_level: z.number().optional(),
  grnd_level: z.number().optional(),
})

const WindSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number().optional(),
})

const CloudsSchema = z.object({
  all: z.number(),
})

const SysSchema = z.object({
  type: z.number().optional(),
  id: z.number().optional(),
  country: z.string(),
  sunrise: z.number(),
  sunset: z.number(),
})

export const WeatherResponseSchema = z.object({
  coord: CoordSchema,
  weather: z.array(WeatherItemSchema),
  base: z.string(),
  main: MainSchema,
  visibility: z.number(),
  wind: WindSchema,
  clouds: CloudsSchema,
  dt: z.number(),
  sys: SysSchema,
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
})

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>

const ForecastItemSchema = z.object({
  dt: z.number(),
  main: MainSchema,
  weather: z.array(WeatherItemSchema),
  clouds: CloudsSchema,
  wind: WindSchema,
  visibility: z.number().optional().default(0),
  pop: z.number().optional(),
  sys: z
    .object({
      pod: z.string().optional(),
    })
    .optional(),
  dt_txt: z.string(),
})

const CitySchema = z.object({
  id: z.number(),
  name: z.string(),
  coord: CoordSchema,
  country: z.string(),
  timezone: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
})

export const ForecastResponseSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(ForecastItemSchema),
  city: CitySchema,
})

export type ForecastItem = z.infer<typeof ForecastItemSchema>
export type ForecastResponse = z.infer<typeof ForecastResponseSchema>
