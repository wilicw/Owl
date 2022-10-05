import {
  retry, share,
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
  retry({ delay: 1000 }),
  share(),
);

export default connectionObservable;
