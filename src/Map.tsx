import GPSMap from '@/components/GPSMap';
import { useAppSelector } from '@/redux/hook';

interface AutoMapProps {
  height: number
}

function AutoMap({ height }: AutoMapProps) {
  const position = useAppSelector((state) => state.app.location);
  return <GPSMap height={height} latitude={position.latitude} longitude={position.longitude} />;
}

export default AutoMap;
