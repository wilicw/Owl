import { ILocation } from './IPosition';

interface ICloud {
  cloud: string;
  distance: number;
}

interface IWind {
  direction: number;
  speed: number;
}

interface IWeather {
  station: string;
  temperature: number;
  wind: IWind;
  location: ILocation;
}

export type { ICloud, IWeather, IWind };
