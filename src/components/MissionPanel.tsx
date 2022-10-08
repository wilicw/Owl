import { Card } from '@fluentui/react-components/unstable';
import {
  Title2,
  Subtitle1,
  Body1,
  CompoundButton,
  Textarea,
  Label,
  Button,
} from '@fluentui/react-components';
import { Separator } from '@fluentui/react/lib/Separator';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  abort, lock, unlock, launch, stop,
} from 'redux/reducer';

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
        <Title2 block align="center">{missionName}</Title2>
        <Separator />
        <Subtitle1 block>Rocket Type</Subtitle1>
        <Body1 block>{rocketType}</Body1>
        <Separator />
        <Subtitle1 block>Motor Type</Subtitle1>
        <Body1 block>{motorType}</Body1>
        <Separator />
        <Subtitle1 block>Avionic Type</Subtitle1>
        <Body1 block>{avionicType}</Body1>
      </div>
      <Label>Message:</Label>
      <Textarea
        size="small"
        readOnly
        value={message}
        resize="vertical"
      />
      {
      time > 0 ? (
        <>
          <CompoundButton
            size="large"
            appearance="primary"
          >
            Parachute Deploy
          </CompoundButton>
          <Button onClick={() => dispatch(stop())}>Stop</Button>
        </>
      ) : (
        <>
          <CompoundButton
            size="large"
            appearance="primary"
            style={{ backgroundColor: isLaunch ? '#bc2f32' : '' }}
            secondaryContent={isLock ? 'Unlock before launching' : ''}
            disabled={isLock}
            onClick={() => dispatch(isLaunch ? abort() : launch())}
          >
            {isLaunch ? 'Abort' : 'Launch'}
          </CompoundButton>
          <Button onClick={() => dispatch(isLock ? unlock() : lock())} disabled={isLaunch}>{isLock ? 'Unlock' : 'Lock'}</Button>
        </>
      )
    }
    </Card>
  );
}

export default MissionPanel;
