import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ _id, images, name, description, isExchange, price }) => {
  return (
    <Link to={`/product/${_id}`}>
      <div className="bg-white dark:bg-gray-950 text-gray-950 dark:text-white shadow-lg rounded-lg p-4 w-60 m-2 transition-transform transform hover:scale-105">
        <img
          src={images[0]} // Display the first image
          alt={name}
          className="h-40 w-full object-cover rounded-md transition-transform duration-300 transform hover:scale-105"
        />
        <h3 className="text-lg font-semibold mt-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        <p className="text-lg font-bold mt-2">
          {isExchange && !price ? (
            <span className="text-green-400">Exchange Available</span>
          ) : (
            `₹${price}`
          )}
        </p>
        <button className="mt-2 text-sm rounded-md p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300">
          View Details
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
