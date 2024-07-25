import { ProductForm } from "../components";
import { Meteors } from "../components/ui/meteors";

const AddProduct = () => {
  return (
    <div className="py-8">
      <h1 className="text-center text-5xl my-4 font-semibold">Add Product</h1>
      <ProductForm />
      <Meteors number={20} />
    </div>
  );
};

export default AddProduct;
