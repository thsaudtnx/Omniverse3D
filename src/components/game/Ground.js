import { usePlane } from "@react-three/cannon" //평면을 구성하기 위한 기능
import { groundTexture } from "../../assets/game/textures"
import { useStore } from '../../hooks/useStore'

export const Ground = () => {
	//usePlane을 통해 평면을 구성하고 ref을 통해 접근한다
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0], //평면의 기울기 
		position: [0, -0.5, 0], //평면의 위치값
	}))
	const [addCube] = useStore((state) => [state.addCube])


	groundTexture.repeat.set(100, 100)

	return (
		//다음에 mesh, planeGeometry, meshStandartMaterial는 thress-types.d.ts에 정의되어 있다.
		<mesh //mesh는 3D 화면을 구성하는 물체이며 ref를 통해 cannon을 통해 구성한 평면의 물리적인 속성을 적용한다.
			onClick={(e) => {
				e.stopPropagation()
				const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));
				addCube(x, y, z)
			}}
			ref={ref}
		>
			{/* 물체(mesh)는 부피(geometry)와 질감(material)의 정보로 구성된다. */}	
			<planeGeometry attach='geometry' args={[100, 100]} />
			<meshStandardMaterial attach='material' map={groundTexture} />
		</mesh>
	)
}