// slice of state auth
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { User } from "@/models/User";
import { RoleUser } from "@/models/enums/roleUser";

export interface LoginPayload {
  email: string;
  password: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  currentUser?: User;
  role: RoleUser;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  currentUser: undefined,
  role: RoleUser.GUEST,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.currentUser = action.payload.data.user;
      state.role = action.payload.data.role;
      state.loading = false;
    },
    loginFailed(state) {
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = undefined;
      state.role = RoleUser.GUEST;
    },
  },
});

// selectors
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectRole = (state: RootState) => state.auth.role;

// actions
export const authActions = authSlice.actions;

// reducer
export default authSlice.reducer;
