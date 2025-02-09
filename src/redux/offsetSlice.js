import { createSlice } from '@reduxjs/toolkit';

export const offsetSlice = createSlice({
  name: 'offest',
  initialState: {
    count: 0,
  },
  reducers: {
    increase: (state) => {
      state.count += 10;
    },
    decrease: (state) => {
      state.count -= 10;
    }
  },
});

export const { increase, decrease } = offsetSlice.actions;

export default offsetSlice.reducer;