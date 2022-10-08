import IDataVisual from 'interfaces/IDataVisual';
import { useState, useEffect } from 'react';
import DataVisualization from './components/DataVisualization';
import {
  temperatureObservable, altitudeObservable,
  velocityObservable, accelerationObservable,
} from './services/MessageProvider';

interface ChartProps {
  height: number;
}

function AltitudeChart({ height }: ChartProps) {
  const [data, setData] = useState<IDataVisual[]>([]);

  useEffect(() => {
    const subscription = altitudeObservable.subscribe((x) => {
      setData(
        (prev) => [...prev, { time: x.timestamp, value: x.sensorValue }],
      );
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <DataVisualization
      colors={['#1D7874']}
      keys={['value']}
      chartName="Altitude"
      unit="m"
      data={data}
      height={height}
    />
  );
}

function AccelerationChart({ height }: ChartProps) {
  const [data, setData] = useState<IDataVisual[]>([]);

  useEffect(() => {
    const subscription = accelerationObservable.subscribe((x) => {
      setData(
        (prev) => [...prev, { time: x.timestamp, value: x.sensorValue }],
      );
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <DataVisualization
      colors={['#45425A']}
      keys={['value']}
      chartName="Acceleration"
      unit="m/s²"
      data={data}
      height={height}
    />
  );
}

function TemperatureChart({ height }: ChartProps) {
  const [data, setData] = useState<IDataVisual[]>([]);

  useEffect(() => {
    const subscription = temperatureObservable.subscribe((x) => {
      setData(
        (prev) => [...prev, { time: x.timestamp, value: x.sensorValue }],
      );
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <DataVisualization
      colors={['#e65f5c']}
      keys={['value']}
      chartName="Temperature"
      unit="℃"
      data={data}
      height={height}
    />
  );
}

function VelocityChart({ height }: ChartProps) {
  const [data, setData] = useState<IDataVisual[]>([]);

  useEffect(() => {
    const subscription = velocityObservable.subscribe((x) => {
      setData(
        (prev) => [...prev, { time: x.timestamp, value: x.sensorValue }],
      );
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <DataVisualization
      colors={['#232e21']}
      keys={['value']}
      chartName="Velocity"
      unit="m/s"
      data={data}
      height={height}
    />
  );
}

export {
  AltitudeChart, AccelerationChart, TemperatureChart, VelocityChart,
};
