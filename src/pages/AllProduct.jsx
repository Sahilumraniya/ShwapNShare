import React, { useEffect, useState } from "react";
import { ProductCard } from "../components";
import service from "../appwrite/config";


const AllProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        service.getProducts([]).then((res) => {
            if(res){
                setProducts(res.documents);
            }
        });

    }, []);

  return <div className="w-full py-8">
    <h1 className="text-3xl font-semibold text-gray-900 mb-4">Products</h1>

    <div className="flex flex-wrap py-4 items-center justify-center">
        {products.map((product) => (
            <div className="w-1/3" key={product.$id}>
                <ProductCard {...product} />
            </div>
        ))}
    </div>
  </div>;
};

export default AllProduct;
