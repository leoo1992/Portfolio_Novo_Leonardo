import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ProjectSort = 'updated' | 'stars' | 'forks' | 'name';

interface ProjectsUiState {
  query: string;
  language: string;
  sort: ProjectSort;
  includeArchived: boolean;
  onlyWithDemo: boolean;
}

const initialState: ProjectsUiState = {
  query: '',
  language: 'all',
  sort: 'updated',
  includeArchived: true,
  onlyWithDemo: false,
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
    setOnlyWithDemo(state, action: PayloadAction<boolean>) {
      state.onlyWithDemo = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setQuery,
  setLanguage,
  setSort,
  setIncludeArchived,
  setOnlyWithDemo,
  resetFilters,
} = projectsSlice.actions;
export default projectsSlice.reducer;
