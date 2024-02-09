import { useBox } from "@react-three/cannon"
import { useState } from "react"
import * as textures from "../../assets/game/textures"
import { useStore } from "../../hooks/useStore"


export const Cube = ({ position, texture, userId, continentId }) => {
	const [isHovered, setIsHovered] = useState(false)
	const [ref] = useBox(() => ({
		type: 'Static',
		position
	}))
	const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])

	const activeTexture = textures[texture + 'Texture']

	return (
		<mesh
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
				const clickedFace = Math.floor(e.faceIndex / 2)
				const { x, y, z } = ref.current.position
				if (e.button === 0) {
					removeCube(x, y, z)
					console.log('Deleted!')
					return
				}
				else if (clickedFace === 0) {
					addCube(x + 1, y, z, userId, continentId)
					return
				}
				else if (clickedFace === 1) {
					addCube(x - 1, y, z, userId, continentId)
					return
				}
				else if (clickedFace === 2) {
					addCube(x, y + 1, z, userId, continentId)
					return
				}
				else if (clickedFace === 3) {
					addCube(x, y - 1, z, userId, continentId)
					return
				}
				else if (clickedFace === 4) {
					addCube(x, y, z + 1, userId, continentId)
					return
				}
				else if (clickedFace === 5) {
					addCube(x, y, z - 1, userId, continentId)
					return
				}
			}}
			ref={ref}
		>
			<boxGeometry attach="geometry" />
			<meshStandardMaterial
				color={isHovered ? 'grey' : 'white'}
				map={activeTexture}
				transparent={true}
				opacity={texture === 'glass' ? 0.6 : 1}
				attach="material" />
		</mesh>
	)
}