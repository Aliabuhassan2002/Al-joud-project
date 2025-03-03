import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import beneficiaryReducer from "./beneficiarySlice";
import donorReducer from "./donorSlice";
import userIdSlice from "./userSlice";
import donationReducer from "./donationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    beneficiary: beneficiaryReducer,
    donor: donorReducer,
    UID: userIdSlice,
    donation: donationReducer,
  },
});

export default store;
