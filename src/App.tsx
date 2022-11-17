import Container from '@/style-components/Container';
import { Flex, Box } from 'rebass';
import { useDispatch } from 'react-redux';
import AvionicConnectionLabel from '@/ConnectionLabel';
import { setLocation } from '@/redux/reducer';
import locationObservable from '@/services/LocationProvider';
import {
  AccelerationChart, AltitudeChart, GyroChart, TemperatureChart, VelocityChart,
} from '@/Chart';
import AutoMap from '@/Map';
import { TemperatureLabel, WindLabel } from '@/Weather';
import Timer from '@/components/Timer';
import ProgressBar from '@/components/ProgressBar';
import ValueLabel from '@/components/ValueLabel';
import StatusLabel from '@/StatusLabel';
import Mission from '@/Mission';

function App() {
  const cardHeight = window.innerHeight / 4;
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      time: i,
      sin: Math.sin(0.005 * i),
      cos: Math.cos(0.005 * i),
    });
  }

  const dispatch = useDispatch();
  locationObservable.subscribe((location) => {
    dispatch(setLocation(location));
  });

  return (
    <Flex flexWrap="wrap" mx={2} height="100vh">
      <Box
        width={[1, 1, 1 / 2, 1 / 4]}
      >
        <Timer />
      </Box>
      <Box
        width={[1, 1, 1 / 2, 3 / 4]}
        p={2}
      >
        <Container>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
          >
            <StatusLabel />

            <ValueLabel
              labelColor="#555"
              labelName="WiFi"
              unit="db"
              value={-54}
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

            <AvionicConnectionLabel />
            <WindLabel />
            <TemperatureLabel />
          </div>
        </Container>
      </Box>
      <Box
        width={[1, 1, 1, 1 / 4]}
      >
        <Box p={2} width={1}>
          <AltitudeChart height={cardHeight} />
        </Box>
        <Box p={2} width={1}>
          <GyroChart height={cardHeight} />
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
        <Mission />
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
