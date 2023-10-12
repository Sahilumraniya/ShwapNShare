import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { Button, Input, Loading } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductForm = ({ product }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: product?.name,
      price: product?.price,
      description: product?.description,
      image: product?.image,
      isExchange: product?.isExchange,
      items: product?.items,
    },
  });
  const isExchange = watch("isExchange", true); // Default to true

  const userData = useSelector((state) => state.auth.userData);
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async (data) => {
    setSubmitting(true);
    if (product) {
      const file = data.image[0]
        ? await service.uploadImage(data.image[0])
        : null;
      if (file) {
        service.deleteImage(product?.image);
      }

      const dbproduct = await service.updateProduct(product.$id, {
        ...data,
        image: file ? file.$id : undefined,
      });

      if (dbproduct) {
        setSubmitting(false);
        navigate(`/product/${dbproduct.$id}`);
      }
    } else {
      console.log("New Product", data);
      const file = data.image[0]
        ? await service.uploadImage(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.items = data.items.split(",");
        if (data.items.length === 1 && data.items[0] === "") data.items = [];
        data.image = fileId;
        if (data.isExchange === true) data.price = 0;
        const p = {
          name: data.name,
          description: data.description,
          price: data.price,
          image: fileId,
          isExchange: data.isExchange,
          items: data.items,
          userId: userData.$id,
        };
        const dbproduct = await service.createProduct(p);
        console.log("DB Product : ", dbproduct);
        if (dbproduct) {
          setSubmitting(false);
          navigate(`/product/${dbproduct.$id}`);
        }
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(submit)}>
        <Input
          name="name"
          label="Product Name"
          {...register("name", { required: true })}
        />
        <Input
          name="description"
          label="Product Description"
          {...register("description", { required: true })}
        />
        <Input
          name="price"
          label="Price"
          type="number"
          {...register("price", { required: !isExchange })}
        />
        <input
          type="checkbox"
          {...register("isExchange")}
          id="isExchange"
          className="mr-2"
        />
        <label htmlFor="isExchange" className="text-gray-700">
          For Exchange
        </label>
        {isExchange ? (
          <Input
            name="items"
            label="Items for Exchange"
            {...register("items")}
          />
        ) : null}
        <Input
          name="image"
          label="Product Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />
        <Button className="my-5" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loading />
            </>
          ) : (
            <>Submit</>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
