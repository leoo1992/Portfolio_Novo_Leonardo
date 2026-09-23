import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ProjectSort = 'updated' | 'stars' | 'name';

interface ProjectsUiState {
  query: string;
  language: string;
  sort: ProjectSort;
  includeArchived: boolean;
}

const initialState: ProjectsUiState = {
  query: '',
  language: 'all',
  sort: 'updated',
  includeArchived: true,
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
    setSort(state, action: PayloadAction<ProjectSort>) {
      state.sort = action.payload;
    },
    setIncludeArchived(state, action: PayloadAction<boolean>) {
      state.includeArchived = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setQuery, setLanguage, setSort, setIncludeArchived, resetFilters } =
  projectsSlice.actions;
export default projectsSlice.reducer;
