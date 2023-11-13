"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/app/firebase/config";

import Image from "next/image";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    barcode: yup.string().required("Bar Code is required"),
    manufacturer: yup.string().required("Name is required"),
    manufacturerLocation: yup.string().required("Name is required"),
    productionDate: yup.string().required("Production Date is required"),
    expirationDate: yup.string().required("Expiration Date is required"),
    provnComment: yup.string().required("Comment is required"),
  })
  .required();

const CreateForm = ({
  setStep,
  setProduct,
  setImageUrls,
  imageSrcs,
  setImageSrcs,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    if (images.length === 0) {
      alert("Please, select files to continue");
      return;
    }

    const product = {
      name: data.name,
      description: data.description,
      attributes: {
        barcode: data.barcode,
        manufacturer: data.manufacturer,
        manufacturerLocation: data.manufacturerLocation,
        productionDate: data.productionDate,
        expirationDate: data.expirationDate,
        provnComment: data.provnComment,
      },
    };
    setProduct(product);
    setStep((prev) => prev + 1);
    getDownloadableURL();
  };

  const [images, setImages] = useState([]);

  const addImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
      setImageSrcs((prev) => [...prev, URL.createObjectURL(newImage)]);
    }
  };

  const getDownloadableURL = () => {
    images.forEach((image) => {
      // const uniqueName = new Date().getTime() + image.id + image.name;
      const uniqueName = String(new Date().getTime());
      const imageRef = storageRef(storage, `items/${uniqueName}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
    alert("all done");
  };

  return (
    <div className="w-[85%] mx-auto">
      <div className="my-5">
        <p className="font-semibold text-lg">Add Product</p>
      </div>
      <div className="mx-auto flex flex-row">
        {images.length > 0 && (
          <div className="flex flex-row">
            {imageSrcs.map((imageSrc, index) => (
              <Image
                src={imageSrc}
                key={index}
                alt="product-image"
                height={120}
                width={120}
                className="w-[150px] h-[150px] shadow-md rounded-md mx-1"
              />
            ))}
          </div>
        )}

        {images.length < 4 && (
          <label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={addImage}
              className="hidden"
            />
            <div className="w-[150px] h-[150px] shadow-md flex flex-col items-center rounded-md">
              <Image
                src="/assets/icons/add-image.svg"
                alt="add-image"
                height={55}
                width={55}
                className="my-auto"
              />
            </div>
          </label>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[40%]">
        <div className="flex flex-col my-5">
          <label className="font-semibold text-lg">Name</label>
          <input
            type="text"
            placeholder="Enter Name of Product..."
            {...register("name")}
            className="border rounded-md p-2 mt-1 focus:outline-none"
          />
          <p className="text-xs text-red-600">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col my-5">
          <label className="font-semibold text-lg">Description</label>
          <textarea
            {...register("description")}
            className="border rounded-md p-2 mt-1 focus:outline-none"
          />
          <p className="text-xs text-red-600">{errors.description?.message}</p>
        </div>
        <div className="flex flex-col my-5">
          <label className="font-semibold text-lg">Bar Code</label>
          <input
            type="text"
            placeholder="Bar Code"
            {...register("barcode")}
            className="border rounded-md p-2 mt-1 focus:outline-none"
          />
          <p className="text-xs text-red-600">{errors.barcode?.message}</p>
        </div>
        <div className="flex flex-col my-5">
          <label className="font-semibold text-lg">Manufacturer</label>
          <input
            type="text"
            placeholder="Manufacturer"
            {...register("manufacturer")}
            className="border rounded-md p-2 mt-1 focus:outline-none"
          />
          <p className="text-xs text-red-600">{errors.manufacturer?.message}</p>
        </div>
        <div className="flex flex-col my-5">
          <label className="font-semibold text-lg">
            Location of Manufacturer
          </label>
          <input
            type="text"
            placeholder="Location of Manufacturer"
            {...register("manufacturerLocation")}
            className="border rounded-md p-2 mt-1 focus:outline-none"
          />
          <p className="text-xs text-red-600">
            {errors.manufacturerLocation?.message}
          </p>
        </div>
        <div className="flex flex-col my-5">
          <label className="font-semibold text-lg">Production Date</label>
          <input
            type="date"
            placeholder="Production Date"
            {...register("productionDate")}
            className="border rounded-md p-2 mt-1 focus:outline-none"
          />
          <p className="text-xs text-red-600">
            {errors.productionDate?.message}
          </p>
        </div>
        <div className="flex flex-col my-5">
          <label className="font-semibold text-lg">Expiration Date</label>
          <input
            type="date"
            placeholder="Expiration Date"
            {...register("expirationDate")}
            className="border rounded-md p-2 mt-1 focus:outline-none"
          />
          <p className="text-xs text-red-600">
            {errors.expirationDate?.message}
          </p>
        </div>

        <div className="flex flex-col my-5">
          <label className="font-semibold text-lg">Provn comment</label>

          <textarea
            {...register("provnComment")}
            className="border rounded-md p-2 mt-1 focus:outline-none"
          />
          <p className="text-xs text-red-600">{errors.provnComment?.message}</p>
        </div>

        <button className="rounded-full bg-[#2F79D7] w-full py-2 text-white mt-3 mb-10">
          Review
        </button>
      </form>
    </div>
  );
};

export default CreateForm;

// console.log(nftData)
// const config = {
//   headers: {
//     // Authorization: `Bearer ${process.env.UNDERDOG_API_KEY}`,
//     Authorization: `Bearer c0a7f3f3dc4cb8.3bd01238161a48f480a8753ac396e355`,
//   },
// };
// axios
//   .post(
//     // `${process.env.UNDERDOG_API_ENDPOINT}/v2/projects/7/nfts`,
//     `https://devnet.underdogprotocol.com/v2/projects/7/nfts`,
//     nftData,
//     config
//   )
//   .then((response) => console.log(response.data))
//   .catch(function (error) {
//     console.error(error);
//   });
