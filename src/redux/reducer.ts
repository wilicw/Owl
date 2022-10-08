import { createSlice } from '@reduxjs/toolkit';
import { ILocation } from 'interfaces/IPosition';

interface IState {
  rocket: string;
  motor: string;
  avionic: string;
  version: string;
  launched: boolean;
  lock: boolean;
  location: ILocation;
  time: number;
  connect: boolean;
}

const initialTime = -10 * 1000;

const initialState: IState = {
  time: initialTime,
  rocket: '',
  motor: '',
  avionic: '',
  version: '0.0.0',
  location: {
    latitude: NaN,
    longitude: NaN,
  },
  launched: false,
  lock: true,
  connect: false,
};

const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    unlock: (state: IState) => {
      state.lock = false;
    },
    lock: (state: IState) => {
      state.lock = true;
    },
    launch: (state: IState) => {
      if (!state.lock) { state.launched = true; }
    },
    abort: (state: IState) => {
      state.lock = true;
      state.launched = false;
      state.time = initialTime;
    },
    setLocation: (state: IState, action) => {
      state.location = action.payload;
    },
    setTime: (state: IState, action) => {
      state.time = action.payload;
    },
    stop: (state: IState) => {
      state.launched = false;
      state.lock = true;
    },
    setConnection: (state: IState, action) => {
      state.connect = action.payload;
    },
  },
});

export const {
  unlock, lock, launch, setLocation, abort, setTime, stop, setConnection,
} = appReducer.actions;
export default appReducer.reducer;
