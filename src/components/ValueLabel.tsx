import Badge from '@/style-components/Badge';
import Text from '@/style-components/Text';

interface ValueLabelProps {
  labelName: string;
  labelColor: string;
  unit?: string;
  value?: number | string;
}

const defaultProps = {
  unit: '',
  value: '',
};

function ValueLabel({
  labelName, labelColor, unit, value,
}: ValueLabelProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginRight: '.5em',
      marginTop: '.5em',
      marginBottom: '.5em',
    }}
    >
      <Badge color={labelColor} />
      <div style={{ display: 'block', whiteSpace: 'nowrap' }}>
        <Text blod>{labelName}</Text>
        <span style={{ marginLeft: 5 }}>{value}</span>
        <Text>{unit}</Text>
      </div>
    </div>
  );
}

ValueLabel.defaultProps = defaultProps;

export default ValueLabel;
