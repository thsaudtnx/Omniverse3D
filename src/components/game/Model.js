import * as THREE from 'three'
import React, { useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader'
import { useStore } from '../../hooks/useStore'

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader())

const Model = ({inModel}) => {
  const materials = useLoader(MTLLoader, inModel.mtlUrl)
  const obj = useLoader(OBJLoader, inModel.objUrl, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })
  const [isHovered, setIsHovered] = useState(false)
  const [holdInModel, setHoldInModel, releaseHoldInModel] = useStore((state) => [
    state.holdInModel,
    state.setHoldInModel,
    state.releaseHoldInModel,
  ])

  console.log(holdInModel)
  
  return (
    <primitive 
      object={obj} 
      scale={isHovered ? 5 : 10}
      position={inModel.position}
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        console.log("hovered in")
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
        console.log("hovered out")
      }}
      onClick={(e) => {
        e.stopPropagation()
        if (Object.keys(holdInModel).length!==0){
          window.alert("Already holding a model")
        } else {
          setHoldInModel(inModel)
        }
        console.log("Clicked Model");
      }}
    />
  )
};

export default Model;