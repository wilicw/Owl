import { useEffect, useState } from 'react';
import ValueLabel from './components/ValueLabel';
import weatherObservable from './services/WeatherProvider';

const WeatherLabel = () => {
  const [weather, setWeather] = useState(undefined)
  useEffect(() => {
    const subscription = weatherObservable.subscribe((data: any) => setWeather(data.weather))
    return () => subscription.unsubscribe()
  }, [])
  return (
    weather === undefined ? <></>
      : <ValueLabel
        labelColor='#6a975d'
        labelName='Weather'
        value={weather || 'Sunny'}
      />
  )
}

const TemperatureLabel = () => {
  const [temperature, setTemperature] = useState(NaN)
  useEffect(() => {
    const subscription = weatherObservable.subscribe((data: any) => setTemperature(data.temperature))
    return () => subscription.unsubscribe()
  }, [])
  return (
    isNaN(temperature) ? <></> :
      <ValueLabel
        labelColor='#e39e7e'
        labelName='Temperature'
        unit='℃'
        value={temperature}
      />
  )
}

function WindLabel() {
  interface IWind {
    speed: number;
    direction: string;
  }
  const [wind, setWind] = useState<IWind>({ speed: NaN, direction: "" })
  useEffect(() => {
    const subscription = weatherObservable.subscribe((data: any) => setWind({
      speed: data.wind.speed,
      direction: data.wind.direction
    }))
    return () => subscription.unsubscribe()
  }, [])
  return (
    isNaN(wind.speed) ? <></> :
      <ValueLabel
        labelColor='#7eb4e3'
        labelName='Wind'
        unit={'knot ' + (wind.speed === 0 ? '' : wind.direction)}
        value={wind.speed}
      />
  )
}

export { WeatherLabel, TemperatureLabel, WindLabel }