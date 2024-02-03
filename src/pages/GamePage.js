import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ground } from '../components/game/Ground';
import { Player } from '../components/game/Player'
import { FPV } from '../components/game/FPV'
import Cubes from '../components/game/Cubes'
import { TextureSelector } from '../components/game/TextureSelector';
import { Menu } from '../components/game/Menu';
import { supabase } from '../modules/supabase';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import Cursor from '../components/game/Cursor';
import { Door } from '../assets/models/Door';

const GamePage = () => {
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
    <>
      <Canvas>
        <Sky sunPosition={[0, 100, 20]} />
        <ambientLight intensity={1.0} />
        <FPV />
        <Physics>
          <Player />
          <Cubes />
          <Door 
            scale={0.02}
            position={[0, -0.5, -0.5]}
          />
          <Ground />
        </Physics>
      </Canvas>
      <Cursor />
      <TextureSelector />
      <Menu />
    </>
  );
}

export default GamePage;