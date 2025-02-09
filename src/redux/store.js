import { configureStore } from '@reduxjs/toolkit';
import offsetReducer from './offsetSlice';
import tokenReducer from './tokenSlice';

export const store = configureStore({
  reducer: {
    offset: offsetReducer,
    token: tokenReducer,
  },
});