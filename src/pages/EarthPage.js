import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import styled from "styled-components";
import { Stars } from "@react-three/drei";
import Solar from "../components/Solar";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../modules/supabase";

const CanvasContainer = styled.div`
  width : 100vw;
  height : 100vh;
  background-color : #010718;
`;

const EarthPage = () => {

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        const user = value.data?.user;
        if (user?.id !==params.userId || user===null){
          navigate('/');
        }
      })
    };
    getUserData();
  }, [navigate, params.userId])

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
          <Solar />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  )
}

export default EarthPage;