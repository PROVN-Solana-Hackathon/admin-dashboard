import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Provn",
  description: "Authenicate your products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#041730] text-white h-screen overflow-x-none`}>
        {children}
      </body>
    </html>
  );
}
