import { useEffect, useState } from "react";
import { ProductCard } from "../components";
import service from "../appwrite/config";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

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
          className="w-full rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
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
          <div className="w-full mx-5 md:w-1/3" key={product.$id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
