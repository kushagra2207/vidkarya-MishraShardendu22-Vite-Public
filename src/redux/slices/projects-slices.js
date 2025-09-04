import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    // set projects to the given data
    set_Projects(state, action) {
      state = action.payload;
      return state;
    },

    //add project to the projects
    addProject(state, action) {
      state = [action.payload, ...state];
      return state;
    },
  },
});

export default projectsSlice.reducer;

export const { set_Projects, addProject } = projectsSlice.actions;
