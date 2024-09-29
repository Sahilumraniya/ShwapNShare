/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Loading } from "../components";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { productService, uploadService, userService } from "../api/rest.app";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideIn = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const productProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  // console.log("User ::", userData);

  const [email, setEmail] = useState(null);
  const isUser = useSelector((state) => state.auth.status);
  const [isAuthor, setIsAuthor] = useState(false);
  // console.log("isAuth ::", isAuthor, userData, isUser);

  const [showEmail, setShowEmail] = useState(false);

  const handleActionClick = () => {
    setShowEmail(true);
    getUserData(product.userId);
  };

  useEffect(() => {
    if (id) {
      productService.get(id).then((res) => {
        if (res) {
          setProduct(res);
          if (res.userId === userData._id) {
            setIsAuthor(true);
          }
        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const deleteProduct = async () => {
    if (isUser === false) return navigate("/login");
    const res = await productService.remove(id);
    if (res) {
      product.images.map((img) => uploadService.remove(img));
      // uploadService.remove(product.image);
      navigate("/");
    }
  };

  const getUserData = async (userId) => {
    if (isUser === false) return navigate("/login");
    const res = await userService.get(userData._id);
    // console.log("res", res.email);
    setEmail(res.email);
    return res;
  };

  return product ? (
    <div>
      <div className="flex flex-col min-h-screen md:flex-row py-[30%] md:py-[10%] bg-slate-200 dark:bg-gray-900 transition-colors duration-500 px-6 md:px-20">
        <div className="w-full md:w-[50%] flex md:mr-5 justify-center relative border rounded-xl p-2 bg-white dark:bg-gray-800 transition-colors duration-500">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="rounded-xl mb-6 object-cover w-full h-full"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          />

          {isAuthor && (
            <div className="absolute right-3 top-3 md:right-6 md:top-6">
              <Link to={`/edit-product/${product._id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deleteProduct}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <motion.div
          className="w-full md:w-[50%] px-5 py-3 md:ml-5 bg-white dark:bg-gray-800 transition-colors duration-500 rounded-xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">{product.name}</h1>
          <div className="my-4">
            <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white">Product Description</h2>
            <p className="text-neutral-700 dark:text-neutral-300">{product.description}</p>
          </div>

          {product.isExchange ? (
            <div className="my-4">
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white">Exchange Items</h2>
              <p className="text-neutral-700 dark:text-neutral-300">We accept the following items for exchange:</p>
              <ul className="list-disc list-inside">
                {product.items.map((item, index) => (
                  <li key={index} className="inline-block text-neutral-700 dark:text-neutral-300">
                    {item}
                    {index < product.items.length - 1 && " or "}
                  </li>
                ))}
              </ul>
              <Button onClick={handleActionClick} className="mt-4">
                Exchange
              </Button>
            </div>
          ) : (
            <div className="my-4">
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white">Price</h2>
              <p className="text-neutral-700 dark:text-neutral-300">₹{product.price}</p>
              <Button onClick={handleActionClick} className="mt-4">
                Buy Now
              </Button>
            </div>
          )}

          {showEmail && (
            <motion.div
              className="mt-4"
              initial="hidden"
              animate="visible"
              variants={slideIn}
            >
              <h3 className="text-lg font-semibold text-black dark:text-white">Contact Information</h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                Please contact the seller at:{" "}
                <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
                  {email}
                </a>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};


export default productProduct;
