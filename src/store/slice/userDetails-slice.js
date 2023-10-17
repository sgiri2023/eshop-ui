import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  userDetails: "",
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: initialState,
  reducers: {
    handleUpdateUser(state, data) {
      state.userDetails = data.payload;
    },
  },
});

export const userDetailsAction = userDetailsSlice.actions;

export default userDetailsSlice;
