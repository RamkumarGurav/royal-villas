/* eslint-disable */
import React, { useEffect, useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import { Button, Box, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useMutation } from "react-query";
import ButtonLoader from "@/components/ButtonLoader";

const BuyPackages = () => {
  const router = useRouter();
  const { packageId } = router.query;
  const [btnLoading, setBtnLoading] = useState(false);

  const [bookingMsg, setBookingMsg] = useState(" ");
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    packageName: packageId,
    checkInDate: "",
    price: "",
    days: "",
    rooms: 1,
    checkOutDate: "",
  };

  const [formValue, setFormValue] = useState(initialValues);
  const {
    name,
    email,
    phone,
    packageName,
    checkInDate,
    price,
    rooms,
    checkOutDate,
  } = formValue;





  useEffect(() => {
    if (rooms && packageName) {
      setFormValue({
        ...formValue,
        price:
          Number(packageName.split("-")[0]) +
          Number(packageName.split("-")[0]) * (rooms - 1) * 1,
        days: Number(packageName.split("-")[1]),
      });
    }
    if (packageName && checkInDate && rooms) {
      let time =
        new Date(checkInDate).getTime() +
        Number(packageName.split("-")[1] - 1) * 24 * 60 * 60 * 1000;
      setFormValue({
        ...formValue,
        price:
          Number(packageName.split("-")[0]) +
          Number(packageName.split("-")[0]) * (rooms - 1) * 1,
        days: Number(packageName.split("-")[1]),
        checkOutDate: new Date(time).toISOString().slice(0, 10),
      });
    }
  }, [rooms, packageName, checkInDate, setFormValue]);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  //--------------------------------------------------------

  const onSuccess = (data) => {
    const session = data.session;
    // toast.success("LoggedIn Successfully");
    setBtnLoading(false);
    // setFormValue(initialState);
    router.push(session.url);
  };
  const onError = (error) => {
    setBtnLoading(false);
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
  };

  const fetcherRegister = async (formValue) => {
    const instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      withCredentials: true, //adding cookies
    });

    const res = await instance.post(
      "/villa-package-bookings/create-checkout-session",
      formValue
    );

    return res.data;
  };
  const {
    mutate: mutateRegister,
    data: dataRegister,
    isError: isErrorRegister,
    isLoading: isLoadingRegister,
    error: errorRegister,
  } = useMutation(fetcherRegister, {
    onSuccess,
    onError,
  }); //here mutate is the function that passes input data to fetcher function directly

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      return toast.error("Phone Number must have 10 digits");
    }
    if (!packageName) {
      return toast.error("Please Select Villa Package");
    }
    setBtnLoading(true);
    console.log(formValue);
    mutateRegister(formValue); //passing input formdata to api call
  };

  return (
    <div className="bg-primary-2 flex flex-col justify-between min-h-[100vh]  ">
      <section className="py-10 mx-10 ">
        <Head>
          <title>Buy villa Packages| RoyalVillas.com</title>
        </Head>
        <div className="relative">
          <h1 className="text-center text-yellow-500 font-bold text-[25px] sm:text-[40px]">
            Buy Royal Packages
          </h1>
          <Link
            href="/"
            className="absolute top-4 right-0 rounded-full p-2 bg-orange-500 hover:bg-green-700 z-1

        "
          >
            <AiFillHome size={20} className="text-white " />
          </Link>
        </div>
        <div className="bookings-container">
          <div className="bookings-right">
            <form onSubmit={handleSubmit}>
              <div className="w-[100%] grid sm:grid-cols-2 gap-4 md:gap-x-10">
                <div>
                  <label htmlFor="name" className="para">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Name"
                    value={name}
                    required
                    onChange={handleChange}
                    className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  />
                </div>
                <div>
                  <label htmlFor="email" className="para">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={email}
                    required
                    onChange={handleChange}
                    className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="para">
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Enter Your Phone Number"
                    value={phone}
                    required
                    onChange={handleChange}
                    className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  />
                </div>
                <div>
                  <label htmlFor="checkInDate" className="para">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    id="checkInDate"
                    min={`${new Date().toISOString().slice(0, 10)}`}
                    name="checkInDate"
                    placeholder="Select Check-in Date"
                    value={checkInDate}
                    required
                    onChange={handleChange}
                    className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  />
                </div>
                <div className="">
                  <label htmlFor="packageName" className="para">
                    Package
                  </label>
                  <select
                    id="packageName"
                    name="packageName"
                    value={packageName}
                    onChange={handleChange}
                    required
                    className="shadow  border  rounded w-full py-4 px-3 text-gray-700  para leading-tight focus:outline-none focus:shadow-outline focus:border-yellow-400 "
                    // className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  >
                    <option value="">Select a Villa Package</option>
                    <option value="4999-3-standard-villa">
                      Standard Villa
                    </option>
                    <option value="6999-5-superior-villa">
                      Superior Villa
                    </option>
                    <option value="8999-7-ultra-villa">Ultra Villa</option>
                    <option value="10999-9-galactic-villa">
                      Galactic Villa
                    </option>
                    <option value="12999-11-infinity-villa">
                      Infinity Villa
                    </option>
                    <option value="13999-20-cosmic-villa">Cosmic Villa</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="rooms" className="para">
                    Rooms (max 3 persons per room)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    name="rooms"
                    id="rooms"
                    placeholder="Enter Number of Rooms"
                    onChange={handleChange}
                    value={rooms}
                    required
                    className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  />
                </div>
                {packageName && (
                  <div>
                    <label htmlFor="price" className="para">
                      Price
                    </label>
                    <input
                      type="number"
                      min="4999"
                      name="price"
                      id="price"
                      placeholder="Price"
                      readOnly
                      onChange={handleChange}
                      value={price}
                      required
                      className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                    />
                  </div>
                )}
                {packageName && (
                  <div>
                    <label htmlFor="days" className="para">
                      Days
                    </label>
                    <input
                      type="number"
                      min="3"
                      name="days"
                      id="days"
                      placeholder="Days"
                      readOnly
                      onChange={handleChange}
                      value={Number(packageName.split("-")[1])}
                      required
                      className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                    />
                  </div>
                )}
                {checkInDate && packageName && (
                  <div>
                    <label htmlFor="checkOutDate" className="para">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      id="checkOutDate"
                      min={`${new Date().toISOString().slice(0, 10)}`}
                      name="checkOutDate"
                      value={checkOutDate}
                      required
                      readOnly
                      className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center sm:justify-end justify-center my-10">
                <button
                  type="submit"
                  className="active:scale-105 ease-in-out cg-safron h-cg-safron w-[300px]  text-white py-4 text-center poppins text-2xl uppercase backdrop-blur-lg rounded-md flex items-center justify-center"
                >
                  buy now {btnLoading ? <ButtonLoader /> : null}
                </button>
              </div>
            </form>

           
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BuyPackages;

export async function getStaticProps({ params }) {
  return {
    props: {
      data: params.packageId,
    },
  };
}

export async function getStaticPaths() {
  const packageNamesPaths = [
    "4999-3-standard-villa",
    "6999-5-superior-villa",
    "8999-7-ultra-villa",
    "10999-9-galactic-villa",
    "12999-11-infinity-villa",
    "13999-20-cosmic-villa",
  ];

  const paths = packageNamesPaths.map((value) => {
    return {
      params: {
        packageId: value, //to tell the nextjs that only prereneder pages that that have these postIDs during build time
      },
    };
  });

  return {
    paths,

    fallback: false, //if fallback is set to false,then any paths not returned by gerStaticPaths will result in 404 page
  };
}
