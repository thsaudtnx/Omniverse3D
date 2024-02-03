import { createSlice } from '@reduxjs/toolkit'

export const cubeSlice = createSlice({
  name: 'cubes',
  initialState: [],
  reducers: {
    addCube: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      console.log("addCube");
      state.push(action.payload);
    },
    removeCube: (state, action) => {
      console.log("removeCube");
      return state.filter(cube => cube.position.join('') !== action.payload.join(''));
    },
    saveWorld: (state) => {
      //Database save
      return;
    },
    resetWorld: (state) => {
      return [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addCube, removeCube } = cubeSlice.actions

export default cubeSlice.reducer