import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';

const stageDict: {[key: string]: number} = {
  "Ground": 1,
  "Ignition": 0.1,
  "Launch": 0.3,
  "Apogee": 0.7,
  "Landing": 0.9,
};

interface ProgressBarProps {
  stage: string;
};

function ProgressBar({ stage }: ProgressBarProps) {
  return (
    <ProgressIndicator
      label={stage}
      percentComplete={stageDict[stage]}
    />
  );
}

export default ProgressBar;
