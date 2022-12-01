import Webcam from 'react-webcam';
import Card from '@/style-components/Card';
import { useEffect, useRef, useState } from 'react';

interface CameraCardProp {
  height: number;
}

function CameraCard({ height }:CameraCardProp) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    if (ref.current) setWidth(ref.current.offsetWidth);
  }, [ref.current]);

  return (
    <Card ref={ref} style={{ height, padding: 0 }}>
      <Webcam
        screenshotQuality={1}
        videoConstraints={{
          width,
          height,
        }}
      />
    </Card>
  );
}

export default CameraCard;
