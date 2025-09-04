import { createSlice } from '@reduxjs/toolkit';

const myProjectsSlice = createSlice({
  name: 'myProjects',
  initialState: [],
  reducers: {
    // set projects to the given data
    set_MyProjects(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export default myProjectsSlice.reducer;

export const { set_MyProjects } = myProjectsSlice.actions;
