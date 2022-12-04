import Card from '@/style-components/Card';
import { Canvas } from 'react-three-fiber';

interface Rocket3DProp {
  height: number;
}

function Rocket3D({ height }:Rocket3DProp) {
  return (
    <Card style={{ height, padding: 0 }}>
      <Canvas />
    </Card>
  );
}

export default Rocket3D;
