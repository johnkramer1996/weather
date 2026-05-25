import { WeatherForecast } from './components/weather-forecast'

function App() {
  return (
    <>
      <div className='min-h-screen bg-linear-to-br from-blue-400 to-purple-500 py-4 pb-20 text-white'>
        <div className='container flex flex-col gap-4'>
          <WeatherForecast />
        </div>
      </div>
    </>
  )
}

export default App
