import ValueLabel from '@/components/ValueLabel';
import { useAppSelector } from '@/redux/hook';

function AvionicConnectionLabel() {
  const isConnect = useAppSelector((state) => state.app.connect);
  return (
    <ValueLabel
      labelColor={isConnect ? '#7DCD85' : '#FF6B6B'}
      labelName="Avionic Status"
      unit=""
      value={isConnect ? 'Connect' : 'Disconnect'}
    />
  );
}

export default AvionicConnectionLabel;
