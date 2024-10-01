import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Loading } from "../components";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { commentService, productService, uploadService, userService } from "../api/rest.app";
import { useTheme } from '../context/ThemeContext'; // Import the theme context
import CommentsSection from "../components/CommentSeaction";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideIn = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const ProductProduct = () => {
  const { theme } = useTheme(); // Get current theme
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [email, setEmail] = useState(null);
  const isUser = useSelector((state) => state.auth.status);
  const [isAuthor, setIsAuthor] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [comments, setComments] = useState([
  ]);

  const handleActionClick = () => {
    setShowEmail(true);
    getUserData(product.userId);
  };

  useEffect(() => {
    if (id) {
      productService.get(id).then((res) => {
        if (res) {
          setProduct(res);
          setIsAuthor(res.userId === userData._id);

          commentService.find({
            query: {
              productId: res._id,
              $limit: -1
            }
          }).then((data) => setComments(data));

        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const deleteProduct = async () => {
    if (!isUser) return navigate("/login");
    await productService.remove(id);
    product.images.forEach((img) => uploadService.remove(img));
    navigate("/");
  };

  const getUserData = async (userId) => {
    if (!isUser) return navigate("/login");
    const res = await userService.get(userData._id);
    setEmail(res.email);
    return res;
  };

  return product ? (
    <section className={`bg-${theme ? 'gray-900' : 'gray-200'} text-${theme ? 'gray-400' : 'gray-800'} body-font overflow-hidden`}>
      <div className="container px-5 py-24 mx-auto">
        <div className={`relative lg:w-4/5 mx-auto flex flex-col lg:flex-row items-center`}>
          <img
            alt="Product"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-fit rounded-lg shadow-lg"
            src={product.images[0] || "https://dummyimage.com/400x400"}
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
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className={`text-sm title-font text-${theme ? 'gray-500' : 'gray-600'} tracking-widest`}>
              {product.brand || "Swap And Share"}
            </h2>
            <h1 className={`text-${theme ? 'white' : 'black'} text-3xl title-font font-medium mb-1`}>
              {product.name || "Product Name"}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {/* Display stars for reviews */}
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className={`w-4 h-4 ${index < product.rating ? "text-indigo-400" : "text-gray-600"}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
              </span>
            </div>
            <p className={`leading-relaxed mb-6 text-${theme ? 'gray-400' : 'gray-800'}`}>{product.description || "Product description goes here."}</p>
            <div className="flex justify-between items-center">
              <span className={`title-font font-medium text-2xl ${theme ? 'text-white' : 'text-black'}`}>{`₹${product.price || "58.00"}`}</span>
              <Button onClick={handleActionClick} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Buy Now
              </Button>
            </div>
            {showEmail && (
              <motion.div
                className="mt-4"
                initial="hidden"
                animate="visible"
                variants={slideIn}
              >
                <h3 className={`text-lg font-semibold ${theme ? 'text-gray-300' : 'text-black'}`}>Contact Information</h3>
                <p className={`text-${theme ? 'gray-400' : 'gray-800'}`}>
                  Please contact the seller at:{" "}
                  <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
                    {email}
                  </a>
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <CommentsSection comments={comments} onAddComment={addComment} productId={product._id} />
    </section>
  ) : (
    <Loading />
  );
};

export default ProductProduct;
