import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Earth from "../components/Earth";
import styled from "styled-components";
import { Stars } from "@react-three/drei";

const CanvasContainer = styled.div`
  width : 100vw;
  height : 100vh;
  background-color : #010718;
`;

const EarthPage = () => {
  return (
    <CanvasContainer>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8}/>
          <pointLight 
            color="#f6f3ea" 
            position={[2, 0, 2]}
            intensity={15}
          />
          <Stars 
            radius={300} 
            depth={60} 
            count={20000}
            factor={7}
            saturation={0}
            fade={true}
          />
          <Earth />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  )
}

export default EarthPage;