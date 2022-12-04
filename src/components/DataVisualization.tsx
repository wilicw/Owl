import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import Card from '@/style-components/Card';
import Text from '@/style-components/Text';
import _ from 'lodash';
import IDataVisual from '@/interfaces/IDataVisual';
import { useState } from 'react';
import Overlay from './Overlay';
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
  const [isOpen, setOverlay] = useState(false);
  return (
    <div>
      <Card
        style={{
          padding: 0,
          height,
        }}
        onClick={() => setOverlay(true)}
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
                top: 0, bottom: -8, left: 0, right: 12,
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

              <Legend
                wrapperStyle={{
                  position: 'absolute',
                  top: 5,
                  right: 10,
                  fontSize: 10,
                  height: 0,
                }}
                iconSize={10}
                layout="vertical"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : <Waiting />
      }
      </Card>
      {
      isOpen ? (
        <Overlay close={() => setOverlay(false)}>
          <Text>
            {chartName}
            (
            {unit}
            )
          </Text>
          <br />
          <ResponsiveContainer width="100%" height="95%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                bottom: 0,
                left: -30,
                right: 0,
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
              />
              <YAxis tickFormatter={DataFormatter} />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </Overlay>
      ) : null
    }
    </div>
  );
}

export default DataVisualization;
