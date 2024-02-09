import { Html, Line } from "@react-three/drei";
import React, { useRef, useState } from "react";

const Marker = ({continent, setCameraPos, current, setCurrent}) => {

  const [isHovered, setIsHovered] = useState(false);
  const {name, latitude, longitude} = continent;

  //Cacularing the position with lat and long
  const xPos = 1.15 * Math.cos(latitude) * Math.cos(longitude);
  const yPos = 1.15 * Math.cos(latitude) * Math.sin(longitude)
  const zPos = 1.15 * Math.sin(latitude)
  
  return (
    <>
    <group>
      <Line 
        points={[[0, 0, 0], [xPos, yPos, zPos]]} // Define the points of the line
        color={'white'} // Line color (red in this example)
        lineWidth={5} // Line width
        dashed={false} // Set to true for a dashed line
      />
      <mesh 
        position={[xPos, yPos, zPos]}
        onPointerMove={(e) => {
          e.stopPropagation()
          setIsHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setIsHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setCameraPos({cx : xPos, cy : yPos, cz : zPos})
          setCurrent(continent);
          console.log(name);
        }}
      >
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshBasicMaterial 
          color={isHovered ? "darkRed" : "red"}
        />
      </mesh>
      {(isHovered || current?.name===name) && (
        <Html position={[xPos*1.1, yPos*1.1, zPos*1.1]}>
          <label style={{ color: 'white'}}>
            {name}
          </label>
        </Html>
      )}
    </group>
    </>
  )
}

export default Marker;