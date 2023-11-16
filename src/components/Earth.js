import React, { useEffect, useRef, useState } from 'react';

import EarthDayMap from '../assets/8k_earth_daymap.jpg';
import EarthNormalMap from '../assets/8k_earth_normal_map.jpg';
import EarthCloudsMap from '../assets/8k_earth_clouds.jpg';
import EarthNightMap from '../assets/8k_earth_nightmap.jpg';
import EarthSpecularMap from '../assets/8k_earth_specular_map.jpg';
import { TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Marker from './Marker';
import { continents } from '../constants/Coordinates';

const Earth = (props) => {
  const [colorMap, normalMap, specularMap, cloudsMap, nightMap] = useLoader(
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

  const [clicked, setClicked] = useState(null);

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    if (clicked){
      earthRef.current.rotation.y = 0;
    } else {
      earthRef.current.rotation.y = elapsedTime / 6;
    }
    
  })

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
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true}
            zoomSpeed={0.5}
            panSpeed={0.5}
            rotateSpeed={0.4}
          />
        </mesh>
        {continents.map(c => (
          <Marker 
            key={c.name}
            name={c.name}
            lat={c.lat}
            long={c.long}
            setClicked={setClicked}
          />
        ))}
      </group>
      
    </>
  )
}

export default Earth;