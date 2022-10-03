import {
  filter, map, mergeMap, Observable, share,
} from 'rxjs';
import connectionObservable from './ConnectionProvider';

enum MessageType {
  Temperature = 'TEMP',
  Altitude = 'ALTI',
  Velocity = 'VEL',
  Acceleration = 'ACCE',
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
  const timestamp = parseInt(valueArray[0], 10);
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

const messageObservable: Observable<Message> = connectionObservable.pipe(
  filter((x) => x.data !== undefined),
  mergeMap((x) => [x.data.trim().split(',').map((y: string) => y.split(','))]),
  mergeMap((x) => [{
    type: x[0][0],
    value: x.slice(1),
  }]),
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

export {
  messageObservable, temperatureObservable, altitudeObservable,
  velocityObservable, accelerationObservable,
};
