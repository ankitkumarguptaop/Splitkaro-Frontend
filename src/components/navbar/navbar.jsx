import React, { useEffect, useState } from "react";
import { Avatar, Badge, Box, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/auth.slice";
import style from "./navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AccountMenu from "../profile/profile";
import { socket } from "../../configs/socket";
import MailIcon from '@mui/icons-material/Mail';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { clearNotification } from "../../features/notification/notification.slice";


const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const notifications = useSelector((state) => state.notification.notifications);
  const liveNotifications = useSelector((state) => state.notification.liveNotifications);
  const dispatch = useDispatch();
  const [pictureUrl, setPictureUrl] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);


  useEffect(() => {
    if (currentUser.user.avatar.startsWith("http")) {
      setPictureUrl(currentUser.user.avatar);
    } else {
      setPictureUrl(
        `${process.env.REACT_APP_BACKEND_URL}${currentUser.user.avatar}`,
      );
    }
  }, [currentUser]);

  useEffect(() => {
    if (liveNotifications.length > 0) {
      setNotificationCount(liveNotifications.length);
    }
  }, [liveNotifications]);

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
        <Badge badgeContent={notificationCount} color="primary" sx={{cursor:"pointer"}} onClick={() => setNotificationCount(0)}>
        <NotificationsIcon></NotificationsIcon>
        </Badge>
        <AccountMenu pictureUrl={pictureUrl} />
      </Box>
    </Box>
  );
};

export default Navbar;
