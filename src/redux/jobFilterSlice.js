import { createSlice } from '@reduxjs/toolkit';

export const jobFilterSlice = createSlice({
  name: 'jobFilterSlice',
  initialState: '',
  reducers: {
    setJobFilter: (state, action) => action.payload,
  },
});

export const { setJobFilter } = jobFilterSlice.actions;
export default jobFilterSlice.reducer;