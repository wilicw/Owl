import { Badge, Text } from '@fluentui/react-components';

interface ValueLabelProps {
  labelName: string;
  labelColor: string;
  unit?: string;
  value?: number | string;
}

function ValueLabel({ labelName, labelColor, unit, value }: ValueLabelProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginRight: '1em',
      marginTop: '.5em',
      marginBottom: '.5em',
    }}>
      <Badge
        shape='rounded'
        style={{
          backgroundColor: labelColor
        }}
      >
      </Badge>
      <Text style={{ marginLeft: 3, whiteSpace: 'nowrap' }}>
        <b>{labelName}</b>
        <span style={{ marginLeft: 5 }}>{value}</span>
        <Text size={200}>{unit}</Text>
      </Text>
    </div>
  );
}

export default ValueLabel;
