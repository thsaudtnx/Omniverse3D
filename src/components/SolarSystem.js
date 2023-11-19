import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import EarthTexture from '../images/solar/earth.jpg';
import JupiterTexture from '../images/solar/jupiter.jpg';
import MarsTexture from '../images/solar/mars.jpg';
import MercuryTexture from '../images/solar/mercury.jpg';
import NeptuneTexture from '../images/solar/neptune.jpg';
import PlutoTexture from '../images/solar/pluto.jpg';
import SaturnRingTexture from '../images/solar/saturn ring.png';
import SaturnTexture from '../images/solar/saturn.jpg';
import StarsTexture from '../images/solar/stars.jpg';
import SunTexture from '../images/solar/sun.jpg';
import UranusTexture from '../images/solar/uranus.jpg';
import UranusRingTexture from '../images/solar/uranus ring.png';
import VenusTexture from '../images/solar/venus.jpg';
import Planet from './Planet';

const SolarSystem = () => {
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
            position : [0, 0, 0],
            rotationSpeed : 0.005, 
            orbitSpeed : 0,
            orbitRadius : 0,
    
        },
        {
            texture : mercury,
            size : 0.4,
            position : [10, 0, 0],
            rotationSpeed : 0.012,
            orbitSpeed : 0.009,  
            orbitRadius : 5,
        },
        {
            texture : venus,
            size : 0.6,
            position : [5, 0, 0],
            rotationSpeed : 0.015, 
            orbitSpeed : 0.007,  
            orbitRadius : 7,
        },
        {
            texture : earth,
            size : 0.8,
            position : [7, 0, 0],
            rotationSpeed : 0.005, 
            orbitSpeed : 0.006,  
            orbitRadius : 10,
        },
        {
            texture : mars,
            size : 0.85,
            position : [10, 0, 0],
            rotationSpeed : 0.0,
            orbitSpeed : 0.0055,  
            orbitRadius : 12.5,
        },
        {
            texture : jupiter,
            size : 1.2,
            position : [5, 0, 0],
            rotationSpeed : 0.015, 
            orbitSpeed : 0.005,  
            orbitRadius : 14,
        },
        {
            texture : saturn,
            size : 0.9,
            position : [7, 0, 0],
            rotationSpeed : 0.002, 
            orbitSpeed : 0.004,  
            orbitRadius : 16,
        },
        {
            texture : uranus,
            size : 0.85,
            position : [10, 0, 0],
            rotationSpeed : 0.012,
            orbitSpeed : 0.003,  
            orbitRadius : 18,
        },
        {
            texture : neptune,
            size : 1.2,
            position : [5, 0, 0],
            rotationSpeed : 0.015, 
            orbitSpeed : 0.002,  
            orbitRadius : 20,
        },
        {
            texture : pluto,
            size : 0.5,
            position : [7, 0, 0],
            rotationSpeed : 0.002, 
            orbitSpeed : 0.001,  
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
            <OrbitControls />
        </>
    )
}

export default SolarSystem;