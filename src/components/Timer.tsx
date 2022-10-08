import { useState, useEffect } from 'react';
import { Card } from '@fluentui/react-components/unstable';
import { LargeTitle, Title2, Text } from '@fluentui/react-components';
import { useAppSelector } from 'redux/hook';

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

  let timerColor = '#bbb';
  if (isLaunch) {
    if (refTime < 0) timerColor = '#bc2f32';
    else timerColor = 'green';
  }

  const refTimerString = Math.abs(refTime / 1000).toFixed(1).split('.');
  const padding = refTimerString[0].padStart(3, '0');
  const floating = refTimerString[1];

  return (
    <Card appearance="subtle">
      <UTCTimer />
      <Text
        align="center"
        style={{
          color: timerColor,
        }}
      >
        <LargeTitle block={false} style={{ fontFamily: 'monospace' }}>
          T
          {refTime < 0 ? '-' : '+'}
          {padding}
        </LargeTitle>
        <Title2 block={false} style={{ fontFamily: 'monospace' }}>
          .
          {floating}
          s
        </Title2>
      </Text>
    </Card>
  );
}

export default Timer;
