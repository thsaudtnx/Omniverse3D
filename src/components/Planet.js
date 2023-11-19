import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Planet = ({ texture,size, position, rotationSpeed, orbitSpeed, orbitRadius }) => {
  const meshRef = useRef();
  const orbitRef = useRef({ angle: 0 });

  useFrame(() => {
      // Rotate the planet around its axis
      if (meshRef.current) {
          meshRef.current.rotation.y += rotationSpeed;
      }

      // Calculate the orbit around the sun
      if (orbitRef.current) {
          orbitRef.current.angle += orbitSpeed;
          const x = Math.cos(orbitRef.current.angle) * orbitRadius;
          const z = Math.sin(orbitRef.current.angle) * orbitRadius;
          meshRef.current.position.set(x, 0, z);
      }
  });

  return (
      <mesh ref={meshRef} position={position}>
          <sphereGeometry args={[size, 30, 30]} />
          <meshStandardMaterial map={texture} />
      </mesh>
  );
};

export default Planet;