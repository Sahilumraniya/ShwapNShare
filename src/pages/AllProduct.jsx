import { useEffect, useState } from "react";
import { Loading, ProductCard } from "../components";
import service from "../appwrite/config";
import { NoProduct } from "../assets";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await service.getProducts();
        if (res) {
          setProducts(res.documents);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full">
      {products.length > 0 ? (
        <div className="w-full py-8 bg-slate-200 dark:bg-slate-950 dark:text-white">
          <p className="text-4xl font-bold px-10">Products</p>
          <div className="flex flex-wrap items-center justify-center my-11 mx-2 md:mx-4 w-full gap-x-5 gap-y-10">
            {products.map((product) => (
              <div key={product.$id}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center w-full h-full flex items-center justify-center">
          <img
            className="w-full max-w-md rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            src={NoProduct}
            alt="No product"
          />
        </div>
      )}
    </div>
  );
};

export default AllProduct;
