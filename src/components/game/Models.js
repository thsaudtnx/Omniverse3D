import React, { useEffect } from 'react';
import { useStore } from '../../hooks/useStore';

const Models = () => {
  const [models, getModels] = useStore((state) => [
		state.models,
		state.getModels,
	])

  useEffect(() => {
		console.log('Load Models from omnispace')
		getModels();
	}, [])

  console.log(models);

  return (
    <>
    </>
  );
};

export default Models;