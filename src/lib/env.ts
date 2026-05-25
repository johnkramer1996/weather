import { z } from 'zod'

const schema = z.object({
  WEATHER_OPENWEATHER_API_KEY: z.string(),
})

const env = schema.parse(import.meta.env)

export const ENV = {
  API_KEY: env.WEATHER_OPENWEATHER_API_KEY,
}
