import Navbar from "./components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex flex-row w-full justify-between">
      <Navbar />
      <div className="bg-white h-screen w-[85%] text-black overflow-x-auto">
        {children}
      </div>
    </section>
  );
}
