import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-row w-[85%] mx-auto justify-between my-10 font-semibold">
      <div className="flex flex-row justify-between w-[40%]">
        <p>Home</p>
        <p>Learn</p>
        <p>About</p>
        <p>How it Works</p>
      </div>
      <div className="flex flex-row justify-between items-center w-[12%]">
        <Link href="/login"> Log In </Link>
        <Link href="/signup">
          <button className="bg-[#2F79D7] px-5 py-3 rounded-2xl">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;


//THINGS LEFT TO DO
// 1. AUTH
// 2. BASE64 IMAGE
// 3. QR CODE GENERATOR