import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialStateLogin = {
  username: "",
  password: "",
};
const loginSlice = createSlice({
  name: "login",
  initialState: initialStateLogin,
  reducers: {
    loginSuccess: () => {
      toast.success("Wellcome");
    },
    loginFaild: () => {
      toast("Username and password is not correct");
    },
    loginError: () => {
      console.log("System error");
    },
  },
});

const initialStateRegister = {
  username: "",
  password: "",
  email: "",
  phone: "",
};
const registerSlice = createSlice({
  name: "register",
  initialState: initialStateRegister,
  reducers: {
    registerSuccess: () => {
      toast("Register success");
    },
    registerFaild: () => {
      toast("Username is exist");
    },
    registerError: () => {
      console.log("System error");
    },
  },
});

export const { loginSuccess, loginFaild, loginError } = loginSlice.actions;
export const { registerSuccess, registerFaild, registerError } =
  registerSlice.actions;

export default {
  login: loginSlice.reducer,
  register: registerSlice.reducer,
};
