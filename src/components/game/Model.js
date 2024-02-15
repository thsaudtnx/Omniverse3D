import * as THREE from 'three'
import React from 'react'
import { useLoader } from '@react-three/fiber'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader'

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader())

const Model = ({inModel}) => {
  const materials = useLoader(MTLLoader, inModel.mtlUrl)
  const obj = useLoader(OBJLoader, inModel.objUrl, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })
  
  return (
    <primitive 
      object={obj} 
      scale={10}
      position={inModel.position || [0, 0, 0]}
    />
  )
};

export default Model;