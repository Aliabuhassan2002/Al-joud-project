import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

// Async action to register a new beneficiary
export const registerBeneficiary = createAsyncThunk(
  "beneficiary/register",
  async (formData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please login first.");

      const response = await axios.post(
        "http://localhost:5000/api/ads",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to register beneficiary."
      );
    }
  }
);

const beneficiarySlice = createSlice({
  name: "beneficiary",
  initialState: {
    loading: false,
    success: false,
    error: null,
    userId: localStorage.getItem("uid"),
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerBeneficiary.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerBeneficiary.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerBeneficiary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = beneficiarySlice.actions;
export default beneficiarySlice.reducer;
