import React, { useEffect, useState } from "react";
import { ProductCard } from "../components";
import service from "../appwrite/config";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  const gradientBackgroundStyle = {
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
  };

  useEffect(() => {
    service.getProducts([]).then((res) => {
      if (res) {
        setProducts(res.documents);
      }
    });
  }, []);
  if (products.length === 0) {
    return (
      <div className="text-center w-full h-full">
        {" "}
        <img
        className="w-full h-[350px] rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          src="https://www.pharmacy.precureplus.com/assets/site/images/no_result.gif"
          alt="No product"
        />{" "}
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <h1 className="text-3xl font-semibold text-black mx-10 mb-4">Products</h1>

      <div className="flex flex-wrap py-4 items-center justify-center gap-x-4 gap-y-5">
        {products.map((product) => (
          <div className="w-1/3" key={product.$id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
