import { configureStore } from '@reduxjs/toolkit';
import countDownObservable from '@/services/TimeProvider';
import appReducer, { setTime } from './reducer';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

countDownObservable.subscribe(() => {
  if (store.getState().app.launched) {
    const now = store.getState().app.time + 100;
    store.dispatch(setTime(now));
  }
});

export default store;
export type appState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
