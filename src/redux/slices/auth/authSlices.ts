// slice of state auth
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { User } from "@/models/User";


export interface LoginPayload {
  email: string;
  password: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  currentUser: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login (state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.loading = false;
    },
    loginFailed(state) {
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = undefined;
    },
  },
});

// selectors
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

// actions
export const authActions = authSlice.actions;

// reducer
export default authSlice.reducer;
