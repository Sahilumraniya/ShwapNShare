import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "react-feather";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme(); // Get the current theme from context

  return (
    <footer className={`relative w-full bottom-0 py-8 ${theme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        <div className="md:w-1/3">
          <h3 className="text-2xl font-bold">Online Swap & Share</h3>
          <p className={`mt-4 ${theme ? 'text-gray-400' : 'text-gray-600'}`}>
            Thanks for choosing Online Swap & Share. Follow us on social media to stay up to date on new items and community events.
          </p>
          <div className="mt-4 flex space-x-4">
            <motion.a href="#" className="text-blue-400 hover:text-blue-600" whileHover={{ scale: 1.2 }}>
              <Instagram size={20} />
            </motion.a>
            <motion.a href="#" className="text-blue-400 hover:text-blue-600" whileHover={{ scale: 1.2 }}>
              <Facebook size={20} />
            </motion.a>
            <motion.a href="#" className="text-blue-400 hover:text-blue-600" whileHover={{ scale: 1.2 }}>
              <Twitter size={20} />
            </motion.a>
          </div>
        </div>

        <div className="md:w-1/4 mt-8 md:mt-0">
          <h3 className="text-xl font-semibold">Shop</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className={`hover:${theme ? 'text-yellow-400' : 'text-yellow-600'} transition-colors duration-300`}>
                Books
              </a>
            </li>
            <li>
              <a href="#" className={`hover:${theme ? 'text-yellow-400' : 'text-yellow-600'} transition-colors duration-300`}>
                Accessories
              </a>
            </li>
            <li>
              <a href="#" className={`hover:${theme ? 'text-yellow-400' : 'text-yellow-600'} transition-colors duration-300`}>
                Shoes
              </a>
            </li>
          </ul>
        </div>

        <div className="md:w-1/4 mt-8 md:mt-0">
          <h3 className="text-xl font-semibold">About</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className={`hover:${theme ? 'text-yellow-400' : 'text-yellow-600'} transition-colors duration-300`}>
                Home
              </a>
            </li>
            <li>
              <a href="#" className={`hover:${theme ? 'text-yellow-400' : 'text-yellow-600'} transition-colors duration-300`}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-center">
        <p className={`text-gray-400 ${theme ? 'dark:text-gray-400' : 'light:text-gray-600'}`}>
          &copy; {new Date().getFullYear()} Online Swap & Share. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
