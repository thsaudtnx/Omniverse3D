import { usePlane } from "@react-three/cannon" //평면을 구성하기 위한 기능
import { groundTexture } from "../../assets/game/textures"
import { useStore } from "../../hooks/useStore"
import { useParams } from 'react-router';

export const Ground = () => {
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0], //평면의 기울기 
		position: [0, -0.5, 0], //평면의 위치값
	}))
	const {userId, continentId} = useParams();

	const [addCube] = useStore((state) => [state.addCube])

	groundTexture.repeat.set(100, 100)

	return (
		<mesh
			onClick={(e) => {
				e.stopPropagation()
				const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));
				addCube(x, y, z, userId, continentId)
			}}
			ref={ref}
		>
			<planeGeometry attach='geometry' args={[100, 100]} />
			<meshStandardMaterial attach='material' map={groundTexture} />
		</mesh>
	)
}