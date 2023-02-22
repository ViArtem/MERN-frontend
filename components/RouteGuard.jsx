import React from "react";
import { Route, Navigate, Routes,  } from "react-router-dom";

function RouteGuard({ component: Component, ...rest }) {
  function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem("Authorization") ? (flag = true) : (flag = false);

    return flag;
  }

  return (
    <Routes > 

      <Route path="/"
        {...rest}
        element={
          hasJWT() ? (
            Component ? (
              <Component />
            ) : (
              rest.children
            )
          ) : (
              <Navigate to="/auth" replace />
          )
        }
      />

    </Routes>
  );
}

export default RouteGuard;
