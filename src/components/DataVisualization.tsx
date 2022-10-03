import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';
import { Card } from '@fluentui/react-components/unstable';
import { Subtitle2, Text } from '@fluentui/react-components';
import IDataVisual from 'interfaces/IDataVisual';

interface DataVisualProps {
  color: string;
  height: number;
  chartName: string;
  unit: string;
  data: IDataVisual[];
}

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
      <div
        style={{
          marginLeft: '1em',
          marginRight: '1em',
          marginTop: '.5em',
        }}
      >
        <Text block>
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
      </div>
      <ResponsiveContainer
        width="95%"
      >
        <LineChart
          data={data}
          margin={{
            top: 0, bottom: 0, left: -25, right: 0,
          }}
        >
          <Line type="monotone" dataKey="value" stroke={color} dot={false} />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default DataVisualization;
