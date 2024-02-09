import React, { useEffect, useRef, useState } from 'react';
import EarthDayMap from '../../assets/earth/8k_earth_daymap.jpg';
import EarthNormalMap from '../../assets/earth/8k_earth_normal_map.jpg';
import EarthCloudsMap from '../../assets/earth/8k_earth_clouds.jpg';
import EarthNightMap from '../../assets/earth/8k_earth_nightmap.jpg';
import EarthSpecularMap from '../../assets/earth/8k_earth_specular_map.jpg';
import { TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Markers from './Markers';
import Description from './Description';
import Models from './Models';
import Gallery from './Gallery';
import { useStore } from '../../hooks/useStore';

const Earth = (props) => {
  const [
    colorMap, 
    normalMap, 
    specularMap, 
    cloudsMap, 
    nightMap ] = useLoader(
    TextureLoader, 
    [
      EarthDayMap, 
      EarthNormalMap, 
      EarthSpecularMap, 
      EarthCloudsMap,
      EarthNightMap,
    ]
  );

  const earthRef = useRef();
  const cameraRef = useRef();
  const [cameraPos, setCameraPos] = useState(null);
  const [current, setCurrent] = useState(null);
  const [continents, getContinents] = useStore((state) => [state.continents, state.getContinents])

  useEffect(() => {
    console.log('Load continents from database')
    getContinents()
  }, [getContinents])

  useFrame(({clock, camera}) => {
    const elapsedTime = clock.getElapsedTime();

    //Set Camera Position
    if (cameraPos){
      const {cx, cy, cz} = cameraPos;
      const vec = new THREE.Vector3(cx , cy , cz);
      vec.setLength(5);
      camera.position.lerp(vec, 0.02);

      earthRef.current.rotation.y = 0;
    }
    else {
      earthRef.current.rotation.y = elapsedTime / 6;
    }
  })

  const nextContinent = () => {
    const idx = current.id === 6 ? 0 : current.id + 1
    setCurrent(continents[idx]);
    const {latitude, longitude} = continents[idx];
    const xPos = 1.15 * Math.cos(latitude) * Math.cos(longitude);
    const yPos = 1.15 * Math.cos(latitude) * Math.sin(longitude);
    const zPos = 1.15 * Math.sin(latitude);
    setCameraPos({cx : xPos, cy : yPos, cz : zPos});
  }

  const prevContinent = () => {
    const idx = current.id === 0 ? 6 : current.id-1;
    setCurrent(continents[idx]);
    const {latitude, longitude} = continents[idx];
    const xPos = 1.15 * Math.cos(latitude) * Math.cos(longitude);
    const yPos = 1.15 * Math.cos(latitude) * Math.sin(longitude);
    const zPos = 1.15 * Math.sin(latitude);
    setCameraPos({cx : xPos, cy : yPos, cz : zPos});
  }

  return (
    <>
      <group ref={earthRef} scale={2.0}>
        <mesh>
          <sphereGeometry args={[1.005, 32, 32]} />
          <meshPhongMaterial 
            map={cloudsMap} 
            opacity={0.4} 
            depthWrite={true} 
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1, 32, 32]}/>
          <meshPhongMaterial specularMap={specularMap}/>
          <meshStandardMaterial 
            map={colorMap} 
            normalMap={normalMap}
            metalness={0.4} 
            roughness={0.7}
          />
        </mesh>
        <Markers 
          continents={continents}
          setCameraPos={setCameraPos}
          current={current}
          setCurrent={setCurrent}
        />
        <Models />
        <OrbitControls 
          ref={cameraRef} 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          zoomSpeed={0.5}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
        <polarGridHelper />
      </group>
      {current && <Gallery 
        current={current}
      />}
      <Description 
        current={current}
        nextContinent={nextContinent}
        prevContinent={prevContinent}
      />
    </>
  )
}

export default Earth;