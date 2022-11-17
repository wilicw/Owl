import {
  retry, share, catchError, throwError, map, Subject, interval, filter, take, mergeMap, map, filter,
} from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import store from '@/redux/store';
import { setConnection } from '@/redux/reducer';
import { fromWebSerial } from '@rxjs-ninja/rxjs-utility';

const sendMessage$ = new Subject<Uint8Array>();

const avionicURI = store.getState().app.wsURL;

const ws = webSocket({
  url: avionicURI,
  deserializer: (msg) => msg,
}).pipe(share());

let buffer = '';
const msgRegex = />>>([^><]*)<<</;

const connectionObservable = interval(1000)
  .pipe(
    filter(() => store.getState().app.port),
    take(1),
    mergeMap(() => fromWebSerial(
      store.getState().app.port,
      sendMessage$.asObservable(),
      { baudRate: 115200 },
      undefined,
    )),
    share(),
  )
  .pipe(
    catchError((err) => {
      store.dispatch(setConnection(false));
      console.log(err);
      return throwError(err);
    }),
    retry({ delay: 1000 }),
    map((data) => {
      store.dispatch(setConnection(true));
      return new TextDecoder().decode(data);
    }),
    share(),
    map((x) => {
      buffer += x;
      const arr = buffer.match(msgRegex);
      buffer = buffer.replace(msgRegex, '');
      if (arr) return arr[0].replace('>>>', '').replace('<<<', '').trim();
      return null;
    }),
    filter((x) => x != null),
  );

export default connectionObservable;
export { sendMessage$ };
