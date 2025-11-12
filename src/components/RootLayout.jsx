import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { ScrollContext } from "../context/ScrollContext";
import { useContext } from "react";

export default function RootLayout() {
  const { downRef, upRef } = useContext(ScrollContext);
  return (
    <div>
      <div ref={upRef}></div>
      <Header />
      <Outlet />
      <Footer />
      <div ref={downRef}></div>
    </div>
  );
}
