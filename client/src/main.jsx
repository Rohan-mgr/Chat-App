import React from "react";
import "./assets/scss/style.scss";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard/Dashboard";
import SideNav from "./views/Dashboard/SideNav";
import Main from "./views/Dashboard/Main";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <h1>Dashboard</h1>,
      },
    ],
  },
  {
    path: "*",
    element: <p>Sorry page not found</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
