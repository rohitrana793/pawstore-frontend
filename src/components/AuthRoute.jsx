import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

export default function AuthRoute() {
  const { user } = useSelector((state) => state.authSlice);
  return user ? <Navigate to={"/"} /> : <Outlet />;
}
