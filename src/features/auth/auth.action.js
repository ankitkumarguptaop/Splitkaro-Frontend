import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  googleAuthUserService,
  signinUserService,
  signupUserService,
} from "../../services/auth.service";
import { SIGNIN, SIGNUP, GOOGLE_AUTHENTICATION } from "./auth.type";

export const signUpUser = createAsyncThunk(SIGNUP, async (signupData) => {
  const res = await signupUserService(signupData);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const signInUser = createAsyncThunk(SIGNIN, async (signinData) => {
  const res = await signinUserService(signinData);
  const data = res.data;
  console.log("res data", data);
  return res;
});

export const googleAuth = createAsyncThunk(
  GOOGLE_AUTHENTICATION,
  async (googleAuthData) => {
    const res = await googleAuthUserService(googleAuthData);
    const data = res.data;
    console.log("res data", data);
    return data;
  },
);
