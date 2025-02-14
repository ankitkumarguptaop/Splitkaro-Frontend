import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/auth.slice";
import style from "./navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AccountMenu from "../profile/profile";

const Navbar = () => {
  
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    if (currentUser.user.avatar.startsWith("http")) {
      setPictureUrl(currentUser.user.avatar);
    } else {
      setPictureUrl(
        `${process.env.REACT_APP_BACKEND_URL}${currentUser.user.avatar}`
      );
    }
  }, [currentUser]);



  return (
    <Box className={style["navbar"]}>
      <Box className={style["left-items"]}>
        <MenuIcon sx={{ color: "black", margin: "10px" }}></MenuIcon>
        <Typography
          className={style["contact-management-text"]}
          variant="subtitle1"
          component="h2"
          sx={{ color: "black", margin: "10px" }}
        >
          Split Karo
        </Typography>
      </Box>
      <Box className={style["right-items"]}>
        <Typography
          className={style["display-name"]}
          variant="subtitle1"
          component="h2"
          sx={{ color: "black", margin: "5px" }}
        >
          {currentUser.user.name}
        </Typography>
        <AccountMenu pictureUrl={pictureUrl} />
      
      </Box>
    </Box>
  );
};

export default Navbar;
