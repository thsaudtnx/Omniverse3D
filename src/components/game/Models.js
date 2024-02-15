import React, { useEffect } from 'react';
import { useStore } from '../../hooks/useStore';
import Model from './Model';
import { useParams } from 'react-router';

const Models = () => {
  const {userId, continentId} = useParams();

  const [inModels, getInModels] = useStore((state) => [
    state.inModels,
    state.getInModels,
	])

  useEffect(() => {
		console.log('Load inModels from database')
		getInModels(userId, continentId);
	}, [])

  console.log(inModels);

  return (
    <>
    {inModels.map(inModel => (
      <Model inModel={inModel}/>
    ))} 
    </>
  )
};

export default Models;