import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    initiateLogin(state) {
      state.isLoading = true;
    },
    successLogin(state) {
      state.isLoading = false;
    },
    loginFailed(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.token = "";
    },

    login(state, data) {
      state.token = data.payload;
      state.isLoggedIn = true;
    },

    logOut(state) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice;
