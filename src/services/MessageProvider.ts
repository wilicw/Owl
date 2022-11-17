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
  value: [string, Array<any>, Array<any>];
}

interface GeneralSensorMessage extends Message {
  sensor: Array<number>;
  sensorValue: Array<number>;
  timestamp: number;
}

const generalSensorParser = (message: Message): GeneralSensorMessage => {
  const valueArray = message.value;
  const timestamp = parseInt(valueArray[0], 10) / 1000;
  const sensorID = valueArray[1].map((x) => parseFloat(x));
  const value = valueArray[2].map((x) => parseFloat(x));
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
  mergeMap((x) => [x.split(',')]),
  mergeMap((x): Message[] => {
    if (x === undefined) return x;
    const timestamp = x[1];
    return [
      {
        type: MessageType.Altitude,
        value: [timestamp, ['0'], [x[2]]],
      },
      {
        type: MessageType.Velocity,
        value: [timestamp, ['0'], [x[4]]],
      },
      {
        type: MessageType.Acceleration,
        value: [timestamp, ['0'], [netAcce(parseFloat(x[5]), parseFloat(x[6]), parseFloat(x[7]))]],
      },
      {
        type: MessageType.Gyroscope,
        value: [timestamp, ['x', 'y', 'z'], [x[8], x[9], x[10]]],
      },
    ];
  }),
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
  velocityObservable, accelerationObservable, gyroscopeObservable,
};
