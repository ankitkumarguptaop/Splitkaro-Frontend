
import axios from "axios";

export const signupUserService = async (signupData) => await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}auth/signup`,
    signupData
  );

export const signinUserService = async (signinData) => await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}auth/signin`,
    signinData
  );

export const googleAuthUserService = async(googleAuthData) => await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}auth/google`,
    googleAuthData
  );
