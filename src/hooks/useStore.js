import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { getContinents, getCubes, getImages, getInModels, getModels, storeCubes, storeInModels } from '../lib/api'

export const useStore = create((set) => ({
  continents : [],
  cubes: [],
  models: [],
  inModels: [],
  images : [],
  texture: 'dirt',
  getImages : (continent_id) => {
    getImages(continent_id).then(images => set({images}))
  },
  getModels : () => {
    getModels().then(models => set({models}))
  },
  getInModels : (userId, continentId) => {
    getInModels(userId, continentId).then(inModels => set({inModels}))
  },
  updateInModel : (model) => {
    set((prev) => ({
      inModels : prev.inModels.map(inModel => inModel.id === model.id ? model : inModel)
    }))
  },
  addInModel : (model) => {
    set((prev) => ({
      inModels : [
        ...prev.inModels,
        model,
      ]
    }))
  },
  removeInModel : (modelId) => {
    set((prev) => ({
      inModels: prev.inModels.filter(inModel => inModel.id !== modelId)
    }))
  },
  getContinents : () => {
    getContinents().then(continents => set({continents}))
  },
  getCubes: (user_id, continent_id) => {
    getCubes(user_id, continent_id).then(cubes => set({ cubes }))
  },
  addCube: (x, y, z, user_id, continent_id) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          id: nanoid(),
          position: [x, y, z],
          texture: prev.texture,
          user_id : user_id,
          continent_id : continent_id,
        }
      ]
    }))
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter(cube => {
        const [X, Y, Z] = cube.position
        return X !== x || Y !== y || Z !== z
      })
    }))
  },
  setTexture: (texture) => {
    set(() => ({
      texture
    }))
  },
  saveWorld: (user_id, continent_id) => {
    set((prev) => {
      storeCubes(prev.cubes, user_id, continent_id)
      storeInModels(prev.inModels, user_id, continent_id)
      return prev
    })
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
      inModels : [],
    }))
  },
}))