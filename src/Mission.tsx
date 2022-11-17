import { useEffect, useState } from 'react';
import MissionPanel from './components/MissionPanel';
import connectionObservable from './services/ConnectionProvider';

function Mission() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const subscription = connectionObservable.subscribe((x) => {
      if (x.split(',').length < 14) {
        setMessage((m) => m.concat(x).concat('\n'));
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <MissionPanel
      missionName="Flight Test 2022 Oct 1"
      rocketType="BlueShark"
      motorType="BlueShark"
      avionicType="ESP8266"
      message={message}
    />
  );
}

export default Mission;
