import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducer';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
export type appState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
