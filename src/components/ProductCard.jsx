import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ _id, images, name, description, items, price }) => {
  return (
    <Link to={`/product/${_id}`}>
      <div className="bg-white dark:bg-gray-950 text-gray-950 dark:text-white shadow-lg rounded-lg p-4 w-60 m-2 transition-transform transform hover:scale-105 flex flex-col h-80">

        {/* Image Section */}
        <div className="flex-shrink-0" style={{ height: '40%' }}>
          <img
            src={images[0]} // Display the first image
            alt={name}
            className="h-full w-full object-cover rounded-md"
          />
        </div>

        {/* Title Section */}
        <h3 className="text-lg font-semibold mt-2 flex-grow" style={{ height: '15%' }}>
          {name}
        </h3>

        {/* Description Section */}
        <p className="text-gray-600 dark:text-gray-400 mt-1 flex-grow" style={{ height: '25%' }}>
          {description.length > 70 ? description.substring(0, 70) + " ... " : description}
        </p>

        {/* Price/Exchange Section */}
        <p className="text-lg font-bold" style={{ height: '10%' }}>
          {items.length > 0 ? (
            <span className="text-green-400">Exchange Available</span>
          ) : (
            `₹${price}`
          )}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
