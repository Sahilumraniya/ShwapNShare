/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import { BackgroundGradient } from './ui/background-gradient';

const ProductCard = ({ $id, image, name, description, isExchange, price }) => {
  return (
    <Link to={`/product/${$id}`}>
      <div className="px-4 md:px-5">
      <BackgroundGradient className="rounded-[22px] w-full md:w-[400px] h-[500px] p-4 bg-white dark:bg-zinc-900">
          <img
            src={appwriteService.getImagePreview(image)}
            alt="jordans"
            className="object-cover w-full h-3/4 rounded-sm"
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            {name}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            {isExchange ? (
              <span>Exchange Available</span>
            ) : (
              <><span>Buy now</span><span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                ₹{price}
              </span></>
            )}
          </button>
        </BackgroundGradient>
      </div>
    </Link>
  );
};

export default ProductCard;
