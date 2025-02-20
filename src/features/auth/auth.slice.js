import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser, googleAuth } from "./auth.action";
import Cookies from "js-cookie";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
    logout: (state, action) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.data;
        Cookies.set("jwt", action.payload.data.token, {
          expires: 7,
          secure: true,
        });
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        Cookies.set("jwt", action.payload.token, {
          expires: 7,
          secure: true,
        });
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError, logout } = authUserSlice.actions;

export default authUserSlice.reducer;
