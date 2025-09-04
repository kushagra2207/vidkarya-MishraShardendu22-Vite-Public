import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './slices/notes-slices';
import projectsSlice from './slices/projects-slices';
import myProjectsSlice from './slices/myprojects-slices';

const store = configureStore({
  reducer: {
    notes: notesSlice,
    projects: projectsSlice,
    myProjects: myProjectsSlice,
  },
});

export default store;
