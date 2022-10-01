import { Card } from '@fluentui/react-components/unstable';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';

interface GPSMapProps {
  height: number;
  latitude: number;
  longitude: number;
}

function GPSMap({ height, latitude, longitude }: GPSMapProps) {
  return (
    <Card style={{ height: height, width: "100%", padding: 0 }}>
      <MapContainer
        zoomControl={false}
        key={JSON.stringify([latitude, longitude])}
        center={[latitude, longitude]}
        zoom={13}
        maxZoom={15}
      >
        <TileLayer
          url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}@2x.png"
        />
        <Circle center={[latitude, longitude]} pathOptions={{ fillColor: 'blue' }} radius={30} />
      </MapContainer>
    </Card>
  );
}

export default GPSMap;