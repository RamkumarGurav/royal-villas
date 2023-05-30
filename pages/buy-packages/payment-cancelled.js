import Link from "next/link";
import React from "react";
import Image from "next/image";
import Head from "next/head";

const paymentCancelled = () => {
  return (
      <div className="cart-empty flex flex-col gap-4 justify-center items-center h-[79vh] ">
      <Head>
        <title>Payment Cancelled | RoyalVillas.com</title>
      </Head>
        {/* <h1 className="sub-title">Empty Cart</h1>*/}
        <h1 className="text-2xl font-bold text-[tomato]">Payment Failed!</h1>
        {/* <RemoveShoppingCartIcon
            style={{ color: "tomato", fontSize: "10vmax" }}
            className="title"
          /> */}
        <div className="relative w-full h-[200px]">
          <Image
            src="/images/paymentCancelled1.png"
            alt="profile"
            fill
            sizes="(max-width: 640px) 100vw
              (max-width: 1024px) 50vw,
              33vw" //thie is used when we use grid with cards images (this downloads small size imagees at bigger devices width and bigger images at smaller devices width to improve userexperience)
            // sizes="100vw"//befualt width size that generates defualt srcsets(srcsets defines dowinloading of diff sized images for diff divice widths )//use this property when u cant ur image responsive but its not used in grid (eg-when u want to dispaly single image in full window with certain height)

            priority //When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
            className="rounded-md object-contain" //always give object-cover class to make image responsive without losing its aspects ratio( The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit)
          />
        </div>
        <Link
          href="/"
          className=" no-underline bg-gray-900 px-10 py-4 border border-black-2 text-2xl text-white hover:bg-gray-900/80 rounded-md uppercase "
        >
          Back To Homepage
        </Link>
      </div>
  );
};

export default paymentCancelled;
