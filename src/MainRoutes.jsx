import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PrivateRoute from "./PrivateRoute";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
