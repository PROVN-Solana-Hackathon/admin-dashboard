import axios from "axios";

import ProductsList from "../components/ProductsList";
import Link from "next/link";
import AnalyticsOverview from "../components/AnalyticsOverview";

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
  console.log(data)

  const analytics = [
    {
      heading: "Authentication Rate",
      subTitle: "89.50%",
    },
    {
      heading: "Counterfeit Reports",
      subTitle: "4",
    },
    {
      heading: "Retail Risk Factor",
      subTitle: "2.4",
    },
    {
      heading: "Counterfeit Product Count",
      subTitle: "4",
    },
  ];
  return (
    <div className="w-[85%] mx-auto my-5">
      <div className="my-10">
        <div className="flex flex-row items-center justify-between mb-3">
          <p className="font-semibold">Analytics</p>
          <p className="text-[#2F79D7]">See More</p>
        </div>
        <div className="flex flex-row items-center justify-between w-[60%]">
          {analytics.map((analytic, index) => (
            <AnalyticsOverview
              key={index}
              heading={analytic.heading}
              subtitle={analytic.subTitle}
              textColor={
                index === 0
                  ? ""
                  : index === 1
                  ? "text-[#E1B000]"
                  : "text-[#D21313]"
              }
            />
          ))}
        </div>
      </div>

      <div className="my-8">
        <div className="flex flex-row items-center justify-between mb-3">
          <p className="font-semibold">Products</p>
          <Link href="/products">
            <p className="text-[#2F79D7]">View All Products</p>
          </Link>
        </div>
        <ProductsList products={data.results.slice(0, 5)} />
      </div>
    </div>
  );
}
