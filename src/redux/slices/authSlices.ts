// slice of state auth
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = {
  isAuthenticated: false,
  userId: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, payload) => {
      state.userId = payload.payload.user_id;
      state.role = payload.payload.scope;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
});

// selectors
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUserId = (state: RootState) => state.auth.userId;

export const selectRole = (state: RootState) => state.auth.role;

// actions
export const authActions = authSlice.actions;

// reducer
export default authSlice.reducer;
