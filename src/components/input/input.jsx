import { Box, TextField } from "@mui/material";
import React from "react";
import style from "./input.module.css";
const Input = ({ lable, height, width, value, error, setState }) => {
  return (
    <TextField
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
    ></TextField>
  );
};

export default Input;
