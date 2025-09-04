import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    // set notes to the given data
    set_Notes(state, action) {
      state = action.payload;
      return state;
    },

    //add note to the notes
    addNote(state, action) {
      state = [action.payload, ...state];
      return state;
    },
  },
});

export default notesSlice.reducer;

export const { set_Notes, addNote } = notesSlice.actions;
