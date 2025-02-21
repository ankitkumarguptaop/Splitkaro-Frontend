import { useEffect } from "react";
import "./global.css";
import Router from "./router";
import { useRoutes } from "react-router-dom";
import { socket } from "./configs/socket";
import { setLiveNotification } from "./features/notification/notification.slice";
import { useDispatch } from "react-redux";

function App() {
  const router = useRoutes(Router());
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("create-expense-notification", (message) => {
    console.log("gdyuvhgbfhgbvdh============================")

      dispatch(setLiveNotification({message : message}));
      console.log("✌️message --->", message);
    });

    socket.on("settlement-notification", (message) => {
    console.log("gdyuvhgbfhgbvdh============================")

      dispatch(setLiveNotification({message : message}));
      console.log("✌️message --->", message);
    });
  });

  return router;
}

export default App;
