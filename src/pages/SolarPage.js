import { Canvas } from '@react-three/fiber'
import SolarSystem from '../components/SolarSystem';
import styled from "styled-components";
import { Stars } from '@react-three/drei';

const CanvasContainer = styled.div`
  width : 100vw;
  height : 100vh;
  background: #000000;
`;


const SolarPage = () => {
  return (
    <CanvasContainer>
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 0, 0]} />
        <Stars 
            radius={300} 
            depth={60} 
            count={20000}
            factor={7}
            saturation={0}
            fade={true}
          />
        <SolarSystem />
      </Canvas>
    </CanvasContainer>
    
  )
}

export default SolarPage;