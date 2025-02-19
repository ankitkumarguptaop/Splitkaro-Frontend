import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
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

  const routes = [
    {
      element: <PrivateRouteAuth><Outlet/></PrivateRouteAuth>,
      children: [
        {
          path: "/",
          element: (
              <SignIn />
          ),
        },
        {
          path: "signup",
          element: (
              <SignUp />
          ),
        },
      ]
    },

    {
      path: "/home",
      element: <PrivateRouteHome>
        <Home />
      </PrivateRouteHome>
    }
  ];

  // return (
  //   <Routes>
  //     <Route
  //       path="/"
  //       element={
  //         <PrivateRouteAuth>
  //           <SignIn />
  //         </PrivateRouteAuth>
  //       }
  //     />
  //     <Route
  //       path="/signup"
  //       element={
  //         <PrivateRouteAuth>
  //           <SignUp />
  //         </PrivateRouteAuth>
  //       }
  //     />
  //     <Route
  //       path="/home"
  //       element={
  //         <PrivateRouteHome>
  //           <Home />
  //         </PrivateRouteHome>
  //       }
  //     />
  //   </Routes>
  // );

  return routes
};

export default Router;
