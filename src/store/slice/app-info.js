import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isSideBarExpand: true,
  appName: "eShop",
};

const appInfoSlice = createSlice({
  name: "appInfoSlice",
  initialState: initialState,
  reducers: {
    handleCollapse(state) {
      state.isSideBarExpand = false;
    },

    handleExpand(state) {
      state.isSideBarExpand = true;
    },
  },
});

export const appInfoAction = appInfoSlice.actions;

export default appInfoSlice;
