"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const currentRoute = usePathname();

  return (
    <nav className="">
      <div className="text-lg font-semibold mt-12">
        <div className="w-[80%] mx-auto my-6">
          <Image src="/assets/logo.png" height={300} width={200} alt="logo" />
        </div>

        <Link href="create-product">
          <div className="flex flex-row items-center bg-[#008E63] p-2.5 w-[88%] mx-auto rounded-2xl">
            <Image
              src="/assets/icons/add.svg"
              alt="dashboard"
              height={22}
              width={22}
              className="mr-2.5"
            />
            <span>Add Product</span>
          </div>
        </Link>

        <Link href="dashboard">
          <div
            className={`flex flex-row items-center p-3 rounded-2xl w-[85%] mx-auto my-8 ${
              currentRoute === "/dashboard" ? "bg-[#194173]" : ""
            }`}
          >
            <Image
              src="/assets/icons/home.svg"
              alt="dashboard"
              height={22}
              width={22}
              className="mr-2.5"
            />
            <span>Dashboard</span>
          </div>
        </Link>

        <div className="w-[85%] mx-auto mt-10">
          <Link href="products">
            <div
              className={`flex flex-row items-center my-6 rounded-2xl ${
                currentRoute === "/products" ? "bg-[#194173] p-3" : ""
              }`}
            >
              <Image
                src="/assets/icons/milk.svg"
                alt="dashboard"
                height={22}
                width={22}
                className="mr-2.5"
              />
              <span>Products</span>
            </div>
          </Link>
          <div className="flex flex-row items-center opacity-75 my-6">
            <Image
              src="/assets/icons/clock.svg"
              alt="dashboard"
              height={22}
              width={22}
              className="mr-2.5"
            />
            <div>
              <p>Scan History</p>
              <p className="text-sm">Coming Soon</p>
            </div>
          </div>
          <div className="flex flex-row items-center opacity-75 my-6">
            <Image
              src="/assets/icons/shop.svg"
              alt="dashboard"
              height={22}
              width={22}
              className="mr-2.5"
            />
            <div>
              <p>Retailers</p>
              <p className="text-sm">Coming Soon</p>
            </div>
          </div>
          <div className="flex flex-row items-center opacity-75 my-6">
            <Image
              src="/assets/icons/gift.svg"
              alt="dashboard"
              height={22}
              width={22}
              className="mr-2.5"
            />
            <div>
              <p>Rewards</p>
              <p className="text-sm">Coming Soon</p>
            </div>
          </div>
          <div className="flex flex-row items-center opacity-75 my-6">
            <Image
              src="/assets/icons/chart.svg"
              alt="dashboard"
              height={22}
              width={22}
              className="mr-2.5"
            />
            <div>
              <p>Analytics</p>
              <p className="text-sm">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

