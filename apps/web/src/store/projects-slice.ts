import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProjectsUiState {
  query: string;
  language: string;
}

const initialState: ProjectsUiState = {
  query: '',
  language: 'all',
};

const projectsSlice = createSlice({
  name: 'projectsUi',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setQuery, setLanguage, resetFilters } = projectsSlice.actions;
export default projectsSlice.reducer;
