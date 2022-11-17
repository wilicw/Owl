import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';
import Card from '@/style-components/Card';
import Text from '@/style-components/Text';
import _ from 'lodash';
import IDataVisual from '@/interfaces/IDataVisual';
import Waiting from './Waiting';

interface DataVisualProps {
  height: number;
  chartName: string;
  unit: string;
  data: IDataVisual[];
  colors: string[];
  keys: string[];
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
  colors, height, chartName, unit, data, keys,
}: DataVisualProps) {
  const displayedValue: string = keys.length === 1 ? (data.length ? data[data.length - 1][keys[0]] : 0).toFixed(4) : '';
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
          paddingRight: 12,
        }}
      >
        <Text>
          {chartName}
        </Text>
        {
        keys.length === 1 ? (
          <>
            <Text style={{ float: 'right', marginLeft: 2 }}>
              {unit}
            </Text>
            <Text style={{ float: 'right' }}>
              {displayedValue}
            </Text>
          </>
        ) : null
      }
      </Text>
      {
        data.length ? (
          <ResponsiveContainer width="100%">
            <LineChart
              data={data}
              margin={{
                top: 0, bottom: -10, left: 0, right: 12,
              }}
            >
              { _.zip(keys, colors).map(([key, color]) => (
                <Line type="monotone" dataKey={key} stroke={color} dot={false} />
              ))}
              <CartesianGrid stroke="#ccc" />
              <XAxis
                dataKey="time"
                allowDecimals={false}
                type="number"
                domain={[0, 'dataMax']}
                tickFormatter={DataFormatter}
                style={{ fontSize: 12 }}
              />
              <YAxis tickFormatter={DataFormatter} width={40} style={{ fontSize: 12 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : <Waiting />
      }
    </Card>
  );
}

export default DataVisualization;
