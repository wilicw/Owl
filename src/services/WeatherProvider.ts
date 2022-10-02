import {
  filter, mergeMap, share, switchMap, timer,
} from 'rxjs';

const weatherApi = 'https://volmet.wilicw.dev/metar.json';

const weatherObservable = timer(0, 20 * 1000).pipe(
  switchMap(() => fetch(weatherApi)),
  filter((response) => response.status === 200),
  mergeMap(async (response) => {
    const docs = await response.json();
    return docs;
  }),
  mergeMap((x) => x.filter((data: any) => data.station === 'RCNN')),
  share(),
);

export default weatherObservable;
