import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation(); // Get the current location

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Products", slug: "/all-product", active: authStatus },
    { name: "Add Product", slug: "/add-product", active: authStatus },
    { name: "About Us", slug: "/aboutUS", active: true },
  ];

  return (
    <header
      className={`fixed w-full z-[100] top-0 p-4 flex justify-between items-center ${theme ? "bg-gray-800" : "bg-white"}`}
    >
      <h1 className={`text-lg font-bold ${theme ? "text-cyan-400" : "text-gray-800"}`}>
        Swap & Share
      </h1>
      <div>
        <button
          onClick={toggleTheme}
          className={`md:hidden mr-4 text-lg focus:outline-none ${theme ? "bg-gray-700" : "bg-gray-300"} rounded-full p-2 transition`}
        >
          {theme ? '🌙' : '☀️'}
        </button>
        <button
          onClick={toggleMenu}
          className={`text-black md:hidden focus:outline-none dark:text-white`}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {/* Full-Screen Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <button onClick={toggleMenu} className="text-white absolute top-4 right-4">
          ✕
        </button>
        <ul className="flex flex-col space-y-6 text-center">
          {navItems.map((item) => {
            if (item.active) {
              return (
                <li key={item.slug}>
                  <Link
                    to={item.slug}
                    className={`text-lg transition-colors duration-300 rounded-tl-md ${location.pathname === item.slug ? 'text-teal-400 font-bold' : 'text-white hover:text-teal-400'}`}
                    onClick={() => setMenuOpen(false)} // Close menu on link click
                  >
                    {item.name}
                  </Link>
                </li>
              );
            }
            return null;
          })}
          <li>
            {authStatus && <LogoutBtn theme={theme} />}
          </li>
        </ul>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center">
        <ul className="flex space-x-6">
          {navItems.map((item) => {
            if (item.active) {
              return (
                <li key={item.slug}>
                  <Link
                    to={item.slug}
                    className={`block py-2 px-4 transition-colors duration-300 rounded-tl-md rounded-bl-md ${theme
                      ? 'text-white hover:text-teal-400'
                      : 'text-gray-800 hover:text-teal-400'
                      } ${location.pathname === item.slug ? 'text-teal-400 font-bold bg-black border-r-2 border-teal-400' : ''}`}
                    onClick={() => setMenuOpen(false)} // Close menu on link click
                  >
                    {item.name}
                  </Link>
                </li>
              );
            }
            return null;
          })}
          <li>
            {authStatus && <LogoutBtn theme={theme} />}
          </li>
        </ul>
        {/* Theme Toggle Button at the end of nav items */}
        <button
          onClick={toggleTheme}
          className={`ml-4 text-lg focus:outline-none ${theme ? "bg-gray-700" : "bg-gray-300"} rounded-full p-2 transition`}
        >
          {theme ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
