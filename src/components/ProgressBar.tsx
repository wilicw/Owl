import Text from '@/style-components/Text';

const stageDict: {[key: string]: number} = {
  Ground: 1,
  Ignition: 0.1,
  Launch: 0.3,
  Apogee: 0.7,
  Landing: 0.9,
};

interface ProgressBarProps {
  stage: string;
}

function ProgressBar({ stage }: ProgressBarProps) {
  return (
    <div style={{ marginBottom: '1em' }}>
      <Text block>{stage}</Text>
      <div style={{
        margin: 5,
        height: 2,
        width: '100%',
        backgroundColor: '#DDD',
        padding: 0,
        display: 'block',
      }}
      >
        <div style={{
          height: 2,
          padding: 0,
          margin: 0,
          backgroundColor: '#0FA3B1',
          width: `calc(${stageDict[stage]} * 100%)`,
        }}
        />
      </div>
    </div>
  );
}
// <fullBar precent={stageDict[stage]} />

export default ProgressBar;
