import { useEffect, useState } from 'react';
import ValueLabel from 'components/ValueLabel';
import weatherObservable from 'services/WeatherProvider';
import { IWind } from 'interfaces/IWeather';

function WeatherLabel() {
  const [weather, setWeather] = useState<string | undefined>(undefined);
  useEffect(() => {
    const subscription = weatherObservable.subscribe((data) => setWeather(data.weather));
    return () => subscription.unsubscribe();
  }, []);
  return (
    weather === undefined ? null
      : (
        <ValueLabel
          labelColor="#6a975d"
          labelName="Weather"
          value={weather || 'Sunny'}
        />
      )
  );
}

function TemperatureLabel() {
  const [temperature, setTemperature] = useState(NaN);
  useEffect(() => {
    const subscription = weatherObservable
      .subscribe((data) => setTemperature(data.temperature));
    return () => subscription.unsubscribe();
  }, []);
  return (
    Number.isNaN(temperature) ? null
      : (
        <ValueLabel
          labelColor="#e39e7e"
          labelName="Temperature"
          unit="℃"
          value={temperature}
        />
      )
  );
}

function WindLabel() {
  const [wind, setWind] = useState<IWind>({ speed: NaN, direction: '' });
  useEffect(() => {
    const subscription = weatherObservable
      .subscribe((data) => setWind({
        speed: data.wind.speed,
        direction: data.wind.direction,
      }));
    return () => subscription.unsubscribe();
  }, []);
  return (
    Number.isNaN(wind.speed) ? null
      : (
        <ValueLabel
          labelColor="#7eb4e3"
          labelName="Wind"
          unit={`knot ${wind.speed === 0 ? '' : wind.direction}`}
          value={wind.speed}
        />
      )
  );
}

export { WeatherLabel, TemperatureLabel, WindLabel };
