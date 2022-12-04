import { useState, useEffect } from 'react';
import IDataVisual from '@/interfaces/IDataVisual';
import DataVisualization from '@/components/DataVisualization';
import {
  temperatureObservable, altitudeObservable,
  velocityObservable, accelerationObservable, gyroscopeObservable,
} from '@/services/MessageProvider';

interface ChartProps {
  height: number;
}

function AltitudeChart({ height }: ChartProps) {
  const [data, setData] = useState<IDataVisual[]>([]);

  useEffect(() => {
    const subscription = altitudeObservable.subscribe((x) => {
      setData(
        (prev) => [...prev, { time: x.timestamp, value: x.sensorValue[0] }],
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
        (prev) => [...prev, { time: x.timestamp, value: x.sensorValue[0] }],
      );
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <DataVisualization
      colors={['#45425A']}
      keys={['value']}
      chartName="Acceleration"
      unit="g"
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
        (prev) => [...prev, { time: x.timestamp, value: x.sensorValue[0] }],
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
        (prev) => [...prev, { time: x.timestamp, value: x.sensorValue[0] }],
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

function GyroChart({ height }: ChartProps) {
  const [data, setData] = useState<IDataVisual[]>([]);

  useEffect(() => {
    const subscription = gyroscopeObservable.subscribe((x) => {
      setData(
        (prev) => [...prev, {
          time: x.timestamp,
          x: x.sensorValue[0],
          y: x.sensorValue[1],
          z: x.sensorValue[2],
        }],
      );
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <DataVisualization
      colors={['#5FAD41', '#FA7921', '#2892D7']}
      keys={['x', 'y', 'z']}
      chartName="Gyroscope"
      unit="rad/s"
      data={data}
      height={height}
    />
  );
}

export {
  AltitudeChart, AccelerationChart, TemperatureChart, VelocityChart, GyroChart,
};
