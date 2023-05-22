import { createSlice } from '@reduxjs/toolkit';

const initialState = {

};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isAuth: (state, actions) => {
      const user = localStorage.getItem('userData');
      if (user) {
        state.isAuth = JSON.parse(user);
      };
    },
    userData: (state, actions) => {
      state.user = actions.payload;
    },
    logout: (state) => {
      state.user = undefined;
      localStorage.removeItem('userData');
    }
  }
});

export const { isAuth, userData, logout } = authSlice.actions;
export default authSlice.reducer;