import { supabase } from '../lib/supabase'
import axios from 'axios';

export const getImages = async(continent_id) => { 
  let { data: images, error } = await supabase
    .from('images')
    .select('*')
    .eq('continent_id', continent_id)
  if (error){
    console.log(error)
    return
  }
  return images
}

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

// Get all the models from omnispace api
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

// Get all the inModels from supabase
export const getInModels = async (user_id, continent_id) => {
  let { data: inModels, error } = await supabase
    .from('inModels')
    .select('*')
    .eq('user_id', user_id)
    .eq('continent_id', continent_id)
  if (error){
    console.log(error)
    return
  }
  return inModels
}

// Insert new inModel
const insertInModel = async (inModel) => {
  const { data, error } = await supabase
    .from('inModels')
    .insert(inModel)
    .select()
  if (error){
    console.log(error)
  }
}

// Delete inModel by id
const deleteInModelById = async (id) => {
  const { error } = await supabase
    .from('inModels')
    .delete()
    .eq('id', id)
  if (error){
    console.log(error);
  }
}

// Update inModel by id with new position
const updateInModel = async (inModel) => {
  const { data, error } = await supabase
    .from('inModels')
    .update({ position: inModel.position })
    .eq('id', inModel.id)
    .select()
  if (error){
    console.log(error);
  }
}

// Store new inModels into supabase
export const storeInModels = async (inModels, user_id, continent_id) => {
  const initialInModels = await getInModels(user_id, continent_id);
  console.log(inModels);
  // Insert new inModel
  for (const inModel of inModels){
    let isExist = false;
    for (const i of initialInModels){
      if (inModel.id===i.id){
        isExist = true;
        break;
      }
    }
    if (isExist===false){
      await insertInModel(inModel)
    }
  }
  // Delete inModel
  for (const i of initialInModels){
    let isExist = false;
    for (const inModel of inModels){
      if (inModel.id===i.id){
        isExist = true;
        break;
      }
    }
    if (isExist===false){
      await deleteInModelById(i.id);
    }
  }
  // Update inModel
  for (const inModel of inModels){
    for (const i of initialInModels){
      if (inModel.id===i.id && inModel.position !== i.position){
        await updateInModel(inModel)
      }
    }
  }
}
