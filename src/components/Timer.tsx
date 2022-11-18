import { useState, useEffect } from 'react';
import Container from '@/style-components/Container';
import Text from '@/style-components/Text';
import { useAppSelector } from '@/redux/hook';
import Clock from '@/style-components/Clock';

const currentTime = () => new Date().toUTCString();

function UTCTimer() {
  const [displayTime, setDisplayTime] = useState(currentTime);
  useEffect(() => {
    setInterval(() => {
      setDisplayTime(() => currentTime());
    }, 1000);
  }, []);
  return <Text>{displayTime}</Text>;
}

function Timer() {
  const refTime = useAppSelector((state) => state.app.time);
  const isLaunch = useAppSelector((state) => state.app.launched);

  const refTimerString = Math.abs(refTime / 1000).toFixed(1).split('.');
  const padding = refTimerString[0].padStart(3, '0');
  const floating = refTimerString[1];

  let timerColor = '#bbb';
  if (isLaunch) {
    if (refTime < 0) timerColor = '#bc2f32';
    else timerColor = 'green';
  }

  return (
    <Container>
      <UTCTimer />
      <Clock color={timerColor} style={{ marginTop: 8 }}>
        T
        {refTime < 0 ? '-' : '+'}
        {padding}
        <span style={{ fontSize: '30px' }}>
          .
          {floating}
          s
        </span>
        {' '}

      </Clock>
    </Container>
  );
}

export default Timer;
