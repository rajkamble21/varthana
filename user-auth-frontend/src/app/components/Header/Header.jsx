"use client";

import React, { useState, useEffect } from "react";
import Logo from "../../public/varthana.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={styles.headerContainer}>
      <Image className={styles.logo} src={Logo}></Image>
      {pathname == "/" && (
        <button
          className={styles.logoutButton}
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
        >
          Logout
        </button>
      )}
      {pathname == "/login" && (
        <button
          className={styles.logoutButton}
          onClick={() => {
            router.push("/register");
          }}
        >
          Register
        </button>
      )}
      {pathname == "/register" && (
        <button
          className={styles.logoutButton}
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
