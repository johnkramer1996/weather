/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly WEATHER_OPENWEATHER_API_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
