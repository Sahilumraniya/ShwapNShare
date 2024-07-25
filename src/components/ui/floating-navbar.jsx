/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import {
  motion,
  AnimatePresence
} from "framer-motion";
import { cn } from "../../lib/util";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authserivce from "../../appwrite/auth";
import { useTheme } from "../../context/ThemeContext";


export const FloatingNav = ({
  className,
}) => {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const handleLogout = () => {
    authserivce.logout().then(() => {
      dispatch(logout());
    }).then(() => {
      // navigate("/");
      window.location.reload();
    }).catch((err) => {
      console.log("Error :: ", err);
      window.location.reload();
    });
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Products",
      slug: "/all-product",
      active: authStatus,
    },
    {
      name: "Add Product",
      slug: "/add-product",
      active: authStatus,
    },
  ];


  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn(
          "light flex max-w-full md:max-w-fit fixed top-5 md:top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 md:pr-3 md:pl-9 md:py-3 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          navItem.active && (<div
            key={`link=${idx}`}
            href={navItem.slug}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 hover:cursor-pointer"
            )}
          >
            <span className="sm:block text-base md:text-xl" onClick={() => navigate(navItem.slug)}>{navItem.name}</span>
          </div>)
        ))}
        <button
          className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 hover:cursor-pointer"
          onClick={toggleTheme}
        >
          <span className="sm:block text-base md:text-xl" >{theme === "light" ? "🌑 Dark" : "🌞 Light"}</span>
        </button>
        <button className="border text-base md:text-lg font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          {!authStatus ? (<span onClick={() => navigate('/login')}>Login</span>) : (<span onClick={handleLogout}>Logout</span>)}
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
