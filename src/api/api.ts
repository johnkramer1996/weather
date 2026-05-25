import axios from 'axios'

const API_URL = 'https://api.openweathermap.org/data/2.5'

export const QUERY_KEYS = {
  weather: 'weather',
  forecast: 'forecast',
} as const

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
})
