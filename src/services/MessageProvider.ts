import {
  filter, map, mergeMap, Observable, share, tap,
} from 'rxjs';
import connectionObservable from './ConnectionProvider';

enum MessageType {
  Temperature = 'TEMP',
  Altitude = 'ALTI',
  Velocity = 'VEL',
  Acceleration = 'ACCE',
  Gyroscope = 'GYRO',
}

interface Message {
  type: string;
  value: string[][];
}

interface GeneralSensorMessage extends Message {
  sensor: number;
  sensorValue: number;
  timestamp: number;
}

const generalSensorParser = (message: Message): GeneralSensorMessage => {
  const valueArray = message.value.flat();
  const timestamp = parseInt(valueArray[0], 10) / 1000;
  const sensorID = parseInt(valueArray[1], 10);
  const value = parseFloat(valueArray[2]);
  return {
    type: message.type,
    value: message.value,
    sensor: sensorID,
    sensorValue: value,
    timestamp,
  };
};

const netAcce = (x: number, y: number, z:number) => Math.sqrt(x * x + y * y + z * z);

const messageObservable: Observable<Message> = connectionObservable.pipe(
  mergeMap((x) => [x?.split(',')]),
  mergeMap((x) => {
    if (x === undefined) return x;
    const timestamp = x[1];
    return [
      {
        type: MessageType.Altitude,
        value: [timestamp, '0', x[2]],
      },
      {
        type: MessageType.Velocity,
        value: [timestamp, '0', x[4]],
      },
      {
        type: MessageType.Acceleration,
        value: [timestamp, '0', netAcce(parseFloat(x[5]), parseFloat(x[6]), parseFloat(x[7]))],
      },
    ];
  }),
  filter((x) => x !== undefined),
  share(),
);

const temperatureObservable: Observable<GeneralSensorMessage> = messageObservable.pipe(
  filter((message) => message.type === MessageType.Temperature),
  map(generalSensorParser),
);

const altitudeObservable: Observable<GeneralSensorMessage> = messageObservable.pipe(
  filter((message) => message.type === MessageType.Altitude),
  map(generalSensorParser),
);

const velocityObservable: Observable<GeneralSensorMessage> = messageObservable.pipe(
  filter((message) => message.type === MessageType.Velocity),
  map(generalSensorParser),
);

const accelerationObservable: Observable<GeneralSensorMessage> = messageObservable.pipe(
  filter((message) => message.type === MessageType.Acceleration),
  map(generalSensorParser),
);

const gyroscopeObservable: Observable<GeneralSensorMessage> = messageObservable.pipe(
  filter((message) => message.type === MessageType.Gyroscope),
  map(generalSensorParser),
);

export {
  messageObservable, temperatureObservable, altitudeObservable,
  velocityObservable, accelerationObservable,
};
