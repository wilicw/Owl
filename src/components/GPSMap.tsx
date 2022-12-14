import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import Card from '@/style-components/Card';
import Waiting from './Waiting';

interface GPSMapProps {
  height: number;
  latitude: number;
  longitude: number;
}

function GPSMap({ height, latitude, longitude }: GPSMapProps) {
  return (
    <Card style={{ height, width: '100%', padding: 0 }}>
      {Number.isNaN(latitude) && Number.isNaN(longitude)
        ? <Waiting />
        : (
          <MapContainer
            zoomControl={false}
            key={JSON.stringify([latitude, longitude])}
            center={[latitude, longitude]}
            attributionControl={false}
            zoom={15}
          >
            <TileLayer
              url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
            />
            <TileLayer
              url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}@2x.png"
            />
            <Circle center={[latitude, longitude]} pathOptions={{ fillColor: 'blue' }} radius={30} />
          </MapContainer>
        )}
    </Card>
  );
}

export default GPSMap;
