import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

export default function UserRoute() {
  const { user } = useSelector((state) => state.authSlice);
  if (user === undefined) return null;
  return user ? <Outlet /> : <Navigate to={"/login"} />;
}
