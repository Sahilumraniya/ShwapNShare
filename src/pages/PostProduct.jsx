import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components";
import { useSelector } from "react-redux";
import service from "../appwrite/config";

const productProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
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

  return product ? (
    <div className="py-4 md:py-8">
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          src={service.getImagePreview(product.image)}
          alt={product.name}
          className="rounded-xl"
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
        <h1 className="text-xl md:text-2xl font-bold px-2">{product.name}</h1>
      </div>
      <div className="px-2">
        <h1 className="text-lg md:text-xl font-bold">Description</h1>
        <p>{product.description}</p>
      </div>
    </div>
  ) : null;
};

export default productProduct;
