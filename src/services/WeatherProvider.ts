/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWeather } from 'interfaces/IWeather';
import {
  filter, mergeMap, share, switchMap, timer, Observable, map,
} from 'rxjs';

const weatherApi = 'https://data.wilicw.dev/weather/auto.json';

const weatherElementFilter = (data: any, name: string) => (
  data.weatherElement.filter(
    (x: any) => x.elementName === name,
  )[0].elementValue
);

const weatherObservable: Observable<IWeather[]> = timer(0, 20 * 1000).pipe(
  switchMap(() => fetch(weatherApi)),
  filter((response) => response.status === 200),
  mergeMap(async (response) => {
    const docs = await response.json();
    return docs.records.location;
  }),
  map((data) => data.map((x:any) => <IWeather>{
    station: x.locationName,
    location: {
      latitude: parseFloat(x.lat),
      longitude: parseFloat(x.lon),
    },
    wind: {
      speed: parseFloat(weatherElementFilter(x, 'WDSD')),
      direction: parseInt(weatherElementFilter(x, 'WDIR'), 10),
    },
    temperature: parseFloat(weatherElementFilter(x, 'TEMP')),
  })),
  share(),
);

export default weatherObservable;
