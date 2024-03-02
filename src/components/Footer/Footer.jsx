import { Instagram, Facebook, Twitter } from "react-feather";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2">
          <h3 className="mx-2 text-2xl font-bold">Online TradeHub</h3>
          <p className="mt-4 mx-2">
            Thanks for choosing Online TradeHub. Follow us on social media to
            stay up to date on new items and community events.
          </p>
          <div className="mx-2 mt-4 flex">
            <a href="#" className="text-blue-400 hover:text-blue-600 mr-4">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600 mr-4">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        <div className="md:w-1/4 mt-8 md:mt-0">
          <h3 className="text-xl font-semibold">Shop</h3>
          <ul className="mt-4">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Books
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Accessories
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Shoes
              </a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/4 mt-8 md:mt-0">
          <h3 className="text-xl font-semibold">About</h3>
          <ul className="mt-4">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
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
