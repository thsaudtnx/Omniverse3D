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
  const [holdInModel, setHoldInModel, releaseHoldInModel, setInModelScale] = useStore((state) => [
    state.holdInModel,
    state.setHoldInModel,
    state.releaseHoldInModel,
    state.setInModelScale,
  ])
  
  return (
    <primitive 
      object={obj} 
      scale={inModel.scale}
      position={inModel.position}
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
        if (Object.keys(holdInModel).length!==0){
          window.alert("Already holding a model")
        } else {
          setHoldInModel(inModel)
        }
        console.log("Clicked Model");
      }}
      onWheel={(e) => {
        e.stopPropagation()
        if (isHovered){
          if (e.deltaY > 0 && inModel.scale > 5) {
            console.log('Scrolling down');
            setInModelScale({
              ...inModel,
              scale : inModel.scale - 1,
            })
          } else if (e.deltaY < 0 && inModel.scale < 10) {
            console.log('Scrolling up');
            setInModelScale({
              ...inModel,
              scale : inModel.scale + 1,
            })
          }
        }
      }}
    />
  )
};

export default Model;