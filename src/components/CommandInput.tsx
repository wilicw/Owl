import { sendMessage$ } from '@/services/ConnectionProvider';
import React, { useState } from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

function CommandInput() {
  const getHistoryArray = () => JSON.parse(localStorage.getItem('command_history') || '[]');

  const [command, setCommand] = useState('');
  const [cmdptr, setCmdptr] = useState<number>(getHistoryArray().length);

  const historyAppend = (c:string) => {
    const history = getHistoryArray();
    if (history.at(-1) !== c) {
      localStorage.setItem('command_history', JSON.stringify(history.concat([c])));
      setCmdptr(() => history.length + 1);
    }
  };

  const commandAction = () => {
    const trimed = command.trim();
    if (trimed.length !== 0) {
      sendMessage$.next(new TextEncoder().encode(`${trimed}\n`));
      historyAppend(trimed);
    }
    setCommand(() => '');
  };

  const commandHistory = (e: React.KeyboardEvent) => {
    const history = getHistoryArray();
    switch (e.key) {
      case 'ArrowUp':
        setCmdptr((p) => (p ? p - 1 : 0));
        setCommand(() => history.at(cmdptr ? cmdptr - 1 : 0));
        e.preventDefault();
        break;
      case 'ArrowDown':
        setCmdptr((p) => Math.min(p + 1, history.length));
        setCommand(() => history.at(cmdptr + 1) || '');
        e.preventDefault();
        break;
      case 'Enter':
        commandAction();
        e.preventDefault();
        break;
      case 'Tab':
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <TextInput
      Component="input"
      id="cmd"
      name="command"
      type="text"
      onChange={(e: string) => setCommand(() => e)}
      onKeyDown={commandHistory}
      style={{ width: '100%', height: 20 }}
      value={command}
      placeholder="Enter command..."
      trigger={['', 'config ', 'config set ', 'pid ']}
      options={{
        '': ['launch', 'config', 'pid', 'preLaunch', 'list', 'rocket', 'init', 'restart', 'stop', 'open'],
        'config ': ['set'],
        'config set ': ['rtime', 'stime', 'kp', 'ki', 'kd', 'bldc_init', 'gy_target', 'speed_limit'],
        'pid ': ['on', 'off'],
      }}
      spacer=""
    />
  );
}

export default CommandInput;
