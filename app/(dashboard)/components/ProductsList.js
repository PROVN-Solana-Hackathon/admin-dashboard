'use client';

import { useEffect } from "react";
import Product from "./Product";

const ProductsList = ({ products }) => {
  // useEffect(() => {
  //   getAccount(); 
  // }, []);

  return (
    <div className="flex flex-row items-center flex-wrap">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
