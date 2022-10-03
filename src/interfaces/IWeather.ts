interface ICloud {
  cloud: string;
  distance: number;
}

interface IWind {
  direction: string;
  speed: number;
}

interface IWeather {
  station: string;
  temperature: number;
  time: number;
  wind: IWind;
  visibility: number;
  dew: number;
  pressure: number;
  sky: ICloud[],
  weather: string;
}

export type { ICloud, IWeather, IWind };
