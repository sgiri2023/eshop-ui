// import { legacy_createStore as createStore } from "redux";

// let initialStoreData = {
//   token: "null",
//   counter: 0,
// };

// const reducerFn = (state = initialStoreData, action) => {
//   if (action.type === "INC_COUNTER") {
//     return {
//       ...state,
//       counter: state.counter + 1,
//     };
//   } else if (action.type === "DEC_COUNTER") {
//     return {
//       ...state,
//       counter: state.counter - 1,
//     };
//   }
//   return state;
// };

// const store = createStore(reducerFn);
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import appInfoSlice from "./slice/app-info";
import userDetailsSlice from "./slice/userDetails-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    appInfo: appInfoSlice.reducer,
    userDetails: userDetailsSlice.reducer,
  },
});

export default store;
