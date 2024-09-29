/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Hero, ProductCard } from "../components";
import About from "../components/AboutUS";
import { NoProduct } from "../assets";
import { useNavigate } from "react-router-dom";
import { productService } from "../api/rest.app";

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
      {(products.length > 0) ? (<div className="w-full py-8 bg-slate-200 dark:bg-slate-950 dark:text-white">
        <p className="text-4xl font-bold px-10">Products</p>
        <div className="flex flex-wrap items-center justify-center my-11 mx-2 md:mx-4 w-full gap-x-5 gap-y-10">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
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
      <About />{" "}
    </div>
  );
};

export default Home;
