import React, { useState } from "react";

const Marker = ({name, lat, long, setClicked}) => {

  const [isHovered, setIsHovered] = useState(false);
  const xPos = 1 * Math.cos(lat) * Math.cos(long);
  const yPos = 1 * Math.cos(lat) * Math.sin(long)
  const zPos = 1 * Math.sin(lat)

  return (
    <>
      <mesh 
        position={[xPos, yPos, zPos]}
        onPointerMove={(e) => {
          e.stopPropagation()
          setIsHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setIsHovered(false)
        }}
        onClick={(e) => {
          e.stopPropagation()
          setClicked([xPos, yPos, zPos]);
          console.log(name);
        }}
      >
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshBasicMaterial 
          color={isHovered ? "darkGreen" : "darkRed"}
        />
      </mesh>
    </>
  )
}

export default Marker;