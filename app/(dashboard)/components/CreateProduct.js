"use client";

import { useState } from "react";
import CreateForm from "./CreateForm";
import ReviewProduct from "./ReviewProduct";
import ViewQRCode from "./ViewQRCode";
const CreateProduct = () => {
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState({});
  const [qrcode, setQrcode] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [imageSrcs, setImageSrcs] = useState([]);

  return (
    <>
      {step === 0 ? (
        <CreateForm
          setStep={setStep}
          setProduct={setProduct}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
        />
      ) : step === 1 ? (
        <ReviewProduct
          product={product}
          setStep={setStep}
          setQrcode={setQrcode}
          qrcode={qrcode}
          imageUrls={imageUrls}
          imageSrcs={imageSrcs}
        />
      ) : (
        <ViewQRCode qrcode={qrcode} />
      )}
    </>
  );
};

export default CreateProduct;
