import { createSlice } from '@reduxjs/toolkit';
import { ILocation } from 'interfaces/IPosition';

interface IState {
  rocket: string;
  motor: string;
  avionic: string;
  version: string;
  launched: boolean;
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
};

const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    launch: (state: IState, action) => {
      state.launched = action.payload;
    },
    setLocation: (state: IState, action) => {
      state.location = action.payload;
    },
  },
});

export const { launch, setLocation } = appReducer.actions;
export default appReducer.reducer;
