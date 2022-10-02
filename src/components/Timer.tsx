import { useState, useEffect } from 'react';
import { Card } from '@fluentui/react-components/unstable';
import { LargeTitle, Title2, Text } from '@fluentui/react-components';

interface TimerProps {
  refTime: number;
}

const currentTime = () => new Date().toUTCString();

function Timer({ refTime }: TimerProps) {
  const [displayTime, setDisplayTime] = useState(currentTime);

  useEffect(() => {
    setInterval(() => {
      setDisplayTime(() => currentTime());
    }, 100);
  }, []);

  const padding = String(refTime.toFixed(0)).padStart(3, '0');
  const floating = (refTime - parseInt(padding, 10)).toFixed(1).slice(1);

  return (
    <Card appearance="subtle">
      <Text>{displayTime}</Text>
      <Text align="center">
        <LargeTitle block={false}>
          T+
          {padding}
        </LargeTitle>
        <Title2 block={false}>
          {floating}
          s
        </Title2>
      </Text>
    </Card>
  );
}

export default Timer;
