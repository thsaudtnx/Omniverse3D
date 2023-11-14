import { Physics } from '@react-three/cannon'; //물리적 계산 범위를 지정하기 위한 요소
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ground } from '../components/Ground';
import { Player } from '../components/Player'
import { FPV } from '../components/FPV'
import { Cubes } from '../components/Cubes'
import { TextureSelector } from '../components/TextureSelector';
import { Menu } from '../components/Menu';

//우리는 Sky를 통해 광원을 추가했지만, 광원이 물체에 적용하기 위해서는
//빛의 속성을 정의해주어야 한다 AmbientLight는 빛의 방향과는 관계없이 빛 자체가 물체에 반영되는 작용을 정의한다.

const GamePage = () => {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[0, 100, 20]} /> {/*modified lighting*/}
        <ambientLight intensity={1.0} /> {/* 물체에 적용될 광원의 밝기 */}
        <FPV />
        <Physics> {/* 물리적인 계산이 필요한 요소는 Physics 내부에 선언한다. */}
          <Player />
          <Cubes />
          <Ground /> {/* 지면은 플레이어 및 블록들과 물리적인 연산이 필요함으로 Physics 내부에 선언 */}
        </Physics>
      </Canvas>
      <div className='absolute centered cursor'>+</div>
      <TextureSelector />
      <Menu />
    </>
  );
}

export default GamePage;