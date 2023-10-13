import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { AboutUS, Hero, ProductCard } from "../components";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    service.getProducts().then((res) => {
      if (res) {
        setProducts(res.documents);
      }
    });
  }, []);
  if (products.length === 0) {
    return (
      <div className="bg-white text-center w-full h-full">
        {" "}
        <Hero />{" "}
        <img
          className="m-auto"
          src="https://www.pharmacy.precureplus.com/assets/site/images/no_result.gif"
          alt="No product"
        />{" "}
        <AboutUS />{" "}
      </div>
    );
  }
  return (
    <>
      <Hero />
      <div className="w-full py-8">
        <p className="text-4xl font-bold px-10">Products</p>
        <div className="flex flex-wrap items-center justify-center my-11 w-full gap-x-5 gap-y-10">
          {products.map((product) => (
            <div className="w-1/4" key={product.$id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
      <AboutUS />
    </>
  );
};

export default Home;
