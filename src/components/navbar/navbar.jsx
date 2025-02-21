import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/auth.slice";
import style from "./navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AccountMenu from "../profile/profile";
import { socket } from "../../configs/socket";
import MailIcon from "@mui/icons-material/Mail";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  clearNotification,
  decreaseNotificationCount,
} from "../../features/notification/notification.slice";
import {
  listNotification,
  readNotification,
} from "../../features/notification/notification.action";

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const notificationCount = useSelector(
    (state) => state.notification.unReadedNotifcationLength
  );
  const dispatch = useDispatch();
  const [pictureUrl, setPictureUrl] = useState("");

  const [anchorElNotification, setaAnchorElNotification] = useState(0);
  const open = Boolean(anchorElNotification);

  const handleClose = () => {
    setaAnchorElNotification(null);
  };

  useEffect(() => {
    if (currentUser.user.avatar.startsWith("http")) {
      setPictureUrl(currentUser.user.avatar);
    } else {
      setPictureUrl(
        `${process.env.REACT_APP_BACKEND_URL}${currentUser.user.avatar}`
      );
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(listNotification());
  }, [notificationCount]);

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
        <Badge
          badgeContent={notificationCount}
          color="primary"
          sx={{ cursor: "pointer" }}
          onClick={(event) => {
            setaAnchorElNotification(event.currentTarget);
            dispatch(listNotification());
          }}
        >
          <NotificationsIcon></NotificationsIcon>
        </Badge>
        {notifications && notifications.length > 0 && (
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorElNotification}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {notifications &&
              notifications.length > 0 &&
              notifications.map((notification) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <MenuItem
                    sx={{
                      color: notification.is_readed ? "grey" : "black",
                      padding: "10px",
                    }}
                    key={notification._id}
                    onClick={() => {
                      if (!notification.is_readed) {
                        dispatch(decreaseNotificationCount());
                        dispatch(
                          readNotification({
                            notification_id: notification._id,
                          })
                        );
                      }
                    }}
                  >
                    {notification.message}
                  </MenuItem>
                </Box>
              ))}
          </Menu>
        )}
        <AccountMenu pictureUrl={pictureUrl} />
      </Box>
    </Box>
  );
};

export default Navbar;
