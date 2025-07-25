import React, { useContext, useEffect, useState } from "react";
// import style from 'Navbar.module.css'
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  MenuIcon,
  Moon,
  MoonIcon,
  ShoppingCart,
  Slack,
  Sun,
  SunDim,
  SunIcon,
  Twitter,
  Youtube,
} from "lucide-react";
import { AuthContext } from "../../../Context/TokenContext";
import { cartContext } from "../../../Context/CartContextProvider";

import toast from "react-hot-toast";
import { HandleThemeContext } from "../../../Context/ThemeContextProvider";
import { WishlistContext } from "../../../Context/WishlistProvider";

export default function Navbar() {
  let navigate = useNavigate();
  let { token, setToken } = useContext(AuthContext);
  let { cart, numOfCartItems } = useContext(cartContext);
  let { count, getUserWishList } = useContext(WishlistContext);
  let { theme, toggleTheme } = useContext(HandleThemeContext);
  let [number, setNumber] = useState(numOfCartItems);
  const [overScroll, setOverScroll] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setNumber(numOfCartItems);
  }, [cart]);

  useEffect(() => {
    const scrolling = () => {
      if (window.scrollY > 100) {
        setOverScroll(true);
      } else {
        setOverScroll(false);
      }
    };
    window.addEventListener("scroll", scrolling);
    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, []);

  useEffect(() => {
    getUserWishList();
  }, [count]);

  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("You Are Logged Out");
  }

  function changeMenu() {
    menu ? setMenu(false) : setMenu(true);
  }

  let links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Products",
      path: "products",
    },
    {
      title: "Categories",
      path: "categories",
    },
    {
      title: "Brands",
      path: "brands",
    },
    {
      title: "Orders",
      path: "allOrders",
    },
  ];

  return (
    <>
      <nav
        className={
          overScroll
            ? "bg-slate-300 shadow-md py-3.5 fixed top-0 right-0 left-0 z-50 transition-all duration-500 dark:bg-slate-800"
            : "bg-slate-300 shadow-md py-2.5 md:py-5 lg:py-7 fixed top-0 right-0 left-0 z-50 transition-all duration-500 dark:bg-slate-800"
        }
      >
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link to={"/"} className="flex items-center gap-2 ">
            <ShoppingCart className="text-main font-bold text-xl leading-8 " />
            <h1 className="text-main font-bold text-lg md:text-xl leading-8 ">
              FreshCart
            </h1>
          </Link>

          {/* Main Pages  */}
          <div className="dark:text-slate-200">
            {token ? (
              <ul className="hidden lg:flex justify-between items-center space-x-5">
                {links.map((link, index) => (
                  <li key={index + 1}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "font-extrabold text-main border-b-2 border-main "
                          : null
                      }
                      to={link.path}
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex justify-between items-center space-x-25">
            <div>
              {token ? (
                <div className="flex gap-3  ">
                  <MenuIcon
                    onClick={changeMenu}
                    size={25}
                    className="cursor-pointer text-main lg:hidden"
                  />

                  <Link to="/cart" className="relative">
                    {number != 0 ? (
                      <span className="absolute text-white dark:text-amber-700 font-bold text-[12px] -top-3 -left-3 size-5.5  bg-main  rounded-full   flex items-center justify-center ">
                        {numOfCartItems}
                      </span>
                    ) : (
                      <span className="absolute text-white font-semibold -top-3 -left-3 size-6  bg-main  rounded-full border flex items-center justify-center text-sm">
                        0
                      </span>
                    )}

                    <ShoppingCart
                      size={25}
                      className="cursor-pointer text-main"
                    />
                  </Link>
                  {/* WishList */}
                  <Link
                    to={"/Wishlist"}
                    className="animate__animated hover:animate__shakeX"
                  >
                    <Heart
                      size={25}
                      className={
                        count && count > 0
                          ? "text-red-600 cursor-pointer "
                          : "cursor-pointer text-main "
                      }
                    />
                  </Link>

                  <div className="hidden lg:flex justify-between items-center space-x-1.5">
                    <Facebook
                      size={20}
                      className="hover:-translate-y-1 transition-all duration-300 cursor-pointer text-blue-700"
                    />
                    <Instagram
                      size={20}
                      className="hover:-translate-y-1 transition-all duration-300 cursor-pointer text-red-500"
                    />
                    <Twitter
                      size={20}
                      className="hover:-translate-y-1 transition-all duration-300 cursor-pointer text-main"
                    />
                    <Linkedin
                      size={20}
                      className="hover:-translate-y-1 transition-all duration-300 cursor-pointer text-blue-700"
                    />
                  </div>

                  <span
                    className="cursor-pointer text-slate-500 dark:text-slate-200"
                    onClick={logOut}
                  >
                    LogOut
                  </span>

                  <span onClick={toggleTheme}>
                    {theme === "light" ? (
                      <MoonIcon
                        size={25}
                        className="cursor-pointer text-main"
                      />
                    ) : (
                      <SunIcon size={25} className="cursor-pointer text-main" />
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <div className="flex justify-between items-center space-x-1.5">
                    <Facebook
                      size={20}
                      className="hover:-translate-y-1 transition-all duration-300 cursor-pointer text-blue-700"
                    />
                    <Instagram
                      size={20}
                      className="hover:-translate-y-1 transition-all duration-300 cursor-pointer text-red-500"
                    />
                    <Twitter
                      size={20}
                      className="hover:-translate-y-1 transition-all duration-300 cursor-pointer text-main"
                    />
                    <Linkedin
                      size={20}
                      className="hover:-translate-y-1 transition-all duration-300 cursor-pointer text-blue-700"
                    />
                  </div>

                  <span onClick={toggleTheme}>
                    {theme === "light" ? (
                      <MoonIcon
                        size={25}
                        className="cursor-pointer text-main"
                      />
                    ) : (
                      <SunIcon size={25} className="cursor-pointer text-main" />
                    )}
                  </span>

                    {/* Login and Register */}
                  <Link
                    to="login"
                    className="text-slate-500 dark:text-slate-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="Register"
                    className="text-slate-500 dark:text-slate-200"
                  >
                    Register
                  </Link>

                </div>
              )}
            </div>
          </div>

          {/* Links In Small Media */}
          <div className="lg:hidden z-50">
            {token ? (
              <ul
                className={
                  menu
                    ? " flex flex-col lg:hidden justify-center items-center space-y-5 absolute top-[100%] py-5 left-0 right-0 bg-slate-300 transition-all duration-500 z-30 "
                    : " hidden "
                }
              >
                {links.map((link, index) => (
                  <li key={index + 1}>
                    <NavLink
                      onClick={()=>setMenu(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "font-extrabold text-main border-b-2 border-main "
                          : null
                      }
                      to={link.path}
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
