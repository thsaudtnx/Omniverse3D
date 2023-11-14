import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"
import { useKeyboard } from "../hooks/useKeyboard"

const JUMP_FORCE = 4;
const SPEED = 4;

//useThree는 기본 렌더러, 장면, 카메라 등의 상태 모델에 액세스를 지원하는 hook이다.
//useSphere은 입체적인 형체로 시각적인 요소가 아닌 물리적 계산에 관련된 개념으로 이해하면 될 것 같다.
//우리는 인자값으로 mass, type, position을 준다.
//mass는 질량을 의미하며 충돌 계산 또는 중력에 의한 물리적 계산에 영향을 미친다.
//type은 우리가 준 dynamic 속성의 경우 유저의 의해 움직일 수 있으며, 0이 아닌 질량을 가진 채로 다른 요소들과 충돌이 가능하다.
//useFrame은 effect가 실행되거나 update가 발생하는 등의 모든 frame에 대한 렌더링이 발생하면, 내부에 코드를 실행시킨다.

export const Player = () => {
	const { moveBackward, moveForward, moveRight, moveLeft, jump } = useKeyboard()

	const { camera } = useThree()
	const [ref, api] = useSphere(() => ({
		mass: 1,
		type: 'Dynamic',
		position: [0, 1, 0],
	}))

	const vel = useRef([0, 0, 0])
	useEffect(() => {
		api.velocity.subscribe((v) => vel.current = v)
	}, [api.velocity])

	const pos = useRef([0, 0, 0])
	useEffect(() => {
		api.position.subscribe((p) => pos.current = p)
	}, [api.position])

	useFrame(() => {
		camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))

		const direction = new Vector3()

		const frontVector = new Vector3(
			0,
			0,
			(moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
		)

		const sideVector = new Vector3(
			(moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
			0,
			0,
		)

		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(SPEED)
			.applyEuler(camera.rotation)

		api.velocity.set(direction.x, vel.current[1], direction.z)

		if (jump && Math.abs(vel.current[1]) < 0.05) {
			api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2])
		}
	})

	return (
		<mesh ref={ref}></mesh>
	)
}