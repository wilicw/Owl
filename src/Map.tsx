import { useEffect, useState } from 'react';
import GPSMap from 'components/GPSMap';
import locationObservable from 'services/LocationProvider';
import { ILocation } from 'interfaces/IPosition';

interface AutoMapProps {
  height: number
}

function AutoMap({ height }: AutoMapProps) {
  const [position, setPosition] = useState<ILocation>({ latitude: 0, longitude: 0 });
  useEffect(() => {
    const subscription = locationObservable.subscribe(setPosition);
    return () => subscription.unsubscribe();
  }, []);
  return <GPSMap height={height} latitude={position.latitude} longitude={position.longitude} />;
}

export default AutoMap;
