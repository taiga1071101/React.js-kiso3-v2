import { createSlice } from '@reduxjs/toolkit';

const TOKEN_KEY = 'token';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    // ページリロード時にlocalStrageのトークンを初期値として設定。無ければ空欄
    value: localStorage.getItem(TOKEN_KEY) || '',
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
      localStorage.setItem(TOKEN_KEY, action.payload);  // トークンをlocalStrageに保存
    },
    clear: (state) => {
      state.value = '';
      localStorage.removeItem(TOKEN_KEY); // トークンをlocalStarageから削除
    }
  }
});

export const { set, clear } = tokenSlice.actions;

export default tokenSlice.reducer;