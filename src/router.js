import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import { useSelector } from "react-redux";
import Home from "./pages/home/home";

const Router = () => {
  const PrivateRouteAuth = ({ children }) => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    if (!currentUser) {
      return children;
    }
    return <Navigate to="/home" />;
  };

  const PrivateRouteHome = ({ children }) => {
    const currentUser = useSelector((state) => state.auth.currentUser);

    if (currentUser) {
      return children;
    }
    return <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRouteAuth>
            <SignIn />
          </PrivateRouteAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <PrivateRouteAuth>
            <SignUp />
          </PrivateRouteAuth>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRouteHome>
            <Home />
          </PrivateRouteHome>
        }
      />
    </Routes>
  );
};

export default Router;
