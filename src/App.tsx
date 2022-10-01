import { Card } from '@fluentui/react-components/unstable';
import { useEffect, useState } from 'react';
import { Flex, Box } from 'rebass';
import Timer from './components/Timer';
import ProgressBar from './components/ProgressBar';
import DataVisualization from './components/DataVisualization';
import MissionPanel from './components/MissionPanel';
import ValueLabel from './components/ValueLabel';
import GPSMap from './components/GPSMap';

interface AutoMapProps {
  height: number
}

function AutoMap({ height }: AutoMapProps) {
  const [position, setPosition] = useState({ lat: 0, long: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => setPosition({
        long: pos.coords.longitude,
        lat: pos.coords.latitude
      }))
    }
  }, [])
  return <GPSMap height={height} latitude={position.lat} longitude={position.long} />
}

function App() {

  const cardHeight = window.innerHeight / 4;
  let data: any = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      time: i,
      value: Math.sin(0.05 * i)
    })
  }

  return (
    <Flex flexWrap='wrap' mx={2} height="100vh">
      <Box
        width={[1, 1, 1 / 2, 1 / 4]}
      >
        <Timer refTime={38.38587} />
      </Box>
      <Box
        width={[1, 1, 1 / 2, 3 / 4]}
      >
        <Card
          appearance='subtle'
        >
          <div style={{
            display: "flex",
            flexWrap: "wrap",
          }}>
            <ValueLabel
              labelColor='#555'
              labelName='Status'
              value='IDLE'
            />

            <ValueLabel
              labelColor='#555'
              labelName='WiFi'
              unit='db'
              value={-54}
            />

            <ValueLabel
              labelColor='#555'
              labelName='Avionic Status'
              value='RUNNING'
            />

            <ValueLabel
              labelColor='#555'
              labelName='Reaction Wheel'
              unit='rpm'
              value={530}
            />

            <ValueLabel
              labelColor='#555'
              labelName='LORA'
              unit='db'
              value={-10}
            />

            <ValueLabel
              labelColor='#555'
              labelName='Fire Head #0'
              value='IDLE'
            />

            <ValueLabel
              labelColor='#555'
              labelName='Fire Head #1'
              value='IDLE'
            />

            <ValueLabel
              labelColor='#555'
              labelName='Parachute #0'
              value='IDLE'
            />

            <ValueLabel
              labelColor='#555'
              labelName='Wind'
              unit='knot'
              value={11}
            />

            <ValueLabel
              labelColor='#555'
              labelName='Weather'
              value='Sunny'
            />

          </div>
        </Card>
      </Box>
      <Box
        width={[1, 1, 1, 1 / 4]}
      >
        <Box p={2} width={1}>
          <DataVisualization
            color="#1D7874"
            chartName='Altitude'
            unit='m'
            data={data}
            height={cardHeight}
          />
        </Box>
        <Box p={2} width={1}>
          <DataVisualization
            color="#28536b"
            chartName='GYRO'
            unit='m'
            data={data}
            height={cardHeight}
          />
        </Box>
        <Box p={2} width={1}>
          <DataVisualization
            color="#e65f5c"
            chartName='Temperature'
            unit='℃'
            data={data}
            height={cardHeight}
          />
        </Box>
      </Box>
      <Box
        width={[1, 1, 1, 1 / 2]}
      >
        <Flex flexWrap='wrap'>
          <Box
            width={[1, 1, 1, 1 / 2]}
            p={2}
          >
            <DataVisualization
              color="#232e21"
              chartName='Velocity'
              unit='m/s'
              data={data}
              height={cardHeight}
            />
          </Box>
          <Box
            width={[1, 1, 1, 1 / 2]}
            p={2}
          >
            <DataVisualization
              color="#45425A"
              chartName='Acceleration'
              unit='m/s²'
              data={data}
              height={cardHeight}
            />
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
          missionName='Flight Test 2022 Oct 1'
          rocketType='BlueShark'
          motorType='BlueShark'
          avionicType='ESP8266'
          message='<< TYPE,THRUST;IGN,0;CAMERA,0;LOAD,0;'
        />
      </Box>
      <Box
        width={1}
        px={2}
      >
        <ProgressBar stage="Ground"></ProgressBar>
      </Box>
    </Flex>
  );
}

export default App;
