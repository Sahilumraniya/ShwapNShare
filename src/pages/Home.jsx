/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { AboutUS, Hero, ProductCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Home = () => {
  const [products, setProducts] = useState([]);
  const isUser = useSelector((state) => state.auth.status);
  console.log("isUser " + isUser);

  useEffect(() => {
    if (isUser) {
      service.getProducts().then((res) => {
        if (res) {
          setProducts(res.documents);
        }
      });
    } else {
      setProducts([]);
    }
  }, [isUser]);

  if (products.length === 0) {
    return (
      <div className="bg-white text-center w-full h-full">
        {" "}
        <Hero />{" "}
        {isUser ? (
          <img
            className="m-auto"
            src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
            alt="No product"
          />
        ) : (
          <div className="text-center my-8">
            <p className="text-lg font-bold text-gray-800">
              Please{" "}
              <span className="text-blue-500 hover:underline">
                {" "}
                <Link to={"/login"}> Login </Link>
              </span>{" "}
              or{" "}
              <span className="text-green-500 hover:underline">
                <Link to={"/signup"}>Signup</Link>
              </span>
            </p>
          </div>
        )}
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
            <div className="w-full mx-5 md:w-1/3" key={product.$id}>
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
