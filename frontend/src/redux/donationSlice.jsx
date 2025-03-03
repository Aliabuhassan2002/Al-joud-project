import { createSlice } from "@reduxjs/toolkit";

const donationSlice = createSlice({
  name: "donation",
  initialState: {
    amount: 0,
  },
  reducers: {
    setDonationAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { setDonationAmount } = donationSlice.actions;
export default donationSlice.reducer;
