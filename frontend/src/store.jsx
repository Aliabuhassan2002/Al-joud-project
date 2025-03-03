import { configureStore } from "@reduxjs/toolkit";
import donationReducer from "./redux/donationSlice";
import userIdSlice from "./redux/userSlice";

const store = configureStore({
  reducer: {
    UID:userIdSlice,
    // donation: donationReducer,
  },
});

export default store;
