import Card from '@/style-components/Card';
import Text from '@/style-components/Text';
// import {
//   CompoundButton,
//   Textarea,
//   Label,
//   Button,
// } from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  abort, lock, unlock, launch, stop,
} from '@/redux/reducer';
import Separator from '@/style-components/Separator';

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
  const dispatch = useAppDispatch();
  const isLock = useAppSelector((state) => state.app.lock);
  const isLaunch = useAppSelector((state) => state.app.launched);
  const time = useAppSelector((state) => state.app.time);

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
      <textarea />
      {
      time > 0 ? (
        <>
          <button>
            Parachute Deploy
          </button>
          <button onClick={() => dispatch(stop())}>Stop</button>
        </>
      ) : (
        <>
          <button
            style={{ backgroundColor: isLaunch ? '#bc2f32' : '' }}
            disabled={isLock}
            onClick={() => dispatch(isLaunch ? abort() : launch())}
          >
            {isLaunch ? 'Abort' : 'Launch'}
          </button>
          <button onClick={() => dispatch(isLock ? unlock() : lock())} disabled={isLaunch}>{isLock ? 'Unlock' : 'Lock'}</button>
        </>
      )
    }
    </Card>
  );
}
// secondaryContent={isLock ? 'Unlock before launching' : ''}

export default MissionPanel;
