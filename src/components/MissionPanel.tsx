import Card from '@/style-components/Card';
import Text from '@/style-components/Text';
import { Button } from 'rebass';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  abort, lock, unlock, launch, stop,
} from '@/redux/reducer';
import Separator from '@/style-components/Separator';
import { sendMessage$ } from '@/services/ConnectionProvider';

interface MissionPanelProps {
  missionName: string;
  rocketType: string;
  motorType: string;
  avionicType: string;
}

function MissionPanel({
  missionName, rocketType, motorType, avionicType,
}: MissionPanelProps) {
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
      <textarea style={{ marginTop: '1em', marginBottom: '1em' }} />
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
