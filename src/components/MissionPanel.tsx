import Card from '@/style-components/Card';
import Text from '@/style-components/Text';
import { Button } from 'rebass';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  abort, lock, unlock, launch, stop,
} from '@/redux/reducer';
import Separator from '@/style-components/Separator';
import { sendMessage$ } from '@/services/ConnectionProvider';
import { Input, Textarea } from '@rebass/forms';
import { useState } from 'react';

interface MissionPanelProps {
  missionName: string;
  rocketType: string;
  motorType: string;
  avionicType: string;
  message: string;
}

function MissionPanel({
  missionName, rocketType, motorType, avionicType, message,
}: MissionPanelProps) {
  const [command, setCommand] = useState('');
  const dispatch = useAppDispatch();
  const isLock = useAppSelector((state) => state.app.lock);
  const isLaunch = useAppSelector((state) => state.app.launched);
  const time = useAppSelector((state) => state.app.time);

  const unlockAction = () => {
    sendMessage$.next(new TextEncoder().encode('stream\n'));
    sendMessage$.next(new TextEncoder().encode('preLaunch\n'));
    dispatch(unlock());
  };

  const lockAction = () => {
    dispatch(lock());
  };

  const stopAction = () => {
    sendMessage$.next(new TextEncoder().encode('stop\n'));
    dispatch(stop());
  };

  const launchAction = () => {
    dispatch(launch());
  };

  const abortAction = () => {
    dispatch(abort());
  };

  const parachuteAction = () => {
    sendMessage$.next(new TextEncoder().encode('open\n'));
  };

  const commandAction = (e) => {
    console.log(`Send:${command}`);
    sendMessage$.next(new TextEncoder().encode('nostream\n'));
    sendMessage$.next(new TextEncoder().encode(`${command}\n`));
    sendMessage$.next(new TextEncoder().encode('stream\n'));
    setCommand(() => '');
    e.preventDefault();
  };

  return (
    <Card>
      <div>
        <Text block blod align="center">{missionName}</Text>
        <Separator />
        <Text block blod>Rocket Type</Text>
        <Text block>{rocketType}</Text>
        <Separator />
        <Text block blod>Motor Type</Text>
        <Text block>{motorType}</Text>
        <Separator />
        <Text block blod>Avionic Type</Text>
        <Text block>{avionicType}</Text>
      </div>
      <Text>Message:</Text>
      <div style={{
        marginTop: '1em', marginBottom: '1em',
      }}
      >
        <Textarea
          style={{
            width: '100%', height: 150,
          }}
          readonly
          value={message}
        />
        <br />
        <form onSubmit={commandAction}>
          <Input
            id="cmd"
            name="command"
            type="text"
            onChange={(e) => setCommand(() => e.target.value)}
            value={command}
            placeholder="Enter command..."
          />
        </form>
      </div>
      {
      time > 0 ? (
        <>
          <Button onClick={parachuteAction}>
            Parachute Deploy
          </Button>
          <Button onClick={stopAction}>Stop</Button>
        </>
      ) : (
        <>
          <Button
            color={isLaunch ? '#bc2f32' : '#005C69'}
            variant="primary"
            disabled={isLock}
            onClick={isLaunch ? abortAction : launchAction}
          >
            {isLaunch ? 'Abort' : 'Launch'}
          </Button>
          <Button variant="primary" onClick={isLock ? unlockAction : lockAction} disabled={isLaunch}>
            {isLock ? 'Unlock' : 'Lock'}
          </Button>
        </>
      )
    }
    </Card>
  );
}
// secondaryContent={isLock ? 'Unlock before launching' : ''}

export default MissionPanel;
