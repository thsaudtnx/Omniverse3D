import { supabase } from '../lib/supabase'
import axios from 'axios';

export const getContinents = async () => {
  let { data: continents, error } = await supabase
    .from('continents')
    .select('*')
  if (error){
    console.log(error)
    return
  }
  return continents
}

export const getCubes = async (user_id, continent_id) => {
  let { data: cubes, error } = await supabase
    .from('cubes')
    .select('*')
    .eq('user_id', user_id)
    .eq('continent_id', continent_id)
  if (error){
    console.log(error);
    return
  }
  return cubes
}

const deleteCubeById = async (id) => {
  const { error } = await supabase
    .from('cubes')
    .delete()
    .eq('id', id)
  if (error){
    console.log(error);
  }
}

const insertCube = async (cube) => {
  const { data, error } = await supabase
    .from('cubes')
    .insert(cube)
    .select()
  if (error){
    console.log(error)
  }
}


export const storeCubes = async (cubes, user_id, continent_id) => {
  const initialCubes = await getCubes(user_id, continent_id);
  for (const cube of cubes){
    let isExist = false;
    for (const c of initialCubes){
      if (cube.id===c.id){
        isExist = true;
        break;
      }
    }
    if (isExist===false){
      await insertCube(cube)
    }
  }
  for (const cube of initialCubes){
    let isExist = false;
    for (const c of cubes){
      if (cube.id===c.id){
        isExist = true;
        break;
      }
    }
    if (isExist===false){
      await deleteCubeById(cube.id);
    }
  }
}

export const getModels = async () => {
  const url =  process.env.REACT_APP_OMNISPACE_URL;
  const token = process.env.REACT_APP_OMNISPACE_TOKEN;

  try{
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params : {
        index: 0,
        modelKey: '',
        limit: 100
      }
    });
    return response.data.models
  } catch(error){
    console.error(error)
  }
}

