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
}

const initialState: IState = {
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
      if (!state.lock) state.launched = true;
    },
    abort: (state: IState) => {
      state.lock = true;
      state.launched = false;
    },
    setLocation: (state: IState, action) => {
      state.location = action.payload;
    },
  },
});

export const {
  unlock, lock, launch, setLocation, abort,
} = appReducer.actions;
export default appReducer.reducer;
