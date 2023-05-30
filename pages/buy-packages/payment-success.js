import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Head from "next/head";
import Image from "next/image";

const PaymentSuccess = () => {
  const router = useRouter();

  return (
    <div style={{ paddingTop: "6vmax", height: "100vh" }}>
      <Head>
        <title>Payment Success | RoyalVillas.com</title>
      </Head>

      <div
        className="flex flex-col items-center"
        style={{ padding: "2vmax", justifyContent: "start" }}
      >
        {/* <Image
          src={"/paymentSuccess1.png"}
          width={300}
          height={300}
          alt="payment"
        /> */}
        <CheckCircleIcon
          style={{ color: "green", fontSize: "10vmax" }}
          className="title"
        />
        <h1
          className="text-4xl text-center"
          style={{ color: "black", margin: "1vmax" }}
        >
          Your Payment was Successful
        </h1>
        <p className="text-xl">
          Thank You for your payment. We will be in contact you with more
          details shortly.
        </p>
        <Link
          href="/"
          className="mt-[30px] no-underline bg-gray-900 px-10 py-4 border border-black-2 text-2xl text-white hover:bg-gray-900/80 rounded-md uppercase "
        >
          Back To Homepage
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
