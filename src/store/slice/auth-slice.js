import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  loginErrorMessage: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    initiateLogin(state) {
      state.isLoading = true;
      state.loginErrorMessage = "";
    },

    successLogin(state) {
      state.isLoading = false;
      state.loginErrorMessage = "";
    },

    loginFailed(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.token = "";
    },

    setLoginError(state, data) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.loginErrorMessage = data.payload;
    },

    login(state, data) {
      state.token = data.payload;
      state.isLoggedIn = true;
      state.loginErrorMessage = "";
    },

    logOut(state) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice;
