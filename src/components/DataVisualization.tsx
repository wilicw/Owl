import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';
import { Card } from '@fluentui/react-components/unstable';
import { Spinner, Subtitle2, Text } from '@fluentui/react-components';
import IDataVisual from 'interfaces/IDataVisual';

interface DataVisualProps {
  color: string;
  height: number;
  chartName: string;
  unit: string;
  data: IDataVisual[];
}

const DataFormatter = (n: number) => {
  let buffer = n < 0 ? '-' : '';
  const absN = Math.abs(n);
  if (absN >= 1000000000000) {
    buffer += `${(absN / 1000000000000).toString()}T`;
  } else if (absN >= 1000000000) {
    buffer += `${(absN / 1000000000).toString()}G`;
  } else if (absN >= 1000000) {
    buffer += `${(absN / 1000000).toString()}M`;
  } else if (absN >= 1000) {
    buffer += `${(absN / 1000).toString()}K`;
  } else {
    buffer += absN.toString();
  }
  return buffer;
};

function DataVisualization({
  color, height, chartName, unit, data,
}: DataVisualProps) {
  const displayedValue: string = (data.length ? data[data.length - 1].value : 0).toFixed(4);
  return (
    <Card
      style={{
        padding: 0,
        height,
      }}
    >
      <Text
        block
        style={{
          paddingLeft: 12,
          paddingTop: 6,
          paddingRight: 12,
          paddingBottom: 0,
        }}
      >
        <Subtitle2>
          {chartName}
        </Subtitle2>
        <Subtitle2 style={{ float: 'right', marginLeft: 2 }}>
          {unit}
        </Subtitle2>
        <Subtitle2 style={{ float: 'right' }}>
          {displayedValue}
        </Subtitle2>
      </Text>
      {
        data.length ? (
          <ResponsiveContainer width="100%">
            <LineChart
              data={data}
              margin={{
                top: 0, bottom: 0, left: 0, right: 12,
              }}
            >
              <Line type="monotone" dataKey="value" stroke={color} dot={false} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="time" allowDecimals={false} type="number" domain={[0, 'dataMax']} tickFormatter={DataFormatter} />
              <YAxis tickFormatter={DataFormatter} width={40} />
            </LineChart>
          </ResponsiveContainer>
        ) : <Spinner style={{ height: '100%' }} label="Waiting Data..." />
      }
    </Card>
  );
}

export default DataVisualization;
