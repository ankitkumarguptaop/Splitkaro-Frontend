import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import style from "./signin.module.css";
import React, { useState } from "react";
import Input from "../../components/input/input";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import apple from "../../assets/images/apple.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { googleAuth, signInUser } from "../../features/auth/auth.action";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  function googleAuthentication() {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        if (result.user) {
          toast.success("User successfuly signup!", {
            position: "top-center",
          });
          dispatch(
            googleAuth({
              email: result.user.email,
              name: result.user.displayName,
              avatar: result.user.photoURL,
            })
          );
          navigate("/home");
        }
      });
    } catch (error) {
      toast.error("Failed  signup!", {
        position: "top-center",
      });
    }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  function handleInput(e, pattern, currentInput, currentInputError) {
    setInput({
      ...input,
      [currentInput]: e.target.value,
    });
    if (!pattern.test(e.target.value)) {
      setError({
        ...error,
        [currentInputError]: true,
      });
    } else {
      setError({
        ...error,
        [currentInputError]: false,
      });
    }
    if (e.target.value.length <= 0) {
      setError({
        ...error,
        [currentInputError]: false,
      });
    }
  }

  function signinUser(e) {
    e.preventDefault();

    if (!emailPattern.test(input.email)) {
      setError((prev) => ({ ...prev, emailError: true }));
    }

    if (!passwordPattern.test(input.password)) {
      setError((prev) => ({ ...prev, passwordError: true }));
    }

    if (
      !emailPattern.test(input.email) ||
      !passwordPattern.test(input.password)
    ) {
      return;
    }

    try {
      dispatch(signInUser(input));
      setInput({
        email: "",
        password: "",
      });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box className={style["parent-container"]}>
      <Box className={style["left-container"]}> </Box>
      <Box className={style["center-container"]}>
        <Box className={style["upper-texts"]}>
          <Typography sx={{ fontSize: "20px" }}>
            Welcome to SplitKaro
          </Typography>
          <Box className={style["signup-link"]}>
            <Typography sx={{ fontSize: "16px", color: "#8D8D8D" }}>
              No Account ?
            </Typography>
            <Link
              style={{
                color: "#B87514",
                fontSize: "16px",
                textDecoration: "none",
              }}
              to="/signup"
            >
              Sign up
            </Link>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "55px",
              marginLeft: "44px",
              fontWeight: "medium",
              marginBottom: "20px",
            }}
          >
            Sign in
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "16px", marginBottom: "10px" }}>
            Enter your username or email address
          </Typography>
          <Input
            lable="username or email address"
            height={"40px"}
            width={"400px"}
            value={input.email}
            error={error.emailError}
            setState={(e) =>
              handleInput(e, emailPattern, "email", "emailError")
            }
          ></Input>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "16px", marginBottom: "10px", marginTop: "20px" }}
          >
            Enter your Password
          </Typography>
          <Input
            lable="password"
            height={"40px"}
            width={"400px"}
            value={input.password}
            error={error.passwordError}
            setState={(e) =>
              handleInput(e, passwordPattern, "password", "passwordError")
            }
          ></Input>
          <Box className={style["forgot-password"]}>
            <Typography
              sx={{
                fontSize: "13px",
                marginBottom: "20px",
                marginTop: "10px",
                color: "#AD3113",
                cursor: "pointer",
              }}
            >
              Forgot Password
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={signinUser}
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#E48700",
            width: "400px",
            height: "54px",
            borderRadius: "10px",
            textTransform: "none",
          }}
        >
          Sign in
        </Button>
        <Box
          sx={{
            color: "#ABABAB",
            fontSize: "16px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          OR
        </Box>
        <Box className={style["third-party-signin"]}>
          <img
            src={google}
            onClick={googleAuthentication}
            height="50px"
            width="250px"
          />
          <img src={facebook} height="50px" width="60px" />
          <img src={apple} height="50px" width="60px" />
        </Box>
      </Box>

      <Box className={style["right-container"]}> </Box>
    </Box>
  );
};

export default Signin;
