/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const Button = ({ children, bgColor = "bg-blue-600", className, onClick }) => (
  <motion.button
    className={`px-4 py-2 rounded-lg text-white ${bgColor} ${className} transition duration-300 ease-in-out transform hover:scale-105`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

export default Button;