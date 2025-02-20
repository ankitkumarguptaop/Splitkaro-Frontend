import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import style from "./signup.module.css";
import React, { useState } from "react";
import Input from "../../components/input/input";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import apple from "../../assets/images/apple.png";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth, signUpUser } from "../../features/auth/auth.action";
import { removeError } from "../../features/auth/auth.slice";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpError = useSelector((state) => state.auth.error);

  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    phoneNo: "",
    avatar: "",
  });
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
    nameError: false,
    phoneNoError: false,
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
  const phonePattern = /^([+]\d{2})?\d{10}$/;

  function handleInput(e, pattern, currentInput, currentInputError) {
    setInput({
      ...input,
      [currentInput]: e.target.value,
    });

    let isError = false;
    if (currentInput !== "name") {
      isError = !pattern.test(e.target.value);
    } else {
      isError = e.target.value.replace(/\s+/g, " ").trim().length <= 0;
    }

    if (isError) {
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

  function signedUser(e) {
    e.preventDefault();

    if (!emailPattern.test(input.email)) {
      setError((prev) => ({ ...prev, emailError: true }));
    }
    if (!phonePattern.test(input.phoneNo)) {
      setError((prev) => ({ ...prev, phoneNoError: true }));
    }
    if (input.name.replace(/\s+/g, " ").trim().length <= 0 || input.name <= 0) {
      setError((prev) => ({ ...prev, nameError: true }));
    }
    if (!passwordPattern.test(input.password)) {
      setError((prev) => ({ ...prev, passwordError: true }));
    }

    if (
      !emailPattern.test(input.email) ||
      !passwordPattern.test(input.password) ||
      input.name.replace(/\s+/g, " ").trim().length <= 0 ||
      input.name <= 0 ||
      !phonePattern.test(input.phoneNo) ||
      !input.avatar
    ) {
      return;
    }

    let formdata = new FormData();
    formdata.append("avatar", input.avatar);
    formdata.append("name", input.name);
    formdata.append("password", input.password);
    formdata.append("email", input.email);
    formdata.append("phone_no", input.phoneNo);

    try {
      dispatch(signUpUser(formdata));
      setInput({
        name: "",
        email: "",
        password: "",
        avatar: "",
        phoneNo: "",
      });
      navigate("/");
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
            Welcome to SplitKaro{" "}
          </Typography>
          <Box className={style["signup-link"]}>
            <Typography sx={{ fontSize: "13px", color: "#8D8D8D" }}>
              Have an Account ?
            </Typography>
            <Link
              style={{
                color: "#B87514",
                fontSize: "13px",
                textDecoration: "none",
              }}
              to="/"
            >
              Sign in
            </Link>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "55px",
              marginLeft: "44px",
              fontWeight: "medium",
              marginBottom: "10px",
            }}
          >
            Sign up
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "16px", marginBottom: "10px" }}>
            Enter your email address
          </Typography>
          <Input
            lable="email address"
            height={"40px"}
            width={"400px"}
            value={input.email}
            error={error.emailError}
            setState={(e) =>
              handleInput(e, emailPattern, "email", "emailError")
            }
          ></Input>
        </Box>
        <Box className={style["name-phone"]}>
          <Box>
            <Typography sx={{ fontSize: "16px", marginBottom: "5px" }}>
              Enter your name
            </Typography>
            <Input
              lable="name"
              height={"40px"}
              width={"180px"}
              value={input.name}
              error={error.nameError}
              setState={(e) => handleInput(e, null, "name", "nameError")}
            ></Input>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "16px", marginBottom: "5px" }}>
              Enter your phone no
            </Typography>
            <Input
              lable="phone no"
              height={"40px"}
              width={"200px"}
              value={input.phoneNo}
              error={error.phoneNoError}
              setState={(e) =>
                handleInput(e, phonePattern, "phoneNo", "phoneNoError")
              }
            ></Input>
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{ fontSize: "16px", marginBottom: "5px", marginTop: "10px" }}
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
        </Box>
        <Box className="upload-picture">
          <input
            type="file"
            name="avatar"
            onChange={(e) => {
              setInput({ ...input, avatar: e.target.files[0] });
            }}
          />
        </Box>
        <Button
          onClick={signedUser}
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#E48700",
            width: "400px",
            height: "54px",
            borderRadius: "10px",
            textTransform: "none",
            marginTop: "20px",
          }}
        >
          Sign up
        </Button>
        <Box
          sx={{
            color: "#ABABAB",
            fontSize: "16px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          OR
        </Box>
        <Box className={style["third-party-signin"]}>
          <img
            src={google}
            alt="google"
            onClick={googleAuthentication}
            height="50px"
            width="250px"
          />
          <img src={facebook} alt="facebook" height="50px" width="60px" />
          <img src={apple} alt="apple" height="50px" width="60px" />
        </Box>
      </Box>

      <Box className={style["right-container"]}> </Box>
    </Box>
  );
};

export default Signup;
