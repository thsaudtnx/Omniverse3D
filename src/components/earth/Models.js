import React from 'react';
import { Isabelle } from '../../assets/models/Isabelle';
import { CatHouse } from '../../assets/models/CatHouse';
import { StylizedHouse } from '../../assets/models/StylizedHouse';
import { TreeHouse } from '../../assets/models/TreeHouse';

const Models = () => {
  return (
    <>
      <StylizedHouse 
        scale={0.1}
        rotation={[0, 0, Math.PI/2]}
        position={[-0.99, 0, 0]}
      />
      <CatHouse
        scale={0.02}
        position={[0, 0.96, 0]}
      />
      <Isabelle 
        scale={0.005}
        rotation={[Math.PI/2, 0, 0]}
        position={[0, 0, 0.98]}
      />
      <TreeHouse 
        scale={0.1}
        rotation={[Math.PI, Math.PI/2, Math.PI/2]}
        position={[0, 0, -1.01]}
      />
    </>
  );
};

export default Models;