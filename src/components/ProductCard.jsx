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
      <div className="bg-white w-full h-[350px] rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <img
          src={appwriteService.getImagePreview(image)}
          alt={name}
          className="w-full h-[80%] object-cover"
        />
      <div className="p-4 h-[20%]">
        <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
        <p className="text-green-600 font-semibold mb-2">Price: ₹{price}</p>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
