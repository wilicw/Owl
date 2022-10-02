import { useState, useEffect } from 'react';
import messageObservable from 'services/MessageProvider';
import DataVisualization from './components/DataVisualization';

interface ChartProps {
  height: number;
}

function AltitudeChart({ height }: ChartProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const subscription = messageObservable.subscribe((x) => {
      setData(
        (prev) => [...prev, { time: parseInt(x.value[0], 10), value: parseFloat(x.value[2]) }],
      );
    });
    setData(data.concat([]));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <DataVisualization
      color="#1D7874"
      chartName="Altitude"
      unit="m"
      data={data}
      height={height}
    />
  );
}

// eslint-disable-next-line import/prefer-default-export
export { AltitudeChart };
