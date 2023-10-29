import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import appInfoSlice from "./slice/app-info";
import userDetailsSlice from "./slice/userDetails-slice";
import accouuntSlice from "./slice/account-slice";
import cartSlice from "./slice/cart-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    appInfo: appInfoSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    accountDetails: accouuntSlice.reducer,
    cartDetails: cartSlice.reducer,
  },
});

export default store;
