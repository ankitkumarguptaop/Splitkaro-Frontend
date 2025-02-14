import React from "react";
import style from "./particular-group.module.css";
import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
const ParticularGroup = () => {
  const group = useSelector((state) => state.group.currentSelectedGroup);

  console.log(group);

  return (
    <Box className={style["particular-group-container"]}>
      {group && (
        <>
          <Box className={style["group-header"]}>
            <Box>
            <Avatar  alt="Remy Sharp" src=""  />
            </Box>
            <Typography className={style["group-name"]} variant="h4"> {group.group_id.name}</Typography>
          </Box>
          <Box className={style["group-content"]}>

          </Box>
         
        </>
      )}
    </Box>
  );
};

export default ParticularGroup;
