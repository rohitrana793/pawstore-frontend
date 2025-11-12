import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

export default function AdminRoute() {
  const { user } = useSelector((state) => state.authSlice);

  return user?.role === "Admin" ? (
    <Outlet />
  ) : user?.role === "User" ? (
    <Navigate to={"/"} />
  ) : (
    <Navigate to={"/login"} />
  );
}
