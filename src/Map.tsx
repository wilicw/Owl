import GPSMap from 'components/GPSMap';
import { useSelector } from 'react-redux';

interface AutoMapProps {
  height: number
}

function AutoMap({ height }: AutoMapProps) {
  const position = useSelector((state: any) => state.app.location);
  return <GPSMap height={height} latitude={position.latitude} longitude={position.longitude} />;
}

export default AutoMap;
