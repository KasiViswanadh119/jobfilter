import { configureStore } from '@reduxjs/toolkit';
import jobFilterReducer from './jobFilterSlice';

 const store = configureStore({
  reducer: {
    jobFilter: jobFilterReducer,
  },
});

export default store;