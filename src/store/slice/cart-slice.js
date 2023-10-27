import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cartDetails: [],
};

const cartSlice = createSlice({
  name: "accountSlice",
  initialState: initialState,
  reducers: {
    updateCartDetails(state, data) {
      state.cartDetails = data.payload;
    },
  },
});

export const cartInfoAction = cartSlice.actions;
export default cartSlice;
