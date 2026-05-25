import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import tsconfigPaths from 'vite-tsconfig-paths'

const ENV_PREFIX = 'WEATHER_'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  envPrefix: ENV_PREFIX,
  resolve: {
    tsconfigPaths: true,
  },
})
