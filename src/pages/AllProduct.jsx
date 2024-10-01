import { useEffect, useState } from "react";
import { Loading, ProductCard } from "../components";
import service from "../appwrite/config";
import { NoProduct } from "../assets";
import Pagination from "../components/Pagination";
import { productService } from "../api/rest.app";
import { Link } from "react-router-dom";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const PRODUCTS_PER_PAGE = 2;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = {
          $limit: PRODUCTS_PER_PAGE,
          $skip: (currentPage - 1) * PRODUCTS_PER_PAGE,
        };

        if (searchQuery && searchQuery !== "") {
          query["$like"] = searchQuery;
        }
        const res = await productService.find({
          query
        });

        if (res) {
          // console.log("Product :: ", res);
          setProducts(res.data);
          setTotalProducts(res.total);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery]); // Fetch products whenever searchQuery changes

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* <div className="px-10 py-10">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full"
        />
      </div> */}
      {products.length > 0 ? (
        <div className="w-full py-8 bg-slate-200 dark:bg-slate-900 dark:text-white">
          <div className="flex flex-col md:flex-row items-center justify-between px-10 py-4">

            <p className="text-4xl font-bold mb-4 md:mb-0">Products</p>
            <Link
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
              to="/add-product"
            >
              Add Product
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center my-11 mx-2 md:mx-4 w-full gap-x-5 gap-y-10">
            {products.map((product) => (
              <div key={product._id}>
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
