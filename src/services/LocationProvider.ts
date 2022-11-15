import { Observable } from 'rxjs';
import { ILocation } from '@/interfaces/IPosition';

const locationObservable = new Observable<ILocation>((observer) => {
  navigator.geolocation.getCurrentPosition((position) => {
    observer.next(<ILocation>{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    observer.complete();
  }, observer.error.bind(observer));
});

export default locationObservable;
