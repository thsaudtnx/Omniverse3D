/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 scene.gltf 
Author: NotAGanesh (https://sketchfab.com/kgytofficial2022)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/retro-computer-low-poly-blockbench-e6f953bd52054190a23e55884cd0537a
Title: Retro Computer | Low-Poly | BlockBench
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Computer(props) {
  const { nodes, materials } = useGLTF('/models/computer/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_6.geometry} material={materials.material_0} />
      <mesh geometry={nodes.Object_8.geometry} material={materials.material_0} />
      <mesh geometry={nodes.Object_10.geometry} material={materials.material_0} />
      <mesh geometry={nodes.Object_12.geometry} material={materials.material_0} />
      <mesh geometry={nodes.Object_14.geometry} material={materials.material_0} rotation={[0, 0, 0.14]} />
      <mesh geometry={nodes.Object_16.geometry} material={materials.material_0} rotation={[0, 0, -0.14]} />
    </group>
  )
}

useGLTF.preload('/models/computer/scene.gltf')
