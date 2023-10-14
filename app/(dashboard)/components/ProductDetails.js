import Image from "next/image";
const ProductDetails = ({ product }) => {
  return (
    <div>
      <div className="flex flex-row items-center">
        <Image
          src={product?.image}
          alt="product-image"
          height={120}
          width={120}
          className="w-[195px] h-[185px] shadow-md rounded-md mx-auto"
        />
        <p className="text-center text-3xl my-3">{product?.name}</p>
      </div>

      <div className="mt-8">
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
      </div>
    </div>
  );
};

export default ProductDetails;
