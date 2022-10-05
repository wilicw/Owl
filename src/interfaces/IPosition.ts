interface ILocation {
  latitude: number;
  longitude: number;
}

const distance = (a: ILocation, b: ILocation):number => {
  const R = 6371e3;
  const latAR = (a.latitude * Math.PI) / 180;
  const latBR = (b.latitude * Math.PI) / 180;
  const dLat = ((a.latitude - b.latitude) * Math.PI) / 180;
  const dLong = ((a.longitude - b.longitude) * Math.PI) / 180;

  const haversine = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(latAR) * Math.cos(latBR)
      * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  return R * c;
};

export { distance };
export type { ILocation };
