import Signin from "./pages/signin/signin";
import "./global.css"
import Router from "./router";
import { useRoutes } from "react-router-dom";

function App() {
  const router = useRoutes(Router())
  return router
}

export default App;
