import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const ProductCard = ({
  $id,
  name,
  description,
  isExchange,
  items,
  price,
  image,
}) => {
  return (
    <Link to={`/product/${$id}`}>
      <div className="w-full h-[350px] rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
        <img
          src={appwriteService.getImagePreview(image)}
          alt={name}
          className="w-full h-[75%] object-fill"
        />
        <div className="px-4 h-[25%] bg-gray-800">
          <h2 className="text-xl font-semibold text-white">{name}</h2>
          {isExchange ? (
            <p className="text-green-600 font-semibold mb-2">
              Exchange Available
            </p>
          ) : (
            <p className="text-green-600 font-semibold mb-2">Price: ₹{price}</p>
          )}

          <p className="text-white text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
