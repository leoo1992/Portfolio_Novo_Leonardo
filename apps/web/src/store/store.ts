import { configureStore } from '@reduxjs/toolkit';
import projectsUiReducer from './projects-slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      projectsUi: projectsUiReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
