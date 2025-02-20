import { createSlice } from "@reduxjs/toolkit";
import { listUser } from "./user.action";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(listUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
