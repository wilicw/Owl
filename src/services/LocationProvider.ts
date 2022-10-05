import { ILocation } from 'interfaces/IPosition';
import {
  share, switchMap, timer, Observable, map,
} from 'rxjs';

const getCurrentPosition$ = new Observable<GeolocationPosition>((observer) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      observer.next(position);
      observer.complete();
    },
    observer.error.bind(observer),
  );
});

const locationObservable: Observable<ILocation> = timer(0, 60 * 1000).pipe(
  switchMap(() => getCurrentPosition$),
  map((data) => <ILocation>{
    latitude: data.coords.latitude,
    longitude: data.coords.longitude,
  }),
  share(),
);

export default locationObservable;
