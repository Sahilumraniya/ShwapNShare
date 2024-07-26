/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <div className="flex justify-center my-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`px-4 py-2 mx-1 rounded transition-colors duration-300 ${
          currentPage === 1
            ? "bg-gray-400 cursor-not-allowed"
            : theme === "light"
            ? "bg-blue-500 hover:bg-blue-700 text-white"
            : "bg-gray-700 hover:bg-gray-500 text-white"
        }`}
      >
        Previous
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`px-4 py-2 mx-1 rounded transition-colors duration-300 ${
          currentPage === totalPages
            ? "bg-gray-400 cursor-not-allowed"
            : theme === "light"
            ? "bg-blue-500 hover:bg-blue-700 text-white"
            : "bg-gray-700 hover:bg-gray-500 text-white"
        }`}
      >
        Next
      </motion.button>
    </div>
  );
};

export default Pagination;
