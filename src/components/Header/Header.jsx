import React, { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
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
    <header className="bg-gray-900 text-white p-4 md:p-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold">
          <Link to="/" className="text-blue-400 hover:text-blue-600">
            Trade-Hub
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-blue-400 hover:text-blue-600"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu */}
        <nav className={`md:hidden ${menuOpen ? "block" : "hidden"} absolute top-[10%] right-0 z-20`}>
          <ul className="text-center p-4 bg-gray-900">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.slug}>
                    <button
                      onClick={() => {
                        console.log("Slug: ", item.slug);
                        navigate(item.slug);
                        toggleMenu(); // Close the menu when a menu item is clicked
                      }}
                      className="block text-blue-400 hover:text-blue-600 py-2"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>

        {/* Desktop Menu */}
        <nav className="md:ml-4 hidden md:block">
          <ul className="flex space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.slug}>
                    <button
                      onClick={() => {
                        console.log("Slug: ", item.slug);
                        navigate(item.slug);
                      }}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
