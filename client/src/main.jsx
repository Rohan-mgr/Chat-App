import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import "./assets/scss/style.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
