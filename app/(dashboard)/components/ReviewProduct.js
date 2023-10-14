"use client";

import { useState } from "react";
import Image from "next/image";

import axios from "axios";
import QRCode from "qrcode";

const ReviewProduct = ({
  product,
  setStep,
  setQrcode,
  qrcode,
  imageUrls,
  imageSrcs,
}) => {
  console.log({ imageUrls });
  const [mintAddress, setMintAddress] = useState("");
  const [first, ...images] = imageUrls;

  const createNft = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,

      },
    };

    const data = {
      ...product,
      image: first,
      attributes: {
        ...product.attributes,
        additionalImages: JSON.stringify(images),
      },
    };

    const nftResponse = await axios.post(`${process.env.NEXT_PUBLIC_UNDERDOG_API_ENDPOINT}/v2/projects/1/nfts`,
        data,
        config
      )

      const nftId = await nftResponse.data.nftId
      const projectId = await nftResponse.data.projectId
      
      const mintDataResponse = await axios.get(`https://devnet.underdogprotocol.com/v2/projects/${projectId}/nfts/${nftId}`, config)
     console.log(mintDataResponse)
  
  };
  const generateQRCode = (address) => {
    QRCode.toDataURL(
      `https://xray.helius.xyz/token/${address}?network=devnet`
    ).then(setQrcode);
  };

  return (
    <div className="w-[50%] mx-auto">
      <div className="my-5 text-center">
        <p className="font-bold text-lg">Review Product</p>
      </div>
      <div>
        <div className="flex flex-row">
          {imageSrcs.map((imageSrc, index) => (
            <Image
              key={index}
              src={imageSrc}
              alt="product-image"
              height={120}
              width={120}
              className="w-[395px] h-[350px] shadow-md rounded-md mx-auto"
            />
          ))}
        </div>

        <p className="text-center text-3xl my-3">{product?.name}</p>
        {/* <div className="mt-8">
          <p className="text-xl my-2.5">
            <span className="font-semibold mr-2">Description:</span>
            {product?.description}
          </p>
          <p className="text-xl my-2.5">
            <span className="font-semibold mr-2">Bar Code:</span>
            {product?.attributes?.barcode}
          </p>
          <p className="text-xl my-2.5">
            <span className="font-semibold mr-2">Manufacturer:</span>
            {product?.attributes?.manufacturer}
          </p>
          <p className="text-xl my-2.5">
            <span className="font-semibold mr-2">Location:</span>
            {product?.attributes?.manufacturerLocation}
          </p>
          <p className="text-xl my-2.5">
            <span className="font-semibold mr-2">Production Date:</span>
            {product?.attributes?.productionDate}
          </p>
          <p className="text-xl my-2.5">
            <span className="font-semibold mr-2">Expiration Date:</span>
            {product?.attributes?.expirationDate}
          </p>
        </div> */}
        <div className="mt-8 flex flex-row items-center justify-between text-xl my-2.5 w-[395px] mx-auto">
          <div className="font-semibold">
            <p>Description:</p>
            <p>Bar Code:</p>
            <p>Manufacturer:</p>
            <p>Location:</p>
            <p>Production Date:</p>
            <p>Expiration Date:</p>
          </div>
          <div>
            <p>{product?.description}</p>
            <p>{product?.attributes?.barcode}</p>
            <p>{product?.attributes?.manufacturer}</p>
            <p>{product?.attributes?.manufacturerLocation}</p>
            <p>{product?.attributes?.productionDate}</p>
            <p>{product?.attributes?.expirationDate}</p>
          </div>
        </div>
        <div className="flex flex-col w-[395px] mx-auto">
          <button
            className="bg-[#2F79D7] text-white rounded-full my-4 p-2"
            onClick={createNft}
          >
            Confirm and View Codes
          </button>
          <button
            className="bg-[#292929] text-white rounded-full p-2"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Go Back
          </button>
        </div>
      </div>
      {/* <Image src={qrcode} alt="qrcode" height={120} width={120} /> */}
    </div>
  );
};

export default ReviewProduct;
