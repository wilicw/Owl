import Card from '@/style-components/Card';
import Text from '@/style-components/Text';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  abort, lock, unlock, launch, stop,
  setPort,
} from '@/redux/reducer';
import Separator from '@/style-components/Separator';
import { sendMessage$ } from '@/services/ConnectionProvider';
import React, { useState, useRef, useEffect } from 'react';
import Button from '@/style-components/Button';

interface MissionPanelProps {
  missionName: string;
  rocketType: string;
  motorType: string;
  avionicType: string;
  message: string;
  clearHandle: () => void;
}

function MissionPanel({
  missionName, rocketType, motorType, avionicType, message, clearHandle,
}: MissionPanelProps) {
  const [command, setCommand] = useState('');
  const dispatch = useAppDispatch();
  const isLock = useAppSelector((state) => state.app.lock);
  const isLaunch = useAppSelector((state) => state.app.launched);
  const time = useAppSelector((state) => state.app.time);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const area = textRef.current;
    if (area) area.scrollTop = area.scrollHeight;
  }, [message]);

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

  const commandAction = (e: React.FormEvent<HTMLFormElement>) => {
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
      <div>
        <Text>Message:</Text>
        <Text onClick={clearHandle} style={{ float: 'right', cursor: 'pointer' }}>clear</Text>
      </div>
      <div>
        <textarea
          style={{
            width: '100%', height: 150,
          }}
          readOnly
          value={message}
          ref={textRef}
        />
        <form onSubmit={commandAction}>
          <input
            id="cmd"
            name="command"
            type="text"
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCommand(() => e.target.value)}
            style={{ width: '100%', height: 20 }}
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
            style={{
              backgroundColor: isLaunch ? '#bc2f32' : '#72B01D',
              display: isLock ? 'none' : '',
            }}
            onClick={isLaunch ? abortAction : launchAction}
          >
            {isLaunch ? 'Abort' : 'Launch'}
          </Button>
          <Button onClick={isLock ? unlockAction : lockAction} disabled={isLaunch} style={{ display: isLaunch ? 'none' : '' }}>
            {isLock ? 'Unlock' : 'Lock'}
          </Button>
        </>
      )
    }

      {
        navigator?.serial ? (
          <Button
            style={{ width: '100%', backgroundColor: '#454955' }}
            onClick={async () => dispatch(setPort(await navigator.serial.requestPort()))}
          >
            Serial Port
          </Button>
        ) : <Text block align="center">Web Serial API is not available</Text>
      }
    </Card>
  );
}

export default MissionPanel;
