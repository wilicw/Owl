import { Card } from '@fluentui/react-components/unstable';
import { Flex, Box } from 'rebass';
import { WeatherLabel, TemperatureLabel, WindLabel } from 'Weather';
import DataVisualization from 'components/DataVisualization';
import MissionPanel from 'components/MissionPanel';
import AutoMap from 'Map';
import {
  AccelerationChart, AltitudeChart, TemperatureChart, VelocityChart,
} from 'Chart';
import Timer from './components/Timer';
import ProgressBar from './components/ProgressBar';
import ValueLabel from './components/ValueLabel';

function App() {
  const cardHeight = window.innerHeight / 4;
  const data: any = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      time: i,
      value: Math.sin(0.05 * i),
    });
  }

  return (
    <Flex flexWrap="wrap" mx={2} height="100vh">
      <Box
        width={[1, 1, 1 / 2, 1 / 4]}
      >
        <Timer refTime={38.38587} />
      </Box>
      <Box
        width={[1, 1, 1 / 2, 3 / 4]}
        p={2}
      >
        <Card
          appearance="subtle"
        >
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
          >
            <ValueLabel
              labelColor="#555"
              labelName="Status"
              value="IDLE"
            />

            <ValueLabel
              labelColor="#555"
              labelName="WiFi"
              unit="db"
              value={-54}
            />

            <ValueLabel
              labelColor="#555"
              labelName="Avionic Status"
              value="RUNNING"
            />

            <ValueLabel
              labelColor="#555"
              labelName="Reaction Wheel"
              unit="rpm"
              value={530}
            />

            <ValueLabel
              labelColor="#555"
              labelName="LORA"
              unit="db"
              value={-10}
            />

            <ValueLabel
              labelColor="#555"
              labelName="Fire Head #0"
              value="IDLE"
            />

            <ValueLabel
              labelColor="#555"
              labelName="Fire Head #1"
              value="IDLE"
            />

            <ValueLabel
              labelColor="#555"
              labelName="Parachute #0"
              value="IDLE"
            />

            <WindLabel />
            <TemperatureLabel />
            <WeatherLabel />
          </div>
        </Card>
      </Box>
      <Box
        width={[1, 1, 1, 1 / 4]}
      >
        <Box p={2} width={1}>
          <AltitudeChart height={cardHeight} />
        </Box>
        <Box p={2} width={1}>
          <DataVisualization
            color="#28536b"
            chartName="GYRO"
            unit="m"
            data={data}
            height={cardHeight}
          />
        </Box>
        <Box p={2} width={1}>
          <TemperatureChart height={cardHeight} />
        </Box>
      </Box>
      <Box
        width={[1, 1, 1, 1 / 2]}
      >
        <Flex flexWrap="wrap">
          <Box
            width={[1, 1, 1, 1 / 2]}
            p={2}
          >
            <VelocityChart height={cardHeight} />
          </Box>
          <Box
            width={[1, 1, 1, 1 / 2]}
            p={2}
          >
            <AccelerationChart height={cardHeight} />
          </Box>
          <Box
            width={[1, 1, 1, 1 / 2]}
            p={2}
          >
            <AutoMap height={cardHeight} />
          </Box>
        </Flex>
      </Box>
      <Box
        width={[1, 1, 1, 1 / 4]}
        p={2}
      >
        <MissionPanel
          missionName="Flight Test 2022 Oct 1"
          rocketType="BlueShark"
          motorType="BlueShark"
          avionicType="ESP8266"
          message="<< TYPE,THRUST;IGN,0;CAMERA,0;LOAD,0;"
        />
      </Box>
      <Box
        width={1}
        px={2}
      >
        <ProgressBar stage="Ground" />
      </Box>
    </Flex>
  );
}

export default App;
