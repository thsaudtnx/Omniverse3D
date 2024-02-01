import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import EarthTexture from '../../assets/solar/earth.jpg';
import JupiterTexture from '../../assets/solar/jupiter.jpg';
import MarsTexture from '../../assets/solar/mars.jpg';
import MercuryTexture from '../../assets/solar/mercury.jpg';
import NeptuneTexture from '../../assets/solar/neptune.jpg';
import PlutoTexture from '../../assets/solar/pluto.jpg';
import SaturnRingTexture from '../../assets/solar/saturn ring.png';
import SaturnTexture from '../../assets/solar/saturn.jpg';
import StarsTexture from '../../assets/solar/stars.jpg';
import SunTexture from '../../assets/solar/sun.jpg';
import UranusTexture from '../../assets/solar/uranus.jpg';
import UranusRingTexture from '../../assets/solar/uranus ring.png';
import VenusTexture from '../../assets/solar/venus.jpg';
import Planet from './Planet';
import Earth from './Earth';

const Solar = () => {
    const [earth, jupiter, mars, mercury, neptune, pluto, saturn, sun, uranus,venus] = useLoader(
        TextureLoader, 
        [
            EarthTexture, 
            JupiterTexture, 
            MarsTexture, 
            MercuryTexture,
            NeptuneTexture,
            PlutoTexture,
            SaturnTexture,
            SunTexture,
            UranusTexture,
            VenusTexture,
        ]
      );
    
    const planets = [
        {
            texture : sun,
            size : 1.5,
            position : [10, 0, 0],
            rotationSpeed : 0.0005, 
            orbitSpeed : 0.0006,
            orbitRadius : 10,
    
        },
        {
            texture : mercury,
            size : 0.4,
            position : [10, 0, 0],
            rotationSpeed : 0.012,
            orbitSpeed : 0.0009,  
            orbitRadius : 5,
        },
        {
            texture : venus,
            size : 0.6,
            position : [5, 0, 0],
            rotationSpeed : 0.015, 
            orbitSpeed : 0.0007,  
            orbitRadius : 7,
        },
        /* {
            texture : earth,
            size : 0.8,
            position : [7, 0, 0],
            rotationSpeed : 0.005, 
            orbitSpeed : 0.0006,  
            orbitRadius : 10,
        }, */
        {
            texture : mars,
            size : 0.85,
            position : [10, 0, 0],
            rotationSpeed : 0.0,
            orbitSpeed : 0.00055,  
            orbitRadius : 12.5,
        },
        {
            texture : jupiter,
            size : 1.2,
            position : [5, 0, 0],
            rotationSpeed : 0.015, 
            orbitSpeed : 0.0005,  
            orbitRadius : 14,
        },
        {
            texture : saturn,
            size : 0.9,
            position : [7, 0, 0],
            rotationSpeed : 0.002, 
            orbitSpeed : 0.0004,  
            orbitRadius : 16,
        },
        {
            texture : uranus,
            size : 0.85,
            position : [10, 0, 0],
            rotationSpeed : 0.012,
            orbitSpeed : 0.0003,  
            orbitRadius : 18,
        },
        {
            texture : neptune,
            size : 1.2,
            position : [5, 0, 0],
            rotationSpeed : 0.015, 
            orbitSpeed : 0.0002,  
            orbitRadius : 20,
        },
        {
            texture : pluto,
            size : 0.5,
            position : [7, 0, 0],
            rotationSpeed : 0.002, 
            orbitSpeed : 0.0001,  
            orbitRadius : 22,
        }
    ];


    return(
        <>
            {planets.map(p => <Planet
                texture={p.texture}
                size = {p.size}
                position={p.position}
                rotationSpeed={p.rotationSpeed} 
                orbitSpeed={p.orbitSpeed}  
                orbitRadius={p.orbitRadius}
            />)}
            <Earth />
        </>
    )
}

export default Solar;