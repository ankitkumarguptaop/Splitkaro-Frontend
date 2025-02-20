import { useEffect } from "react";
import "./global.css";
import Router from "./router";
import { useRoutes } from "react-router-dom";
import { socket } from "./configs/socket";

function App() {
  const router = useRoutes(Router());

  useEffect(() => {
    socket.on("create-expense-notification", (message) => {
      console.log("✌️message --->", message);
    });
  });

  return router;
}

export default App;
