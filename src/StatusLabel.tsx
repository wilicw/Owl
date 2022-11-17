import ValueLabel from '@/components/ValueLabel';
import { useState, useEffect } from 'react';
import { statusObservable } from './services/MessageProvider';

function StatusLabel() {
  const [status, setStatus] = useState('Unknown');

  useEffect(() => {
    const subscription = statusObservable.subscribe((x) => {
      const now = x.flat()[2];
      if (now === 'f') {
        setStatus(() => 'Flight');
      } else if (now === 's') {
        setStatus(() => 'Stop');
      } else {
        setStatus(() => 'Unknown');
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <ValueLabel
      labelColor="#320E3B"
      labelName="Status"
      unit=""
      value={status}
    />
  );
}

export default StatusLabel;
