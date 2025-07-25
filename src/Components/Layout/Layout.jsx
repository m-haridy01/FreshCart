import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import ScrollToTop from "react-scroll-to-top";
import { ArrowBigUpDash, ArrowUp } from "lucide-react";
export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollToTop
        className="size-20 flex items-center justify-center text-sm -mr-7 mb-5"
        smooth
        width="30"
        height="30"
        top={100}
        color="#fff"

        component={<ArrowUp size={25} className="text-white dark:text-amber-700"/>}
        style={{ backgroundColor: "#0aad50", borderRadius: "50%"}}
      />
      <Footer />
    </>
  );
}
