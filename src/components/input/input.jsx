import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import style from "./input.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
const Input = ({ lable, height, width, value, error, setState  ,isPasswordFeild=false}) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <TextField
      type={showPassword ? "text" : "password"}
      id="outlined-basic"
      className={style.input}
      variant="outlined"
      label={lable}
      value={value}
      error={error}
      onChange={setState}
      sx={{
        width: width,
        input: {
          alignContent: "center",
          height: "37px",
          padding: "5px",
          color: "#808080",
          fontWeight: "light",
        },

      }}

      InputProps={ isPasswordFeild && {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {!showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}


    ></TextField>
  );
};

export default Input;
