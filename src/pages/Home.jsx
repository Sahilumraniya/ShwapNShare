/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Hero, ProductCard } from "../components";
import { useSelector } from "react-redux";
import About from "../components/AboutUS";
import { NoProduct } from "../assets";

// eslint-disable-next-line react/prop-types
const Home = () => {
  const [products, setProducts] = useState([]);
  // console.log("isUser " + isUser);

  useEffect(() => {
    service.getProducts().then((res) => {
      console.log("Product :: ", res);
      if (res) {
        setProducts(res.documents);
      }
    });
  }, []);

  return (
    <div className="bg-white text-center w-full h-full overflow-hidden">
      {" "}
      <Hero />{" "}
      {(products.length > 0) ? (<div className="w-full py-8 bg-slate-200 dark:bg-slate-950 dark:text-white">
        <p className="text-4xl font-bold px-10">Products</p>
        <div className="flex flex-wrap items-center justify-center my-11 mx-2 md:mx-4 w-full gap-x-5 gap-y-10">
          {products.map((product) => (
            <div key={product.$id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>) :
        (<div className="text-center w-full h-full">
          {" "}
          <img
            className="w-full rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            src={NoProduct}
            alt="No product"
          />{" "}
        </div>)
      }
      <About />{" "}
    </div>
  );
};

export default Home;
