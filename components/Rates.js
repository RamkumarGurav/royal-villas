import Link from "next/link";
import React from "react";
import { BsFire } from "react-icons/bs";

const Rates = () => {
  return (
    <section className="w-full py-4 flex flex-col items-center" id="rates">
      <div>
        <h1 className="text-center text-yellow-500 font-bold text-[25px] sm:text-[40px]">
          Buy Royal Packages
        </h1>
      </div>
      <div className="max-w-[1330px] py-8 sm:px-12 sm:gap-6 grid md:grid-cols-2 lg:grid-cols-3 place-items-center md:place-items-stretch place-content-stretch">
        <div className="villa-card villa-card-1  py-8">
          <h2 className="text-4xl md:text-6xl text-center font-semibold text-white   px-4 py-2 lato   ">
            standard villa
          </h2>
          <div className="flex flex-col items-center py-20 px-2 ">
            <p className="text-[25px] text-grat-100 merriweather">
              3 Days Stay
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              One Beach Party
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              Unlimited Buffet
            </p>

            <p className="text-[25px] text-grat-100 merriweather">just ₹4999</p>
          </div>

          <div className="flex items-center justify-center">
            <Link
              href={"/buy-packages/4999-3-standard-villa"}
              className="active:scale-105 no-underline ease-in-out cg-safron h-cg-safron w-[80%] text-white py-2 text-center poppins text-2xl uppercase backdrop-blur-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <div className="villa-card villa-card-2  py-8">
          <h2 className="text-4xl md:text-6xl text-center font-semibold text-white   px-4 py-2 ">
            SUPERIOR VILLA
          </h2>
          <div className="flex flex-col items-center py-20 px-2 ">
            <p className="text-[25px] text-grat-100 merriweather">
              5 Days Stay
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              3 Beach Parties
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              Unlimited Buffet
            </p>

            <p className="text-[25px] text-grat-100 merriweather">just ₹6999</p>
          </div>

          <div className="flex items-center justify-center">
            <Link
              href={"/buy-packages/6999-5-superior-villa"}
              className="active:scale-105 no-underline ease-in-out cg-safron h-cg-safron w-[80%] text-white py-2 text-center poppins text-2xl uppercase backdrop-blur-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <div className="villa-card villa-card-3  py-8">
          <h2 className="text-4xl md:text-6xl text-center font-semibold text-white   px-4 py-2 ">
            ULTRA VILLA
          </h2>
          <div className="flex flex-col items-center py-20 px-2 ">
            <p className="text-[25px] text-grat-100 merriweather">
              7 Days Stay
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              5 Beach Parties
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              Unlimited Buffet
            </p>

            <p className="text-[25px] text-grat-100 merriweather">just ₹8999</p>
          </div>

          <div className="flex items-center justify-center">
            <Link
              href={"/buy-packages/8999-7-ultra-villa"}
              className="active:scale-105 no-underline ease-in-out cg-safron h-cg-safron w-[80%] text-white py-2 text-center poppins text-2xl uppercase backdrop-blur-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <div className="villa-card villa-card-4  py-8">
          <h2 className="text-4xl md:text-6xl text-center font-semibold text-white   px-4 py-2 ">
            GALACTIC VILLA
          </h2>
          <div className="flex flex-col items-center py-20 px-2 ">
            <p className="text-[25px] text-grat-100 merriweather">
              9 Days Stay
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              5 Beach Parties
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              Unlimited Buffet
            </p>

            <p className="text-[25px] text-grat-100 merriweather">
              just ₹10999
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Link
              href={"/buy-packages/10999-9-galactic-villa"}
              className="active:scale-105 no-underline ease-in-out cg-safron h-cg-safron w-[80%] text-white py-2 text-center poppins text-2xl uppercase backdrop-blur-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <div className="villa-card villa-card-5  py-8">
          <h2 className="text-4xl md:text-6xl text-center font-semibold text-white   px-4 py-2 ">
            INFINITY VILLA
          </h2>
          <div className="flex flex-col items-center py-20 px-2 ">
            <p className="text-[25px] text-grat-100 merriweather">
              11 Days Stay
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              7 Beach Parties
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              Unlimited Buffet
            </p>

            <p className="text-[25px] text-grat-100 merriweather">
              just ₹12999
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Link
              href={"/buy-packages/12999-11-infinity-villa"}
              className="active:scale-105 no-underline ease-in-out cg-safron h-cg-safron w-[80%] text-white py-2 text-center poppins text-2xl uppercase backdrop-blur-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <div className="villa-card villa-card-6  py-8">
          <h2 className="text-4xl md:text-6xl text-center font-semibold text-white   px-4 py-2 ">
            COSMIC VILLA
          </h2>
          <div className="flex flex-col items-center py-20 px-2 ">
            <p className="text-[25px] text-grat-100 merriweather">
              20 Days Stay
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              Unlimited Beach Party
            </p>
            <p className="text-[25px] text-grat-100 merriweather">
              Unlimited Buffet
            </p>

            <p className="text-[25px] text-grat-100 merriweather">
              just ₹13999
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Link
              href={"/buy-packages/13999-20-cosmic-villa"}
              className="active:scale-105 no-underline ease-in-out cg-safron h-cg-safron w-[80%] text-white py-2 text-center poppins text-2xl uppercase backdrop-blur-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rates;
