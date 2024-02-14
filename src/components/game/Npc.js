import React from 'react';
import { NPC } from '../../assets/models/NPC';

export const Npc = () => {

  return (
    <>
      <NPC 
        scale={0.5}
        position={[0, -0.5, 0.5]}
        rotation={[0, Math.PI/2, 0]}
        onClick={async (e) => {
          e.stopPropagation();
          console.log('Click NPC');
        }}
      />
    </>
  );
};