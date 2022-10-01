import React from 'react';
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

interface MissionPanelProps {
  missionName: string;
  rocketType: string;
  motorType: string;
  avionicType: string;
  message: string;
}

function MissionPanel({ missionName, rocketType, motorType, avionicType, message }: MissionPanelProps) {
  return (
    <Card>
      <div>
        <Title2 block align='center'>{ missionName}</Title2>
        <Separator />
        <Subtitle1 block>Rocket Type</Subtitle1>
        <Body1 block>{ rocketType}</Body1>
        <Separator />
        <Subtitle1 block>Motor Type</Subtitle1>
        <Body1 block>{motorType}</Body1>
        <Separator />
        <Subtitle1 block>Avionic Type</Subtitle1>
        <Body1 block>{avionicType}</Body1>
      </div>
      <Label>Message:</Label>
      <Textarea
        size='small'
        readOnly={true}
        value={message}
        resize='vertical'
      />
      <CompoundButton
        size='large'
        appearance='primary'
        secondaryContent="Unlock before launching"
        disabled={true}
      >
        Launch
      </CompoundButton>
      <Button>Unlock</Button>
    </Card>
  );
}

export default MissionPanel;
