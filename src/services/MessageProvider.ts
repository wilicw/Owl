import {
  filter, mergeMap, Observable, share,
} from 'rxjs';
import connectionObservable from './ConnectionProvider';

interface Message {
  type: string;
  value: any;
}

const messageObservable: Observable<Message> = connectionObservable.pipe(
  filter((x) => x.data !== undefined),
  mergeMap((x) => [x.data.split(',').map((y:string) => y.split(','))]),
  mergeMap((x) => [{
    type: x[0],
    value: x.slice(1),
  }]),
  share(),
);

export default messageObservable;
