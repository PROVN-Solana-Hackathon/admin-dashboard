import Image from "next/image";
import Navbar from "./components/Navbar";

export default function AuthLayout({ children }) {
  return (
    <section>
      <Navbar />
      <div className="bg-white text-black w-[40%] mx-auto rounded-lg p-4">
        <div className="w-[30%] mx-auto my-12">
          <Image
            src="/assets/logo-black.png"
            height={300}
            width={200}
            alt="logo"
          />
        </div>
        {children}
      </div>
    </section>
  );
}
