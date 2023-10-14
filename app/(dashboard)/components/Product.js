import Image from "next/image";

const Product = ({ product }) => {
  return (
    <div className="text-center m-1.5">
      <div className="w-[195px] h-[185px] rounded-xl shadow-2xl">
        <Image
          src={product?.image}
          alt={product?.name}
          height={120}
          width={180}
          className="w-full h-full rounded-xl"
        />
      </div>

      <p className="text-xl capitalize mt-2">{product?.name}</p>
    </div>
  );
};

export default Product;
