import { useEffect, useState } from "react";
import { ProductForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "../api/rest.app";

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {

      productService.get(id).then((res) => {
        if (res) {
          setProduct(res);
        }
      });

      // service.getProduct(id).then((res) => {
      //   if (res) {
      //     setProduct(res);
      //   }
      // });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  return product ? (
    <div className="py-8">
      <ProductForm product={product} />
    </div>
  ) : null;
};

export default EditProduct;
