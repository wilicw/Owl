import {
  Button, Input, InputProps,
} from '@fluentui/react-components';
import { Modal } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { setWSURL } from 'redux/reducer';
import { Card } from 'rebass';

function ConnectionConfig() {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const avionicURI = useAppSelector((state) => state.app.wsURL);
  const dispatch = useAppDispatch();

  const onChange: InputProps['onChange'] = (e, data) => dispatch(setWSURL(data.value));

  return (
    <div style={{ paddingTop: 12 }}>
      <Button onClick={showModal} style={{ width: '100%' }}>
        {avionicURI}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onDismiss={hideModal}
      >
        <div style={{ padding: '1em' }}>
          <Card>
            <p>Connection Configeration</p>
            <Input
              style={{
                width: '100%',
                padding: 2,
              }}
              value={avionicURI}
              onChange={onChange}
            />
          </Card>
        </div>
      </Modal>
    </div>
  );
}

export default ConnectionConfig;
