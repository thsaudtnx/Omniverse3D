import Cube from './Cube'
import {useSelector, useDispatch} from 'react-redux';
import { addCube, removeCube } from '../../modules/cubeSlice';
import { useCallback } from 'react';

const Cubes = () => {
	const cubes = useSelector((state) => state.cubes)
	const dispatch = useDispatch();
	console.log(cubes);
	const handleAddCube = useCallback((newCube) => {
    dispatch(addCube(newCube))
  }, [dispatch])

  const handleRemoveCube = useCallback((position) => {
    dispatch(removeCube(position))
  }, [dispatch]);

	return (
		<>
			{cubes?.map((cube, index) => (
				<Cube 
					key={index} 
					position={cube.position} 
					texture={cube.texture}
					handleAddCube={handleAddCube}
					handleRemoveCube={handleRemoveCube}
				/>
			))}
		</>
	)
}

export default Cubes;