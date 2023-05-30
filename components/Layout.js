import React, { Children } from "react";
import HeaderX from "./HeaderX";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderX />

      {children}
      <Footer />
    </>
  );
};

export default Layout;
