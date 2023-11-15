import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ground } from '../components/Ground';
import { Player } from '../components/Player'
import { FPV } from '../components/FPV'
import { Cubes } from '../components/Cubes'
import { TextureSelector } from '../components/TextureSelector';
import { Menu } from '../components/Menu';
import { supabase } from '../modules/supabase';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

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
          <Ground />
        </Physics>
      </Canvas>
      <div className='absolute centered cursor'>+</div>
      <TextureSelector />
      <Menu />
    </>
  );
}

export default GamePage;