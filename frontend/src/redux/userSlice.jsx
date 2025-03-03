import { createSlice } from "@reduxjs/toolkit";

const initialState = {  // Fixed typo
    userId:localStorage.getItem("uid"),
};




const user = createSlice({
    name: 'UID',
    initialState, // Fixed typo
    reducers: {
        setId: (state, action) => {
            state.userId=action.payload;
            localStorage.setItem("uid",state.userId);
            console.log(state.userId);
        },

    }
});

// Correctly export actions

export const { setId} = user.actions;

export default user.reducer;