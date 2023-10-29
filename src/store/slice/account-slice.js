import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  bankDetails: [],
  isLoading: false,
};

const accouuntSlice = createSlice({
  name: "accountSlice",
  initialState: initialState,
  reducers: {
    updateAccoutDetails(state, data) {
      state.bankDetails = data.payload;
    },
    updateAccoutLoading(state, data) {
      state.isLoading = data.payload;
    },
  },
});

export const accountInfoAction = accouuntSlice.actions;

export default accouuntSlice;
