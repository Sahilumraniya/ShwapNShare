/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Loading } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getUploadUrlService, productService, uploadService } from "../../api/rest.app";
import axios from "axios";

const ProductForm = ({ product }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: product?.name,
      price: product?.price,
      description: product?.description,
      images: product?.images,
      isExchange: product?.price ? false : true,
      items: product?.items,
    },
  });

  // console.log("Init ::", product);

  const isExchange = watch("isExchange", true); // Default to true

  const userData = useSelector((state) => state.auth.userData);
  const [isSubmitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    setSubmitting(true);
    try {
      if (product) {
        // console.log("images :", data.images);

        const file = data.images[0]
          ? await getUploadUrlService.create({
            fileNames: [data.images[0].name]
          })
          : null;
        console.log("file ::", file);
        await axios.put(file.uploadURL[0].url, data.images[0], {
          headers: {
            'Content-Type': file.type,
          },
        }).then((res) => {
          // console.log("prod ::", product.images);

          product.images.map((img) => {
            // console.log("remove images ::", img);

            uploadService.remove(img)
          })
        });

        // const file = data.image[0]
        //   ? await service.uploadImage(data.image[0])
        //   : null;
        // if (file) {
        //   service.deleteImage(product?.image);
        // }

        const fileIds = file.uploadURL.map((file) => {
          // console.log("f ::", file);

          return file.uniqueFileName
        });

        // console.log("filesIds ::", fileIds);


        const dbproduct = await productService.patch(product._id, {
          ...data,
          images: file ? fileIds : undefined,
        });

        if (dbproduct) {
          navigate(`/product/${dbproduct._id}`);
        }
      } else {

        // console.log("data ::", data.image[0]);


        const file = data.images[0]
          ? await getUploadUrlService.create({
            fileNames: [data.images[0].name]
          })
          : null;
        console.log("file ::", file.uploadURL);
        await axios.put(file.uploadURL[0].url, data.images[0], {
          headers: {
            'Content-Type': file.type,
          },
        });
        // console.log(`Uploaded ${file.uploadURL[0].name} as ${file.uploadURL[0].uniqueFileName}`);
        // return;
        if (file) {
          const fileId = file.uploadURL.map((file) => file.uniqueFileName);
          data.items = data.items.split(",").filter(item => item.trim() !== "");
          data.images = fileId;
          if (data.isExchange === true) data.price = 0;
          const p = {
            name: data.name,
            description: data.description,
            price: parseInt(data.price),
            images: fileId,
            isExchange: data.isExchange,
            items: data.items,
            userId: userData._id,
          };
          // const dbproduct = await service.createProduct(p);
          const dbproduct = await productService.create(p);
          if (dbproduct) {
            navigate(`/product/${dbproduct._id}`);
            setLoading(false);
          }
        }
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading && <Loading />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {product ? "Edit Product" : "Add New Product"}
        </h1>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          <Input
            name="name"
            label="Product Name"
            {...register("name", { required: true })}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <Input
            name="description"
            label="Product Description"
            {...register("description", { required: true })}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("isExchange")}
              id="isExchange"
              className="mr-2"
            />
            <label htmlFor="isExchange" className="text-gray-700 dark:text-gray-200">
              For Exchange
            </label>
          </div>
          {!isExchange &&
            <Input
              name="price"
              label="Price"
              type="number"
              {...register("price", { required: !isExchange })}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />}
          {isExchange && (
            <Input
              name="items"
              label="Items for Exchange"
              {...register("items")}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          )}
          <Input
            name="image"
            label="Product Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("images")}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <Button className="my-5" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductForm;
