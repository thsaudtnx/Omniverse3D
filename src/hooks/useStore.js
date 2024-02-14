import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { getContinents, getCubes, getModels, storeCubes } from '../lib/api'

export const useStore = create((set) => ({
  continents : [],
  cubes: [],
  models: [],
  texture: 'dirt',
  getModels : () => {
    getModels().then(models => set({models}))
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
      return prev
    })
  },
  resetWorld: () => {
    set(() => ({
      cubes: []
    }))
  },
}))