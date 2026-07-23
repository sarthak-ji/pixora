import React from "react";
import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Feed from "./features/posts/pages/Feed";

export const router = createBrowserRouter([
  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Feed />,
  },

]);
