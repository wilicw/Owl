import GPSMap from './components/GPSMap';
import { useEffect, useState } from 'react';

interface AutoMapProps {
  height: number
}

const AutoMap = ({ height }: AutoMapProps) => {
  const [position, setPosition] = useState({ lat: 0, long: 0 });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => setPosition({
        long: pos.coords.longitude,
        lat: pos.coords.latitude
      }))
    }
  }, [])
  return <GPSMap height={height} latitude={position.lat} longitude={position.long} />
}

export { AutoMap }