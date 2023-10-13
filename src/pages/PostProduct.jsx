import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import authserivce from "../appwrite/auth";

const productProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [email, setEmail] = useState(null);
  const isAuthor =
    product && userData ? product.userId === userData.$id : false;

  useEffect(() => {
    if (id) {
      service.getProduct(id).then((res) => {
        if (res) {
          setProduct(res);
        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const deleteProduct = async () => {
    const res = await service.deleteProduct(id);
    if (res) {
      service.deleteImage(product.image);
      navigate("/");
    }
  };

  const getUserData = async (userId) => {
    const res = await authserivce.getUser(userId);
    console.log("res", res.email);
    setEmail(res.email);
    return res;
  }

  return product ? (
    <div className="py-4 md:py-8 bg-slate-200">
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          src={service.getImagePreview(product.image)}
          alt={product.name}
          className="rounded-xl mb-6"
        />

        {isAuthor && (
          <div className="absolute right-3 top-3 md:right-6 md:top-6">
            <Link to={`/edit-product/${product.$id}`}>
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
      <div className="w-full mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold px-5">{product.name}</h1>
      </div>
      <div className="px-5 py-3">
        <h1 className="text-lg md:text-xl font-bold">Description</h1>
        <p>{product.description}</p>
      </div>
      {product.isExchange ? (
        <div className="px-5 py-3">
          <h1 className="text-lg md:text-xl font-bold">Exchange Items : </h1>
          {/* <p>{product.items}</p> */}
          <ul>
            {product.items.map((item, index) => (
              <div key={index}>
                {index== product.items.length-1 ? (<li className="inline-block">{item}</li> ): (<li className="inline-block">{item} or </li> )} 
              </div>
            ))}
          </ul>
          <button onClick={()=> getUserData(product.userId)} className="bg-blue-600 my-7 text-white hover:scale-95 duration-100 p-2 rounded-lg">Exchange</button>
        </div>
      ) : (
        <div className="px-5 py-3">
          <h1 className="text-lg md:text-xl font-bold">Price</h1>
          <p>₹{product.price}</p>
          <button onClick={()=> getUserData(product.userId)} className="bg-blue-600 my-7 text-white hover:scale-95 duration-100 p-2 rounded-lg w-36">Buy</button>
        </div>
      )}
      {email && <p className="text-3xl mx-4 font-semibold">Please Contect with : <a href={`mailto:${email}`}>{email}</a></p>}
    </div>
  ) : null;
};

export default productProduct;
