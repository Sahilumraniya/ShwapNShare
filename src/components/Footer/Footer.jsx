import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "react-feather";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 transition-colors duration-500">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold">Online TradeHub</h3>
          <p className="mt-4">
            Thanks for choosing Online TradeHub. Follow us on social media to stay up to date on new items and community events.
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
              <a href="#" className="text-gray-400 dark:text-gray-400 hover:text-white transition-colors duration-300">
                Books
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 dark:text-gray-400 hover:text-white transition-colors duration-300">
                Accessories
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 dark:text-gray-400 hover:text-white transition-colors duration-300">
                Shoes
              </a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/4 mt-8 md:mt-0">
          <h3 className="text-xl font-semibold">About</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="text-gray-400 dark:text-gray-400 hover:text-white transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 dark:text-gray-400 hover:text-white transition-colors duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;