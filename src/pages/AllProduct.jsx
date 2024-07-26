import { useEffect, useState } from "react";
import { Loading, ProductCard } from "../components";
import service from "../appwrite/config";
import { NoProduct } from "../assets";
import Pagination from "../components/Pagination";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const PRODUCTS_PER_PAGE = 2;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await service.getProducts({
          limit: PRODUCTS_PER_PAGE,
          offset: (currentPage - 1) * PRODUCTS_PER_PAGE,
        });
        if (res) {
          // console.log("Product :: ", res);
          setProducts(res.documents);
          setTotalProducts(res.total);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

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
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      ) : (
        <div className="text-center w-full h-full flex items-center justify-center">
          <img
            className="w-full rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            src={NoProduct}
            alt="No product"
          />
        </div>
      )}
    </div>
  );
};

export default AllProduct;
