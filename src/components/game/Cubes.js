import { useEffect } from 'react'
import { useStore } from '../../hooks/useStore'
import { Cube } from './Cube'
import { useParams } from 'react-router';

export const Cubes = () => {
	const {userId, continentId} = useParams();
	
	const [cubes, getCubes] = useStore((state) => [
		state.cubes,
		state.getCubes,
	])

	useEffect(() => {
		console.log('Load Cubes from Database')
		getCubes(userId, continentId);
	}, [])
	

	console.log(cubes)

	return cubes.map(({ id, position, texture }) => {
		return (
			<Cube  
				key={id}
				position={position} 
				texture={texture} 
				userId={userId} 
				continentId={continentId}
			/>
		)
	})
}