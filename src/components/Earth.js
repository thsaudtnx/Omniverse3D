import React, { useRef } from 'react';

import EarthDayMap from '../assets/8k_earth_daymap.jpg';
import EarthNormalMap from '../assets/8k_earth_normal_map.jpg';
import EarthCloudsMap from '../assets/8k_earth_clouds.jpg';
import EarthNightMap from '../assets/8k_earth_nightmap.jpg';
import EarthSpecularMap from '../assets/8k_earth_specular_map.jpg';
import { TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';


const Earth = (props) => {

  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader, 
    [
      EarthDayMap, 
      EarthNormalMap, 
      EarthSpecularMap, 
      EarthCloudsMap,
    ]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 6;
    cloudsRef.current.rotation.y = elapsedTime / 6;
  })

  return (
    <>
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
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial 
          map={cloudsMap} 
          opacity={0.4} 
          depthWrite={true} 
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 32, 32]}/>
        <meshPhongMaterial specularMap={specularMap}/>
        <meshStandardMaterial 
          map={colorMap} 
          normalMap={normalMap} 
          metalness={0.4} 
          roughness={0.7}
        />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          zoomSpeed={0.5}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  )
}

export default Earth;