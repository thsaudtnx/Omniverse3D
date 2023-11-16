import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Earth from "../components/Earth";
import styled from "styled-components";

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
          <Earth />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  )
}

export default EarthPage;