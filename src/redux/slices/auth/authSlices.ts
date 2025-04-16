// slice of state auth
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { UserType } from "@/models/User";
import { RoleUser } from "@/models/enums/RoleUser";

export interface LoginPayload {
  email: string;
  password: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  currentUser?: UserType;
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
    loginSuccess(state, action: PayloadAction<any>) {
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
    updateAvatar(state, action: PayloadAction<string>) {
      if (state.currentUser) {
        state.currentUser.avatar = action.payload;
      }
    },
    updateName(state, action: PayloadAction<string>) {
      if (state.currentUser) {
        state.currentUser.fullName = action.payload;
      }
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
