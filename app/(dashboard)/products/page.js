import axios from "axios";

import ProductsList from "../components/ProductsList";
import Image from "next/image";

async function getProducts() {
  const config = {
    headers: {
      Authorization: `Bearer c0a7f3f3dc4cb8.3bd01238161a48f480a8753ac396e355`,
    },
  };

  const res = await axios.get(
    "https://devnet.underdogprotocol.com/v2/projects/7/nfts",
    config
  );

  return res.data;
}
export default async function Main() {
  const data = await getProducts();
  return (
    <div className="w-[92%] mx-auto my-5">
      <div className="flex flex-row items-center w-full justify-between my-10">
        <div className="border flex flex-row items-center w-[90%] p-3 rounded-2xl">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            height={22}
            width={22}
          />
          <input
            type="text"
            placeholder="Description"
            className="ml-3.5 focus:outline-none w-full"
          />
        </div>

        <div className="bg-[#008E63] flex flex-row items-center p-3 rounded-2xl text-white w-[8%]">
          <Image
            src="/assets/icons/filter.svg"
            alt="search"
            height={22}
            width={22}
          />
          <span className="ml-2">Filter</span>
        </div>
      </div>
      <ProductsList products={data.results} />
    </div>
  );
}
