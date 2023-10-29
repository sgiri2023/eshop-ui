import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cartDetails: [],
  addressId: "",
};

const cartSlice = createSlice({
  name: "accountSlice",
  initialState: initialState,
  reducers: {
    updateCartDetails(state, data) {
      state.cartDetails = data.payload;
    },
    updateAddressId(state, data) {
      state.addressId = data.payload;
    },
  },
});

export const cartInfoAction = cartSlice.actions;
export default cartSlice;
