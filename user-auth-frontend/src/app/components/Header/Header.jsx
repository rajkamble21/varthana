"use client";

import React from "react";
import Logo from "../../public/varthana.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-green-500 shadow shadow-green-700">
      <div className="container m-auto flex justify-between items-center  px-6 py-2 sm:px-20  text-white ">
        <Image
          className="block w-16 h-16 drop-shadow-lg cursor-pointer	"
          src={Logo}
          alt="Varthana Logo"
          priority
        />

        {pathname === "/dashboard" && (
          <button
            className="bg-white text-green-500 border-none px-4 py-2 rounded shadow-lg hover:bg-green-600 hover:text-white transition-all duration-300"
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
          >
            Logout
          </button>
        )}

        {pathname === "/login" && (
          <button
            className="bg-white text-green-500 border-none px-4 py-2 rounded shadow-lg hover:bg-green-600 hover:text-white transition-all duration-300"
            onClick={() => {
              router.push("/register");
            }}
          >
            Register
          </button>
        )}

        {pathname === "/register" && (
          <button
            className="bg-white text-green-500 border-none px-4 py-2 rounded shadow-lg hover:bg-green-600 hover:text-white transition-all duration-300"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
