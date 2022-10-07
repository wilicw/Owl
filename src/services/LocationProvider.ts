import { ILocation } from 'interfaces/IPosition';
import { Observable } from 'rxjs';

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
