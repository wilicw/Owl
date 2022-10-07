import { useEffect, useState } from 'react';
import ValueLabel from 'components/ValueLabel';
import weatherObservable from 'services/WeatherProvider';
import { IWeather, IWind } from 'interfaces/IWeather';
import { Observable, share } from 'rxjs';
import store from 'redux/store';
import { distance } from 'interfaces/IPosition';

const nearWeatherObservable = new Observable<IWeather>((subscriber) => {
  weatherObservable.subscribe((weatherData) => {
    const { location } = store.getState().app;
    const { weather } = weatherData.reduce((current, data) => {
      const d = distance(data.location, location);
      if (d < current.distance) return { distance: d, weather: data };
      return current;
    }, { distance: Number.MAX_VALUE, weather: weatherData[0] });
    subscriber.next(weather);
  });
}).pipe(share());

function TemperatureLabel() {
  const [temperature, setTemperature] = useState(NaN);
  useEffect(() => {
    const subscription = nearWeatherObservable
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
  const [wind, setWind] = useState<IWind>({ speed: NaN, direction: NaN });
  useEffect(() => {
    const subscription = nearWeatherObservable
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
          unit={`knot ${(wind.speed === 0) ? '' : `${wind.direction}°`}`}
          value={wind.speed}
        />
      )
  );
}

export { TemperatureLabel, WindLabel };
