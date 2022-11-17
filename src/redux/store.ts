import { configureStore } from '@reduxjs/toolkit';
import countDownObservable from '@/services/TimeProvider';
import { sendMessage$ } from '@/services/ConnectionProvider';
import appReducer, { setTime } from './reducer';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

countDownObservable.subscribe(() => {
  if (store.getState().app.launched) {
    const now = store.getState().app.time + 100;
    if (now === 0) sendMessage$.next(new TextEncoder().encode('launch\n'));
    store.dispatch(setTime(now));
  }
});

export default store;
export type appState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
