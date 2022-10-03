// import { IWeather } from 'interfaces/IWeather';
import { IWeather } from 'interfaces/IWeather';
import {
  filter, mergeMap, share, switchMap, timer, from, Observable,
} from 'rxjs';

const weatherApi = 'https://volmet.wilicw.dev/metar.json';

const weatherObservable: Observable<IWeather> = timer(0, 20 * 1000).pipe(
  switchMap(() => fetch(weatherApi)),
  filter((response) => response.status === 200),
  mergeMap(async (response) => {
    const docs = await response.json();
    return docs;
  }),
  switchMap((x) => <Observable<IWeather>>from(x)),
  filter((x) => x.station === 'RCNN'),
  share(),
);

export default weatherObservable;
