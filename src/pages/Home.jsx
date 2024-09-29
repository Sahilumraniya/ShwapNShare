/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Hero, ProductCard } from "../components";
import About from "../components/AboutUS";
import { NoProduct } from "../assets";
import { useNavigate } from "react-router-dom";
import { productService } from "../api/rest.app";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

// eslint-disable-next-line react/prop-types
const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // console.log("isUser " + isUser);

  useEffect(() => {

    productService.find({
      query: {
        $limit: 4
      }
    }).then((res) => {
      console.log("Product :: ", res);
      if (res) {
        setProducts(res.data);
      }
    })

    // service.getProducts({
    //   limit: 4,
    //   offset: 0,
    // }).then((res) => {
    //   // console.log("Product :: ", res);
    //   if (res) {
    //     setProducts(res.documents);
    //   }
    // });
  }, []);

  return (
    <div className="bg-white text-center w-full h-full overflow-hidden">
      {" "}
      <Hero />{" "}
      {(products.length > 0) ? (<div className="w-full py-10 bg-slate-200 dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <InfiniteMovingCards
          items={products}
          direction="right"
          speed="slow"
        />
        <div>
          <button
            className="bg-slate-900 dark:bg-slate-200 text-white dark:text-black py-2 px-4 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-300"
            onClick={() => {
              navigate("/all-product");
            }}
          >
            View All Products
          </button>
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
    </div>
  );
};

export default Home;
