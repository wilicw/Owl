import { share, timer } from 'rxjs';

const countDownObservable = timer(0, 100).pipe(
  share(),
);

export default countDownObservable;
