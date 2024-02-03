import { useBox } from "@react-three/cannon"
import { useState } from "react"
import * as textures from "../../assets/game/textures"


const Cube = ({ position, texture, handleAddCube, handleRemoveCube }) => {
	const [isHovered, setIsHovered] = useState(false)
	const [ref] = useBox(() => ({
		type: 'Static',
		position
	}))

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
				//click on block to delete
				if (e.button === 0) {
					//여기 수정 필요
					handleRemoveCube(position);
					return
				}
				else if (clickedFace === 0) {
					handleAddCube({
						texture: texture, 
						position : [x + 1, y, z],
					});
					return
				}
				else if (clickedFace === 1) {
					handleAddCube({
						texture : texture, 
						position: [x - 1, y, z],
					});
					return
				}
				else if (clickedFace === 2) {
					handleAddCube({
						texture: texture, 
						position: [x, y + 1, z],
					});
					return
				}
				else if (clickedFace === 3) {
					handleAddCube({
						texture: texture, 
						position: [x, y - 1, z]
					});
					return
				}
				else if (clickedFace === 4) {
					handleAddCube({
						texture: texture, 
						position: [x, y, z + 1],
					});
					return
				}
				else if (clickedFace === 5) {
					handleAddCube({
						texture: texture, 
						position: [x, y, z - 1],
					});
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

export default Cube;