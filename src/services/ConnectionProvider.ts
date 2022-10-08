import { setConnection } from 'redux/reducer';
import store from 'redux/store';
import {
  retry, share, catchError, throwError, map,
} from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

const avionicIP = 'localhost';
const avionicPort = 8787;
const avionicURI = `ws://${avionicIP}:${avionicPort}`;

const ws = webSocket({
  url: avionicURI,
  deserializer: (msg) => msg,
}).pipe(share());

const connectionObservable = ws.pipe(
  catchError((err) => {
    store.dispatch(setConnection(false));
    return throwError(err);
  }),
  retry({ delay: 1000 }),
  map((data) => {
    store.dispatch(setConnection(true));
    return data;
  }),
  share(),
);

export default connectionObservable;
